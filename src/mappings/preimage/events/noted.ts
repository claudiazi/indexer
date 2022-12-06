/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BatchContext, SubstrateBlock, toHex } from '@subsquid/substrate-processor'
import { parseProposalCall, ss58codec } from '../../../common/tools'
import { Chain } from '@subsquid/substrate-processor/lib/chain'
import { getPreimageNotedData } from './getters'
import { Store } from '@subsquid/typeorm-store'
import { Preimage, PreimageStatus, PreimageStatusHistory, ProposedCall, Referendum } from '../../../model'
import { toJSON } from '@subsquid/util-internal-json'
// import { getPreimageData } from '../../../storage/referenda'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'

function decodeProposal(chain: Chain, data: Uint8Array) {
    // @ts-ignore
    return chain.scaleCodec.decodeBinary(chain.description.call, data)
}

export async function handleNoted(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Preimage.Noted', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {

    const { hash } = getPreimageNotedData(ctx, item.event)
    const hexHash = toHex(hash)

    // const storageData = await getPreimageData(ctx, hash, header)
    // ctx.log.warn(`hello2 ${storageData}`)
    // if (!storageData) return

    // let decodedCall:
    //     | {
    //         section: string
    //         method: string
    //         description: string
    //         args: Record<string, unknown>
    //     }
    //     | undefined

    // try {
    //     const preimage = decodeProposal(ctx._chain as Chain, storageData.data)
    //     ctx.log.warn(`hello, ${preimage}`)

    //     decodedCall = parseProposalCall(ctx._chain, preimage)
    // } catch (e) {
    //     ctx.log.warn(`Failed to decode ProposedCall of Preimage ${hexHash} at block ${header.height}:\n ${e}`)
    // }

    // // const proposer = ss58codec.encode(provider)

    // const id = await getPreimageId(ctx.store)

    // const preimage = new Preimage({
    //     id,
    //     hash: toHex(hash),
    //     // proposer,
    //     // deposit,
    //     status: PreimageStatus.Noted,
    //     statusHistory: [],
    //     proposedCall: decodedCall ? createProposedCall(decodedCall) : null,
    //     createdAtBlock: header.height,
    //     createdAt: new Date(header.timestamp),
    // })

    // preimage.statusHistory.push(
    //     new PreimageStatusHistory({
    //         block: preimage.createdAtBlock,
    //         timestamp: preimage.createdAt,
    //         status: preimage.status,
    //     })
    // )
    // await ctx.store.insert(preimage)

    // const referendums = await ctx.store.find(Referendum, { where: { hash: toHex(hash) } })
    // referendums.forEach((r) => (r.preimage = preimage))

    // await ctx.store.save(referendums)
}

async function getPreimageId(store: Store) {
    const count = await store.count(Preimage)

    return `${Buffer.from('preimage').toString('hex').slice(0, 8).padEnd(8, '0')}-${count.toString().padStart(8, '0')}`
}

function createProposedCall(data: any): ProposedCall {
    return new ProposedCall(toJSON(data))
}
