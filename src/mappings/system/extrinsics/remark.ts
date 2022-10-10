import { Question } from '../../../model/generated/question.model'
import { Distribution } from '../../../model/generated/distribution.model'
import { Config } from '../../../model/generated/config.model'
import { Option } from '../../../model/generated/option.model'
import { Resource } from '../../../model/generated/resource.model'
import { Quiz } from '../../../model/generated/quiz.model'
import { SystemRemarkCall } from '../../../types/calls'
import { getOriginAccountId } from '../../../common/tools'
import { AnswerDataNotComplete, AnswerSubmissionTooLate, InvalidCorrectAnswerIndex, MissingQuizVersionWarn, NotProposerNotProofOfChaos, QuizSubmissionTooLate, WrongAnswerLength, WrongCorrectAnswerLength } from './errors'
import { MissingConfigWarn, MissingOptionWarn, MissingQuestionWarn, MissingQuizWarn, MissingReferendumWarn } from '../../utils/errors'
import { AnswerOption } from '../../../model/generated/answerOption.model'
import { Referendum } from '../../../model'
import { QuizSubmission } from '../../../model/generated/quizSubmission.model'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CallItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { CorrectAnswer } from '../../../model/generated/correctAnswer.model'
import { AnswerData, ConfigData, CorrectAnswerData, OptionData, QuizData, UserItem } from './types'
import { getAnswerCount, getConfigVersion, getCorrectAnswerVersion, getDistributionCount, getDistributionVersion, getOptionCount, getQuestionCount, getQuizVersion, getResourceCount, getSubmissionCount, getSubmissionVersion, isProofOfChaosAddress, isProofOfChaosMessage, isProposer } from './helpers'



