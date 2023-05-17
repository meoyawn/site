import { relativeFetch } from "../lib/remix"
import {
  json,
  type LoaderArgs,
  type TypedResponse,
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

export default function Blog(): JSX.Element {
  const posts = useLoaderData<typeof loader>()

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <NavLink to={`/blog/${post.slug}`}>{post.title}</NavLink>
          </li>
        ))}
      </ul>
    </main>
  )
}
