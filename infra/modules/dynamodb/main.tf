# Módulo reutilizable para creación de tablas DynamoDB
# Proporciona configuración flexible para diferentes casos de uso

# ===========================================
# CONFIGURACIÓN BÁSICA DE LA TABLA
# ===========================================

resource "aws_dynamodb_table" "this" {
  name         = var.table_name
  billing_mode = var.billing_mode
  hash_key     = var.partition_key_attribute
  range_key    = var.sort_key_attribute

  dynamic "attribute" {
    for_each = var.extra_attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  attribute {
    name = var.partition_key_attribute
    type = var.partition_key_type
  }

  dynamic "attribute" {
    for_each = var.sort_key_attribute != null ? [1] : []
    content {
      name = var.sort_key_attribute
      type = var.sort_key_type
    }
  }

  # ===========================================
  # CAPACIDAD PROVISIONADA (si aplica)
  # ===========================================

  dynamic "provisioned_throughput" {
    for_each = var.billing_mode == "PROVISIONED" ? [1] : []
    content {
      read_capacity  = var.read_capacity
      write_capacity = var.write_capacity
    }
  }

  # ===========================================
  # ÍNDICES SECUNDARIOS GLOBALES
  # ===========================================

  dynamic "global_secondary_index" {
    for_each = var.gsi_configuration
    content {
      name            = gsi.value.name
      hash_key        = gsi.value.partition_key
      range_key       = try(gsi.value.sort_key, null)
      projection_type = gsi.value.projection_type

      dynamic "non_key_attributes" {
        for_each = try(gsi.value.non_key_attributes, [])
        content {
          name = non_key_attributes.value
        }
      }

      dynamic "provisioned_throughput" {
        for_each = var.billing_mode == "PROVISIONED" ? [1] : []
        content {
          read_capacity  = try(gsi.value.read_capacity, var.read_capacity)
          write_capacity = try(gsi.value.write_capacity, var.write_capacity)
        }
      }
    }
  }

  # ===========================================
  # ÍNDICES SECUNDARIOS LOCALES
  # ===========================================

  dynamic "local_secondary_index" {
    for_each = var.lsi_configuration
    content {
      name            = lsi.value.name
      range_key       = lsi.value.sort_key
      projection_type = try(lsi.value.projection_type, "KEYS_ONLY")
    }
  }

  # ===========================================
  # STREAMS (CAPTURA DE CAMBIOS)
  # ===========================================

  dynamic "stream_specification" {
    for_each = var.enable_streams ? [1] : []
    content {
      stream_enabled   = true
      stream_view_type = var.stream_view_type
    }
  }

  # ===========================================
  # TTL (TIME TO LIVE)
  # ===========================================

  dynamic "ttl" {
    for_each = var.enable_ttl ? [1] : []
    content {
      attribute_name = var.ttl_attribute_name
      enabled        = true
    }
  }

  # ===========================================
  # CIFRADO DEL LADO DEL SERVIDOR
  # ===========================================

  server_side_encryption {
    enabled     = var.enable_server_side_encryption
    kms_key_arn = var.kms_key_id
  }

  # ===========================================
  # RECUPERACIÓN POINT-IN-TIME
  # ===========================================

  point_in_time_recovery {
    enabled = var.enable_point_in_time_recovery
  }

  # ===========================================
  # ETIQUETAS (TAGS)
  # ===========================================

  tags = merge(
    var.tags,
    {
      "Name" = var.table_name
    }
  )

  lifecycle {
    prevent_destroy = var.enable_deletion_protection
  }
}

# ===========================================
# TABLAS REPLICADAS (GLOBAL TABLE)
# ===========================================

resource "aws_dynamodb_table_replica" "this" {
  for_each = toset(var.replica_regions)

  table_name             = aws_dynamodb_table.this.name
  kms_key_arn            = var.replica_kms_key_arn
  point_in_time_recovery = var.enable_point_in_time_recovery
}

# ===========================================
# POLICY DE ACCESO IAM
# ===========================================

data "aws_iam_policy_document" "dynamodb_access" {
  version = "2012-10-17"

  statement {
    sid    = "AllowDynamoDBAccess"
    effect = "Allow"
    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:BatchGetItem",
      "dynamodb:BatchWriteItem"
    ]
    resources = [aws_dynamodb_table.this.arn]

    condition {
      test     = "Bool"
      variable = "aws:SecureTransport"
      values   = ["true"]
    }
  }

  statement {
    sid    = "AllowDynamoDBStreamAccess"
    effect = "Allow"
    actions = [
      "dynamodb:GetRecords",
      "dynamodb:GetShardIterator",
      "dynamodb:DescribeStream",
      "dynamodb:ListStreams"
    ]
    resources = [aws_dynamodb_table.this.stream_arn]
  }
}

resource "aws_iam_policy" "dynamodb_access" {
  name        = "${var.table_name}-access-policy"
  description = "Política de acceso para la tabla DynamoDB ${var.table_name}"
  policy      = data.aws_iam_policy_document.dynamodb_access.json

  tags = merge(
    var.tags,
    {
      "Name" = "${var.table_name}-access-policy"
    }
  )
}

# ===========================================
# ALARMAS DE CLOUDWATCH
# ===========================================

resource "aws_cloudwatch_metric_alarm" "read_throughput" {
  count = var.enable_cloudwatch_alarms ? 1 : 0

  alarm_name          = "${var.table_name}-read-throttle"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ReadThrottleEvents"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Sum"
  threshold           = var.alarm_read_throttle_threshold
  alarm_description   = "Alarm when read throughput is throttled"
  alarm_actions       = var.alarm_actions

  dimensions = {
    TableName = aws_dynamodb_table.this.name
  }
}

resource "aws_cloudwatch_metric_alarm" "write_throughput" {
  count = var.enable_cloudwatch_alarms ? 1 : 0

  alarm_name          = "${var.table_name}-write-throttle"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "WriteThrottleEvents"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Sum"
  threshold           = var.alarm_write_throttle_threshold
  alarm_description   = "Alarm when write throughput is throttled"
  alarm_actions       = var.alarm_actions

  dimensions = {
    TableName = aws_dynamodb_table.this.name
  }
}

resource "aws_cloudwatch_metric_alarm" "system_errors" {
  count = var.enable_cloudwatch_alarms ? 1 : 0

  alarm_name          = "${var.table_name}-system-errors"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "SystemErrors"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Sum"
  threshold           = "0"
  alarm_description   = "Alarm when system errors occur"
  alarm_actions       = var.alarm_actions

  dimensions = {
    TableName = aws_dynamodb_table.this.name
  }
}

resource "aws_cloudwatch_metric_alarm" "user_errors" {
  count = var.enable_cloudwatch_alarms ? 1 : 0

  alarm_name          = "${var.table_name}-user-errors"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "UserErrors"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Sum"
  threshold           = "0"
  alarm_description   = "Alarm when user errors occur"
  alarm_actions       = var.alarm_actions

  dimensions = {
    TableName = aws_dynamodb_table.this.name
  }
}

# ===========================================
# EXPORTAR VALORES PARA OTROS MÓDULOS
# ===========================================

locals {
  arn_suffix         = ":table/${var.table_name}"
  regional_endpoints = "dynamodb.${var.aws_region}.amazonaws.com"
  global_endpoints   = "dynamodb-global.${var.aws_region}.amazonaws.com"
}