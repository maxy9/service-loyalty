
# Run the Service - Prod
1. `pnpm i` - install dependencies
1. `pnpm build` - run the code builder (tsc) in watch mode
1. `pnpm start` - run the server in watch mode

# Run the Service - Dev
1. `pnpm i` - install dependencies
1. `pnpm build:dev` - run the code builder (tsc) in watch mode
1. `pnpm start:dev` - run the server in watch mode
1. `pnpm test-client:dev` - run some test client requests in watch mode

# Tooling
## Package Manager

Uses pnpm as its package manager.

## HTTP Server

Uses Fastify as its HTTP Server framework

## API Docs

The server uses the [@fastify/swagger-ui](https://github.com/fastify/fastify-swagger-ui) plugin, which will expose the documentation with the following APIs:

| URL                     | Description                                |
| ----------------------- | ------------------------------------------ |
| `'/documentation/json'` | The JSON object representing the API       |
| `'/documentation/yaml'` | The YAML object representing the API       |
| `'/documentation/'`     | The swagger UI                             |
| `'/documentation/*'`    | External files that you may use in `$ref`  |