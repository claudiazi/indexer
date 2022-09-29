import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {Quiz} from "./quiz.model"
import {AnswerOption} from "./answerOption.model"

@Entity_()
export class Question {
  constructor(props?: Partial<Question>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  quizId!: string

  @Index_()
  @ManyToOne_(() => Quiz, {nullable: true})
  quiz!: Quiz | undefined | null

  @Column_("text", {nullable: true})
  text!: string | undefined | null

  @OneToMany_(() => AnswerOption, e => e.question)
  answerOptions!: AnswerOption[]

  @Column_("int4", {nullable: true})
  indexCorrectAnswer!: number | undefined | null
}
