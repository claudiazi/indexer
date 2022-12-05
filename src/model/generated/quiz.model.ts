import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {Question} from "./question.model"
import {QuizSubmission} from "./quizSubmission.model"

@Entity_()
export class Quiz {
    constructor(props?: Partial<Quiz>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("int4", {nullable: true})
    referendumIndex!: number | undefined | null

    @Index_()
    @Column_("int4", {nullable: false})
    blockNumber!: number

    @Index_()
    @Column_("text", {nullable: true})
    creator!: string | undefined | null

    @OneToMany_(() => Question, e => e.quiz)
    questions!: Question[]

    @OneToMany_(() => QuizSubmission, e => e.quiz)
    submissions!: QuizSubmission[]

    @Column_("int4", {nullable: true})
    version!: number | undefined | null

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date
}
