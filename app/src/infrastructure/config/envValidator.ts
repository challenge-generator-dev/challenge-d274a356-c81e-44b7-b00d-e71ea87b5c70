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