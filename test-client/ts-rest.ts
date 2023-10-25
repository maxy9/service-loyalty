import { initClient } from "@ts-rest/core"
import { contract } from "../src/contracts/ts-rest.js"

const client = initClient(contract, {
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
  console.log({ result: 'success', typeof: typeof body, body })
} else {
  // body is unknown
  console.log({ result: "failure", typeof: typeof body, body })
}

while (1===1) {}
