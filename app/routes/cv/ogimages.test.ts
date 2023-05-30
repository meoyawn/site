import { readFile, writeFile } from "fs/promises"
import { join as pathJoin } from "path"
import { test } from "bun:test"
import { load as yamlParse } from "js-yaml"
import { parse } from "node-html-parser"
import { type CvDoc } from "./types"

const ogImage = async (url: string): Promise<string> => {
  const res = await fetch(url, { redirect: "follow" })
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`)
  }
  if (!res.headers.get("content-type")?.startsWith("text/html")) {
    throw new Error(`Not HTML at ${url}`)
  }

  const document = parse(await res.text())

  const imgURL =
    document
      .querySelector("meta[property='og:image'], meta[name='og:image']")
      ?.getAttribute("content") ??
    document.querySelector("img")?.getAttribute("src")
  if (!imgURL) throw new Error(`No og:image or img at ${url}`)

  return imgURL.startsWith("http")
    ? imgURL
    : new URL(imgURL, new URL(url).origin).toString()
}

test("write images", async () => {
  const txt = await readFile("public/cv.yaml", "utf-8")
  const { awards, education, experience } = yamlParse(txt) as CvDoc
  const orgs = [...education, ...experience, ...awards].map(x => x.org)
  const products = [...education, ...experience].flatMap(x => x.products)

  const pairs = await Promise.all(
    [
      ...orgs.map(x => x.url),
      ...products.map(x => x.url),
      "https://github.com/meoyawn",
    ].map(url => ogImage(url).then(og => [url, og])),
  )
  const path = pathJoin(import.meta.dir, "ogimages.json")
  await writeFile(path, JSON.stringify(Object.fromEntries(pairs), null, 2))
})
