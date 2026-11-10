# Implementación de CRUD de órdenes en DynamoDB

En el dominio de una plataforma de comercio electrónico, el sistema debe permitir a los usuarios crear, leer, actualizar y eliminar órdenes de compra almacenadas en una tabla DynamoDB. Cada orden tiene atributos como ID, fecha de creación, estado, productos, precios y cantidades. El sistema debe exponer estas operaciones a través de una API REST.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | CRUD de ordenes sobre DynamoDB |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Creación de la tabla DynamoDB y operaciones CRUD básicas

**Objetivo:** Implementar las operaciones básicas de CRUD para órdenes en DynamoDB.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Define una tabla DynamoDB para almacenar órdenes con atributos relevantes.
- Implementa las operaciones CRUD (crear, leer, actualizar, eliminar) para órdenes.
- Asegúrate de que las operaciones CRUD cumplan con las reglas de negocio definidas para órdenes.

**Entregable:** Una tabla DynamoDB configurada y una API REST que expone las operaciones CRUD para órdenes.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo estructurar los atributos de la orden para optimizar las consultas.
- Piensa en cómo manejar los errores de validación y consistencia en las operaciones CRUD.

</details>

### Fase 2: Adición de validaciones y manejo de errores

**Objetivo:** Fortalecer las operaciones CRUD con validaciones y manejo de errores.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Agrega validaciones a las operaciones CRUD para asegurar la integridad de los datos.
- Implementa un manejo de errores robusto que informe al usuario sobre problemas específicos.
- Prueba las operaciones CRUD con diferentes escenarios de error para asegurar que el sistema responda adecuadamente.

**Entregable:** Operaciones CRUD fortalecidas con validaciones y manejo de errores robusto.

<details>
<summary>Pistas de conocimiento</summary>

- Considera los posibles casos de error y cómo comunicarlos al usuario.
- Piensa en cómo asegurar la consistencia de los datos a través de las validaciones.

</details>

### Fase 3: Optimización y refactorización

**Objetivo:** Optimizar y refactorizar el código para mejorar la eficiencia y mantenibilidad.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Analiza el código implementado y busca oportunidades de optimización.
- Refactoriza el código para mejorar la eficiencia y mantenibilidad.
- Prueba las operaciones CRUD para asegurar que las optimizaciones no introduzcan errores.

**Entregable:** Código refactorizado y optimizado para las operaciones CRUD de órdenes en DynamoDB.

<details>
<summary>Pistas de conocimiento</summary>

- Considera el uso de índices en DynamoDB para mejorar las consultas.
- Piensa en cómo modularizar el código para mejorar la mantenibilidad.
- Terraform: Herramienta de trabajo del candidato: usala en la fase donde se depura o se prueba la solucion (no es una dependencia del proyecto).

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y cómo se implementan en DynamoDB?
- **paraQueSirve**: ¿Para qué sirven las validaciones y el manejo de errores en las operaciones CRUD?
- **comoSeUsa**: ¿Cómo se usan las operaciones CRUD en el contexto de una plataforma de comercio electrónico?
- **erroresComunes**: ¿Cuáles son los errores comunes que pueden ocurrir durante las operaciones CRUD y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica la implementación de las operaciones CRUD en DynamoDB?

## Criterios de Evaluacion

- Implementación correcta de las operaciones CRUD en DynamoDB.
- Validaciones efectivas para asegurar la integridad de los datos.
- Manejo robusto de errores que informa al usuario sobre problemas específicos.
- Código optimizado y refactorizado para mejorar la eficiencia y mantenibilidad.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd app && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
