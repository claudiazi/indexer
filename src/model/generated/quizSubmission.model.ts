import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import {Quiz} from "./quiz.model"

@Entity_()
export class QuizSubmission {
  constructor(props?: Partial<QuizSubmission>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("int4", {nullable: false})
  referendumIndex!: number

  @Index_()
  @Column_("int4", {nullable: false})
  blockNumber!: number

  @Index_()
  @Column_("text", {nullable: false})
  wallet!: string

  @Index_()
  @ManyToOne_(() => Quiz, {nullable: true})
  quiz!: Quiz | undefined | null

  @Column_("text", {nullable: false})
  quizId!: string

  @Column_("int4", {nullable: true})
  version!: number | undefined | null

  @Column_("int4", {array: true, nullable: true})
  answers!: (number)[] | undefined | null

  @Column_("timestamp with time zone", {nullable: false})
  timestamp!: Date
}
