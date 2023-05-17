import { type OrgID } from "./orgs"
import { type ProductID, products } from "./products"
import { type SkillID } from "./skills"

export interface ExperienceProps {
  readonly position: string
  readonly org: OrgID
  readonly start: `${string}20${number}`
  readonly end: `${string}20${number}` | "Present"
  readonly duration: string
  readonly location: string
  readonly experienceMD: string
  readonly products: ReadonlyArray<ProductID>
  readonly skills: ReadonlyArray<SkillID>
}

export const mdExperience: ReadonlyArray<ExperienceProps> = [
  {
    org: "agape",
    position: "Solopreneur",
    start: "Oct 2019",
    end: "Present",
    duration: "3 yrs 6 mo",
    location: "Remote",
    experienceMD: `
Working on my own products.

- Bootstrapped a [profitable SaaS](https://listenbox.app) to $2k MRR
`,
    skills: [
      "react",
      "node",
      "typescript",
      "docker",
      "linux",
      "d3",
      "react",
      "next",
      "tailwind",
      "seo",
      "node",
    ],
    products: ["listenbox", "arrowbox", "responsible", "organize-md"],
  },
  {
    org: "wheely",
    position: "Senior Android Developer",
    start: "Jun 2017",
    end: "Jun 2019",
    duration: "2 yrs",
    location: "Remote",
    experienceMD: `
Developed Passenger & Driver Android Apps. Interviewed Android developers.

- Redesigned the Passenger app
- Introduced UI (integration) tests
    `,
    products: ["wheely-passenger", "wheely-driver"],
    skills: ["android", "kotlin", "sqlite"],
  },
  {
    org: "infotech",
    position: "Lead Android Developer",
    start: "May 2016",
    end: "Jun 2017",
    duration: "1 yr 2 mos",
    location: "Kazan, Tatarstan",
    experienceMD: `
Developed Android apps. Hired and technically led Android developers.

- Created internal processes and infrastructure for Android development
- Hired and led 3 Android developers
- Built 2 apps from scratch
`,
    products: ["oek", "gorenie", "android-drawable-dsl"],
    skills: ["android", "kotlin", "sqlite"],
  },
  {
    org: "yandex",
    position: "Android Developer",
    products: ["yandex"],
    start: "Jul 2015",
    end: "Mar 2016",
    location: "Saint Petersburg, Russian Federation",
    duration: "9 mos",
    experienceMD: `
Developed [Yandex.Search for Android](${products.yandex.url}).

- Adapted UI for tablets
- Improved app performance
- Introduced application upgrade tests
`,
    skills: ["android", "sqlite"],
  },
  {
    org: "flatstack",
    position: "Lead Android Developer",
    products: [
      "meloman",
      "breaking-news",
      "irish-examiner",
      "roadtrippers",
      "acl-grc",
    ],
    start: "Oct 2012",
    end: "Feb 2015",
    location: "Kazan, Tatarstan",
    duration: "2 yrs 5 mos",
    experienceMD: `
Developed Android apps. Hired and technically led Android developers. Did customer demos.

- Built 4 apps from scratch
- Created internal processes for Android development
- Hired and led 3 Android developers
`,
    skills: ["android", "sqlite"],
  },
]
