import { Question } from '../../../model/generated/question.model'
import { Distribution } from '../../../model/generated/distribution.model'
import { Config } from '../../../model/generated/config.model'
import { Option } from '../../../model/generated/option.model'
import { Resource } from '../../../model/generated/resource.model'
import { Quiz } from '../../../model/generated/quiz.model'
import { SystemRemarkCall } from '../../../types/calls'
import { getOriginAccountId } from '../../../common/tools'
import { MissingConfigWarn, MissingOptionWarn, MissingQuestionWarn, MissingQuizVersionWarn, MissingQuizWarn, MissingReferendumWarn } from '../../utils/errors'
import { AnswerOption } from '../../../model/generated/answerOption.model'
import { Referendum } from '../../../model'
import { QuizSubmission } from '../../../model/generated/quizSubmission.model'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CallItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'

interface ResourceData {
    optionId: string
    option: OptionData
    name: string
    main: string
    thumb: string
    text: string
    artist: string
    creativeDirector: string
    rarity: string
    itemName: string
    slot: string
    title: string
}

interface OptionData {
    configId: string
    config: ConfigData
    transferable: number
    symbol: string
    text: string
    artist: string
    creativeDirector: string
    rarity: string
    itemName: string
    royalty: number[]
    resources: ResourceData[]
}

interface ConfigData {
    referendumIndex: number
    min: string
    max: string
    first: string
    blockCutOff: string
    directOnly: boolean
    createNewCollection: boolean
    newCollectionSymbol: string
    newCollectionPath: string
    newCollectionFile: string
    newCollectionName: string
    newCollectionDescription: string
    makeEquippable: [string]
    babyBonus: number
    toddlerBonus: number
    adolescentBonus: number
    adultBonus: number
    minAmount: string
    seed: string
    default: OptionData
    options: OptionData[]
}

interface AnswerOptions {
    text: string
}

interface QuestionData {
    text: string
    answerOptions: AnswerOptions[]
}

interface QuizData {
    questions: QuestionData[]
}

interface AnswerData {
    quizVersion: number
    answers: number[]
}

