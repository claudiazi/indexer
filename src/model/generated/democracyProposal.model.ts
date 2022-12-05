import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import {ReferendumOriginType} from "./_referendumOriginType"

@Entity_()
export class DemocracyProposal {
    constructor(props?: Partial<DemocracyProposal>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("int4", {nullable: false})
    index!: number

    @Column_("text", {nullable: false})
    hash!: string

    @Column_("text", {nullable: true})
    proposalHash!: string | undefined | null

    @Column_("text", {nullable: true})
    proposer!: string | undefined | null

    @Column_("varchar", {length: 19, nullable: true})
    type!: ReferendumOriginType | undefined | null
}
