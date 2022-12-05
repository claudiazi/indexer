import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Question} from "./question.model"

@Entity_()
export class CorrectAnswer {
    constructor(props?: Partial<CorrectAnswer>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Question, {nullable: true})
    question!: Question

    @Column_("text", {nullable: false})
    questionId!: string

    @Column_("int4", {nullable: false})
    version!: number

    @Index_()
    @Column_("int4", {nullable: false})
    blockNumber!: number

    @Column_("int4", {nullable: false})
    correctIndex!: number

    @Column_("text", {nullable: false})
    submitter!: string

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date
}
