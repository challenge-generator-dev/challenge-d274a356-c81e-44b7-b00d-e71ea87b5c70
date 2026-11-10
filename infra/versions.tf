terraform {
  required_version = ">= 1.8.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.50"
    }
  }
}

// Configuración adicional del provider para DynamoDB
// DynamoDB requiere operaciones de API específicas
// que pueden necesitar configuración adicional en entornos de alta concurrencia
provider "aws" {
  alias  = "dynamodb"
  region = var.aws_region

  endpoints {
    dynamodb = var.dynamodb_endpoint
  }
}

// Endpoint personalizado para DynamoDB (útil para desarrollo local con LocalStack)
variable "dynamodb_endpoint" {
  description = "Endpoint personalizado para DynamoDB (útil para desarrollo local con LocalStack)"
  type        = string
  default     = null
  nullable    = true
}

// Validación de la región de AWS
// Asegura que se use una región válida
locals {
  valid_aws_regions = [
    "us-east-1", "us-east-2", "us-west-1", "us-west-2",
    "eu-west-1", "eu-west-2", "eu-west-3", "eu-central-1",
    "ap-northeast-1", "ap-northeast-2", "ap-southeast-1", "ap-southeast-2"
  ]
}