import hljsTheme from "highlight.js/styles/github-dark-dimmed.css"

import { useLoaderData } from "@remix-run/react"
import React, { type JSX } from "react"
import grayMatter from "gray-matter"
import {
  json,
  type LinksFunction,
  type LoaderArgs,
  type TypedResponse,
  type V2_MetaFunction,
} from "@remix-run/cloudflare"
import { type Post } from "./blog._index"
import { hostURL, type HttpPath, relativeFetch } from "../lib/remix"
import { md2html } from "../app/marked"

interface Parsed {
  readonly host: string
  readonly post: Post
  readonly html: string
}

export const loader = async ({
  params,
  request,
}: LoaderArgs): Promise<TypedResponse<Parsed>> => {
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

export const meta: V2_MetaFunction<typeof loader> = ({
  data: { host, post },
}) => [
  { title: post.title },
  { name: "description", content: post.description },
  {
    name: "og:image",
    content: hostURL(host, post.image as HttpPath),
  },
]

export default function Article(): JSX.Element {
  const { html, post } = useLoaderData<typeof loader>()

  return (
    <article className="prose mx-auto max-w-prose">
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}
