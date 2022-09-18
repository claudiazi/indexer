import {EventHandlerContext} from '@subsquid/substrate-processor'
import {Store} from '@subsquid/typeorm-store'
import { Referendum, ReferendumStatus, ReferendumStatusHistory } from '../../model'
import { BalancesTotalIssuanceStorage } from '../../types/storage'
import {MissingReferendumWarn} from '../utils/errors'
import {updateReferendum} from '../utils/proposals'
import { getPassedData } from './getters'

export async function handlePassed(ctx: EventHandlerContext<Store>) {
    const index = getPassedData(ctx)

    const storageTotalIssuance = new BalancesTotalIssuanceStorage(ctx)
    const totalIssuance = (await storageTotalIssuance.getAsV1020()).toString()

    await updateReferendum(ctx, index, ReferendumStatus.Passed, totalIssuance)
}
