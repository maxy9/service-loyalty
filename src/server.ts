import fastify, { type FastifyInstance } from "fastify"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUI from "@fastify/swagger-ui"

import cfg from './config.js'
import { tsRestApiDocument } from './docs/openApi.js'
import gettingStartedRoutes from './routes/getting-started.js'
import basicExample from './routes/basic-example.js'
import tsRest from "./routes/ts-rest.js"

const app: FastifyInstance = fastify({
  logger: cfg.logging,
})

/*
Fastify offers a solid encapsulation model, to help you build your application as single and independent services.

To guarantee consistent and predictable behavior of your application,
we highly recommend to always load your code as shown below:

└── plugins (from the Fastify ecosystem)
└── your plugins (your custom plugins)
└── decorators
└── hooks
└── your services

In this way, you will always have access to all of the properties declared in the current scope.
If you want to register a plugin only for a subset of routes, you just have to replicate the above structure.

└── plugins (from the Fastify ecosystem)
└── your plugins (your custom plugins)
└── decorators
└── hooks
└── your services
    │
    └──  service A
    │     └── plugins (from the Fastify ecosystem)
    │     └── your plugins (your custom plugins)
    │     └── decorators
    │     └── hooks
    │     └── your services
    │
    └──  service B
          ...
*/

// fastify.decorate("db", new DbConnection())
// Routes
app.register(gettingStartedRoutes, { prefix: "getting-started" })
app.register(basicExample, { prefix: 'basic-example' })
app.register(tsRest)

// API docs
app.register(fastifySwagger) // required as a dep for fastifySwaggerUI
app.register(fastifySwaggerUI, {
  // override API doc with the @ts-rest/open-api generated doc
  transformSpecification: () => tsRestApiDocument,
})

try {
  await app.listen({
    port: cfg.port,
    host: '0.0.0.0' // Required for docker; listens on all available IPv4 interfaces
  })
  app.log.debug(
    {
      configValues: {
        logLevel: cfg.logging.level,
        port: cfg.port,
        nodeEnv: cfg.nodeEnv,
      },
    },
    "Server started with config values"
  )
} catch (err) {
  app.log.error(err)
  process.exit(1)
}