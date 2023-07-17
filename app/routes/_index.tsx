import { type V2_MetaFunction } from "@remix-run/cloudflare"
import React, { type JSX } from "react"
import { homeMD } from "../app/homeMD"
import { md2html } from "../app/marked"

export const meta: V2_MetaFunction = () => [
  { title: "Adel Nizamutdinov" },
  { name: "description", content: "Personal website" },
]

export default function Index(): JSX.Element {
  return (
    <main
      className="prose mx-auto max-w-prose p-4"
      dangerouslySetInnerHTML={{ __html: md2html(homeMD) }}
    />
  )
}
