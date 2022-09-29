import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Question} from "./question.model"

@Entity_()
export class AnswerOption {
  constructor(props?: Partial<AnswerOption>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  questionId!: string

  @Index_()
  @ManyToOne_(() => Question, {nullable: true})
  question!: Question | undefined | null

  @Column_("text", {nullable: true})
  text!: string | undefined | null
}