export async function handleRemark(ctx: BatchContext<Store, unknown>,
    item: CallItem<'System.remark', { call: { args: true; origin: true } }>,
    header: SubstrateBlock): Promise<void> {
// export async function remarkHandler(ctx: CallHandlerContext<Store, { call: { args: true; origin: true } }>): Promise<void> {
    const message = new SystemRemarkCall(ctx, item.call).asV1020.remark.toString()
    if (!isProofOfChaosMessage(message)) return

    const originAccountId = getOriginAccountId(item.call.origin)

    if (originAccountId == null) return
    const args = message.split('::')
    switch (args[2]) {
        case 'LUCK':
            if (isValidAddress(originAccountId) && header.height < 14594438) {
                const distributionData = JSON.parse(args[3])
                const distributionVersion = await getDistributionVersion(ctx, parseInt(args[1]))
                for (const dist of distributionData) {
                    const count = await getDistributionCount(ctx, parseInt(args[1]), distributionVersion)
                    const distribution = new Distribution({
                        id: `${args[1]}-${distributionVersion}-${count.toString().padStart(8, '0')}`,
                        blockNumber: header.height,
                        distributionVersion,
                        referendumIndex: parseInt(args[1]),
                        wallet: dist[3],
                        amountConsidered: BigInt(dist[0]),
                        indexItemReceived: parseInt(dist[2]),
                        chanceAtItem: parseInt(dist[1]),
                        dragonEquipped: null,
                        timestamp: new Date(header.timestamp),
                    })
                    await ctx.store.insert(distribution)
                }
            }
            return
        case 'DISTRIBUTION':
            if (isValidAddress(originAccountId) && header.height >= 14594438) {
                const distributionData = JSON.parse(args[3])
                const distributionVersion = await getDistributionVersion(ctx, parseInt(args[1]))
                for (const dist of distributionData) {
                    const count = await getDistributionCount(ctx, parseInt(args[1]), distributionVersion)
                    const distribution = new Distribution({
                        id: `${args[1]}-${distributionVersion}-${count.toString().padStart(8, '0')}`,
                        blockNumber: header.height,
                        distributionVersion,
                        referendumIndex: parseInt(args[1]),
                        wallet: dist.wallet,
                        amountConsidered: BigInt(dist.amountConsidered),
                        indexItemReceived: parseInt(dist.selectedIndex),
                        chanceAtItem: parseInt(dist.chance),
                        dragonEquipped: dist.dragonEquipped,
                        timestamp: new Date(header.timestamp),
                    })
                    await ctx.store.insert(distribution)
                }
            }
            return
        case 'SETTINGS':
        case 'CONFIG':
            if (isValidAddress(originAccountId)) {
                //break quiz apart
                const configData: ConfigData = JSON.parse(args[3])
                const version = await getConfigVersion(ctx, parseInt(args[1]))
                const { min,
                    max,
                    first,
                    blockCutOff,
                    directOnly,
                    createNewCollection,
                    newCollectionSymbol,
                    newCollectionPath,
                    newCollectionFile,
                    newCollectionName,
                    newCollectionDescription,
                    makeEquippable,
                    babyBonus,
                    toddlerBonus,
                    adolescentBonus,
                    adultBonus,
                    minAmount,
                    seed } = configData

                const configId = `${args[1]}-${version.toString().padStart(8, '0')}`

                const config = new Config({
                    id: configId,
                    blockNumber: header.height,
                    referendumIndex: parseInt(args[1]),
                    version,
                    min,
                    max,
                    first,
                    blockCutOff,
                    directOnly,
                    createNewCollection,
                    newCollectionSymbol,
                    newCollectionPath,
                    newCollectionFile,
                    newCollectionName,
                    newCollectionDescription,
                    makeEquippable,
                    babyBonus,
                    toddlerBonus,
                    adolescentBonus,
                    adultBonus,
                    minAmount: parseInt(minAmount),
                    seed,
                    timestamp: new Date(header.timestamp),
                })
                await ctx.store.insert(config)
                const configDb = await ctx.store.get(Config, { where: { id: configId } })
                if (!configDb) {
                    ctx.log.warn(MissingConfigWarn(configId))
                    return
                }
                //save options
                const allOptions: OptionData[] = [...configData.options, configData.default]
                for (const opt of allOptions) {
                    const {
                        transferable,
                        symbol,
                        text,
                        artist,
                        creativeDirector,
                        rarity,
                        itemName,
                        royalty } = opt
                    const optionCount = await getOptionCount(ctx, configDb.id)
                    const optionId = `${configDb.id}-${optionCount.toString().padStart(8, '0')}`
                    const option = new Option({
                        id: optionId,
                        configId: configDb.id,
                        config: configDb,
                        transferable,
                        symbol,
                        text,
                        artist,
                        creativeDirector,
                        rarity,
                        itemName,
                        royaltyMin: royalty[0],
                        royaltyMax: royalty[1],
                        isDefault: opt === configData.default
                    })

                    await ctx.store.insert(option)

                    const optionDb = await ctx.store.get(Option, { where: { id: optionId } })

                    if (!optionDb) {
                        ctx.log.warn(MissingOptionWarn(optionId))
                        return
                    }

                    for (const res of opt.resources) {
                        const {
                            name,
                            main,
                            thumb,
                            text,
                            artist,
                            creativeDirector,
                            rarity,
                            itemName,
                            slot,
                            title } = res

                        const resourceCount = await getResourceCount(ctx, optionDb.id)
                        const resourceId = `${optionDb.id}-${resourceCount.toString().padStart(8, '0')}`

                        const resource = new Resource({
                            id: resourceId,
                            optionId: optionDb.id,
                            option: optionDb,
                            name,
                            main,
                            thumb,
                            text,
                            artist,
                            creativeDirector,
                            rarity,
                            itemName,
                            slot,
                            title
                        })
                        await ctx.store.insert(resource)
                    }
                }
            }
            return
        case 'QUIZ':
            //check that quiz author is proposer/ proofofchaos
            if (isValidAddress(originAccountId)) {
                const quizData: QuizData = JSON.parse(args[3])
                const version = await getQuizVersion(ctx, parseInt(args[1]))
                const quizId = `${args[1]}-${version.toString().padStart(8, '0')}`
                const quiz = new Quiz({
                    id: quizId,
                    blockNumber: header.height,
                    referendumIndex: parseInt(args[1]),
                    creator: originAccountId,
                    version,
                    timestamp: new Date(header.timestamp),
                })
                await ctx.store.insert(quiz)
                const quizDb = await ctx.store.get(Quiz, { where: { id: quizId } })
                if (!quizDb) {
                    ctx.log.warn(MissingQuizWarn(quizId))
                    return
                }
                for (const q of quizData.questions) {
                    const questionCount = await getQuestionCount(ctx, quizDb.id)
                    const questionId = `${quizDb.id}-${questionCount.toString().padStart(8, '0')}`
                    const question = new Question({
                        id: questionId,
                        quizId: quizDb.id,
                        quiz: quiz,
                        text: q.text
                    })
                    await ctx.store.insert(question)
                    const questionDb = await ctx.store.get(Question, { where: { id: questionId } })
                    if (!questionDb) {
                        ctx.log.warn(MissingQuestionWarn(questionId))
                        return
                    }
                    for (const a of q.answerOptions) {
                        const answerCount = await getAnswerCount(ctx, questionDb.id)
                        const answerId = `${questionDb.id}-${answerCount.toString().padStart(8, '0')}`
                        const answerOption = new AnswerOption({
                            id: answerId,
                            questionId: questionDb.id,
                            question: questionDb,
                            text: a.text
                        })
                        await ctx.store.insert(answerOption)
                    }
                }
            }

            return
        case 'ANSWERS':
            //check that answer block is before ref end and after ref start
            const referendum = await ctx.store.get(Referendum, { where: { id: args[1] } })
            if (!referendum) {
                ctx.log.warn(MissingReferendumWarn(args[1]))
                return
            }
            if (referendum.endsAt && header.height < referendum.endsAt) {
                const answerData: AnswerData = JSON.parse(args[3])
                const quizDb = await ctx.store.get(Quiz, { where: { referendumIndex: parseInt(args[1]), version: answerData.quizVersion } })
                if (!quizDb) {
                    ctx.log.warn(MissingQuizVersionWarn(args[1], answerData.quizVersion))
                    return
                }
                const submissionVersion = await getSubmissionVersion(ctx, parseInt(args[1]), originAccountId)
                //getsubmissioncount for version
                const submissionCount = await getSubmissionCount(ctx, parseInt(args[1]), answerData.quizVersion)
                const submissionId = `${args[1]}-${answerData.quizVersion}-${submissionVersion.toString().padStart(8, '0')}`

                const submission = new QuizSubmission({
                    id: submissionId,
                    referendumIndex: parseInt(args[1]),
                    blockNumber: header.height,
                    quizVersion: answerData.quizVersion,
                    version: submissionCount,
                    answers: answerData.answers,
                    timestamp: new Date(header.timestamp)
                })
                await ctx.store.insert(submission)
            }
            return
        case 'CORRECTANSWERS':
            //check that answer writer is proposer/ proofofchaos
            //write correct answer to quiz versions
            if (isValidAddress(originAccountId)) {
                const quizVersion = parseInt(args[3])
                const correctAnswers = JSON.parse(args[4])
                const quizDb = await ctx.store.get(Quiz, { where: { referendumIndex: parseInt(args[1]), version: quizVersion } })
                if (!quizDb) {
                    ctx.log.warn(MissingQuizVersionWarn(args[1], quizVersion))
                    return
                }
                if (quizDb.questions.length != correctAnswers.length) {
                    return
                }
                for (var i = 0; i < quizDb.questions.length; i++) {
                    quizDb.questions[i].indexCorrectAnswer = correctAnswers[i]
                    await ctx.store.save(quizDb)
                }
            }
        default:
            return
    }
}

