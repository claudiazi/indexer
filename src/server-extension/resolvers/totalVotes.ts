import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { Vote } from '../../model/generated'
import { totalVotes } from '../queries/votes';

// Define custom GraphQL ObjectType of the query result
@ObjectType()
export class TotalVotes {
    @Field(() => Number, { nullable: false })
    total!: number

    @Field(() => String, { nullable: false })
    decision!: string

    constructor(props: Partial<TotalVotes>) {
        Object.assign(this, props);
    }
}

@Resolver()
export class TotalVotesResolver {
    // Set by depenency injection
    constructor(private tx: () => Promise<EntityManager>) { }

    @Query(() => [TotalVotes])
    async totalVotes(
        @Arg("id", { nullable: false })
        id: string
    ): Promise<TotalVotes> {
        const manager = await this.tx()
        const result = await manager.getRepository(Vote).query(totalVotes, [id])
        return result
    }
}