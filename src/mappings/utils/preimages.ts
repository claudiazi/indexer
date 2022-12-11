import { BatchContext, SubstrateBlock, toHex } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { getPreimageData } from '../../storage/preimage'
import { parseProposalCall } from '../../common/tools'
import { Chain } from '@subsquid/substrate-processor/lib/chain'

function decodeProposal(chain: Chain, data: Uint8Array) {
    // @ts-ignore
    return chain.scaleCodec.decodeBinary(chain.description.call, data)
}

export async function getPreimageProposalCall(ctx: BatchContext<Store, unknown>, hash: Uint8Array, len: number | undefined, block: SubstrateBlock) {
    if (!len) return
    const preimageData = await getPreimageData(ctx, hash, len, block)
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
        return decodedCall
    } catch (e) {
        ctx.log.warn(`Failed to decode ProposedCall of Preimage ${hexHash} at block ${block.height}:\n ${e}`)
    }
}