# Módulo de Infraestructura para Órdenes en DynamoDB

Este módulo de Terraform define la infraestructura necesaria para almacenar y gestionar órdenes de una plataforma de comercio electrónico en Amazon DynamoDB.

## Descripción del Módulo

El módulo crea una tabla DynamoDB optimizada para operaciones CRUD sobre órdenes de compra, con soporte para consultas por diferentes atributos y capacidades de escalamiento automático.

## Recursos Creados

- **Tabla DynamoDB**: Almacén principal para las órdenes con configuración de capacidad bajo demanda
- **Índices secundarios**: GSI para búsquedas por cliente y estado de orden
- **Tags**: Metadata para identificación y costeo en entornos AWS

## Uso Básico

```hcl
module "orders_dynamodb" {
  source = "./infra"

  environment = "production"
  project_name = "ecommerce"
}
```

## Requisitos Previos

- Terraform >= 1.8.0
- Provider AWS ~> 5.50
- Credenciales de AWS configuradas localmente o mediante IAM Role

## Configuración de Variables

| Variable | Tipo | Default | Descripción |
|----------|------|---------|-------------|
| environment | string | - | Entorno de despliegue (dev/staging/production) |
| project_name | string | "ecommerce" | Nombre del proyecto para naming de recursos |
| table_name | string | null | Nombre personalizado de la tabla (opcional) |
| billing_mode | string | "PAY_PER_REQUEST" | Modo de facturación (PAY_PER_REQUEST o PROVISIONED) |
| read_capacity | number | 5 | Capacidad de lectura para modo aprovisionado |
| write_capacity | number | 5 | Capacidad de escritura para modo aprovisionado |
| enable_point_in_time_recovery | bool | true | Habilita recuperación a un punto en el tiempo |
| enable_server_side_encryption | bool | true | Habilita cifrado del lado del servidor |

## Validación Local

Para validar la configuración del módulo antes de aplicar:

```bash
# Inicializar el directorio de trabajo
terraform init

# Validar la sintaxis y configuración
terraform validate

# Planificar los cambios sin aplicarlos
terraform plan

# Ver el formato de los archivos
terraform fmt -check
```

## Consideraciones de Seguridad

- El cifrado SSE (Server-Side Encryption) está habilitado por defecto usando AWS-managed keys
- Point-in-time recovery está habilitado para protección contra eliminaciones accidentales
- Los logs de CloudTrail deben estar configurados a nivel de cuenta para auditoría

## Outputs Disponibles

El módulo expone los siguientes outputs para consumo por otros módulos:

- `table_name`: Nombre de la tabla DynamoDB creada
- `table_arn`: ARN completo de la tabla para políticas IAM
- `table_id`: ID único de la tabla
- `gsi_customer_name`: Nombre del índice secundario por cliente
- `gsi_status_name`: Nombre del índice secundario por estado

## Estructura de la Tabla

La tabla DynamoDB usa los siguientes atributos:

- **Partition Key (PK)**: `order_id` - Identificador único de la orden
- **Sort Key (SK)**: `created_at` - Timestamp de creación para ordenamiento
- **GSI1**: Búsqueda por `customer_id` (partition) + `order_id` (sort)
- **GSI2**: Búsqueda por `status` (partition) + `created_at` (sort)

## Costo Estimado

El modo PAY_PER_REQUEST cobra por request, mientras PROVISIONED cobra por capacidad aprovisionada. Para cargas de trabajo típicas de e-commerce, el modo bajo demanda es generalmente más económico.

## Mantenimiento

Para actualizar la configuración de la tabla:

```bash
terraform plan -var-file=environments/production/terraform.tfvars
terraform apply -var-file=environments/production/terraform.tfvars
```

Nota: Algunos cambios en DynamoDB requieren reemplazo de la tabla. Terraform manejará esto automáticamente, pero los datos deberán ser migrados.