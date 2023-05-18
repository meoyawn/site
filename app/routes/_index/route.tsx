import { BSection } from "./BSection"
import { type V2_MetaFunction } from "@remix-run/cloudflare"
import React, { type JSX } from "react"

export const meta: V2_MetaFunction = () => [{ title: "Adel Nizamutdinov" }]

export default function Index(): JSX.Element {
  return (
    <main className="mx-auto max-w-7xl space-y-8 sm:space-y-12">
      <section className="space-y-2 px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl">
          Adel Nizamutdinov
        </h1>

        <p className="text-lg">I make software</p>
      </section>

      <BSection />
    </main>
  )
}
