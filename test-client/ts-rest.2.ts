import { initClient } from "@ts-rest/core"
import { tsRestApi } from "../src/contracts/ts-rest.js"

export default async () => {
  const client = initClient(tsRestApi, {
    baseUrl: "http://localhost:3000",
    baseHeaders: {},
  })

  const { body, status } = await client.createPost({
    body: {
      title: "Post Title",
      body: "Post Body",
    },
  })

  if (status === 201) {
    // body is Post
    console.log({ typeof: typeof body, body })
    console.log({ a: 2, result: 'success', typeof: typeof body, body })
  } else {
    // body is unknown
    console.log({ a: 2, result: "failure", typeof: typeof body, body })
  }
}