function isProofOfChaosMessage(str: string) {
    return /^PROOFOFCHAOS::\d+::.*$/.test(str)
}

function isValidAddress(address: string) {
    return address === 'DhvRNnnsyykGpmaa9GMjK9H4DeeQojd5V5qCTWd1GoYwnTc' || address === 'D3iNikJw3cPq6SasyQCy3k4Y77ZeecgdweTWoSegomHznG3'
}

const configVersions = new Map<number, number>()

async function getConfigVersion(ctx: BatchContext<Store, unknown>, referendumIndex: number) {
    let count = configVersions.get(referendumIndex)
    if (count == null) {
        count = await ctx.store.count(Config, {
            where: {
                referendumIndex,
            },
        })
    }
    configVersions.set(referendumIndex, count + 1)
    return count
}

const configOptions = new Map<string, number>()

async function getOptionCount(ctx: BatchContext<Store, unknown>, configId: string) {
    let count = configOptions.get(configId)
    if (count == null) {
        count = await ctx.store.count(Option, {
            where: {
                configId,
            },
        })
    }
    configOptions.set(configId, count + 1)
    return count
}

const optionResources = new Map<string, number>()

async function getResourceCount(ctx: BatchContext<Store, unknown>, optionId: string) {
    let count = optionResources.get(optionId)
    if (count == null) {
        count = await ctx.store.count(Resource, {
            where: {
                optionId,
            },
        })
    }
    optionResources.set(optionId, count + 1)
    return count
}

