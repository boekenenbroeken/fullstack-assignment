import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'F1 API',
      version: '1.0.0',
      description: 'API for fetching F1 season data and syncing results',
    },
    components: {
      schemas: {
        Champion: {
          type: 'object',
          properties: {
            season: { type: 'string' },
            driver: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                nationality: { type: 'string' },
              },
            },
            team: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
              },
            },
          },
        },
        Season: {
          type: 'object',
          properties: {
            year: { type: 'number' },
          },
        },
        Race: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            round: { type: 'number' },
            winner: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                nationality: { type: 'string' },
              },
            },
            team: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/controllers/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };
