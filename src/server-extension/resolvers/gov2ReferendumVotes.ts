import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { ConvictionVote } from '../../model/generated'
import { gov2ReferendumVotesQuery } from '../queries/gov2ReferendumVotes';
import { gov2ReferendaCache } from './gov2ReferendaStats';

// Define custom GraphQL ObjectType of the query result
@ObjectType()
export class gov2ReferendumVotes {
    @Field(() => Number, { nullable: false })
    referendum_index!: number

    @Field(() => String, { nullable: false })
    voter!: string

    @Field(() => String, { nullable: false })
    decision!: string

    @Field(() => Date, { nullable: false })
    timestamp!: Date

    @Field(() => Number, { nullable: false })
    cum_voted_amount_with_conviction_aye!: number

    @Field(() => Number, { nullable: false })
    cum_voted_amount_with_conviction_nay!: number

    constructor(props: Partial<gov2ReferendumVotes>) {
        Object.assign(this, props);
    }
}

let gov2ReferendumVotesCache = new Map<number, gov2ReferendumVotes>()

@Resolver()
export class gov2ReferendumVotesResolver {
    // Set by depenency injection
    constructor(private tx: () => Promise<EntityManager>) { }

    @Query(() => [gov2ReferendumVotes])
    async gov2referendumVotes(
        @Arg("id", {nullable: false})
        id: number
    ): Promise<gov2ReferendumVotes> {
        const manager = await this.tx()
        let result: gov2ReferendumVotes
        result = gov2ReferendumVotesCache.get(id) || await manager.getRepository(ConvictionVote).query(gov2ReferendumVotesQuery, [id])
        if (gov2ReferendaCache.get(id)?.ended_at){
            gov2ReferendumVotesCache.set(id, result)
        } 
        return result
    }
}
