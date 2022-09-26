import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"

@Entity_()
export class ReferendumRelation {
  constructor(props?: Partial<ReferendumRelation>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("int4", {nullable: true})
  referendumIndex!: number | undefined | null

  @Column_("text", {nullable: true})
  hash!: string | undefined | null

  @Column_("text", {nullable: true})
  referendumId!: string | undefined | null

  @Column_("text", {nullable: false})
  underlying!: string
}
