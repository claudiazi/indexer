import { getOriginAccountId, ss58codec } from '../../../common/tools'
import { getDelegateData } from './getters'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CallItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Delegation } from '../../../model/generated/delegation.model'
import { NoDelegationFound, TooManyOpenDelegations } from './errors'
import { IsNull, Not } from 'typeorm'

export async function handleUndelegate(ctx: BatchContext<Store, unknown>,
    item: CallItem<'Democracy.undelegate', { call: { args: true; origin: true; } }>,
    header: SubstrateBlock): Promise<void> {
    if (!(item.call as any).success) return
    const wallet = getOriginAccountId(item.call.origin)
    const delegations = await ctx.store.find(Delegation, { where: { wallet, blockNumberEnd: IsNull() } })
    if (delegations.length > 1) {
        ctx.log.warn(TooManyOpenDelegations(header.height, wallet))
    }
    else if (delegations.length === 0) {
        ctx.log.warn(NoDelegationFound(header.height, wallet))
        return
    }
    const delegation = delegations[0]
    delegation.blockNumberEnd = header.height
    await ctx.store.save(delegation)
}
