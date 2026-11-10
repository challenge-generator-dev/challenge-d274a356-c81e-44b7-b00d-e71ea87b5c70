# Configuración de proveedores de Terraform para AWS
# Este archivo declara los providers necesarios para desplegar la infraestructura.

# Provider principal de AWS para la región primaria
# Las credenciales se obtienen del entorno o del archivo ~/.aws/credentials.
provider "aws" {
  region = "us-east-1"

  default_tags {
    tags = {
      ManagedBy = "Terraform"
    }
  }
}

# Provider secundario para recursos en otra región (réplicas)
# Útil para tablas globales de DynamoDB o recursos en región alternativa.
provider "aws" {
  alias  = "replica"
  region = "us-west-2"

  default_tags {
    tags = {
      ManagedBy = "Terraform"
    }
  }
}