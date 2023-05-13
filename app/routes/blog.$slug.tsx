import hljsTheme from "highlight.js/styles/github-dark-dimmed.css"

import { useLoaderData } from "@remix-run/react"
import React, { type JSX } from "react"
import grayMatter from "gray-matter"
import {
  json,
  type LinksFunction,
  type LoaderArgs,
  type TypedResponse,
} from "@remix-run/cloudflare"
import { type Post } from "./blog._index"
import { relativeFetch } from "../lib/remix"
import hljs from "highlight.js"

import { marked } from "marked"
// @ts-ignore types not posted
import { gfmHeadingId } from "marked-gfm-heading-id"
// @ts-ignore types not posted
import { markedHighlight } from "marked-highlight"

interface Parsed {
  readonly post: Post
  readonly html: string
}

marked.use(gfmHeadingId())
marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight: (code: string, lang: string) => {
      const language = hljs.getLanguage(lang) ? lang : "plaintext"
      return hljs.highlight(code, { language }).value
    },
  }),
)

const opts: marked.MarkedOptions = { mangle: false }

export const loader = async ({
  params,
  request,
}: LoaderArgs): Promise<TypedResponse<Parsed>> => {
  const r = await relativeFetch(request, `/blog/${params.slug}.md`)
  const { content, data } = grayMatter(await r.text())
  return json({
    html: marked(content, opts),
    post: data as Post,
  })
}

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: hljsTheme,
  },
]

export default function Article(): JSX.Element {
  const { html, post } = useLoaderData<typeof loader>()

  return (
    <main className="mx-auto max-w-prose">
      <h1 className="mb-8 text-3xl font-bold">{post.title}</h1>

      <article
        className="prose lg:prose-lg"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  )
}
