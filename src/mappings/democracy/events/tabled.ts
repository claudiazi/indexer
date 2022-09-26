import { toHex } from '@subsquid/substrate-processor'
import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { DemocracyProposal, ReferendumOriginType } from '../../../model'
import { ss58codec } from '../../../common/tools'
import { getTabledEventData } from './getters'
import { ReferendumRelation } from '../../../model/generated/referendumRelation.model'
import { MissingDemocracyProposalWarn } from '../../utils/errors'

export async function handleTabled(ctx: EventHandlerContext<Store>) {
    const { index } = getTabledEventData(ctx)

    const relationId = await getRelationId(ctx.store)
    //save a relation
    const democracyProposal = await ctx.store.get(DemocracyProposal, {
        where: {
            index,
        }
    })

    if (!democracyProposal) {
        ctx.log.warn(MissingDemocracyProposalWarn(index))
        return
    }
    const referendumRelation = new ReferendumRelation({
        id: relationId,
        underlying: democracyProposal.id,
        hash: democracyProposal.hash
    })

    await ctx.store.insert(referendumRelation)
}

async function getRelationId(store: Store) {
    const count = await store.count(ReferendumRelation)

    return `${count
        .toString()
        .padStart(8, '0')}`
}