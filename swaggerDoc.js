module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Product List API',
    version: '1.0.0',
    description: 'API for backend interview eCommerce product service'
  },
  servers: [{ url: '/api' }],
  components: {
    schemas: {
      Product: {
        type: 'object',
        required: ['sku', 'name', 'price'],
        properties: {
          id: { type: 'integer' },
          sku: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number' },
          rating: { type: 'number' },
          reviews_count: { type: 'integer' },
          availability: { type: 'boolean' },
          images: { type: 'array', items: { type: 'string' } },
          brand: { type: 'string' },
          category: { type: 'string' }
        }
      }
    }
  },
  paths: {
    '/products': {
      get: {
        summary: 'Retrieve a list of products',
        parameters: [
          { in: 'query', name: 'q', schema: { type: 'string' } },
          { in: 'query', name: 'page', schema: { type: 'integer', default: 1 } },
          { in: 'query', name: 'limit', schema: { type: 'integer', default: 10 } }
        ],
        responses: {
          '200': {
            description: 'List of products',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { type: 'array', items: { $ref: '#/components/schemas/Product' } },
                    pagination: { type: 'object' }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        summary: 'Create a newly added product',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } }
        },
        responses: { '201': { description: 'Created' }, '400': { description: 'Bad request' } }
      }
    },
    '/products/{id}': {
      get: {
        summary: 'Get a product by ID or SKU',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Product detail' }, '404': { description: 'Not found' } }
      },
      put: {
        summary: 'Update an existing product',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } }
        },
        responses: { '200': { description: 'Updated' }, '404': { description: 'Not found' } }
      },
      delete: {
        summary: 'Delete a product',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: { '204': { description: 'Deleted' }, '404': { description: 'Not found' } }
      }
    }
  }
};
