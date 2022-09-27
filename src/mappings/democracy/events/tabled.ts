import { EventHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { DemocracyProposal, ReferendumOriginType } from '../../../model'
import { getTabledEventData } from './getters'
import { ReferendumRelation } from '../../../model/generated/referendumRelation.model'
import { NoRecordExistsWarn } from '../../../common/errors'

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
        ctx.log.warn(NoRecordExistsWarn(ReferendumOriginType.DemocracyProposal, index))
        return
    }
    const referendumRelation = new ReferendumRelation({
        id: relationId,
        underlyingId: democracyProposal.id,
        underlyingIndex: democracyProposal.index,
        proposer: democracyProposal.proposer,
        proposalHash: democracyProposal.proposalHash,
        underlyingType: ReferendumOriginType.DemocracyProposal
    })

    await ctx.store.insert(referendumRelation)
}

async function getRelationId(store: Store) {
    const count = await store.count(ReferendumRelation)

    return `${count
        .toString()
        .padStart(8, '0')}`
}