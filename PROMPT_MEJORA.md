# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | `app/` | practice, chapter | server | Node | Express, DynamoDB |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate` — componente `infra` (support).
3. `cd app && npm install && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`

## Herramientas

- **Terraform**: Herramienta de trabajo del candidato: usala en la fase donde se depura o se prueba la solucion (no es una dependencia del proyecto).

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **app/src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `app/src/infrastructure/middlewares/validation.ts` — `ValidationError.map`: Se invoca `map` sobre `ValidationError`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
(cd app && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
CRUD de ordenes en DynamoDB expuesto por una API REST (corrida e2e 20261109223818458), Implementa operaciones CRUD de ordenes sobre una tabla DynamoDB expuestas por una API REST

### Misión / candidato
Persistir y consultar ordenes

### Reto
- Tema: CRUD de ordenes sobre DynamoDB
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de CRUD de órdenes en DynamoDB
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Creación de la tabla DynamoDB y operaciones CRUD básicas — objetivo: Implementar las operaciones básicas de CRUD para órdenes en DynamoDB. — entregable (NO resolver): Una tabla DynamoDB configurada y una API REST que expone las operaciones CRUD para órdenes.
- Fase 2: Adición de validaciones y manejo de errores — objetivo: Fortalecer las operaciones CRUD con validaciones y manejo de errores. — entregable (NO resolver): Operaciones CRUD fortalecidas con validaciones y manejo de errores robusto.
- Fase 3: Optimización y refactorización — objetivo: Optimizar y refactorizar el código para mejorar la eficiencia y mantenibilidad. — entregable (NO resolver): Código refactorizado y optimizado para las operaciones CRUD de órdenes en DynamoDB.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: app/src/main.ts ===
import 'reflect-metadata';
import dotenv from 'dotenv';
import app from './app';
import { DynamoDBClient } from 'aws-sdk';
import { validateEnvVars } from './infrastructure/config/envValidator';

dotenv.config();

validateEnvVars();

const dynamoDBClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  endpoint: process.env.DYNAMODB_ENDPOINT || undefined,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

app.locals.dynamoDBClient = dynamoDBClient;

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM recibido. Cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});

process.on('uncaughtException', (err) => {
  console.error('Excepción no capturada:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Rechazo no manejado en:', promise, 'razón:', reason);
});

// === ARCHIVO: app/src/app.ts ===
import express, { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { OrderController } from './infrastructure/controllers/OrderController';
import { errorHandler } from './infrastructure/middlewares/errorHandler';
import { validationMiddleware } from './infrastructure/middlewares/validation';
import { OrderDTO, OrderUpdateDTO } from './types/dto';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const orderController = new OrderController(
  null as any
);

app.post(
  '/orders',
  validationMiddleware(OrderDTO as unknown as ClassConstructor<object>),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderData = plainToInstance(OrderDTO, req.body);
      const errors = await validate(orderData);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      await orderController.createOrder(req, res);
    } catch (error) {
      next(error);
    }
  }
);

app.get('/orders/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await orderController.getOrderById(req, res);
  } catch (error) {
    next(error);
  }
});

app.put(
  '/orders/:id',
  validationMiddleware(OrderUpdateDTO as unknown as ClassConstructor<object>),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderData = plainToInstance(OrderUpdateDTO, req.body);
      const errors = await validate(orderData);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      await orderController.updateOrder(req, res);
    } catch (error) {
      next(error);
    }
  }
);

app.delete('/orders/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await orderController.deleteOrder(req, res);
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

export default app;

// === ARCHIVO: app/package.json ===
{
  "name": "order-crud-service",
  "version": "1.0.0",
  "description": "Servicio CRUD para órdenes en DynamoDB",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/main.js",
    "dev": "ts-node src/main.ts",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint . --ext .ts",
    "prebuild": "rimraf dist"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "aws-sdk": "^2.1691.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "reflect-metadata": "^0.2.2"
  },
  "devDependencies": {
    "@types/express": "^5.0.0",
    "@types/jest": "^29.5.12",
    "@types/node": "^22.7.0",
    "@typescript-eslint/eslint-plugin": "^7.18.0",
    "@typescript-eslint/parser": "^7.18.0",
    "eslint": "^8.57.0",
    "jest": "^29.7.0",
    "rimraf": "^5.0.1",
    "supertest": "^7.0.0",
    "ts-jest": "^29.2.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.7.0"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "moduleFileExtensions": [
      "ts",
      "js"
    ],
    "transform": {
      "^.+\\.ts$": "ts-jest"
    },
    "testMatch": [
      "**/*.test.ts"
    ]
  }
}

