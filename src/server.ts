import f, { type FastifyInstance } from 'fastify'
import cfg from './config.js'
import gettingStartedRoutes from './routes/getting-started.js';
import basicExample from './routes/basic-example.js';
import tsRest from "./routes/ts-rest.js";

const fastify: FastifyInstance = f({
  logger: cfg.logging,
});

/*
Fastify offers a solid encapsulation model, to help you build your application as single and independent services.
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

// fastify.decorate("db", new DbConnection());
fastify.register(gettingStartedRoutes, { prefix: "getting-started" });
fastify.register(basicExample, { prefix: 'basic-example' })
fastify.register(tsRest, { prefix: "ts-rest" });

try {
  await fastify.listen({
    port: cfg.port,
    host: '0.0.0.0' // Required for docker; listens on all available IPv4 interfaces
  });
  fastify.log.debug(
    {
      configValues: {
        logLevel: cfg.logging.level,
        port: cfg.port,
        nodeEnv: cfg.nodeEnv,
      },
    },
    "Server started with config values"
  );
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}