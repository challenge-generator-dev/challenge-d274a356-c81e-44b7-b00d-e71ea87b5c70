# Variables de configuración para el entorno de desarrollo
# Estos valores son específicos del ambiente dev y sobrescriben los defaults

environment  = "dev"
project_name = "ecommerce-orders"
aws_region   = "us-east-1"

# Configuración de desarrollo
enable_detailed_monitoring = true
enable_verbose_logging     = true

# Nombre de la tabla DynamoDB
table_name = "ecommerce-orders-dev"

# Claves de la tabla
partition_key_attribute = "orderId"
sort_key_attribute      = "createdAt"

# Configuración de capacidad
billing_mode   = "PROVISIONED"
read_capacity  = 5
write_capacity = 5

# Auto-scaling
autoscaling_read_min  = 2
autoscaling_read_max  = 20
autoscaling_write_min = 2
autoscaling_write_max = 20

# Seguridad
enable_server_side_encryption = true
kms_key_id                    = "alias/aws/dynamodb"
enable_point_in_time_recovery = false

# Streams
enable_dynamodb_streams = true
stream_view_type        = "NEW_AND_OLD_IMAGES"

# Índices secundarios
gsi_partition_key   = "customerId"
gsi_name            = "customerId-index"
gsi_projection_type = "ALL"
gsi_read_capacity   = 5
gsi_write_capacity  = 5

# TTL
enable_ttl              = true
ttl_attribute_name      = "expiresAt"
ttl_deletion_after_days = 90

# Réplicas
replica_regions = ["us-west-2"]

# Tags
tags = {
  Environment        = "development"
  Project            = "ecommerce-orders"
  ManagedBy          = "terraform"
  CostCenter         = "engineering"
  DataClassification = "internal"
  RetentionPolicy    = "90-days"
  Owner              = "platform-team"
  SupportEmail       = "platform@company.com"
  Compliance         = "SOC2"
}

# Backup
enable_on_demand_backup = true
backup_schedule         = "cron(0 5 ? * * *)"

# Alarmas
enable_cloudwatch_alarms       = true
alarm_read_throughput_percent  = 80
alarm_write_throughput_percent = 80
alarm_cpu_utilization_percent  = 75

# Red
vpc_endpoint_required  = false
restrict_access        = false
allowed_principal_arns = []

# Logging
enable_cloudtrail                = true
cloudtrail_name                  = "ecommerce-orders-dev-trail"
cloudtrail_include_global_events = false

# Avanzado
resource_prefix     = "ecommerce-orders-dev"
terraform_workspace = "dev"
deletion_protection = false

# Overrides del módulo
dynamodb_module_defaults = {
  point_in_time_recovery_window_in_days = 7
  max_retries                           = 3
  propagate_tags                        = true
}