const distributionVersions = new Map<number, number>()

async function getDistributionVersion(ctx: BatchContext<Store, unknown>, referendumIndex: number) {
    let count = distributionVersions.get(referendumIndex)
    if (count == null) {
        count = await ctx.store.count(Distribution, {
            where: {
                referendumIndex,
            },
        })
    }
    distributionVersions.set(referendumIndex, count + 1)
    return count
}

const referendumDistributions = new Map<string, number>()

async function getDistributionCount(ctx: BatchContext<Store, unknown>, referendumIndex: number, distributionVersion: number) {
    let count = referendumDistributions.get(`${referendumIndex}-${distributionVersion}`)
    if (count == null) {
        count = await ctx.store.count(Distribution, {
            where: {
                referendumIndex,
                distributionVersion
            },
        })
    }
    optionResources.set(`${referendumIndex}-${distributionVersion}`, count + 1)
    return count
}

const quizVersions = new Map<number, number>()

async function getQuizVersion(ctx: BatchContext<Store, unknown>, referendumIndex: number) {
    let count = quizVersions.get(referendumIndex)
    if (count == null) {
        count = await ctx.store.count(Quiz, {
            where: {
                referendumIndex,
            },
        })
    }
    quizVersions.set(referendumIndex, count + 1)
    return count
}

const quizQuestions = new Map<string, number>()

async function getQuestionCount(ctx: BatchContext<Store, unknown>, quizId: string) {
    let count = quizQuestions.get(quizId)
    if (count == null) {
        count = await ctx.store.count(Question, {
            where: {
                quizId,
            },
        })
    }
    quizQuestions.set(quizId, count + 1)
    return count
}

const questionAnswers = new Map<string, number>()

async function getAnswerCount(ctx: BatchContext<Store, unknown>, questionId: string) {
    let count = questionAnswers.get(questionId)
    if (count == null) {
        count = await ctx.store.count(AnswerOption, {
            where: {
                questionId,
            },
        })
    }
    questionAnswers.set(questionId, count + 1)
    return count
}

const submissionVersions = new Map<string, number>()

async function getSubmissionVersion(ctx: BatchContext<Store, unknown>, referendumIndex: number, wallet: string) {
    let count = submissionVersions.get(referendumIndex + "-" + wallet)
    if (count == null) {
        count = await ctx.store.count(QuizSubmission, {
            where: {
                referendumIndex,
                wallet
            },
        })
    }
    submissionVersions.set(referendumIndex + "-" + wallet, count + 1)
    return count
}

const submissionCount = new Map<string, number>()

async function getSubmissionCount(ctx: BatchContext<Store, unknown>, referendumIndex: number, quizVersion: number) {
    let count = submissionCount.get(referendumIndex + "-" + quizVersion)
    if (count == null) {
        count = await ctx.store.count(QuizSubmission, {
            where: {
                referendumIndex,
                quizVersion
            },
        })
    }
    submissionCount.set(referendumIndex + "-" + quizVersion, count + 1)
    return count
}

