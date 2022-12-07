import { getSubmittedData } from './getters'
import { BatchContext, SubstrateBlock, toHex } from '@subsquid/substrate-processor'
import {
    OpenGovReferendum,
    OpenGovReferendumStatus,
    OpenGovReferendumStatusHistory,
} from '../../../model'
import { Store } from '@subsquid/typeorm-store'
import { getReferendumInfoOf } from '../../../storage/referenda'
import { BalancesTotalIssuanceStorage } from '../../../types/storage'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { getPreimageData } from '../../../storage/preimage'
import { parseProposalCall, ss58codec } from '../../../common/tools'
import { Chain } from '@subsquid/substrate-processor/lib/chain'
import { toJSON } from '@subsquid/util-internal-json'

function decodeProposal(chain: Chain, data: Uint8Array) {
    // @ts-ignore
    return chain.scaleCodec.decodeBinary(chain.description.call, data)
}

export async function handleSubmitted(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Referenda.Submitted', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const { index, track, hash, len } = getSubmittedData(ctx, item.event)
    // get referenda data
    const storageData = await getReferendumInfoOf(ctx, index, header)
    if (!storageData) {
        ctx.log.warn(`Storage doesn't exist for referendum at block ${header.height}`)
        return
    }
    if (storageData.status === 'Finished') {
        ctx.log.warn(`OpenGovReferendum with index ${index} has already finished at block ${header.height}`)
        return
    }

    let status,
        originKind,
        enactmentKind,
        enactmentValue,
        submitted,
        submissionDepositAmount,
        submissionDepositWho,
        decisionDepositAmount,
        decisionDepositWho,
        decidingSince,
        decidingConfirming,
        inQueue,
        ayes,
        nays,
        support,
        alarm
    if (storageData.status === 'Ongoing') {
        ({
            status,
            originKind,
            // originValue: origin.value,
            enactmentKind,
            enactmentValue,
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
        alarm: toJSON(alarm),
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

    await ctx.store.insert(referendum)
}

async function getReferendumId(store: Store) {
    const count = await store.count(OpenGovReferendum)

    return `${count
        .toString()
        .padStart(8, '0')}`
}