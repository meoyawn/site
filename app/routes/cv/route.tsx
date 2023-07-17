import {
  json,
  type LoaderArgs,
  type TypedResponse,
  type V2_MetaFunction,
} from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import { formatDuration, intervalToDuration } from "date-fns"
import { load as yamlParse } from "js-yaml"
import React, { type JSX, type ReactNode } from "react"
import { remarkHTML } from "../../app/remark"
import { Strings } from "../../app/strings"
import { mergeParentMeta, relativeFetch } from "../../lib/remix"
import images from "./ogimages.json"
import {
  type Award,
  type CvDoc,
  type Education,
  type Experience,
} from "./types"

interface ParsedExperience extends Experience {
  html: string
}

interface ParsedEducation extends Education {
  html: string
}

interface Props {
  experience: ParsedExperience[]
  education: ParsedEducation[]
  cv: CvDoc
}

export const loader = async ({
  request,
}: LoaderArgs): Promise<TypedResponse<Props>> => {
  const r = await relativeFetch(request, "/cv.yaml")
  const cv = yamlParse(await r.text()) as CvDoc

  const exp = cv.experience.map(
    e => ({ ...e, html: remarkHTML(e.summaryMD) } satisfies ParsedExperience),
  )
  const edu = cv.education.map(
    e => ({ ...e, html: remarkHTML(e.degreeMD) } satisfies ParsedEducation),
  )

  return json({ experience: exp, education: edu, cv })
}

export const meta: V2_MetaFunction<typeof loader> = mergeParentMeta(() => [
  { title: `CV - ${Strings.name}` },
])

const IconLink = ({
  href,
  children,
}: {
  href: string
  children: ReactNode
}): JSX.Element => (
  <a className="space-x-1" target="_blank" rel="noreferrer" href={href}>
    {children}

    <span>
      {href.replace("mailto:", "").replace("https://", "").replace("tel:", "")}
    </span>
  </a>
)

