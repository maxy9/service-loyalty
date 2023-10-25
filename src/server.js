"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = require("fastify");
var config_js_1 = require("./config.js");
var getting_started_js_1 = require("./routes/getting-started.js");
var basic_example_js_1 = require("./routes/basic-example.js");
var ts_rest_js_1 = require("./routes/ts-rest.js");
var fastify = (0, fastify_1.default)({
    logger: config_js_1.default.logging,
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
fastify.register(getting_started_js_1.default, { prefix: "getting-started" });
fastify.register(basic_example_js_1.default, { prefix: 'basic-example' });
fastify.register(ts_rest_js_1.default, { prefix: "ts-rest" });
try {
    await fastify.listen({
        port: config_js_1.default.port,
        host: '0.0.0.0' // Required for docker; listens on all available IPv4 interfaces
    });
    fastify.log.debug({
        configValues: {
            logLevel: config_js_1.default.logging.level,
            port: config_js_1.default.port,
            nodeEnv: config_js_1.default.nodeEnv,
        },
    }, "Server started with config values");
}
catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