// === ARCHIVO: app/src/domain/models/Order.ts ===
import { IsString, IsNumber, IsDate, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderProduct {
  @IsString()
  productId!: string;

  @IsNumber()
  quantity!: number;

  @IsNumber()
  unitPrice!: number;

  constructor(data?: Partial<OrderProduct>) {
    if (data) {
      this.productId = data.productId || '';
      this.quantity = data.quantity || 0;
      this.unitPrice = data.unitPrice || 0;
    }
  }
}

export class Order {
  @IsString()
  id!: string;

  @IsString()
  customerId!: string;

  @IsDate()
  @Type(() => Date)
  createdAt!: Date;

  @IsString()
  status!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProduct)
  products!: OrderProduct[];

  @IsNumber()
  totalAmount!: number;

  constructor(data?: Partial<Order>) {
    if (data) {
      this.id = data.id || '';
      this.customerId = data.customerId || '';
      this.createdAt = data.createdAt || new Date();
      this.status = data.status || 'PENDING';
      this.products = data.products || [];
      this.totalAmount = data.totalAmount || 0;
    }
  }
}

export class OrderDTO {
  @IsString()
  id!: string;

  @IsString()
  customerId!: string;

  @IsString()
  customerEmail!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProduct)
  products!: OrderProduct[];

  @IsNumber()
  totalAmount!: number;

  @IsString()
  status!: string;

  @IsDate()
  @Type(() => Date)
  createdAt!: Date;

  constructor(data?: Partial<OrderDTO>) {
    if (data) {
      this.id = data.id || '';
      this.customerId = data.customerId || '';
      this.customerEmail = data.customerEmail || '';
      this.products = data.products || [];
      this.totalAmount = data.totalAmount || 0;
      this.status = data.status || 'PENDING';
      this.createdAt = data.createdAt || new Date();
    }
  }
}

export class OrderUpdateDTO {
  @IsString()
  status?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProduct)
  products?: OrderProduct[];

  @IsNumber()
  totalAmount?: number;

  constructor(data?: Partial<OrderUpdateDTO>) {
    if (data) {
      this.status = data.status;
      this.products = data.products;
      this.totalAmount = data.totalAmount;
    }
  }
}

// === ARCHIVO: app/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "test"
  ]
}

// === ARCHIVO: app/src/application/ports/OrderRepository.ts ===
import { Order } from '../../domain/models/Order';

export interface OrderRepository {
  createOrder(order: Order): Promise<Order>;
  getOrderById(id: string): Promise<Order | null>;
  updateOrder(id: string, order: Partial<Order>): Promise<Order | null>;
  deleteOrder(id: string): Promise<boolean>;
}

// === ARCHIVO: app/src/application/services/OrderService.ts ===
import { Order, OrderDTO, OrderUpdateDTO, OrderProduct } from '../../domain/models/Order';
import { OrderRepository } from '../ports/OrderRepository';

export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(dto: OrderDTO): Promise<OrderDTO> {
    const order: Order = {
      id: this.generateOrderId(),
      customerId: dto.customerId,
      products: dto.products.map(p => ({
        productId: p.productId,
        quantity: p.quantity,
        unitPrice: p.unitPrice
      })),
      totalAmount: dto.totalAmount,
      status: dto.status || 'PENDING',
      createdAt: dto.createdAt || new Date()
    };
    
    const created = await this.orderRepository.createOrder(order);
    return this.mapOrderToDto(created);
  }

  async getOrderById(id: string): Promise<OrderDTO | null> {
    if (!id || id.trim().length === 0) {
      throw new Error('El ID de la orden es requerido');
    }
    
    const order = await this.orderRepository.getOrderById(id);
    if (!order) {
      return null;
    }
    
    return this.mapOrderToDto(order);
  }

  async updateOrder(id: string, dto: OrderUpdateDTO): Promise<OrderDTO | null> {
    if (!id || id.trim().length === 0) {
      throw new Error('El ID de la orden es requerido');
    }
    
    const existingOrder = await this.orderRepository.getOrderById(id);
    if (!existingOrder) {
      return null;
    }
    
    const updateData: Partial<Order> = {};
    
    if (dto.status !== undefined) {
      updateData.status = dto.status;
    }
    
    if (dto.products !== undefined) {
      updateData.products = dto.products.map(p => ({
        productId: p.productId,
        quantity: p.quantity,
        unitPrice: p.unitPrice
      }));
    }
    
    const updated = await this.orderRepository.updateOrder(id, updateData);
    if (!updated) {
      return null;
    }
    
    return this.mapOrderToDto(updated);
  }

  async deleteOrder(id: string): Promise<boolean> {
    if (!id || id.trim().length === 0) {
      throw new Error('El ID de la orden es requerido');
    }
    
    const existingOrder = await this.orderRepository.getOrderById(id);
    if (!existingOrder) {
      return false;
    }
    
    return await this.orderRepository.deleteOrder(id);
  }

  private mapOrderToDto(order: Order): OrderDTO {
    return new OrderDTO({
      id: order.id,
      customerId: order.customerId,
      products: order.products.map(p => ({
        productId: p.productId,
        quantity: p.quantity,
        unitPrice: p.unitPrice
      })),
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt
    });
  }

  private generateOrderId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 10);
    return `ORD-${timestamp}-${randomPart}`.toUpperCase();
  }
}

