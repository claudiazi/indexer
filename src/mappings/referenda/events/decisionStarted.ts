import { BatchContext, SubstrateBlock, toHex } from '@subsquid/substrate-processor'
import {
    CouncilMotion,
    DemocracyProposal,
    Preimage,
    OpenGovReferendum,
    ReferendumOriginType,
    OpenGovReferendumStatus,
    OpenGovReferendumStatusHistory,
    ReferendumThreshold,
    ReferendumThresholdType,
    TechCommitteeMotion,
} from '../../../model'
import { Store } from '@subsquid/typeorm-store'
import { getDecisionStartedData } from './getters'
import { getReferendumInfoOf } from '../../../storage/referenda'
import { BalancesTotalIssuanceStorage } from '../../../types/storage'
import { ReferendumRelation } from '../../../model/generated/referendumRelation.model'
import { MissingReferendumRelationWarn } from '../../utils/errors'
import { NoRecordExistsWarn } from '../../../common/errors'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { getPreimageData } from '../../../storage/preimage'
import { parseProposalCall, ss58codec } from '../../../common/tools'
import { Chain } from '@subsquid/substrate-processor/lib/chain'
import { toJSON } from '@subsquid/util-internal-json'

function decodeProposal(chain: Chain, data: Uint8Array) {
    // @ts-ignore
    return chain.scaleCodec.decodeBinary(chain.description.call, data)
}

export async function handleDecisionStarted(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Referenda.DecisionStarted', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    let { index, track, hash, ayes, nays, support } = getDecisionStartedData(ctx, item.event)

    const storageData = await getReferendumInfoOf(ctx, index, header)
    if (!storageData) return

    if (storageData.status === 'Finished') {
        ctx.log.warn(`Referendum with index ${index} has already finished at block ${header.height}`)
        return
    }

    let status,
        originKind,
        enactmentKind,
        enactmentValue,
        len,
        submitted,
        submissionDepositAmount,
        submissionDepositWho,
        decisionDepositAmount,
        decisionDepositWho,
        decidingSince,
        decidingConfirming,
        inQueue,
        alarm
    if (storageData.status === 'Ongoing') {
        ({
            status,
            originKind,
            // originValue: origin.value,
            enactmentKind,
            enactmentValue,
            hash,
            len,
            submitted,
            submissionDepositAmount,
            submissionDepositWho,
            decisionDepositAmount,
            decisionDepositWho,
            decidingSince,
            decidingConfirming,
            ayes,
            nays,
            support,
            inQueue,
            alarm
        } = storageData)
    }

    // const { hash } = storageData
    const id = await getReferendumId(ctx.store)

    // const openGovReferendumId = await ctx.store.count(OpenGovReferendum)

    // const preimage = await ctx.store.get(Preimage, { where: { hash: toHex(hash), len } })

    //lookup preimagestorage
    if (!len) {
        //print some error
        return
    }
    const preimageData = await getPreimageData(ctx, hash, len, header)
    if (!preimageData) return
    let decodedCall:
        | {
            section: string
            method: string
            description: string
            args: Record<string, unknown>
        }
        | undefined

    const hexHash = toHex(hash)

    try {
        const preimage = decodeProposal(ctx._chain as Chain, preimageData.data)

        decodedCall = parseProposalCall(ctx._chain, preimage)
    } catch (e) {
        ctx.log.warn(`Failed to decode ProposedCall of Preimage ${hexHash} at block ${header.height}:\n ${e}`)
    }
    const referendum = new OpenGovReferendum({
        id,
        index,
        status: OpenGovReferendumStatus.DecisionStarted,
        track,
        originKind,
        enactmentKind,
        enactmentValue,
        hash: toHex(hash),
        len,
        submitted,
        submissionDepositAmount,
        submissionDepositWho: submissionDepositWho ? ss58codec.encode(submissionDepositWho) : undefined,
        decisionDepositAmount,
        decisionDepositWho: decisionDepositWho ? ss58codec.encode(decisionDepositWho) : undefined,
        decidingSince,
        decidingConfirming,
        ayes,
        nays,
        support,
        inQueue,
        // alarm,
        statusHistory: [],
        createdAtBlock: header.height,
        createdAt: new Date(header.timestamp),
        totalIssuance: await new BalancesTotalIssuanceStorage(ctx, header).asV1020.get() || 0n,
        preimageSection: decodedCall?.section,
        preimageMethod: decodedCall?.method,
        preimageDescription: decodedCall?.description,
        preimageArgs: toJSON(decodedCall?.args)
    })

    referendum.statusHistory.push(
        new OpenGovReferendumStatusHistory({
            block: referendum.createdAtBlock,
            timestamp: referendum.createdAt,
            status: referendum.status,
        })
    )

    // //update relation
    // const referendumRelation = await ctx.store.get(ReferendumRelation, {
    //     where: {
    //         referendumId: undefined,
    //         proposalHash: toHex(hash)
    //     }, order: {
    //         id: 'DESC',
    //     }
    // })
    // if (!referendumRelation) {
    //     ctx.log.warn(MissingReferendumRelationWarn(index))
    //     return
    // }

    // let proposer

    // switch (referendumRelation.underlyingType) {
    //     case ReferendumOriginType.DemocracyProposal:
    //         const democracyProposal = await ctx.store.get(DemocracyProposal, {
    //             where: {
    //                 id: referendumRelation.underlyingId
    //             }
    //         })
    //         if (!democracyProposal) {
    //             ctx.log.warn(NoRecordExistsWarn(ReferendumOriginType.DemocracyProposal, referendumRelation.underlyingId))
    //             return
    //         }
    //         proposer = democracyProposal.proposer
    //         break;
    //     case ReferendumOriginType.CouncilMotion:
    //         const councilMotion = await ctx.store.get(CouncilMotion, {
    //             where: {
    //                 id: referendumRelation.underlyingId
    //             }
    //         })
    //         if (!councilMotion) {
    //             ctx.log.warn(NoRecordExistsWarn(ReferendumOriginType.CouncilMotion, referendumRelation.underlyingId))
    //             return
    //         }
    //         proposer = councilMotion.proposer
    //         break;
    //     case ReferendumOriginType.TechCommitteeMotion:
    //         const techCommitteeMotion = await ctx.store.get(TechCommitteeMotion, {
    //             where: {
    //                 id: referendumRelation.underlyingId
    //             }
    //         })
    //         if (!techCommitteeMotion) {
    //             ctx.log.warn(NoRecordExistsWarn(ReferendumOriginType.TechCommitteeMotion, referendumRelation.underlyingId))
    //             return
    //         }
    //         proposer = techCommitteeMotion.proposer
    //         break;
    // }

    // referendumRelation.referendumIndex = index
    // referendumRelation.referendumId = id
    // referendum.proposer = proposer
    await ctx.store.insert(referendum)
    // await ctx.store.save(referendumRelation)
}

async function getReferendumId(store: Store) {
    const count = await store.count(OpenGovReferendum)

    return `${count
        .toString()
        .padStart(8, '0')}`
}
