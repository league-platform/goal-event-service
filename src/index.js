import Fastify from 'fastify';
import mongoose from 'mongoose';
import goalRoutes from './routes.js';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

const fastify = Fastify({ logger: true });

await mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/goals_db');

fastify.register(swagger, {
  openapi: {
    info: {
      title: 'Goal Event Service',
      description: 'Handles goal events',
      version: '1.0.0'
    }
  }
});

fastify.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false
  }
});

fastify.register(goalRoutes);

fastify.listen({ port: 3000, host: '0.0.0.0' }, err => {
  if (err) throw err;
});
