import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { Vote } from '../../model/generated'
import { referendaStats } from '../queries/referenda';

// Define custom GraphQL ObjectType of the query result
@ObjectType()
export class ReferendaStats {
    @Field(() => Number, { nullable: false })
    referendum_index!: number

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

    constructor(props: Partial<ReferendaStats>) {
        Object.assign(this, props);
    }
}

export let referendaCache = new Map<number, ReferendaStats>()

@Resolver()
export class ReferendaStatsResolver {
    // Set by depenency injection
    constructor(private tx: () => Promise<EntityManager>) { }

    @Query(() => [ReferendaStats])
    async referendaStats(
        @Arg("ids", () => [Number], {nullable: false, defaultValue: []})
        ids: Number[]
    ): Promise<ReferendaStats[]> {
        const manager = await this.tx()
        const newRefs: ReferendaStats[] = await manager.getRepository(Vote).query(referendaStats, [[...(Array.from(referendaCache.keys())), ...ids]])
        const result: ReferendaStats[] = [...referendaCache.values(), ...newRefs]
        newRefs.forEach((r: ReferendaStats) => { if (r.ended_at) referendaCache.set(r.referendum_index, r) })
        return result
    }
}