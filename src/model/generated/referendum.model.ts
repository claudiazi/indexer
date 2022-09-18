import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {ReferendumThreshold} from "./_referendumThreshold"
import {ReferendumStatus} from "./_referendumStatus"
import {ReferendumStatusHistory} from "./_referendumStatusHistory"
import {Preimage} from "./preimage.model"
import {Vote} from "./vote.model"

@Entity_()
export class Referendum {
  constructor(props?: Partial<Referendum>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("text", {nullable: false})
  hash!: string

  @Index_()
  @Column_("int4", {nullable: false})
  index!: number

  @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => new ReferendumThreshold(undefined, marshal.nonNull(obj))}, nullable: false})
  threshold!: ReferendumThreshold

  @Column_("varchar", {length: 9, nullable: false})
  status!: ReferendumStatus

  @Column_("jsonb", {transformer: {to: obj => obj.map((val: any) => val.toJSON()), from: obj => marshal.fromList(obj, val => new ReferendumStatusHistory(undefined, marshal.nonNull(val)))}, nullable: false})
  statusHistory!: (ReferendumStatusHistory)[]

  @Index_()
  @Column_("int4", {nullable: false})
  createdAtBlock!: number

  @Index_()
  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date

  @Column_("int4", {nullable: true})
  endedAtBlock!: number | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  endedAt!: Date | undefined | null

  @Column_("int4", {nullable: true})
  updatedAtBlock!: number | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  updatedAt!: Date | undefined | null

  @Index_()
  @ManyToOne_(() => Preimage, {nullable: true})
  preimage!: Preimage | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalIssuance!: bigint

  @OneToMany_(() => Vote, e => e.referendum)
  voting!: Vote[]
}
