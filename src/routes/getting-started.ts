import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

export default async function gettingStarted(fastify: FastifyInstance) {
  const opts = {
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
        // required: ["name"],
      },
      response: {
        200: {
          type: "object",
          properties: {
            hello: { type: "string" },
            body: {
              name: { type: "string" },
            },
          },
        },
      },
    },
  }
  fastify.post(
    "/simple",
    opts,
    async function handler(req: FastifyRequest, _res: FastifyReply) {
      return { hello: "simple, started world", body: req.body }
    }
  )

  fastify.route({
    method: "POST",
    url: "/verbose",
    schema: {
      body: {
        simple: { type: "string" }, // why does this allow '{ "verbose": "body" }'??
      },
      querystring: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
        // required: ['name'],
      },
      response: {
        200: {
          type: "object",
          properties: {
            hello: { type: "string" },
            body: true, //{
            //   name: { type: "string" },
            // },
          },
        },
      },
    },
    preHandler: async (req: FastifyRequest, _res: FastifyReply) => {
      // auth
    },
    handler: async (req: FastifyRequest, _res: FastifyReply) => {
      return { hello: "verbose, started world", body: req.body }
    },
  })
}
