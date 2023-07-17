import {
  json,
  type LinksFunction,
  type LoaderArgs,
  type TypedResponse,
  type V2_MetaFunction,
} from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import grayMatter from "gray-matter"
import hljsTheme from "highlight.js/styles/github-dark-dimmed.css"
import React, { type JSX } from "react"
import { hostURL, relativeFetch, type HttpPath } from "../lib/remix"
import { type Post } from "../routes/articles._index"
import { md2html } from "./marked"

export const loader = async ({
  params,
  request,
}: LoaderArgs): Promise<
  TypedResponse<{
    host: string
    post: Post
    html: string
  }>
> => {
  if (!params.slug) throw new Error("Missing slug")

  const r = await relativeFetch(request, `/blog/${params.slug}.md`)
  const { content, data } = grayMatter(await r.text())
  return json({
    html: md2html(content),
    post: data as Post,
    host: request.headers.get("host") || "localhost:3000",
  })
}

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: hljsTheme,
  },
]

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  if (!data) throw new Error("Missing data")
  const { host, post } = data
  return [
    { title: post.title },
    { name: "description", content: post.description },
    {
      name: "og:image",
      content: hostURL(host, post.image as HttpPath),
    },
  ]
}

export default function Article(): JSX.Element {
  const { html, post } = useLoaderData<typeof loader>()

  return (
    <article className="prose prose-blue mx-6 max-w-prose md:mx-auto">
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}
