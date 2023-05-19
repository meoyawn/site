import { mergeParentMeta } from "../lib/remix"
import ogimages from "./cv/ogimages.json"
import { type V2_MetaFunction } from "@remix-run/cloudflare"
import React, { type JSX } from "react"

export const meta: V2_MetaFunction = mergeParentMeta(() => [
  { title: "Adel Nizamutdinov" },
  { name: "description", content: "Personal website" },
])

const posts: ReadonlyArray<{
  href: string
  title: string
  description: string
}> = [
  {
    href: "https://listenbox.app",
    title: "Listenbox",
    description: "Listen and publish YouTube shows as podcasts",
  },
  {
    href: "https://arrowbox.co",
    title: "Arrowbox",
    description: "Communicate visually using diagrams",
  },
  {
    href: "https://github.com/meoyawn",
    title: "Open source",
    description: "GitHub profile",
  },
]

const Projects = (): JSX.Element => (
  <section className="space-y-6 px-6 lg:px-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">
      Projects
    </h2>

    <div className="grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {posts.map(post => (
        <div
          key={post.href}
          className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
        >
          <img
            src={(ogimages as Record<string, string>)[post.href]}
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
          <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

          <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
            <div className="-ml-4 flex items-center gap-x-4">
              <svg
                viewBox="0 0 2 2"
                className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
            </div>
          </div>

          <h3 className="mt-3 leading-6 text-white">
            <a href={post.href} target="_blank" rel="noreferrer">
              <span className="absolute inset-0" />
              <p className="text-xl font-semibold">{post.title}</p>
              <p className="mt-1">{post.description}</p>
            </a>
          </h3>
        </div>
      ))}
    </div>
  </section>
)

export default function Index(): JSX.Element {
  return (
    <main className="mx-auto max-w-7xl space-y-8 sm:space-y-12">
      <section className="space-y-2 px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl">
          Adel Nizamutdinov
        </h1>

        <p className="text-lg">I make software</p>
      </section>

      <Projects />
    </main>
  )
}
