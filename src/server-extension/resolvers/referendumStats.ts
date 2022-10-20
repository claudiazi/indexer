import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { Vote } from '../../model/generated'
import { referendumStats } from '../queries/referendum';
import { referendaCache } from './referendaStats';

// Define custom GraphQL ObjectType of the query result
@ObjectType()
export class ReferendumStats {
    @Field(() => Number, { nullable: false })
    referendum_index!: number

    @Field(() => String, { nullable: false })
    voter!: string

    @Field(() => String, { nullable: false })
    decision!: string

    @Field(() => Date, { nullable: false })
    timestamp!: Date

    @Field(() => Number, { nullable: false })
    is_new_account!: number
    
    @Field(() => String, { nullable: true })
    delegated_to!: string

    @Field(() => Number, { nullable: false })
    voted_amount_with_conviction!: number

    @Field(() => Number, { nullable: false })
    cum_voted_amount_with_conviction_aye!: number

    @Field(() => Number, { nullable: false })
    cum_voted_amount_with_conviction_nay!: number

    @Field(() => Number, { nullable: false })
    cum_new_accounts!: number

    constructor(props: Partial<ReferendumStats>) {
        Object.assign(this, props);
    }
}

let referendumCache = new Map<number, ReferendumStats>()

@Resolver()
export class ReferendumStatsResolver {
    // Set by depenency injection
    constructor(private tx: () => Promise<EntityManager>) { }

    @Query(() => [ReferendumStats])
    async referendumStats(
        @Arg("id", {nullable: false})
        id: number
    ): Promise<ReferendumStats> {
        const manager = await this.tx()
        let result: ReferendumStats
        result = referendumCache.get(id) || await manager.getRepository(Vote).query(referendumStats, [id])
        if (referendaCache.get(id)?.ended_at){
            referendumCache.set(id, result)
        } 
        return result
    }
}
