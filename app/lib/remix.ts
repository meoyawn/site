import {
  type V2_HtmlMetaDescriptor,
  type V2_MetaFunction,
} from "@remix-run/cloudflare"
import { type V2_ServerRuntimeMetaArgs } from "@remix-run/server-runtime"

export type HttpPath = `/${string}` | ""
export type HttpURL = `http${"s" | ""}://${string}${HttpPath}`

export const hostURL = (host: string, path?: HttpPath): HttpURL => {
  const proto =
    host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https"

  return `${proto}://${host}${path ?? ""}`
}

const absURL = (req: Request, path?: HttpPath): HttpURL =>
  hostURL(req.headers.get("host") || "127.0.0.1:3000", path)

export const relativeFetch = (
  req: Request,
  path?: HttpPath,
  init?: RequestInit,
): Promise<Response> => fetch(absURL(req, path), init)

export const parentMeta = (
  matches: V2_ServerRuntimeMetaArgs["matches"],
): ReadonlyArray<V2_HtmlMetaDescriptor> =>
  matches.flatMap(match => match.meta ?? [])

export const mergeParentMeta =
  <T>(f: V2_MetaFunction<T>): V2_MetaFunction<T> =>
  arg =>
    [...parentMeta(arg.matches), ...f(arg)]