// === ARCHIVO: app/src/infrastructure/controllers/OrderController.ts ===
import { Request, Response, Router } from 'express';
import { OrderDTO, OrderUpdateDTO } from '../../domain/models/Order';
import { OrderService } from '../../application/services/OrderService';
import { validationMiddleware } from '../middlewares/validation';

const router = Router();

export class OrderController {
  private orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
    this.registerRoutes();
  }

  private registerRoutes(): void {
    router.post('/', validationMiddleware({ dtoClass: OrderDTO as new () => unknown }), this.createOrder.bind(this));
    router.get('/:id', this.getOrderById.bind(this));
    router.put('/:id', validationMiddleware({ dtoClass: OrderUpdateDTO as new () => unknown }), this.updateOrder.bind(this));
    router.delete('/:id', this.deleteOrder.bind(this));
  }

  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderDTO = req.body as OrderDTO;
      const createdOrder = await this.orderService.createOrder(orderDTO);
      res.status(201).json(createdOrder);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const order = await this.orderService.getOrderById(id);
      if (!order) {
        res.status(404).json({ message: 'Orden no encontrada', id });
        return;
      }
      res.status(200).json(order);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const orderUpdateDTO = req.body as OrderUpdateDTO;
      const updatedOrder = await this.orderService.updateOrder(id, orderUpdateDTO);
      if (!updatedOrder) {
        res.status(404).json({ message: 'Orden no encontrada para actualizar', id });
        return;
      }
      res.status(200).json(updatedOrder);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const deleted = await this.orderService.deleteOrder(id);
      if (!deleted) {
        res.status(404).json({ message: 'Orden no encontrada para eliminar', id });
        return;
      }
      res.status(204).send();
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: unknown): void {
    console.error('Error en OrderController:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    } else {
      res.status(500).json({ message: 'Error interno del servidor desconocido' });
    }
  }

  getRouter(): Router {
    return router;
  }
}

// === ARCHIVO: app/src/infrastructure/config/dynamoConfig.ts ===
import AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

export interface DynamoDBConfig {
  region: string;
  endpoint: string | undefined;
  accessKeyId: string | undefined;
  secretAccessKey: string | undefined;
}

export const getDynamoDBConfig = (): DynamoDBConfig => {
  const region = process.env.AWS_REGION || 'us-east-1';
  const endpoint = process.env.DYNAMODB_ENDPOINT;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  return {
    region,
    endpoint,
    accessKeyId,
    secretAccessKey
  };
};

export const createDynamoDBClient = (): AWS.DynamoDB => {
  const config = getDynamoDBConfig();

  const constructorOptions: AWS.DynamoDB.ClientConfiguration = {
    region: config.region
  };

  if (config.endpoint) {
    constructorOptions.endpoint = config.endpoint;
  }

  if (config.accessKeyId && config.secretAccessKey) {
    constructorOptions.credentials = {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey
    };
  }

  return new AWS.DynamoDB(constructorOptions);
};

export const createDynamoDBDocumentClient = (): AWS.DynamoDB.DocumentClient => {
  const config = getDynamoDBConfig();

  const constructorOptions: AWS.DynamoDB.DocumentClient.Configuration = {
    region: config.region
  };

  if (config.endpoint) {
    constructorOptions.endpoint = config.endpoint;
  }

  if (config.accessKeyId && config.secretAccessKey) {
    constructorOptions.credentials = {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey
    };
  }

  return new AWS.DynamoDB.DocumentClient(constructorOptions);
};

export const getTableName = (): string => {
  return process.env.DYNAMODB_TABLE_NAME || 'orders';
};

