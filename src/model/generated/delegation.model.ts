import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Delegation {
  constructor(props?: Partial<Delegation>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("int4", {nullable: false})
  blockNumberStart!: number

  @Column_("int4", {nullable: true})
  blockNumberEnd!: number | undefined | null

  @Index_()
  @Column_("text", {nullable: false})
  wallet!: string

  @Index_()
  @Column_("text", {nullable: false})
  to!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  balance!: bigint | undefined | null

  @Column_("int4", {nullable: false})
  lockPeriod!: number

  @Column_("timestamp with time zone", {nullable: false})
  timestamp!: Date

  @Column_("timestamp with time zone", {nullable: true})
  timestampEnd!: Date | undefined | null
}
