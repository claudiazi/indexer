import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { Vote } from '../../model/generated'
import { referendumVotes } from '../queries/referendumvotes';
import { referendaCache } from './referendaStats';

// Define custom GraphQL ObjectType of the query result
@ObjectType()
export class ReferendumVotes {
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

    constructor(props: Partial<ReferendumVotes>) {
        Object.assign(this, props);
    }
}

let referendumCache = new Map<number, ReferendumVotes>()

@Resolver()
export class ReferendumVotesResolver {
    // Set by depenency injection
    constructor(private tx: () => Promise<EntityManager>) { }

    @Query(() => [ReferendumVotes])
    async referendumVotes(
        @Arg("id", {nullable: false})
        id: number
    ): Promise<ReferendumVotes> {
        const manager = await this.tx()
        let result: ReferendumVotes
        result = referendumCache.get(id) || await manager.getRepository(Vote).query(referendumVotes, [id])
        if (referendaCache.get(id)?.ended_at){
            referendumCache.set(id, result)
        } 
        return result
    }
}