export const initializeDynamoDBTable = async (): Promise<void> => {
  const dynamodb = createDynamoDBClient();
  const tableName = getTableName();

  try {
    await dynamodb.describeTable({ TableName: tableName }).promise();
    console.log(`Tabla ${tableName} ya existe`);
  } catch (error: unknown) {
    const awsError = error as AWS.AWSError;
    if (awsError.code === 'ResourceNotFoundException') {
      console.log(`Creando tabla ${tableName}...`);
      await dynamodb.createTable({
        TableName: tableName,
        KeySchema: [
          { AttributeName: 'id', KeyType: 'HASH' }
        ],
        AttributeDefinitions: [
          { AttributeName: 'id', AttributeType: 'S' }
        ],
        BillingMode: 'PAY_PER_REQUEST'
      }).promise();
      console.log(`Tabla ${tableName} creada exitosamente`);
    } else {
      console.error('Error al verificar/crear tabla DynamoDB:', error);
      throw error;
    }
  }
};

// === ARCHIVO: app/src/infrastructure/middlewares/errorHandler.ts ===
import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Recurso no encontrado') {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Error de validación') {
    super(message, 400);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Conflicto de datos') {
    super(message, 409);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Error interno del servidor') {
    super(message, 500);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error capturado por middleware de errores:');
  console.error('Mensaje:', err.message);
  console.error('Stack:', err.stack);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
    return;
  }

  if (err.name === 'ValidationError') {
    res.status(400).json({
      message: 'Error de validación de datos',
      error: err.message,
      statusCode: 400
    });
    return;
  }

  if (err.name === 'CastError') {
    res.status(400).json({
      message: 'ID de recurso inválido',
      statusCode: 400
    });
    return;
  }

  const internalError = new InternalServerError('Error interno del servidor');
  res.status(internalError.statusCode).json({
    message: internalError.message,
    statusCode: internalError.statusCode,
    ...(process.env.NODE_ENV !== 'production' && { 
      originalError: err.message,
      stack: err.stack 
    })
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  console.warn(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    message: `Ruta ${req.originalUrl} no encontrada`,
    statusCode: 404,
    method: req.method,
    path: req.originalUrl
  });
};

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// === ARCHIVO: app/src/infrastructure/middlewares/validation.ts ===
import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export interface ValidationMiddlewareOptions {
  dtoClass: new () => unknown;
  validatorOptions?: ValidatorOptions;
  validateBody?: boolean;
  validatedPropertyName?: string;
}

export const validationMiddleware = (options: ValidationMiddlewareOptions) => {
  const {
    dtoClass,
    validatorOptions = { whitelist: true, forbidNonWhitelisted: true },
    validateBody = true,
    validatedPropertyName = 'validatedData'
  } = options;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataToValidate = validateBody ? req.body : req.params;
      
      const dtoInstance = plainToInstance(dtoClass(), dataToValidate as object, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true
      });

      const validationErrors: ValidationError[] = await validate(
        dtoInstance as object,
        validatorOptions
      );

      if (validationErrors.length > 0) {
        const errors = formatValidationErrors(validationErrors);
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors
        });
        return;
      }

      (req as unknown as Record<string, unknown>)[validatedPropertyName] = dtoInstance;
      next();
    } catch (error) {
      next(error);
    }
  };
};

function formatValidationErrors(validationErrors: ValidationError[]): Array<{
  field: string;
  message: string;
  constraints?: Record<string, string>;
}> {
  return validationErrors.map((error) => ({
    field: error.property,
    message: Object.values(error.constraints || {}).join(', '),
    constraints: error.constraints
  }));
}

export const validateBody = (
  dtoClass: new () => unknown,
  customOptions?: Partial<Omit<ValidationMiddlewareOptions, 'dtoClass' | 'validateBody'>>
) => {
  return validationMiddleware({
    dtoClass,
    validateBody: true,
    ...customOptions
  });
};

export const validateParams = (
  dtoClass: new () => unknown,
  customOptions?: Partial<Omit<ValidationMiddlewareOptions, 'dtoClass' | 'validateBody'>>
) => {
  return validationMiddleware({
    dtoClass,
    validateBody: false,
    ...customOptions
  });
};

// === ARCHIVO: app/src/types/express.d.ts ===
import 'express';

/**
 * Extensiones de tipos para Express Request.
 * 
 * Este archivo declara propiedades adicionales que se agregarán
 * al objeto Request de Express, permitiendo un acceso tipado
 * a datos validados y otros valores injectados por middlewares.
 */

