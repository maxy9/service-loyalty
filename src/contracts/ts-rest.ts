import { initContract } from "@ts-rest/core"
import { z } from "zod"

// Schemas
const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
})
const NewPostSchema = PostSchema.omit({
  id: true,
})

// Types
export type Post = z.infer<typeof PostSchema>
export type NewPost = z.infer<typeof NewPostSchema>

// Vars
export const routePrefix = "/ts-rest"

// Contract
const c = initContract()
export const tsRestApi = c.router(
  {
    createPost: {
      method: "POST",
      path: "/posts",
      responses: {
        201: PostSchema,
      },
      body: NewPostSchema,
      summary: "Create a post",
    },
    getPost: {
      method: "GET",
      path: `/posts/:id`,
      responses: {
        200: PostSchema.nullable(),
      },
      summary: "Get a post by id",
    },
  },
  {
    pathPrefix: routePrefix,
  }
)