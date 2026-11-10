// Módulo de infraestructura para tabla DynamoDB de órdenes
// Este archivo define el recurso principal: la tabla DynamoDB para almacenar órdenes
// del sistema de comercio electrónico con soporte para operaciones CRUD completas

// Nombre completo de la tabla basado en convenciones del proyecto
locals {
  table_name      = var.table_name != null ? var.table_name : "${var.project_name}_orders_${var.environment}"
  resource_prefix = "${var.project_name}_${var.environment}"
  common_tags = {
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "terraform"
    Description = "Tabla DynamoDB para gestión de órdenes de comercio electrónico"
  }
}

// Definición de la tabla DynamoDB para órdenes
// La tabla usa el patrón de diseño con partition key y sort key
// para soportar consultas eficientes por diferentes atributos
resource "aws_dynamodb_table" "orders" {
  name         = local.table_name
  billing_mode = var.billing_mode
  hash_key     = var.partition_key_attribute
  range_key    = var.sort_key_attribute

  // Configuración de capacidad para modo aprovisionado
  // Solo aplica cuando billing_mode es PROVISIONED
  dynamic "server_side_encryption" {
    for_each = var.enable_server_side_encryption ? [1] : []
    content {
      enabled     = true
      kms_key_arn = var.kms_key_arn
    }
  }

  // Atributos de la tabla - definición del esquema
  attribute {
    name = var.partition_key_attribute
    type = "S"
  }

  attribute {
    name = var.sort_key_attribute
    type = "S"
  }

  attribute {
    name = "customer_id"
    type = "S"
  }

  attribute {
    name = "status"
    type = "S"
  }

  // Índice Secundario Global para búsquedas por cliente
  global_secondary_index {
    name            = "idx_customer_orders"
    hash_key        = "customer_id"
    range_key       = "order_id"
    projection_type = "ALL"

    dynamic "provisioned_throughput" {
      for_each = var.billing_mode == "PROVISIONED" ? [1] : []
      content {
        read_capacity  = var.gsi_read_capacity
        write_capacity = var.gsi_write_capacity
      }
    }
  }

  // Índice Secundario Global para búsquedas por estado
  global_secondary_index {
    name            = "idx_status_orders"
    hash_key        = "status"
    range_key       = "created_at"
    projection_type = "ALL"

    dynamic "provisioned_throughput" {
      for_each = var.billing_mode == "PROVISIONED" ? [1] : []
      content {
        read_capacity  = var.gsi_read_capacity
        write_capacity = var.gsi_write_capacity
      }
    }
  }

  // Configuración de TTL para limpieza automática de datos
  dynamic "ttl" {
    for_each = var.enable_ttl ? [1] : []
    content {
      attribute_name = "expires_at"
      enabled        = true
    }
  }

  // Recuperación a un punto en el tiempo
  dynamic "point_in_time_recovery" {
    for_each = var.enable_point_in_time_recovery ? [1] : []
    content {
      enabled = true
    }
  }

  // Configuración de flujos de DynamoDB para triggers de Lambda
  dynamic "stream" {
    for_each = var.enable_dynamodb_streams ? [1] : []
    content {
      stream_enabled   = true
      stream_view_type = var.dynamodb_stream_view_type
    }
  }

  // Tags aplicados a todos los recursos
  tags = merge(local.common_tags, var.extra_tags)

  lifecycle {
    prevent_destroy = false
    ignore_changes = [
      tags
    ]
  }
}

// Política IAM para acceso a la tabla DynamoDB
resource "aws_iam_policy" "dynamodb_access" {
  name        = "${local.resource_prefix}_dynamodb_access"
  description = "Política IAM para acceso a la tabla DynamoDB de órdenes"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowDynamoDBAccess"
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:BatchGetItem",
          "dynamodb:BatchWriteItem"
        ]
        Resource = [
          aws_dynamodb_table.orders.arn,
          "${aws_dynamodb_table.orders.arn}/index/*"
        ]
      }
    ]
  })

  tags = local.common_tags
}

// Outputs que exponen información de la tabla para otros módulos
output "table_name" {
  description = "Nombre de la tabla DynamoDB"
  value       = aws_dynamodb_table.orders.name
}

output "table_arn" {
  description = "ARN completo de la tabla DynamoDB"
  value       = aws_dynamodb_table.orders.arn
}

output "table_id" {
  description = "ID único de la tabla"
  value       = aws_dynamodb_table.orders.id
}

output "table_stream_arn" {
  description = "ARN del stream de DynamoDB si está habilitado"
  value       = aws_dynamodb_table.orders.stream_arn
}

output "gsi_customer_name" {
  description = "Nombre del índice secundario por cliente"
  value       = aws_dynamodb_table.orders.global_secondary_index[0].name
}

output "gsi_status_name" {
  description = "Nombre del índice secundario por estado"
  value       = aws_dynamodb_table.orders.global_secondary_index[1].name
}

output "iam_policy_arn" {
  description = "ARN de la política IAM de acceso a DynamoDB"
  value       = aws_iam_policy.dynamodb_access.arn
}