declare global {
  namespace Express {
    /**
     * Extensión de la interfaz Request de Express.
     * Agrega propiedades custom para datos validados y otros
     * valores injectados por middlewares de la aplicación.
     */
    interface Request {
      /**
       * Datos validados por el middleware de validación.
       * Contiene el DTO transformado y validado.
       * Se asigna mediante el middleware de validación.
       */
      validatedData?: Record<string, unknown>;

      /**
       * Usuario autenticado extraído del middleware de autenticación.
       * Contiene la información del usuario que realizó la petición.
       * Undefined si no hay autenticación o es anónima.
       */
      user?: {
        id: string;
        email: string;
        role: string;
      };

      /**
       * Correlation ID para trazabilidad de peticiones.
       * Generado por el middleware de logging o por el cliente.
       * Se propaga a través de todos los servicios y logs.
       */
      correlationId?: string;

      /**
       * Timestamp de cuando inició la petición.
       * Utilizado para calcular la duración total de la respuesta.
       */
      requestStartTime?: number;

      /**
       * Metadata adicional de la petición.
       * Puede incluir información como IP del cliente,
       * User-Agent, información de geolocalización, etc.
       */
      requestMetadata?: {
        ip: string;
        userAgent: string;
        method: string;
        path: string;
        query: Record<string, string>;
      };
    }

    /**
     * Extensión de la interfaz Response de Express.
     * Agrega métodos helper para respuestas estandarizadas.
     */
    interface Response {
      /**
       * Envía una respuesta exitosa con formato estándar.
       * 
       * @param data - Datos a incluir en la respuesta
       * @param statusCode - Código de estado HTTP (por defecto 200)
       */
      success<T>(data: T, statusCode?: number): this;

      /**
       * Envía una respuesta de error con formato estándar.
       * 
       * @param message - Mensaje descriptivo del error
       * @param statusCode - Código de estado HTTP (por defecto 500)
       * @param errors - Detalles adicionales del error
       */
      error(message: string, statusCode?: number, errors?: unknown[]): this;
    }

    /**
     * Extensión de la interfaz Application de Express.
     * Declara propiedades específicas de la aplicación.
     */
    interface Application {
      /**
       * Indica si la aplicación está en modo de pruebas.
       * Configurado mediante la variable de entorno NODE_ENV.
       */
      isTest?: boolean;
    }
  }
}

/**
 * Tipo para el handler de errores de Express.
 * Extiende el tipo nativo para incluir el correlationId.
 */
export interface ErrorRequestHandler {
  (
    err: Error & { statusCode?: number; correlationId?: string },
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): void;
}

/**
 * Tipo para funciones middleware de Express con soporte
 * para datos validados.
 */
export type ValidatedRequestHandler = (
  req: Express.Request & { validatedData: Record<string, unknown> },
  res: Express.Response,
  next: Express.NextFunction
) => void;

/**
 * Tipo para el middleware de Express que inyecta el usuario.
 */
export type AuthenticatedRequestHandler = (
  req: Express.Request & { user: Express.Request['user'] },
  res: Express.Response,
  next: Express.NextFunction
) => void;

