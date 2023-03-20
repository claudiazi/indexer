import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { Vote } from '../../model/generated'
import { accountStatsQuery } from '../queries/account';

// Define custom GraphQL ObjectType of the query result
@ObjectType()
export class AccountStats {
    
    @Field(() => Number, { nullable: false })
    referendum_index!: number

    @Field(() => String, { nullable: false })
    voter!: string

    @Field(() => Number, { nullable: false })
    first_referendum_index!: number

    @Field(() => Date, { nullable: true })
    first_voting_timestamp!: Date

    @Field(() => Number, { nullable: false })
    conviction!: number

    @Field(() => String, { nullable: true })
    decision!: string

    @Field(() => Number, { nullable: true })
    balance_value!: Number

    @Field(() => Number, { nullable: true })
    voted_amount_with_conviction!: number

    @Field(() => String, { nullable: true })
    voting_time_group!: string

    @Field(() => String, { nullable: true })
    voting_result_group!: string

    @Field(() => Number, { nullable: true })
    questions_count!: Number

    @Field(() => Number, { nullable: true })
    correct_answers_count!: Number

    @Field(() => Number, { nullable: true })
    quiz_fully_correct!: Number

    @Field(() => String, { nullable: true })
    voter_type!: string
    
    @Field(() => String, { nullable: true })
    delegated_to!: string
    
    @Field(() => String, { nullable: true })
    type!: string

    constructor(props: Partial<AccountStats>) {
        Object.assign(this, props);
    }
}

@Resolver()
export class AccountStatsResolver {
    // Set by depenency injection
    constructor(private tx: () => Promise<EntityManager>) { }

    @Query(() => [AccountStats])
    async accountStats(
        @Arg("address", {nullable: false})
        address: string
    ): Promise<AccountStats> {
        const manager = await this.tx()
        const result: AccountStats = await manager.getRepository(Vote).query(accountStatsQuery, [address])
        return result
    }
}
