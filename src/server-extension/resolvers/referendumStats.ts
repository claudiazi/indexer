import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { Vote } from '../../model/generated'
import { referendumStats } from '../queries/referendum';

// Define custom GraphQL ObjectType of the query result
@ObjectType()
export class ReferendumStats {
    @Field(() => String, { nullable: false })
    referendum_id!: string

    @Field(() => Number, { nullable: false })
    index!: number

    @Field(() => Date, { nullable: false })
    created_at!: Date

    @Field(() => Date, { nullable: true })
    ended_at!: Date

    @Field(() => String, { nullable: false })
    status!: string

    @Field(() => String, { nullable: true })
    proposer!: string

    @Field(() => String, { nullable: true })
    method!: string

    @Field(() => String, { nullable: true })
    section!: string

    @Field(() => Number, { nullable: true })
    count_aye!: number

    @Field(() => Number, { nullable: true })
    count_nay!: number

    @Field(() => Number, { nullable: true })
    count_total!: number

    @Field(() => Number, { nullable: true })
    voted_amount_aye!: number

    @Field(() => Number, { nullable: true })
    voted_amount_nay!: number


    @Field(() => Number, { nullable: true })
    voted_amount_total!: number

    @Field(() => Number, { nullable: true })
    total_issuance!: number

    @Field(() => Number, { nullable: true })
    turnout_aye_perc!: number

    @Field(() => Number, { nullable: true })
    turnout_nay_perc!: number

    @Field(() => Number, { nullable: true })
    turnout_total_perc!: number
    
    @Field(() => Number, { nullable: true })
    count_new!: number

    @Field(() => Number, { nullable: true })
    count_new_perc!: number

    @Field(() => Number, { nullable: true })
    vote_duration!: number

    @Field(() => Number, { nullable: true })
    conviction_mean_aye!: number

    @Field(() => Number, { nullable: true })
    conviction_mean_nay!: number

    @Field(() => Number, { nullable: true })
    conviction_mean!: number

    @Field(() => Number, { nullable: true })
    conviction_median_aye!: number

    @Field(() => Number, { nullable: true })
    conviction_median_nay!: number

    @Field(() => Number, { nullable: true })
    conviction_median!: number

    constructor(props: Partial<ReferendumStats>) {
        Object.assign(this, props);
    }
}

@Resolver()
export class ReferendumStatsResolver {
    // Set by depenency injection
    constructor(private tx: () => Promise<EntityManager>) { }

    @Query(() => [ReferendumStats])
    async referendumStats(): Promise<ReferendumStats> {
        const manager = await this.tx()
        const result = await manager.getRepository(Vote).query(referendumStats, [])
        return result
    }
}