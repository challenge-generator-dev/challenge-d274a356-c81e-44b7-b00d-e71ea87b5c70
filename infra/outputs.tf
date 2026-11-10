# Outputs de la infraestructura de DynamoDB para el sistema de órdenes
# Estos valores son consumidos por otros módulos o outputs a nivel de root

output "dynamodb_table_arn" {
  description = "ARN completo de la tabla DynamoDB de órdenes"
  value       = aws_dynamodb_table.orders.arn
}

output "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB de órdenes"
  value       = aws_dynamodb_table.orders.name
}

output "dynamodb_table_id" {
  description = "ID único de la tabla DynamoDB (requerido para referencias)"
  value       = aws_dynamodb_table.orders.id
}

output "dynamodb_table_stream_arn" {
  description = "ARN del stream de DynamoDB para captura de cambios (CDC)"
  value       = aws_dynamodb_table.orders.stream_arn
  sensitive   = false
}

output "dynamodb_table_tags" {
  description = "Etiquetas aplicadas a la tabla DynamoDB"
  value       = aws_dynamodb_table.orders.tags
}

output "dynamodb_regional_endpoints" {
  description = "Endpoints de acceso regional para la tabla DynamoDB"
  value       = { for region in var.aws_regions : region => "dynamodb.${region}.amazonaws.com" }
}

output "dynamodb_partition_key_attribute_name" {
  description = "Nombre del atributo de clave de partición"
  value       = var.partition_key_attribute
}

output "dynamodb_sort_key_attribute_name" {
  description = "Nombre del atributo de clave de ordenación (si aplica)"
  value       = var.sort_key_attribute
}

output "dynamodb_billing_mode" {
  description = "Modo de facturación utilizado (PROVISIONED o PAY_PER_REQUEST)"
  value       = var.billing_mode
}

output "dynamodb_read_capacity" {
  description = "Capacidad de lectura aprovisionada (solo si billing_mode es PROVISIONED)"
  value       = var.read_capacity
}

output "dynamodb_write_capacity" {
  description = "Capacidad de escritura aprovisionada (solo si billing_mode es PROVISIONED)"
  value       = var.write_capacity
}

output "dynamodb_point_in_time_recovery_enabled" {
  description = "Indicador de recuperación point-in-time habilitada"
  value       = var.enable_point_in_time_recovery
}

output "dynamodb_server_side_encryption_enabled" {
  description = "Indicador de cifrado del lado del servidor habilitado"
  value       = var.enable_server_side_encryption
}

output "dynamodb_tags_summary" {
  description = "Resumen de etiquetas aplicadas a todos los recursos"
  value       = "Etiquetas aplicadas: environment=${var.environment}, project=${var.project_name}, managed_by=terraform"
}

output "dynamodb_table_endpoint" {
  description = "Endpoint directo de la tabla para conexiones optimizadas"
  value       = "https://dynamodb.${var.aws_region}.amazonaws.com/"
}

output "dynamodb_kms_key_arn" {
  description = "ARN de la clave KMS utilizada para cifrado (si está habilitada)"
  value       = var.enable_server_side_encryption ? var.kms_key_arn : null
  sensitive   = false
}

output "dynamodb_replica_regions" {
  description = "Regiones configuradas para réplicas de la tabla (solo para tablas globales)"
  value       = var.replica_regions
}

output "dynamodb_creation_timestamp" {
  description = "Timestamp de creación de la tabla (para auditoría)"
  value       = aws_dynamodb_table.orders.creation_date
}

output "dynamodb_item_count" {
  description = "Cantidad de items en la tabla. Este valor se actualiza automáticamente cuando hay datos"
  value       = aws_dynamodb_table.orders.item_count
}

output "dynamodb_table_size_bytes" {
  description = "Tamaño de la tabla en bytes. Este valor se actualiza automáticamente conforme se agregan datos"
  value       = aws_dynamodb_table.orders.table_size_bytes
}

output "dynamodb_status" {
  description = "Estado actual de la tabla (ACTIVE, CREATING, DELETING, UPDATING)"
  value       = aws_dynamodb_table.orders.table_status
}

output "dynamodb_access_policy" {
  description = "Política de acceso IAM para la tabla DynamoDB"
  value       = aws_iam_policy.dynamodb_access.arn
}

output "dynamodb_stack_name" {
  description = "Nombre del stack de CloudFormation si se usa despliegue vía CFN"
  value       = "${var.project_name}-dynamodb-${var.environment}"
}

output "dynamodb_resource_id" {
  description = "ID del recurso para referencias en otros servicios AWS"
  value       = "${var.project_name}-orders-${var.environment}"
}