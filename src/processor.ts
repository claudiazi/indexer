import { lookupArchive } from '@subsquid/archive-registry'
import { SubstrateProcessor } from '@subsquid/substrate-processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import {
    handleCancelled,
    handleExecuted,
    handleNotPassed,
    handlePassed,
    handlePreimageInvalid,
    handlePreimageMissing,
    handlePreimageNoted,
    handlePreimageReaped,
    handlePreimageUsed,
    handleStarted,
    handleVote,
} from './mappings'

const db = new TypeormDatabase()
const processor = new SubstrateProcessor(db)

processor.setBatchSize(500)
processor.setDataSource({
    chain: 'wss://kusama.api.onfinality.io/public-ws',
    archive: lookupArchive('kusama', { release: 'FireSquid' }),
})

processor.addEventHandler('Democracy.Started', handleStarted)
processor.addEventHandler('Democracy.Passed', handlePassed)
processor.addEventHandler('Democracy.NotPassed', handleNotPassed)
processor.addEventHandler('Democracy.Cancelled', handleCancelled)
processor.addEventHandler('Democracy.Executed', handleExecuted)
processor.addCallHandler('Democracy.vote', handleVote)

processor.addEventHandler('Democracy.PreimageNoted', handlePreimageNoted)
processor.addEventHandler('Democracy.PreimageUsed', handlePreimageUsed)
processor.addEventHandler('Democracy.PreimageInvalid', handlePreimageInvalid)
processor.addEventHandler('Democracy.PreimageMissing', handlePreimageMissing)
processor.addEventHandler('Democracy.PreimageReaped', handlePreimageReaped)

processor.run()
