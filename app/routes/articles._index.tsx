import { Strings } from "../app/strings"
import { relativeFetch } from "../lib/remix"
import {
  json,
  type LoaderArgs,
  type TypedResponse,
  type V2_MetaFunction,
} from "@remix-run/cloudflare"
import { NavLink, useLoaderData } from "@remix-run/react"
import React, { type JSX } from "react"

export interface Post {
  readonly draft?: boolean
  readonly date: string
  readonly title: string
  readonly description: string
  readonly image: string
}

interface WithSlug extends Post {
  readonly slug: string
}

export const loader = async ({
  request,
}: LoaderArgs): Promise<TypedResponse<WithSlug[]>> => {
  const r = await relativeFetch(request, "/blog/meta.json")
  const unsorted = await r.json<Record<string, Post>>()
  return json(
    Object.entries(unsorted)
      .filter(([, post]) => !post.draft)
      .map(
        ([slug, post]) =>
          ({
            slug,
            ...post,
          } satisfies WithSlug),
      )
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
  )
}

export const meta: V2_MetaFunction<typeof loader> = () => [
  { title: `Article Index - ${Strings.name}` },
]

export default function Blog(): JSX.Element {
  const posts = useLoaderData<typeof loader>()

  return (
    <main className="prose prose-blue mx-6 max-w-prose md:mx-auto">
      <h1>Latest articles</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <NavLink to={`/articles/${post.slug}`}>{post.title}</NavLink>
          </li>
        ))}
      </ul>
    </main>
  )
}
