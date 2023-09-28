import { randomUUID } from 'node:crypto'
import { initServer } from '@ts-rest/fastify'

import { contract } from '../contracts/ts-rest.js'

const s = initServer()
const posts = new Map();
posts.set('1', {
  id: '1',
  title: `Post 1`,
  body: `Some body that has been posted for id 1`,
});

const router = s.router(contract, {
  getPost: async ({ params: { id } }) => {
    const post = posts.get(id)
    console.log(`IN THE GET POSTS; ${id}: ${post}`);
    return {
      status: 200,
      body: post,
      headers: {
        "content-type": "application/json",
      },
    };
  },
  createPost: async ({ body }) => {
    console.log("IN THE CREATE POSTS");
    const id = randomUUID()
    posts.set(id, {
      id,
      title: `${body.title} for id ${id}`,
      body: `${body.body} for id ${id}`,
    })

    return {
      status: 201,
      body: posts.get(id)
    }
  }
})

export default s.plugin(router);