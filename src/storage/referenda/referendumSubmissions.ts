import { UnknownVersionError } from '../../common/errors'
import { ReferendaReferendumInfoForStorage } from '../../types/storage'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'

// interface ReferendumSubmissionStorageData {
//     index: number
//     hash: Uint8Array
//     proposer: Uint8Array
// }

// async function getStorageData(ctx: BatchContext<Store, unknown>, index: number, block: SubstrateBlock): Promise<ReferendumSubmissionStorageData[] | undefined> {
//     const storage = new ReferendaReferendumInfoForStorage(ctx, block)
//     if (storage.isV9320) {
//         const storageData = await storage.asV9320.get(index)
//         if (!storageData) return undefined

//         // return storageData.map((proposal): ReferendumSubmissionStorageData => {
//         const { proposalData, proposer } = storageData
//         let hash
//         switch (proposalData.__kind) {
//             case "Legacy":
//                 hash = proposalData.hash
//                 break;
//             case "Inline":
//                 hash = proposalData.value
//                 break;
//             case "Lookup":
//                 hash = proposalData.hash
//                 break;
//         }
//         return {
//             index,
//             hash,
//             proposer,
//         }
//         // })
//     }
//     else {
//         throw new UnknownVersionError(storage.constructor.name)
//     }
// }

// export async function getReferendumSubmissions(ctx: BatchContext<Store, unknown>, block: SubstrateBlock) {
//     return await getStorageData(ctx, block)
// }
