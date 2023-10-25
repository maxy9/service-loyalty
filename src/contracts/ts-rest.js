"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contract = void 0;
var core_1 = require("@ts-rest/core");
var zod_1 = require("zod");
// Schemas
var PostSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    body: zod_1.z.string(),
});
var NewPostSchema = PostSchema.omit({
    id: true,
});
// Contract
var c = (0, core_1.initContract)();
exports.contract = c.router({
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
        path: "/posts/:id",
        responses: {
            200: PostSchema.nullable(),
        },
        summary: "Get a post by id",
    },
});