export async function handleRemark(ctx: BatchContext<Store, unknown>,
    item: CallItem<'System.remark', { call: { args: true; origin: true } }>,
    header: SubstrateBlock): Promise<void> {
    if (!(item.call as any).success) return
    const message = new SystemRemarkCall(ctx, item.call).asV1020.remark.toString()
    if (!isProofOfChaosMessage(message)) return

    const originAccountId = getOriginAccountId(item.call.origin)

    if (originAccountId == null) return
    const args = message.split('::')
    switch (args[2]) {
        case 'DISTRIBUTION':
            if (isProofOfChaosAddress(originAccountId) && header.height >= 14594438) {
                const distributionData: UserItem[] = JSON.parse(args[3])
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
                        indexItemReceived: dist.selectedIndex,
                        chancesAtItems: dist.chances,
                        dragonEquipped: dist.dragonEquipped,
                        timestamp: new Date(header.timestamp),
                    })
                    await ctx.store.insert(distribution)
                }
            }
            break
        case 'CONFIG':
            if (isProofOfChaosAddress(originAccountId)) {
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
                        minRoyalty,
                        maxRoyalty,
                        metadataCidDirect,
                        metadataCidDelegated } = opt
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
                        minRoyalty,
                        maxRoyalty,
                        metadataCidDirect,
                        metadataCidDelegated,
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
                            mainCid,
                            thumbCid,
                            text,
                            artist,
                            creativeDirector,
                            rarity,
                            itemName,
                            slot,
                            title,
                            metadataCidDirect,
                            metadataCidDelegated } = res

                        const resourceCount = await getResourceCount(ctx, optionDb.id)
                        const resourceId = `${optionDb.id}-${resourceCount.toString().padStart(8, '0')}`

                        const resource = new Resource({
                            id: resourceId,
                            optionId: optionDb.id,
                            option: optionDb,
                            name,
                            mainCid,
                            thumbCid,
                            text,
                            artist,
                            creativeDirector,
                            rarity,
                            itemName,
                            slot,
                            title,
                            metadataCidDirect,
                            metadataCidDelegated
                        })
                        await ctx.store.insert(resource)
                    }
                }
            }
            break
        case 'QUIZ':
            if (isProofOfChaosAddress(originAccountId) || await isProposer(ctx, originAccountId, parseInt(args[1]))) {
                const referendum = await ctx.store.get(Referendum, { where: { index: parseInt(args[1]) } })
                if (!referendum) {
                    ctx.log.warn(MissingReferendumWarn(args[1]))
                    return
                }

                if (header.height > referendum?.endsAt) {
                    ctx.log.warn(QuizSubmissionTooLate(referendum.index, referendum?.endsAt, header.height))
                    return
                }
                //check that quiz author is proposer/ proofofchaos
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
            else {
                ctx.log.warn(NotProposerNotProofOfChaos(args[1], originAccountId))
                return
            }
            break
        case 'ANSWERS':
            //check that answer block is before ref end and after ref start
            const referendum = await ctx.store.get(Referendum, { where: { index: parseInt(args[1]) } })
            if (!referendum) {
                ctx.log.warn(MissingReferendumWarn(args[1]))
                return
            }
            if (header.height > referendum?.endsAt) {
                ctx.log.warn(AnswerSubmissionTooLate(referendum.index, referendum?.endsAt, header.height))
                return
            }
            else {
                const answerData: AnswerData = JSON.parse(args[3])
                const quizDb = await ctx.store.get(Quiz, { where: { referendumIndex: parseInt(args[1]), version: answerData.quizVersion } })
                if (answerData.answers == null || answerData.quizVersion == null || answerData.answers.length == 0) {
                    ctx.log.warn(AnswerDataNotComplete(answerData))
                    return
                }
                if (!quizDb) {
                    ctx.log.warn(MissingQuizVersionWarn(args[1], answerData.quizVersion))
                    return
                }
                const quizDbQuestions = await ctx.store.find(Question, { where: { quizId: quizDb.id } })
                
                if (quizDbQuestions.length != answerData.answers.length) {
                    ctx.log.warn(WrongAnswerLength(quizDb.id, quizDbQuestions.length, answerData.answers))
                    return
                }
                const submissionVersion = await getSubmissionVersion(ctx, parseInt(args[1]), originAccountId)
                //getsubmissioncount for version
                const submissionCount = await getSubmissionCount(ctx, quizDb.id)
                const submissionId = `${quizDb.id}-${submissionCount.toString().padStart(8, '0')}`

                const submission = new QuizSubmission({
                    id: submissionId,
                    referendumIndex: parseInt(args[1]),
                    blockNumber: header.height,
                    quiz: quizDb,
                    quizId: quizDb.id,
                    version: submissionVersion,
                    answers: answerData.answers,
                    wallet: originAccountId,
                    timestamp: new Date(header.timestamp)
                })
                await ctx.store.insert(submission)
            }
            break
        case 'CORRECTANSWERS':
            if (isProofOfChaosAddress(originAccountId) || await isProposer(ctx, originAccountId, parseInt(args[1]))) {
                const correctAnswerData: CorrectAnswerData = JSON.parse(args[3])
                // const quizVersion = parseInt(args[3])
                // const correctAnswers = JSON.parse(args[4])
                const quizDb = await ctx.store.get(Quiz, { where: { referendumIndex: parseInt(args[1]), version: correctAnswerData.quizVersion } })
                if (!quizDb) {
                    ctx.log.warn(MissingQuizVersionWarn(args[1], correctAnswerData.quizVersion))
                    return
                }
                const quizDbQuestions = await ctx.store.find(Question, { where: { quizId: quizDb.id } })
                if (quizDbQuestions.length != correctAnswerData.correctAnswerIndeces.length) {
                    ctx.log.warn(WrongCorrectAnswerLength(quizDb.id, quizDbQuestions.length, correctAnswerData.correctAnswerIndeces))
                    return
                }
                for (var i = 0; i < quizDbQuestions.length; i++) {
                    const quizDbQuestionAnswers = await ctx.store.find(AnswerOption, { where: { questionId: quizDbQuestions[i].id } })
                    if (correctAnswerData.correctAnswerIndeces[i] < 0 || correctAnswerData.correctAnswerIndeces[i] >= quizDbQuestionAnswers.length) {
                        ctx.log.warn(InvalidCorrectAnswerIndex(quizDbQuestions[i].id, quizDbQuestionAnswers.length, correctAnswerData.correctAnswerIndeces[i]))
                        return
                    }
                    const correctAnswerVersion = await getCorrectAnswerVersion(ctx, quizDbQuestions[i].id)
                    const correctAnswerId = `${quizDbQuestions[i].id}-${correctAnswerVersion.toString().padStart(8, '0')}`

                    const correctAnswer = new CorrectAnswer({
                        id: correctAnswerId,
                        question: quizDbQuestions[i],
                        questionId: quizDbQuestions[i].id,
                        blockNumber: header.height,
                        version: correctAnswerVersion,
                        correctIndex: correctAnswerData.correctAnswerIndeces[i],
                        submitter: originAccountId,
                        timestamp: new Date(header.timestamp)
                    })
                    await ctx.store.insert(correctAnswer)
                }
            }
            else {
                ctx.log.warn(NotProposerNotProofOfChaos(args[1], originAccountId))
                return
            }
            break
        default:
            break
    }
}


