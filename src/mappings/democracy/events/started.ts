import { EventHandlerContext, toHex } from '@subsquid/substrate-processor'
import {
    CouncilMotion,
    DemocracyProposal,
    Preimage,
    Referendum,
    ReferendumOriginType,
    ReferendumStatus,
    ReferendumStatusHistory,
    ReferendumThreshold,
    ReferendumThresholdType,
    TechCommitteeMotion,
} from '../../../model'
import { Store } from '@subsquid/typeorm-store'
import { getStartedData } from './getters'
import { getReferendumInfoOf } from '../../../storage/democracy'
import { BalancesTotalIssuanceStorage } from '../../../types/storage'
import { ReferendumRelation } from '../../../model/generated/referendumRelation.model'
import { MissingReferendumRelationWarn } from '../../utils/errors'
import { NoRecordExistsWarn } from '../../../common/errors'

export async function handleStarted(ctx: EventHandlerContext<Store>) {
    const { index, threshold } = getStartedData(ctx)

    const storageData = await getReferendumInfoOf(ctx, index)
    if (!storageData) return

    if (storageData.status === 'Finished') {
        ctx.log.warn(`Referendum with index ${index} has already finished at block ${ctx.block.height}`)
        return
    }

    let delay, end
    if (storageData.status === 'Ongoing') {
        ({ delay, end } = storageData)
    }

    const { hash } = storageData
    const id = await getReferendumId(ctx.store)

    const preimage = await ctx.store.get(Preimage, { where: { hash: toHex(hash) } })

    const referendum = new Referendum({
        id,
        index,
        hash: toHex(hash),
        threshold: new ReferendumThreshold({
            type: threshold as ReferendumThresholdType,
        }),
        status: ReferendumStatus.Started,
        statusHistory: [],
        createdAtBlock: ctx.block.height,
        createdAt: new Date(ctx.block.timestamp),
        totalIssuance: await new BalancesTotalIssuanceStorage(ctx).getAsV1020() || 0n,
        preimage,
        delay,
        endsAt: end
    })

    referendum.statusHistory.push(
        new ReferendumStatusHistory({
            block: referendum.createdAtBlock,
            timestamp: referendum.createdAt,
            status: referendum.status,
        })
    )
    await ctx.store.insert(referendum)
    //update relation
    const referendumRelation = await ctx.store.get(ReferendumRelation, {
        where: {
            referendumId: undefined,
            proposalHash: toHex(hash)
        }, order: {
            id: 'DESC',
        }
    })
    if (!referendumRelation) {
        ctx.log.warn(MissingReferendumRelationWarn(index))
        return
    }

    let proposer

    switch (referendumRelation.underlyingType) {
        case ReferendumOriginType.DemocracyProposal:
            const democracyProposal = await ctx.store.get(DemocracyProposal, {
                where: {
                    id: referendumRelation.underlyingId
                }
            })
            if (!democracyProposal) {
                ctx.log.warn(NoRecordExistsWarn(ReferendumOriginType.DemocracyProposal, referendumRelation.underlyingId))
                return
            }
            proposer = democracyProposal.proposer
            break;
        case ReferendumOriginType.CouncilMotion:
            const councilMotion = await ctx.store.get(CouncilMotion, {
                where: {
                    id: referendumRelation.underlyingId
                }
            })
            if (!councilMotion) {
                ctx.log.warn(NoRecordExistsWarn(ReferendumOriginType.CouncilMotion, referendumRelation.underlyingId))
                return
            }
            proposer = councilMotion.proposer
            break;
        case ReferendumOriginType.TechCommitteeMotion:
            const techCommitteeMotion = await ctx.store.get(TechCommitteeMotion, {
                where: {
                    id: referendumRelation.underlyingId
                }
            })
            if (!techCommitteeMotion) {
                ctx.log.warn(NoRecordExistsWarn(ReferendumOriginType.TechCommitteeMotion, referendumRelation.underlyingId))
                return
            }
            proposer = techCommitteeMotion.proposer
            break;
    }

    referendumRelation.referendumIndex = index
    referendumRelation.referendumId = id
    await ctx.store.save(referendumRelation)
}

async function getReferendumId(store: Store) {
    const count = await store.count(Referendum)

    return `${Buffer.from('referendum').toString('hex').slice(0, 8).padEnd(8, '0')}-${count
        .toString()
        .padStart(8, '0')}`
}
