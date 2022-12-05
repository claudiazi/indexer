import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {OpenGovReferendumStatus} from "./_openGovReferendumStatus"
import {OpenGovReferendumStatusHistory} from "./_openGovReferendumStatusHistory"
import {ConvictionVote} from "./convictionVote.model"

@Entity_()
export class OpenGovReferendum {
    constructor(props?: Partial<OpenGovReferendum>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("int4", {nullable: false})
    index!: number

    @Column_("text", {nullable: false})
    hash!: string

    @Column_("int4", {nullable: false})
    track!: number

    @Column_("varchar", {length: 15, nullable: false})
    status!: OpenGovReferendumStatus

    @Column_("jsonb", {transformer: {to: obj => obj.map((val: any) => val.toJSON()), from: obj => obj == null ? undefined : marshal.fromList(obj, val => new OpenGovReferendumStatusHistory(undefined, marshal.nonNull(val)))}, nullable: false})
    statusHistory!: (OpenGovReferendumStatusHistory)[]

    @Column_("text", {nullable: false})
    originKind!: string

    @Column_("text", {nullable: false})
    enactmentKind!: string

    @Column_("int4", {nullable: false})
    enactmentValue!: number

    @Column_("int4", {nullable: true})
    len!: number | undefined | null

    @Column_("int4", {nullable: false})
    submitted!: number

    @Column_("text", {nullable: false})
    submissionDepositWho!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    submissionDepositAmount!: bigint

    @Column_("text", {nullable: true})
    decisionDepositWho!: string | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    decisionDepositAmount!: bigint | undefined | null

    @Column_("int4", {nullable: true})
    decidingSince!: number | undefined | null

    @Column_("int4", {nullable: true})
    decidingConfirming!: number | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    ayes!: bigint | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    nays!: bigint | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    support!: bigint | undefined | null

    @Column_("bool", {nullable: true})
    inQueue!: boolean | undefined | null

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

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalIssuance!: bigint

    @OneToMany_(() => ConvictionVote, e => e.referendum)
    voting!: ConvictionVote[]

    @Column_("text", {nullable: true})
    preimageSection!: string | undefined | null

    @Column_("text", {nullable: true})
    preimageMethod!: string | undefined | null

    @Column_("jsonb", {nullable: true})
    preimageArgs!: unknown | undefined | null

    @Column_("text", {nullable: true})
    preimageDescription!: string | undefined | null
}
