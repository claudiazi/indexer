import { getOriginAccountId, ss58codec } from '../../../common/tools'
import { getDelegateData } from './getters'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CallItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Delegation } from '../../../model/generated/delegation.model'
import { TooManyOpenDelegations } from './errors'
import { IsNull } from 'typeorm'

export async function handleDelegate(ctx: BatchContext<Store, unknown>,
    item: CallItem<'Democracy.delegate', { call: { args: true; origin: true; } }>,
    header: SubstrateBlock): Promise<void> {
    if (!(item.call as any).success) return
    const wallet = getOriginAccountId(item.call.origin)
    const delegations = await ctx.store.find(Delegation, { where: { wallet, blockNumberEnd: IsNull() } })
    if (delegations.length > 1) {
        ctx.log.warn(TooManyOpenDelegations(header.height, wallet))
        console.log("delegations", delegations)
    }
    if (delegations.length > 0) {
        const delegation = delegations[0]
        delegation.blockNumberEnd = header.height
        await ctx.store.save(delegation)
    }

    const { to, conviction, balance } = getDelegateData(ctx, item.call)

    await ctx.store.insert(
        new Delegation({
            id: `${await ctx.store.count(Delegation)}`,
            blockNumberStart: header.height,
            wallet: item.call.origin ? getOriginAccountId(item.call.origin) : null,
            to: ss58codec.encode(to),
            balance,
            conviction,
            timestamp: new Date(header.timestamp),
        })
    )
}
