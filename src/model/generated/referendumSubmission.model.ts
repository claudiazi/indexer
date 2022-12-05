import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"

@Entity_()
export class ReferendumSubmission {
    constructor(props?: Partial<ReferendumSubmission>) {
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

    @Column_("text", {nullable: true})
    proposer!: string | undefined | null
}
