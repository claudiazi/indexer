import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {OpenGovReferendum} from "./openGovReferendum.model"
import {VoteDecisionOpenGov} from "./_voteDecisionOpenGov"
import {VoteBalanceOpenGov, fromJsonVoteBalanceOpenGov} from "./_voteBalanceOpenGov"
import {VoteType} from "./_voteType"

@Entity_()
export class ConvictionVote {
    constructor(props?: Partial<ConvictionVote>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: true})
    voter!: string | undefined | null

    @Column_("text", {nullable: false})
    referendumId!: string

    @Column_("int4", {nullable: false})
    referendumIndex!: number

    @Index_()
    @ManyToOne_(() => OpenGovReferendum, {nullable: true})
    referendum!: OpenGovReferendum

    @Index_()
    @Column_("int4", {nullable: false})
    blockNumberVoted!: number

    @Index_()
    @Column_("int4", {nullable: true})
    blockNumberRemoved!: number | undefined | null

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Index_()
    @Column_("timestamp with time zone", {nullable: true})
    timestampRemoved!: Date | undefined | null

    @Column_("varchar", {length: 12, nullable: false})
    decision!: VoteDecisionOpenGov

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : fromJsonVoteBalanceOpenGov(obj)}, nullable: false})
    balance!: VoteBalanceOpenGov

    @Column_("int4", {nullable: true})
    lockPeriod!: number | undefined | null

    @Column_("text", {nullable: true})
    delegatedTo!: string | undefined | null

    @Column_("varchar", {length: 9, nullable: false})
    type!: VoteType

    @Column_("bool", {nullable: true})
    isValidator!: boolean | undefined | null
}
