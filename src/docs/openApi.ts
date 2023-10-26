import { generateOpenApi } from "@ts-rest/open-api"
import { OpenAPIObject } from "openapi3-ts"

import { tsRestApi } from "../contracts/ts-rest.js"

const baseOptions = {
  setOperationId: true,
}

export const tsRestApiDocument: OpenAPIObject = generateOpenApi(
  tsRestApi,
  {
    info: {
      title: "TS Rest API",
      description: "Example API from the ts-rest documentation",
      version: "1.0.0",
    },
    server: [{
      url: "https://development.gigantic-server.com/v1",
      description: "Development server",
    }],
  },
  baseOptions
)
