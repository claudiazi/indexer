import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Referendum} from "./referendum.model"
import {VoteDecision} from "./_voteDecision"
import {VoteBalance, fromJsonVoteBalance} from "./_voteBalance"

@Entity_()
export class Vote {
  constructor(props?: Partial<Vote>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: true})
  voter!: string | undefined | null

  @Column_("text", {nullable: false})
  referendumId!: string

  @Index_()
  @ManyToOne_(() => Referendum, {nullable: true})
  referendum!: Referendum

  @Index_()
  @Column_("int4", {nullable: false})
  blockNumber!: number

  @Index_()
  @Column_("timestamp with time zone", {nullable: false})
  timestamp!: Date

  @Column_("varchar", {length: 7, nullable: false})
  decision!: VoteDecision

  @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => fromJsonVoteBalance(obj)}, nullable: false})
  balance!: VoteBalance

  @Column_("int4", {nullable: true})
  lockPeriod!: number | undefined | null
}
