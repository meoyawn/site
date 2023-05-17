import { type OrgID } from "./orgs"
import { type ProductID } from "./products"

export interface EducationProps {
  readonly org: OrgID
  readonly start: `${string}20${number}`
  readonly end: `${string}20${number}`
  readonly products: ReadonlyArray<ProductID>
  readonly degreeMD: string
}

export const mdEducation: ReadonlyArray<EducationProps> = [
  {
    org: "ksu",
    degreeMD: `[Specialist](https://academia.stackexchange.com/a/78098) of Applied Mathematics and Computer Science`,
    start: "Sep 2010",
    end: "Jul 2015",
    products: ["schedule", "vibes"],
  },
]
