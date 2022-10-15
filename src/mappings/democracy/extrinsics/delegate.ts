import { getOriginAccountId, ss58codec } from '../../../common/tools'
import { getDelegateData } from './getters'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CallItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Delegation } from '../../../model/generated/delegation.model'
import { TooManyOpenDelegations } from './errors'
import { IsNull } from 'typeorm'
import { addOngoingReferendaDelegatedVotes, removeDelegatedVotesOngoingReferenda } from './helpers'

export async function handleDelegate(ctx: BatchContext<Store, unknown>,
    item: CallItem<'Democracy.delegate', { call: { args: true; origin: true; } }>,
    header: SubstrateBlock): Promise<void> {
    if (!(item.call as any).success) return
    const { to, lockPeriod, balance } = getDelegateData(ctx, item.call)
    const toAddress = ss58codec.encode(to)
    if (toAddress !== "Eyd3x5a8KearHpJLw9PFgYVNDCQiTMBHSLr9yCtox2bqMFL" && header.height !== 9044201) return
    const wallet = getOriginAccountId(item.call.origin)
    const delegations = await ctx.store.find(Delegation, { where: { wallet, blockNumberEnd: IsNull() } })
    if (delegations.length > 1) {
        //should never be the case
        ctx.log.warn(TooManyOpenDelegations(header.height, wallet))
    }
    if (delegations.length > 0) {
        const delegation = delegations[0]
        delegation.blockNumberEnd = header.height
        await ctx.store.save(delegation)
    }

    await removeDelegatedVotesOngoingReferenda(ctx, wallet, header.height)

    await ctx.store.insert(
        new Delegation({
            id: `${await ctx.store.count(Delegation)}`,
            blockNumberStart: header.height,
            wallet: getOriginAccountId(item.call.origin),
            to: toAddress,
            balance,
            lockPeriod,
            timestamp: new Date(header.timestamp),
        })
    )
    await addOngoingReferendaDelegatedVotes(ctx, wallet, header.height, header.timestamp)
}