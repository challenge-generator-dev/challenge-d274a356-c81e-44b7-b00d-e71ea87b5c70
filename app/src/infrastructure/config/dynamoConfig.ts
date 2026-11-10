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