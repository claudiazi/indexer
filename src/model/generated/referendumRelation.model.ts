import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import {ReferendumOriginType} from "./_referendumOriginType"

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
  proposalHash!: string | undefined | null

  @Column_("text", {nullable: true})
  referendumId!: string | undefined | null

  @Column_("text", {nullable: false})
  underlyingId!: string

  @Column_("int4", {nullable: false})
  underlyingIndex!: number

  @Column_("text", {nullable: true})
  proposer!: string | undefined | null

  @Column_("varchar", {length: 19, nullable: true})
  underlyingType!: ReferendumOriginType | undefined | null
}
