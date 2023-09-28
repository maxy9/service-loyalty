import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async function basicExample (fastify: FastifyInstance) {
  const opts = {
    schema: {
      querystring: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
        // required: ["name"],
      },
      response: {
        200: {
          type: "object",
          properties: {
            hello: { type: "string" },
          },
        },
      },
    },
  };
  fastify.get(
    "/simple",
    opts,
    async function handler(req: FastifyRequest, _res: FastifyReply) {
      return { hello: "simple, basic world", body: req.body };
    }
  );

  fastify.route({
    method: "POST",
    url: "/verbose",
    schema: {
      body: {
        simple: { type: "string" },
      },
      params: undefined,
      querystring: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            hello: { type: "string" },
            body: true,
          },
        },
      },
    },
    preHandler: async (_req: FastifyRequest, _res: FastifyReply) => {
      // auth
    },
    handler: async (req: FastifyRequest, _res: FastifyReply) => {
      return { hello: "verbose, basic world", body: req.body };
    },
  });
}