// === ARCHIVO: app/src/types/dto.ts ===
import { IsString, IsNumber, IsArray, IsOptional, IsEnum, IsDateString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export class OrderProductDTO {
  @IsString()
  productId!: string;

  @IsString()
  name!: string;

  @IsNumber()
  @Min(0.01)
  unitPrice!: number;

  @IsNumber()
  @Min(1)
  quantity!: number;

  @IsNumber()
  @Min(0)
  discount!: number;

  constructor(partial?: Partial<OrderProductDTO>) {
    if (partial) {
      Object.assign(this, partial);
      this.discount = this.discount ?? 0;
    }
  }
}

export class OrderDTO {
  @IsString()
  id!: string;

  @IsString()
  customerId!: string;

  @IsString()
  customerEmail!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDTO)
  products!: OrderProductDTO[];

  @IsNumber()
  @Min(0)
  subtotal!: number;

  @IsNumber()
  @Min(0)
  tax!: number;

  @IsNumber()
  @Min(0)
  shippingCost!: number;

  @IsNumber()
  @Min(0)
  totalAmount!: number;

  @IsEnum(OrderStatus)
  status!: OrderStatus;

  @IsDateString()
  createdAt!: string;

  @IsOptional()
  @IsDateString()
  updatedAt?: string;

  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  constructor(partial?: Partial<OrderDTO>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}

export class OrderUpdateDTO {
  @IsOptional()
  @IsString()
  customerEmail?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDTO)
  products?: OrderProductDTO[];

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  constructor(partial?: Partial<OrderUpdateDTO>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}

export class CreateOrderDTO {
  @IsString()
  customerId!: string;

  @IsString()
  @IsOptional()
  customerEmail?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDTO)
  products!: OrderProductDTO[];

  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  constructor(partial?: Partial<CreateOrderDTO>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}

export class OrderIdParamDTO {
  @IsString()
  id!: string;

  constructor(partial?: Partial<OrderIdParamDTO>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}

export class ErrorResponseDTO {
  @IsString()
  success!: string;

  @IsString()
  message!: string;

  @IsOptional()
  errors?: Array<{
    field: string;
    message: string;
  }>;

  @IsOptional()
  correlationId?: string;

  constructor(partial?: Partial<ErrorResponseDTO>) {
    if (partial) {
      Object.assign(this, partial);
      this.success = this.success || 'false';
    }
  }
}

export class ApiResponseDTO<T> {
  @IsString()
  success!: string;

  data?: T;

  @IsOptional()
  message?: string;

  @IsOptional()
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };

  constructor(partial?: Partial<ApiResponseDTO<T>>) {
    if (partial) {
      Object.assign(this, partial);
      this.success = this.success || 'true';
    }
  }
}

// === ARCHIVO: app/test/order.test.ts ===
import { OrderDTO, OrderUpdateDTO } from '../src/domain/models/Order';
import { OrderService } from '../src/application/services/OrderService';

describe('OrderService - Pruebas Unitarias CRUD', () => {
  let mockOrderService: jest.Mocked<OrderService>;
  let orderService: OrderService;

  const mockOrderDTO: OrderDTO = {
    id: 'order-123',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    status: 'PENDING',
    products: [
      { productId: 'prod-001', name: 'Laptop', price: 1200, quantity: 1 },
      { productId: 'prod-002', name: 'Mouse', price: 25, quantity: 2 }
    ],
    totalAmount: 1250
  };

  const mockOrderUpdateDTO: OrderUpdateDTO = {
    status: 'COMPLETED',
    products: [
      { productId: 'prod-001', name: 'Laptop', price: 1200, quantity: 1 }
    ],
    totalAmount: 1200
  };

  beforeEach(() => {
    mockOrderService = {
      createOrder: jest.fn(),
      getOrderById: jest.fn(),
      updateOrder: jest.fn(),
      deleteOrder: jest.fn()
    } as jest.Mocked<OrderService>;
    orderService = new OrderService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('debería crear una orden exitosamente cuando los datos son válidos', async () => {
      mockOrderService.createOrder.mockResolvedValue(mockOrderDTO);
      
      const result = await mockOrderService.createOrder(mockOrderDTO);
      
      expect(mockOrderService.createOrder).toHaveBeenCalledTimes(1);
      expect(mockOrderService.createOrder).toHaveBeenCalledWith(mockOrderDTO);
      expect(result).toEqual(mockOrderDTO);
      expect(result.id).toBe('order-123');
      expect(result.status).toBe('PENDING');
    });

    it('debería lanzar error cuando los datos de la orden son inválidos', async () => {
      const invalidOrder = {
        id: '',
        createdAt: new Date(),
        status: 'INVALID_STATUS',
        products: [],
        totalAmount: -100
      };
      
      mockOrderService.createOrder.mockRejectedValue(
        new Error('Los datos de la orden son inválidos')
      );
      
      await expect(mockOrderService.createOrder(invalidOrder)).rejects.toThrow(
        'Los datos de la orden son inválidos'
      );
    });

    it('debería calcular automáticamente el totalAmount cuando no se proporciona', async () => {
      const orderWithoutTotal: OrderDTO = {
        id: 'order-456',
        createdAt: new Date(),
        status: 'PENDING',
        products: [
          { productId: 'prod-001', name: 'Keyboard', price: 80, quantity: 1 },
          { productId: 'prod-002', name: 'Monitor', price: 300, quantity: 1 }
        ]
      };
      
      const expectedTotal = 380;
      const orderWithCalculatedTotal = { ...orderWithoutTotal, totalAmount: expectedTotal };
      
      mockOrderService.createOrder.mockResolvedValue(orderWithCalculatedTotal);
      
      const result = await mockOrderService.createOrder(orderWithoutTotal);
      
      expect(result.totalAmount).toBe(expectedTotal);
    });
  });

  describe('getOrderById', () => {
    it('debería obtener una orden por su ID exitosamente', async () => {
      mockOrderService.getOrderById.mockResolvedValue(mockOrderDTO);
      
      const result = await mockOrderService.getOrderById('order-123');
      
      expect(mockOrderService.getOrderById).toHaveBeenCalledTimes(1);
      expect(mockOrderService.getOrderById).toHaveBeenCalledWith('order-123');
      expect(result).toEqual(mockOrderDTO);
      expect(result?.id).toBe('order-123');
    });

    it('debería retornar null cuando la orden no existe', async () => {
      mockOrderService.getOrderById.mockResolvedValue(null);
      
      const result = await mockOrderService.getOrderById('non-existent-id');
      
      expect(result).toBeNull();
      expect(mockOrderService.getOrderById).toHaveBeenCalledWith('non-existent-id');
    });

    it('debería lanzar error cuando el ID proporcionado es inválido', async () => {
      mockOrderService.getOrderById.mockRejectedValue(
        new Error('ID de orden inválido')
      );
      
      await expect(mockOrderService.getOrderById('')).rejects.toThrow('ID de orden inválido');
    });
  });

  describe('updateOrder', () => {
    it('debería actualizar una orden exitosamente', async () => {
      const updatedOrder: OrderDTO = {
        ...mockOrderDTO,
        status: 'COMPLETED',
        products: mockOrderUpdateDTO.products,
        totalAmount: mockOrderUpdateDTO.totalAmount
      };
      
      mockOrderService.updateOrder.mockResolvedValue(updatedOrder);
      
      const result = await mockOrderService.updateOrder('order-123', mockOrderUpdateDTO);
      
      expect(mockOrderService.updateOrder).toHaveBeenCalledTimes(1);
      expect(mockOrderService.updateOrder).toHaveBeenCalledWith('order-123', mockOrderUpdateDTO);
      expect(result.status).toBe('COMPLETED');
      expect(result.totalAmount).toBe(1200);
    });

    it('debería lanzar error cuando se intenta actualizar una orden inexistente', async () => {
      mockOrderService.updateOrder.mockRejectedValue(
        new Error('Orden no encontrada para actualizar')
      );
      
      await expect(
        mockOrderService.updateOrder('non-existent-id', mockOrderUpdateDTO)
      ).rejects.toThrow('Orden no encontrada para actualizar');
    });

    it('debería mantener los campos no actualizados cuando se actualiza parcialmente', async () => {
      const partialUpdate: OrderUpdateDTO = {
        status: 'CANCELLED'
      };
      
      const orderAfterPartialUpdate: OrderDTO = {
        ...mockOrderDTO,
        status: 'CANCELLED'
      };
      
      mockOrderService.updateOrder.mockResolvedValue(orderAfterPartialUpdate);
      
      const result = await mockOrderService.updateOrder('order-123', partialUpdate);
      
      expect(result.id).toBe(mockOrderDTO.id);
      expect(result.createdAt).toEqual(mockOrderDTO.createdAt);
      expect(result.products).toEqual(mockOrderDTO.products);
      expect(result.status).toBe('CANCELLED');
    });
  });

  describe('deleteOrder', () => {
    it('debería eliminar una orden exitosamente', async () => {
      mockOrderService.deleteOrder.mockResolvedValue(undefined);
      
      await mockOrderService.deleteOrder('order-123');
      
      expect(mockOrderService.deleteOrder).toHaveBeenCalledTimes(1);
      expect(mockOrderService.deleteOrder).toHaveBeenCalledWith('order-123');
    });

    it('debería lanzar error cuando se intenta eliminar una orden inexistente', async () => {
      mockOrderService.deleteOrder.mockRejectedValue(
        new Error('Orden no encontrada para eliminar')
      );
      
      await expect(mockOrderService.deleteOrder('non-existent-id')).rejects.toThrow(
        'Orden no encontrada para eliminar'
      );
    });

    it('debería lanzar error cuando el ID es vacío', async () => {
      mockOrderService.deleteOrder.mockRejectedValue(
        new Error('ID de orden requerido para eliminar')
      );
      
      await expect(mockOrderService.deleteOrder('')).rejects.toThrow(
        'ID de orden requerido para eliminar'
      );
    });
  });

  describe('Validaciones de estado de orden', () => {
    const validStatuses = ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'];
    
    it('debería aceptar estados válidos de orden', () => {
      validStatuses.forEach(status => {
        const order: OrderDTO = {
          ...mockOrderDTO,
          status: status as any
        };
        expect(validStatuses).toContain(order.status);
      });
    });

    it('debería rechazar estados inválidos de orden', () => {
      const invalidStatuses = ['INVALID', 'pending', 'COMPLETE', 'CANCELED'];
      
      invalidStatuses.forEach(status => {
        expect(validStatuses).not.toContain(status);
      });
    });
  });

  describe('Validaciones de productos', () => {
    it('debería requerir al menos un producto en la orden', async () => {
      const orderWithoutProducts: OrderDTO = {
        id: 'order-empty',
        createdAt: new Date(),
        status: 'PENDING',
        products: [],
        totalAmount: 0
      };
      
      mockOrderService.createOrder.mockRejectedValue(
        new Error('La orden debe contener al menos un producto')
      );
      
      await expect(mockOrderService.createOrder(orderWithoutProducts)).rejects.toThrow(
        'La orden debe contener al menos un producto'
      );
    });

    it('debería validar que la cantidad de productos sea mayor a cero', async () => {
      const orderWithInvalidQuantity: OrderDTO = {
        ...mockOrderDTO,
        products: [
          { productId: 'prod-001', name: 'Test', price: 100, quantity: 0 }
        ]
      };
      
      mockOrderService.createOrder.mockRejectedValue(
        new Error('La cantidad de cada producto debe ser mayor a cero')
      );
      
      await expect(mockOrderService.createOrder(orderWithInvalidQuantity)).rejects.toThrow(
        'La cantidad de cada producto debe ser mayor a cero'
      );
    });

    it('debería validar que el precio de los productos sea positivo', async () => {
      const orderWithNegativePrice: OrderDTO = {
        ...mockOrderDTO,
        products: [
          { productId: 'prod-001', name: 'Test', price: -50, quantity: 1 }
        ]
      };
      
      mockOrderService.createOrder.mockRejectedValue(
        new Error('El precio de los productos debe ser positivo')
      );
      
      await expect(mockOrderService.createOrder(orderWithNegativePrice)).rejects.toThrow(
        'El precio de los productos debe ser positivo'
      );
    });
  });

  describe('Cálculo de totales', () => {
    it('debería calcular correctamente el totalAmount basado en productos', () => {
      const products = [
        { productId: 'prod-001', name: 'Product A', price: 100, quantity: 2 },
        { productId: 'prod-002', name: 'Product B', price: 50, quantity: 3 },
        { productId: 'prod-003', name: 'Product C', price: 25, quantity: 4 }
      ];
      
      const expectedTotal = (100 * 2) + (50 * 3) + (25 * 4);
      
      expect(expectedTotal).toBe(200 + 150 + 100);
      expect(expectedTotal).toBe(450);
    });

    it('debería detectar discrepancias entre el total proporcionado y el calculado', () => {
      const products = [
        { productId: 'prod-001', name: 'Product A', price: 100, quantity: 1 }
      ];
      
      const providedTotal = 50;
      const calculatedTotal = 100;
      
      expect(providedTotal).not.toBe(calculatedTotal);
    });
  });
});

// === ARCHIVO: app/src/infrastructure/config/envValidator.ts ===
interface EnvVarConfig {
  name: string;
  required: boolean;
  defaultValue?: string;
}

const requiredEnvVars: EnvVarConfig[] = [
  { name: 'AWS_REGION', required: false, defaultValue: 'us-east-1' },
  { name: 'PORT', required: false, defaultValue: '3000' },
  { name: 'DYNAMODB_TABLE_NAME', required: false, defaultValue: 'orders' },
  { name: 'AWS_ACCESS_KEY_ID', required: false },
  { name: 'AWS_SECRET_ACCESS_KEY', required: false },
  { name: 'DYNAMODB_ENDPOINT', required: false }
];

export function validateEnvVars(): void {
  const missingVars: string[] = [];

  for (const envVar of requiredEnvVars) {
    const value = process.env[envVar.name];

    if (envVar.required && (!value || value.trim() === '')) {
      missingVars.push(envVar.name);
    }

    if (!value || value.trim() === '') {
      if (envVar.defaultValue) {
        process.env[envVar.name] = envVar.defaultValue;
        console.log(`Variable ${envVar.name} no definida, usando valor por defecto: ${envVar.defaultValue}`);
      }
    }
  }

  if (missingVars.length > 0) {
    console.warn(`Variables de entorno requeridas no definidas: ${missingVars.join(', ')}`);
  }

  console.log('Validación de variables de entorno completada');
}

export function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name];
  if (!value || value.trim() === '') {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`Variable de entorno ${name} no definida y no hay valor por defecto`);
  }
  return value;
}

export function getOptionalEnvVar(name: string): string | undefined {
  const value = process.env[name];
  if (!value || value.trim() === '') {
    return undefined;
  }
  return value;
}

// === ARCHIVO: infra/providers.tf ===
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

// === ARCHIVO: infra/variables.tf ===
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

// === ARCHIVO: infra/versions.tf ===
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

// === ARCHIVO: infra/README.md ===
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

// === ARCHIVO: infra/main.tf ===
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

// === ARCHIVO: infra/outputs.tf ===
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

// === ARCHIVO: infra/environments/dev/terraform.tfvars ===
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

// === ARCHIVO: infra/modules/dynamodb/main.tf ===
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

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
