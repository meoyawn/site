import { NavLink, Outlet } from "@remix-run/react"
import clsx from "clsx"
import React, { type JSX } from "react"

const nav: ReadonlyArray<{ title: string; href: string }> = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Articles",
    href: "/articles",
  },
  {
    title: "CV",
    href: "/cv",
  },
]

export const Layout = (): JSX.Element => (
  <div>
    <nav className="mx-auto flex gap-x-12 p-6 print:hidden lg:px-8">
      {nav.map(x => (
        <NavLink
          key={x.href}
          to={x.href}
          className={({ isActive }) =>
            clsx("text-sm leading-6 text-gray-900", {
              "font-semibold": !isActive,
              "font-black text-black": isActive,
            })
          }
        >
          {x.title}
        </NavLink>
      ))}
    </nav>

    <Outlet />
  </div>
)
