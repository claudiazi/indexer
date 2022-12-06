import { Question } from '../../../model/generated/question.model'
import { Distribution } from '../../../model/generated/distribution.model'
import { Config } from '../../../model/generated/config.model'
import { Option } from '../../../model/generated/option.model'
import { Resource } from '../../../model/generated/resource.model'
import { Quiz } from '../../../model/generated/quiz.model'
import { MissingOpenGovReferendumWarn, MissingReferendumRelationWarn } from '../../utils/errors'
import { AnswerOption } from '../../../model/generated/answerOption.model'
import { OpenGovReferendum, ReferendumRelation } from '../../../model'
import { QuizSubmission } from '../../../model/generated/quizSubmission.model'
import { BatchContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CorrectAnswer } from '../../../model/generated/correctAnswer.model'
import { Answer } from '../../../model/generated/answer.model'

export function isProofOfChaosv1Message(str: string) {
    return /^PROOFOFCHAOS::\d+::.*$/.test(str)
}

export function isProofOfChaosv2Message(str: string) {
    return /^PROOFOFCHAOS2::\d+::.*$/.test(str)
}

export function isProofOfChaosAddress(address: string) {
    return address === 'DhvRNnnsyykGpmaa9GMjK9H4DeeQojd5V5qCTWd1GoYwnTc' || address === 'D3iNikJw3cPq6SasyQCy3k4Y77ZeecgdweTWoSegomHznG3'
}

export async function isProposerv1(ctx: BatchContext<Store, unknown>, address: string, referendumIndex: number): Promise<boolean> {
    const referendumRelation = await ctx.store.get(ReferendumRelation, { where: { referendumIndex } })
    if (!referendumRelation) {
        ctx.log.warn(MissingReferendumRelationWarn(referendumIndex))
        return false
    }
    return referendumRelation.proposer === address
}

export async function isProposerv2(ctx: BatchContext<Store, unknown>, address: string, referendumIndex: number): Promise<boolean> {
    const referendum = await ctx.store.get(OpenGovReferendum, { where: { index: referendumIndex } })
    if (!referendum) {
        ctx.log.warn(MissingOpenGovReferendumWarn(referendumIndex))
        return false
    }
    return referendum.submissionDepositWho === address || referendum.decisionDepositWho === address
}

const configVersions = new Map<string, number>()

export async function getConfigVersion(ctx: BatchContext<Store, unknown>, referendumIndex: number, governanceVersion: number) {
    let count = configVersions.get(`${referendumIndex}-${governanceVersion}`)
    if (count == null) {
        count = await ctx.store.count(Config, {
            where: {
                referendumIndex,
                governanceVersion
            },
        })
    }
    configVersions.set(`${referendumIndex}-${governanceVersion}`, count + 1)
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

const distributionVersions = new Map<string, number>()

export async function getDistributionVersion(ctx: BatchContext<Store, unknown>, referendumIndex: number, governanceVersion: number) {
    let count = distributionVersions.get(`${referendumIndex}-${governanceVersion}`)
    if (count == null) {
        count = await ctx.store.count(Distribution, {
            where: {
                referendumIndex,
                governanceVersion
            },
        })
    }
    distributionVersions.set(`${referendumIndex}-${governanceVersion}`, count + 1)
    return count
}

const referendumDistributions = new Map<string, number>()

export async function getDistributionCount(ctx: BatchContext<Store, unknown>, referendumIndex: number, governanceVersion: number, distributionVersion: number) {
    let count = referendumDistributions.get(`${referendumIndex}-${governanceVersion}-${distributionVersion}`)
    if (count == null) {
        count = await ctx.store.count(Distribution, {
            where: {
                referendumIndex,
                governanceVersion,
                distributionVersion
            },
        })
    }
    optionResources.set(`${referendumIndex}-${governanceVersion}-${distributionVersion}`, count + 1)
    return count
}

const quizVersions = new Map<string, number>()

export async function getQuizVersion(ctx: BatchContext<Store, unknown>, referendumIndex: number, governanceVersion: number) {
    let count = quizVersions.get(`${referendumIndex}-${governanceVersion}`)
    if (count == null) {
        count = await ctx.store.count(Quiz, {
            where: {
                referendumIndex,
                governanceVersion
            },
        })
    }
    quizVersions.set(`${referendumIndex}-${governanceVersion}`, count + 1)
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

const questionAnswerOptions = new Map<string, number>()

export async function getAnswerOptionCount(ctx: BatchContext<Store, unknown>, questionId: string) {
    let count = questionAnswerOptions.get(questionId)
    if (count == null) {
        count = await ctx.store.count(AnswerOption, {
            where: {
                questionId,
            },
        })
    }
    questionAnswerOptions.set(questionId, count + 1)
    return count
}

const submissionAnswers = new Map<string, number>()

export async function getAnswerCount(ctx: BatchContext<Store, unknown>, quizSubmissionId: string) {
    let count = submissionAnswers.get(quizSubmissionId)
    if (count == null) {
        count = await ctx.store.count(Answer, {
            where: {
                quizSubmissionId,
            },
        })
    }
    submissionAnswers.set(quizSubmissionId, count + 1)
    return count
}

const submissionVersions = new Map<string, number>()

export async function getSubmissionVersion(ctx: BatchContext<Store, unknown>, referendumIndex: number, governanceVersion: number, wallet: string) {
    let count = submissionVersions.get(`${referendumIndex}-${governanceVersion}-${wallet}`)
    if (count == null) {
        count = await ctx.store.count(QuizSubmission, {
            where: {
                referendumIndex,
                wallet,
                governanceVersion
            },
        })
    }
    submissionVersions.set(`${referendumIndex}-${governanceVersion}-${wallet}`, count + 1)
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