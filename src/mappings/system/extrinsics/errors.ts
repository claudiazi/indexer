import { AnswerData } from "./types"

export function MissingQuizVersionWarn(hashOrIndex: string | number, quizVersion: number) {
    return `Missing quiz version ${quizVersion} for referendum ${hashOrIndex}`
}

export function WrongAnswerLength(quizId: string, expectedLength: number, answersSubmitted: number[]) {
    return `Expected ${expectedLength} answers but received [${answersSubmitted}] for quiz ${quizId}`
}

export function WrongCorrectAnswerLength(quizId: string, expectedLength: number, correctAnswersSubmitted: number[]) {
    return `Expected ${expectedLength} correct answers but received [${correctAnswersSubmitted}] for quiz ${quizId}`
}

export function AnswerSubmissionTooLate(referendumIndex: number, expiredAt: number, answerSubmissionBlock: number) {
    return `Referendum with Index ${referendumIndex} expired at block ${expiredAt}. An answer submission at block ${answerSubmissionBlock} is therefore not valid.`
}

export function QuizSubmissionTooLate(referendumIndex: number, expiredAt: number, quizSubmissionBlock: number) {
    return `Referendum with Index ${referendumIndex} expired at block ${expiredAt}. A quiz submission at block ${quizSubmissionBlock} is therefore not valid.`
}

export function NotProposerNotProofOfChaos(hashOrIndex: string | number, wallet: string) {
    return `Address ${wallet} is neither the Proof of Chaos wallet nor the proposer of Referendum ${hashOrIndex}.`
}

export function InvalidCorrectAnswerIndex(questionId: string, answerOptionCount: number,  correctAnswerIndex: number) {
    return `Question with id ${questionId} has ${answerOptionCount} answerOptions. CorrectAnswerIndex ${correctAnswerIndex} is invalid.`
}

export function AnswerDataNotComplete(answerData: AnswerData) {
    return `AnswerData not complete. Possibly missing answer array: ${answerData.answers} and/or quizVersion: ${answerData.quizVersion}.`
}

export function AnswerDataNotJSONParsable(answerDataInput: String) {
    return `The answerDataString is not parsable to JSON: ${answerDataInput}.`
}

