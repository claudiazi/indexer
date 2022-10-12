import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Question} from "./question.model"
import {QuizSubmission} from "./quizSubmission.model"

@Entity_()
export class Answer {
  constructor(props?: Partial<Answer>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("int4", {nullable: false})
  answerIndex!: number

  @Column_("text", {nullable: false})
  questionId!: string

  @Index_()
  @ManyToOne_(() => Question, {nullable: true})
  question!: Question

  @Index_()
  @ManyToOne_(() => QuizSubmission, {nullable: true})
  quizSubmission!: QuizSubmission

  @Column_("text", {nullable: false})
  quizSubmissionId!: string
}
