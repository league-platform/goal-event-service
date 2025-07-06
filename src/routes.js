import Goal from './model.js';

export default async function goalRoutes(fastify) {
  fastify.post('/goals', {
    schema: {
      tags: ['Goals'],
      body: {
        type: 'object',
        required: ['matchId', 'player', 'minute', 'team'],
        properties: {
          matchId: { type: 'string' },
          player: { type: 'string' },
          minute: { type: 'integer' },
          team: { type: 'string' }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            goal: { type: 'object' }
          }
        }
      }
    }
  }, async (req, reply) => {
    const goal = new Goal(req.body);
    await goal.save();
    fastify.log.info(`EVENT: goal.scored -> ${goal.player} at ${goal.minute}'`);
    reply.code(201).send({ message: 'Goal registered', goal });
  });

  fastify.get('/goals', async (req, reply) => {
    const goals = await Goal.find();
    return goals;
  });
}
