import { Layout } from "./app/Layout"
import stylesheet from "./tailwind.css"
import {
  json,
  type LinksFunction,
  type LoaderArgs,
  type TypedResponse,
  type V2_MetaFunction,
} from "@remix-run/cloudflare"
import { cssBundleHref } from "@remix-run/css-bundle"
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import React, { type JSX } from "react"

const hostURL = (host: string, path?: string): string => {
  const proto =
    host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https"

  return `${proto}://${host}${path ?? ""}`
}

interface Props {
  host: string
}

// noinspection JSUnusedGlobalSymbols
export const loader = ({ request }: LoaderArgs): TypedResponse<Props> =>
  json({
    host: request.headers.get("host") || "localhost:3000",
  })

// noinspection JSUnusedGlobalSymbols
export const meta: V2_MetaFunction<Props> = ({ data }) => [
  { name: "og:image", content: hostURL(data.host, "/og.jpg") },
]

// noinspection JSUnusedGlobalSymbols
export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", href: "/icon.svg" },
]

// noinspection JSUnusedGlobalSymbols
export default function App(): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <Layout />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
