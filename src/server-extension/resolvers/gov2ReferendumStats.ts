import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { ConvictionVote } from '../../model/generated'
import { gov2referendumStats } from '../queries/gov2Referendum';
import { gov2ReferendaCache } from './gov2ReferendaStats';

// Define custom GraphQL ObjectType of the query result
@ObjectType()
export class gov2ReferendumStats {
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
    cum_new_accounts!: number

    constructor(props: Partial<gov2ReferendumStats>) {
        Object.assign(this, props);
    }
}

let gov2ReferendumCache = new Map<number, gov2ReferendumStats>()

@Resolver()
export class gov2ReferendumStatsResolver {
    // Set by depenency injection
    constructor(private tx: () => Promise<EntityManager>) { }

    @Query(() => [gov2ReferendumStats])
    async gov2referendumStats(
        @Arg("id", {nullable: false})
        id: number
    ): Promise<gov2ReferendumStats> {
        const manager = await this.tx()
        let result: gov2ReferendumStats
        result = gov2ReferendumCache.get(id) || await manager.getRepository(ConvictionVote).query(gov2referendumStats, [id])
        if (gov2ReferendaCache.get(id)?.ended_at){
            gov2ReferendumCache.set(id, result)
        } 
        return result
    }
}
