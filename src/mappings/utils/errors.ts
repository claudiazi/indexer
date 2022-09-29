export function MissingReferendumWarn(hashOrIndex: string | number) {
    return `Missing referendum with ${hashOrIndex}`
}

export function MissingPreimageWarn(hashOrIndex: string | number) {
    return `Missing preimage with ${hashOrIndex}`
}

export function MissingConfigWarn(hashOrIndex: string | number) {
    return `Missing config with ${hashOrIndex}`
}

export function MissingOptionWarn(hashOrIndex: string | number) {
    return `Missing option with ${hashOrIndex}`
}

export function MissingQuizWarn(hashOrIndex: string | number) {
    return `Missing quiz with ${hashOrIndex}`
}

export function MissingQuizVersionWarn(hashOrIndex: string | number, quizVersion: number) {
    return `Missing quiz version ${quizVersion} for referendum ${hashOrIndex}`
}

export function MissingQuestionWarn(hashOrIndex: string | number) {
    return `Missing question with ${hashOrIndex}`
}

export function MissingReferendumRelationWarn(hashOrIndex: string | number) {
    return `Missing referendumRelation with ${hashOrIndex}`
}