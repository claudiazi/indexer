import { lookupArchive } from '@subsquid/archive-registry'
import { SubstrateBatchProcessor } from '@subsquid/substrate-processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import * as modules from './mappings'

const processor = new SubstrateBatchProcessor()
    .setDataSource({
        chain: 'wss://kusama-rpc.polkadot.io',
        archive: lookupArchive('kusama', { release: 'FireSquid' }),
    })
    .setBlockRange({from: 15426831})
    .addCall('System.remark', {
        data: {
            call: {
                origin: true,
                args: true,
            },
        },
        range: {
            from: 14776200
        }
    } as const)
    .addCall('Democracy.vote', {
        data: {
            call: {
                origin: true,
                args: true,
            },
        },
    } as const)
    .addCall('Democracy.remove_vote', {
        data: {
            call: {
                origin: true,
                args: true,
            },
        },
    } as const)
    .addCall('Democracy.remove_other_vote', {
        data: {
            call: {
                origin: true,
                args: true,
            },
        },
    } as const)
    .addEvent('Democracy.Proposed', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Democracy.Started', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Democracy.Passed', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Democracy.NotPassed', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Democracy.Cancelled', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Democracy.Executed', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    
    .addEvent('Democracy.Tabled', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Democracy.PreimageNoted', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Democracy.PreimageUsed', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Democracy.PreimageInvalid', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Democracy.PreimageMissing', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Democracy.PreimageReaped', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Council.Proposed', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Council.Approved', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('TechnicalCommittee.Proposed', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('TechnicalCommittee.Approved', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addCall('Democracy.delegate', {
        data: {
            call: {
                origin: true,
                args: true,
            },
        }
    } as const)
    .addCall('Democracy.undelegate', {
        data: {
            call: {
                origin: true,
                args: true
            },
        }
    } as const)
    .addEvent('Session.NewSession', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('PhragmenElection.NewTerm', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Referenda.Submitted', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Referenda.DecisionStarted', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Referenda.Approved', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Referenda.Cancelled', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Referenda.Confirmed', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Referenda.Rejected', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Referenda.TimedOut', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Referenda.Killed', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Referenda.ConfirmAborted', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    .addEvent('Referenda.ConfirmStarted', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                },
            },
        },
    } as const)
    // .addEvent('Preimage.Noted', {
    //     data: {
    //         event: {
    //             args: true,
    //             extrinsic: {
    //                 hash: true,
    //             },
    //         },
    //     },
    // } as const)
    .addCall('ConvictionVoting.vote', {
        data: {
            call: {
                origin: true,
                args: true,
            },
        },
    } as const)
    .addCall('ConvictionVoting.delegate', {
        data: {
            call: {
                origin: true,
                args: true,
            },
        },
    } as const)
    .addCall('ConvictionVoting.undelegate', {
        data: {
            call: {
                origin: true,
                args: true,
            },
        },
    } as const)
    .addCall('ConvictionVoting.remove_vote', {
        data: {
            call: {
                origin: true,
                args: true,
            },
        },
    } as const)
    .addCall('ConvictionVoting.remove_other_vote', {
        data: {
            call: {
                origin: true,
                args: true,
            },
        },
    } as const)
    

