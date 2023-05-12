import React from "react"
import type { LoaderArgs, TypedResponse } from "@remix-run/cloudflare"
import { json } from "@remix-run/cloudflare"
import { marked } from "marked"
import grayMatter from "gray-matter"
import { relativeFetch } from "../lib/remix"
import type { Post } from "./blog._index"
import { useLoaderData } from "@remix-run/react"
// @ts-ignore types not posted
import { gfmHeadingId } from "marked-gfm-heading-id"

type MarkedOptions = marked.MarkedOptions

interface Parsed {
  readonly post: Post
  readonly html: string
}

marked.use(gfmHeadingId())

const opts: MarkedOptions = { mangle: false }

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

export default function Article() {
  const { html, post } = useLoaderData<typeof loader>()

  return (
    <main className="mx-auto max-w-prose">
      <h1>{post.title}</h1>

      <article
        className="prose prose-slate lg:prose-lg"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  )
}
