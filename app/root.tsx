import { type LinksFunction } from "@remix-run/cloudflare"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import React, { type JSX } from "react"
import stylesheet from "./tailwind.css"

// noinspection JSUnusedGlobalSymbols
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
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
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
