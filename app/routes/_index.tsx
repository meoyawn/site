import { type V2_MetaFunction } from "@remix-run/cloudflare"
import React, { type JSX } from "react"
import { homeMD } from "../app/homeMD"
import { remarkHTML } from "../app/remark"

export const meta: V2_MetaFunction = () => [
  { title: "Adel Nizamutdinov" },
  { name: "description", content: "Personal website" },
]

export default function Index(): JSX.Element {
  return (
    <main
      className="prose m-6 max-w-prose sm:m-12 md:m-16"
      dangerouslySetInnerHTML={{ __html: remarkHTML(homeMD) }}
    />
  )
}
