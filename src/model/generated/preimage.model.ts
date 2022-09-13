import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {ProposedCall} from "./_proposedCall"
import {PreimageStatus} from "./_preimageStatus"
import {PreimageStatusHistory} from "./_preimageStatusHistory"

@Entity_()
export class Preimage {
  constructor(props?: Partial<Preimage>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("text", {nullable: false})
  hash!: string

  @Column_("text", {nullable: false})
  proposer!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  deposit!: bigint

  @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : new ProposedCall(undefined, obj)}, nullable: true})
  proposedCall!: ProposedCall | undefined | null

  @Column_("varchar", {length: 7, nullable: false})
  status!: PreimageStatus

  @Column_("jsonb", {transformer: {to: obj => obj.map((val: any) => val.toJSON()), from: obj => marshal.fromList(obj, val => new PreimageStatusHistory(undefined, marshal.nonNull(val)))}, nullable: false})
  statusHistory!: (PreimageStatusHistory)[]

  @Index_()
  @Column_("int4", {nullable: false})
  createdAtBlock!: number

  @Index_()
  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date

  @Column_("int4", {nullable: true})
  updatedAtBlock!: number | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  updatedAt!: Date | undefined | null
}
