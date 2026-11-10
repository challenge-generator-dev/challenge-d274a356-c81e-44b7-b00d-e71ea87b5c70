# Variables de configuración para la infraestructura
# Estas variables permiten parametrizar la infraestructura
# para diferentes entornos (dev, staging, prod).

# Variable para definir la región de AWS donde se desplegarán los recursos
variable "aws_region" {
  description = "Región de AWS donde se crearán los recursos"
  type        = string
  default     = "us-east-1"
}

# Variable para definir la región secundaria (replica) de AWS
variable "aws_replica_region" {
  description = "Región secundaria de AWS para réplicas (ej. DynamoDB Global Tables)"
  type        = string
  default     = "us-west-2"
}

# Variable para definir el perfil de AWS a utilizar
variable "aws_profile" {
  description = "Perfil de AWS configurado en ~/.aws/credentials"
  type        = string
  default     = "default"
}

# Variable para definir el nombre del proyecto
# Se utiliza como prefijo en los nombres de los recursos
variable "project_name" {
  description = "Nombre del proyecto, utilizado como prefijo en los recursos"
  type        = string
  default     = "ecommerce"
}

# Variable para definir el entorno (dev, staging, prod)
variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
  default     = "dev"
}

# Variable para definir la capacidad de lectura de DynamoDB
variable "dynamodb_read_capacity" {
  description = "Capacidad de lectura provisionada para la tabla DynamoDB"
  type        = number
  default     = 5
}

# Variable para definir la capacidad de escritura de DynamoDB
variable "dynamodb_write_capacity" {
  description = "Capacidad de escritura provisionada para la tabla DynamoDB"
  type        = number
  default     = 5
}

# Variable para habilitar DynamoDB Streams
variable "enable_dynamodb_stream" {
  description = "Habilitar DynamoDB Streams para capturar cambios en la tabla"
  type        = bool
  default     = false
}

# Variable para definir el nombre de la tabla DynamoDB
variable "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB para órdenes"
  type        = string
  default     = "orders"
}

# Variable para definir el hash key de la tabla DynamoDB
variable "dynamodb_hash_key" {
  description = "Nombre del atributo utilizado como hash key en DynamoDB"
  type        = string
  default     = "order_id"
}

# Variable para definir el tipo del hash key
variable "dynamodb_hash_key_type" {
  description = "Tipo de dato del hash key (S para string, N para number, B para binary)"
  type        = string
  default     = "S"
}

# Variable para definir el range key de la tabla DynamoDB (opcional)
variable "dynamodb_range_key" {
  description = "Nombre del atributo utilizado como range key en DynamoDB"
  type        = string
  default     = "created_at"
}

# Variable para definir el tipo del range key
variable "dynamodb_range_key_type" {
  description = "Tipo de dato del range key (S para string, N para number, B para binary)"
  type        = string
  default     = "S"
}

# Variable para definir los índices secundarios globales (GSI)
variable "dynamodb_gsi" {
  description = "Lista de índices secundarios globales para la tabla DynamoDB"
  type = list(object({
    name           = string
    hash_key       = string
    hash_key_type  = string
    range_key      = string
    range_key_type = string
    read_capacity  = number
    write_capacity = number
  }))
  default = [
    {
      name           = "customer_id_index"
      hash_key       = "customer_id"
      hash_key_type  = "S"
      range_key      = "order_status"
      range_key_type = "S"
      read_capacity  = 5
      write_capacity = 5
    }
  ]
}

# Variable para definir las políticas de escalado automático
variable "enable_autoscaling" {
  description = "Habilitar escalado automático para la tabla DynamoDB"
  type        = bool
  default     = true
}

# Variable para definir el ARN del rol IAM para Lambda (opcional)
variable "lambda_role_arn" {
  description = "ARN del rol IAM para funciones Lambda que interactúan con DynamoDB"
  type        = string
  default     = ""
}

# Variable para definir los tags adicionales para los recursos
variable "tags" {
  description = "Tags adicionales para los recursos de AWS"
  type        = map(string)
  default     = {}
}