processor.run(new TypeormDatabase(), async (ctx) => {
    for (let block of ctx.blocks) {
        for (let item of block.items) {
            if (item.kind === 'call') {
                if (item.name == 'System.remark') {
                    await modules.system.extrinsics.handleRemark(ctx, item, block.header)
                }
                if (item.name == 'Democracy.vote') {
                    await modules.democracy.extrinsics.handleVote(ctx, item, block.header)
                }
                if (item.name == 'Democracy.remove_vote') {
                    await modules.democracy.extrinsics.handleRemoveVote(ctx, item, block.header)
                }
                if (item.name == 'Democracy.remove_other_vote') {
                    await modules.democracy.extrinsics.handleRemoveOtherVote(ctx, item, block.header)
                }
                if (item.name == 'Democracy.delegate') {
                    await modules.democracy.extrinsics.handleDelegate(ctx, item, block.header)
                }
                if (item.name == 'Democracy.undelegate') {
                    await modules.democracy.extrinsics.handleUndelegate(ctx, item, block.header)
                }
                if (item.name == 'ConvictionVoting.vote') {
                    await modules.convictionVoting.extrinsics.handleVote(ctx, item, block.header)
                }
                if (item.name == 'ConvictionVoting.delegate') {
                    await modules.convictionVoting.extrinsics.handleDelegate(ctx, item, block.header)
                }
                if (item.name == 'ConvictionVoting.undelegate') {
                    await modules.convictionVoting.extrinsics.handleUndelegate(ctx, item, block.header)
                }
                if (item.name == 'ConvictionVoting.remove_vote') {
                    await modules.convictionVoting.extrinsics.handleRemoveVote(ctx, item, block.header)
                }
                if (item.name == 'ConvictionVoting.remove_other_vote') {
                    await modules.convictionVoting.extrinsics.handleRemoveOtherVote(ctx, item, block.header)
                }
            }
            if (item.kind === 'event') {
                if (item.name == 'Democracy.Proposed') {
                    await modules.democracy.events.handleProposed(ctx, item, block.header)
                }  
                if (item.name == 'Democracy.Started') {
                    await modules.democracy.events.handleStarted(ctx, item, block.header)
                }
                if (item.name == 'Democracy.Passed') {
                    await modules.democracy.events.handlePassed(ctx, item, block.header)
                }
                if (item.name == 'Democracy.NotPassed') {
                    await modules.democracy.events.handleNotPassed(ctx, item, block.header)
                }
                if (item.name == 'Democracy.Cancelled') {
                    await modules.democracy.events.handleCancelled(ctx, item, block.header)
                }
                if (item.name == 'Democracy.Executed') {
                    await modules.democracy.events.handleExecuted(ctx, item, block.header)
                }
                if (item.name == 'Democracy.Tabled') {
                    await modules.democracy.events.handleTabled(ctx, item, block.header)
                }
                if (item.name == 'Democracy.PreimageNoted') {
                    await modules.democracy.events.handlePreimageNoted(ctx, item, block.header)
                }
                if (item.name == 'Democracy.PreimageUsed') {
                    await modules.democracy.events.handlePreimageUsed(ctx, item, block.header)
                }
                if (item.name == 'Democracy.PreimageInvalid') {
                    await modules.democracy.events.handlePreimageInvalid(ctx, item, block.header)
                }
                if (item.name == 'Democracy.PreimageMissing') {
                    await modules.democracy.events.handlePreimageMissing(ctx, item, block.header)
                }
                if (item.name == 'Democracy.PreimageReaped') {
                    await modules.democracy.events.handlePreimageReaped(ctx, item, block.header)
                }
                if (item.name == 'Council.Proposed') {
                    await modules.council.events.handleProposed(ctx, item, block.header)
                }
                if (item.name == 'Council.Approved') {
                    await modules.council.events.handleApproved(ctx, item, block.header)
                }
                if (item.name == 'TechnicalCommittee.Proposed') {
                    await modules.techComittee.events.handleProposed(ctx, item, block.header)
                }
                if (item.name == 'TechnicalCommittee.Approved') {
                    await modules.techComittee.events.handleApproved(ctx, item, block.header)
                }
                if (item.name == 'Session.NewSession') {
                    await modules.session.events.handleNewSession(ctx, item, block.header)
                }
                if (item.name == 'PhragmenElection.NewTerm') {
                    await modules.election.events.handleNewTerm(ctx, item, block.header)
                }
                if (item.name == 'Referenda.Submitted') {
                    await modules.referenda.events.handleSubmitted(ctx, item, block.header)
                }
                if (item.name == 'Referenda.DecisionStarted') {
                    await modules.referenda.events.handleDecisionStarted(ctx, item, block.header)
                }
                // if (item.name == 'Preimage.Noted') {
                //     await modules.preimage.events.handleNoted(ctx, item, block.header)
                // }
                if (item.name == 'Referenda.Approved') {
                    await modules.referenda.events.handleApproved(ctx, item, block.header)
                }
                if (item.name == 'Referenda.Cancelled') {
                    await modules.referenda.events.handleCancelled(ctx, item, block.header)
                }
                if (item.name == 'Referenda.Confirmed') {
                    await modules.referenda.events.handleConfirmed(ctx, item, block.header)
                }
                if (item.name == 'Referenda.Rejected') {
                    await modules.referenda.events.handleRejected(ctx, item, block.header)
                }
                if (item.name == 'Referenda.TimedOut') {
                    await modules.referenda.events.handleTimedOut(ctx, item, block.header)
                }
                if (item.name == 'Referenda.Killed') {
                    await modules.referenda.events.handleKilled(ctx, item, block.header)
                }
                if (item.name == 'Referenda.ConfirmStarted') {
                    await modules.referenda.events.handleConfirmStarted(ctx, item, block.header)
                }
                if (item.name == 'Referenda.ConfirmAborted') {
                    await modules.referenda.events.handleConfirmAborted(ctx, item, block.header)
                }
            }
        }
    }
})