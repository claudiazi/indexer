import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"

@Entity_()
export class QuizSubmission {
  constructor(props?: Partial<QuizSubmission>) {
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
  wallet!: string | undefined | null

  @Column_("int4", {nullable: true})
  quizVersion!: number | undefined | null

  @Column_("int4", {nullable: true})
  version!: number | undefined | null

  @Column_("int4", {array: true, nullable: true})
  answers!: (number | undefined | null)[] | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  timestamp!: Date | undefined | null
}
