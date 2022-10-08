import { Question } from '../../../model/generated/question.model'
import { Distribution } from '../../../model/generated/distribution.model'
import { Config } from '../../../model/generated/config.model'
import { Option } from '../../../model/generated/option.model'
import { Resource } from '../../../model/generated/resource.model'
import { Quiz } from '../../../model/generated/quiz.model'
import { MissingReferendumRelationWarn } from '../../utils/errors'
import { AnswerOption } from '../../../model/generated/answerOption.model'
import { ReferendumRelation } from '../../../model'
import { QuizSubmission } from '../../../model/generated/quizSubmission.model'
import { BatchContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CorrectAnswer } from '../../../model/generated/correctAnswer.model'

export function isProofOfChaosMessage(str: string) {
    return /^PROOFOFCHAOS::\d+::.*$/.test(str)
}

export function isProofOfChaosAddress(address: string) {
    return address === 'DhvRNnnsyykGpmaa9GMjK9H4DeeQojd5V5qCTWd1GoYwnTc' || address === 'D3iNikJw3cPq6SasyQCy3k4Y77ZeecgdweTWoSegomHznG3'
}

export async function isProposer(ctx: BatchContext<Store, unknown>, address: string, referendumIndex: number): Promise<boolean> {
    const referendumRelation = await ctx.store.get(ReferendumRelation, { where: { referendumIndex } })
    if (!referendumRelation) {
        ctx.log.warn(MissingReferendumRelationWarn(referendumIndex))
        return false
    }
    return referendumRelation.proposer === address
}

const configVersions = new Map<number, number>()

export async function getConfigVersion(ctx: BatchContext<Store, unknown>, referendumIndex: number) {
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

export async function getOptionCount(ctx: BatchContext<Store, unknown>, configId: string) {
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

export async function getResourceCount(ctx: BatchContext<Store, unknown>, optionId: string) {
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

export async function getDistributionVersion(ctx: BatchContext<Store, unknown>, referendumIndex: number) {
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

export async function getDistributionCount(ctx: BatchContext<Store, unknown>, referendumIndex: number, distributionVersion: number) {
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

export async function getQuizVersion(ctx: BatchContext<Store, unknown>, referendumIndex: number) {
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

export async function getQuestionCount(ctx: BatchContext<Store, unknown>, quizId: string) {
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

export async function getAnswerCount(ctx: BatchContext<Store, unknown>, questionId: string) {
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

export async function getSubmissionVersion(ctx: BatchContext<Store, unknown>, referendumIndex: number, wallet: string) {
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

export async function getSubmissionCount(ctx: BatchContext<Store, unknown>, quizId: string) {
    let count = submissionCount.get(quizId)
    if (count == null) {
        count = await ctx.store.count(QuizSubmission, {
            where: {
                quizId
            },
        })
    }
    submissionCount.set(quizId, count + 1)
    return count
}

const correctAnswerVersion = new Map<string, number>()

export async function getCorrectAnswerVersion(ctx: BatchContext<Store, unknown>, questionId: string) {
    let count = correctAnswerVersion.get(questionId)
    if (count == null) {
        count = await ctx.store.count(CorrectAnswer, {
            where: {
                questionId
            },
        })
    }
    correctAnswerVersion.set(questionId, count + 1)
    return count
}