const Header = ({
  email,
  phone,
  website,
  linkedin,
  name,
  location,
}: {
  email: string
  phone?: string
  website: string
  linkedin: string
  name: string
  location: string
}) => (
  <section>
    <h1 className="mb-0">{name}</h1>
    <p className="mt-0">{location}</p>

    <div className="grid grid-cols-1 sm:grid-cols-2">
      <IconLink href={`mailto:${email}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="inline h-4 w-4"
        >
          <path d="M8 1L1 4.47V11a3 3 0 003 3h8a3 3 0 003-3V4.47zm5 10a1 1 0 01-1 1H4a1 1 0 01-1-1V6.51L8 9l5-2.49z" />
        </svg>
      </IconLink>

      {phone ? (
        <IconLink href={`tel:${phone}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="inline h-4 w-4"
          >
            <path d="M4.18 11.82C6.62 14.26 8.64 15 10.79 15a3.76 3.76 0 002.66-1.1l1.32-1.32a.8.8 0 000-1.13L11.6 8.29a1 1 0 00-.69-.29 1 1 0 00-.42.09l-1.67.73-1.64-1.64.73-1.67A1 1 0 008 5.09a1 1 0 00-.29-.69L4.55 1.23a.8.8 0 00-1.13 0L2.1 2.55A3.76 3.76 0 001 5.21c0 2.15.74 4.17 3.18 6.61zm1.24-1.24c-2.34-2.34-2.67-4-2.67-5.37a2 2 0 01.59-1.42L4 3.14l2 2-1 2.32L8.54 11l2.29-1 2 2-.65.65a2 2 0 01-1.42.59c-1.38.01-3-.31-5.34-2.66z" />
          </svg>
        </IconLink>
      ) : null}

      <IconLink href={`https://linkedin.com/in/${linkedin}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="inline h-4 w-4"
        >
          <path d="M15 2v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1h12a1 1 0 011 1zM5 6H3v7h2zm.25-2A1.25 1.25 0 104 5.25 1.25 1.25 0 005.25 4zM13 9.29c0-2.2-.73-3.49-2.86-3.49A2.71 2.71 0 007.89 7V6H6v7h2V9.73a1.73 1.73 0 011.52-1.92h.14C10.82 7.8 11 8.94 11 9.73V13h2z" />
        </svg>
      </IconLink>

      <IconLink href={website}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="inline h-4 w-4"
        >
          <path d="M11 2a3 3 0 00-2.1.87L6.87 4.94a2.93 2.93 0 00-.72 1.21 2.93 2.93 0 00-1.21.72L2.87 8.94a3 3 0 104.19 4.19l2.07-2.07a2.93 2.93 0 00.72-1.21 2.93 2.93 0 001.21-.72l2.07-2.07A3 3 0 0011 2zm-5.17 9.89a1.22 1.22 0 01-1.72-1.72l2.06-2.06A3 3 0 007.91 9.8zm6.07-6.07L9.83 7.89A3 3 0 008.09 6.2l2.07-2.07a1.22 1.22 0 011.73 1.7z"></path>
        </svg>
      </IconLink>

      <IconLink href="https://github.com/meoyawn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="inline h-4 w-4"
        >
          <path d="M12 0a12 12 0 0 0-4 23h1v-2c-3 0-4-2-4-2l-1-2c-1 0 0 0 0 0l2 1c1 2 2 1 3 1l1-2c-3 0-6-1-6-6l2-3V5l3 1a12 12 0 0 1 6 0l3-1v3l2 3c0 5-3 6-6 6l1 3v3h1a12 12 0 0 0-4-23z" />
        </svg>
      </IconLink>
    </div>
  </section>
)

const ProductLink = ({
  product,
  images,
}: {
  product: { name: string; url: string; archiveImgURL?: string }
  images: Record<string, string>
}) => {
  const bgURL = product.archiveImgURL ?? images[product.url]
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={product.url}
      className="relative h-12 overflow-hidden rounded-lg border border-solid border-gray-200"
    >
      <img
        alt={product.name}
        src={bgURL}
        width={88}
        height={46}
        className="w-22 m-0 h-12 object-cover"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="absolute bottom-0 right-0 h-5 w-5 rounded-tl-lg bg-white p-1 text-gray-500"
      >
        <path d="M11 2a3 3 0 00-2.1.87L6.87 4.94a2.93 2.93 0 00-.72 1.21 2.93 2.93 0 00-1.21.72L2.87 8.94a3 3 0 104.19 4.19l2.07-2.07a2.93 2.93 0 00.72-1.21 2.93 2.93 0 001.21-.72l2.07-2.07A3 3 0 0011 2zm-5.17 9.89a1.22 1.22 0 01-1.72-1.72l2.06-2.06A3 3 0 007.91 9.8zm6.07-6.07L9.83 7.89A3 3 0 008.09 6.2l2.07-2.07a1.22 1.22 0 011.73 1.7z" />
      </svg>
    </a>
  )
}

const OrgAndProducts = ({
  e,
  images,
  children,
}: {
  e: Experience | Education | Award
  images: Record<string, string>
  children: ReactNode
}): JSX.Element => (
  <div className="flex flex-row gap-2">
    <a
      className="flex-shrink-0"
      target="_blank"
      rel="noreferrer"
      href={e.org.url}
    >
      <h4 className="mb-0">
        <img
          loading="eager"
          width={24}
          height={24}
          className="m-0 h-6 w-6 object-cover"
          src={e.org.logoURL ?? images[e.org.url]}
          alt={e.org.name}
        />
      </h4>
    </a>

    <div>
      {children}

      <div className="flex flex-row flex-wrap gap-1 print:hidden">
        {"products" in e
          ? e.products?.map(p => (
              <ProductLink key={p.url} product={p} images={images} />
            ))
          : null}
      </div>
    </div>
  </div>
)

const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
  })

const experienceTime = (e: { start: string; end?: string }): string => {
  const durStr = formatDuration(
    intervalToDuration({
      start: new Date(e.start),
      end: e.end ? new Date(e.end) : new Date(),
    }),
    { format: ["years", "months"] },
  )

  const endStr = e.end ? formatDate(e.end) : "Present"

  return `${formatDate(e.start)} - ${endStr} · ${durStr}`
}

export default function CV(): React.JSX.Element {
  const { experience, education, cv } = useLoaderData<typeof loader>()

  return (
    <main className="prose prose-sky m-6 max-w-none print:prose-sm print:m-0 sm:m-12 md:m-16">
      <Header
        name={Strings.name}
        location="United States or Remote"
        email={cv.head.email}
        phone={cv.head.phone}
        website={cv.head.url}
        linkedin="adelnizamuddin"
      />

      <section>
        <h3 className="mb-0">Summary</h3>

        <ul>
          <li>
            10 years of building commercial software in Java, Kotlin, Typescript
            & Python.
          </li>
          <li>Bootstrapped a profitable SaaS to $2K MRR</li>
        </ul>
      </section>

      <section>
        <h3 className="mb-0">Experience</h3>

        {experience.map(e => (
          <OrgAndProducts key={e.title + e.org.name} e={e} images={images}>
            <h4 className="mb-0">{e.title}</h4>

            <a href={e.org.url} target="_blank" rel="noreferrer">
              {e.org.name}
            </a>
            <br />

            <span>{experienceTime(e)}</span>

            <p dangerouslySetInnerHTML={{ __html: e.html }} />
          </OrgAndProducts>
        ))}
      </section>

      <section>
        <h3 className="mb-0">Education</h3>

        {education.map(e => (
          <OrgAndProducts key={e.degreeMD} e={e} images={images}>
            <h4 className="mb-0">
              <a href={e.org.url} target="_blank" rel="noreferrer">
                {e.org.name}
              </a>
            </h4>

            <p dangerouslySetInnerHTML={{ __html: e.html }} />

            <span>{experienceTime(e)}</span>
          </OrgAndProducts>
        ))}
      </section>

      <section>
        <h3 className="mb-0">Skills</h3>

        <span
          dangerouslySetInnerHTML={{
            __html: Object.values(cv.techSkills).join(" •&nbsp"),
          }}
        />
      </section>

      <section>
        <h3 className="mb-0">Honors & Awards</h3>

        {cv.awards.map(e => (
          <OrgAndProducts key={e.url} e={e} images={images}>
            <h4 className="mb-0">
              <a href={e.url} target="_blank" rel="noreferrer">
                <strong>{e.title}</strong>
              </a>
              <span> - </span>
              <span>{e.org.name}</span>
            </h4>

            <span>{formatDate(e.date)}</span>
            <br />
          </OrgAndProducts>
        ))}
      </section>
    </main>
  )
}
