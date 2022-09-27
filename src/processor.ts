import { lookupArchive } from '@subsquid/archive-registry'
import { SubstrateProcessor } from '@subsquid/substrate-processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import * as modules from './mappings'
const db = new TypeormDatabase()
const processor = new SubstrateProcessor(db)

processor.setBatchSize(500)
processor.setDataSource({
    chain: 'wss://kusama.api.onfinality.io/public-ws',
    archive: lookupArchive('kusama', { release: 'FireSquid' }),
})

processor.addEventHandler('Democracy.Proposed', modules.democracy.events.handleProposed)
processor.addEventHandler('Democracy.Started', modules.democracy.events.handleStarted)
processor.addEventHandler('Democracy.Passed', modules.democracy.events.handlePassed)
processor.addEventHandler('Democracy.NotPassed', modules.democracy.events.handleNotPassed)
processor.addEventHandler('Democracy.Cancelled', modules.democracy.events.handleCancelled)
processor.addEventHandler('Democracy.Executed', modules.democracy.events.handleExecuted)
processor.addEventHandler('Democracy.Tabled', modules.democracy.events.handleTabled)
processor.addCallHandler('Democracy.vote', modules.democracy.extrinsics.handleVote)

processor.addEventHandler('Democracy.PreimageNoted', modules.democracy.events.handlePreimageNoted)
processor.addEventHandler('Democracy.PreimageUsed', modules.democracy.events.handlePreimageUsed)
processor.addEventHandler('Democracy.PreimageInvalid', modules.democracy.events.handlePreimageInvalid)
processor.addEventHandler('Democracy.PreimageMissing', modules.democracy.events.handlePreimageMissing)
processor.addEventHandler('Democracy.PreimageReaped', modules.democracy.events.handlePreimageReaped)

processor.addEventHandler('Council.Proposed', modules.council.events.handleProposed)
processor.addEventHandler('Council.Approved', modules.council.events.handleApproved)

processor.addEventHandler('TechnicalCommittee.Proposed', modules.techComittee.events.handleProposed)
processor.addEventHandler('TechnicalCommittee.Approved', modules.techComittee.events.handleApproved)

processor.run()
