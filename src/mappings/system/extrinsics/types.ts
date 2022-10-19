export interface ResourceData {
    optionId: string
    option: OptionData
    name: string
    main: string
    thumb: string
    mainCid: string
    thumbCid: string
    text: string
    artist: string
    creativeDirector: string
    rarity: string
    itemName: string
    slot: string
    metadataCidDirect: string,
    metadataCidDelegated: string
}

export interface OptionData {
    configId: string
    config: ConfigData
    transferable: number
    symbol: string
    text: string
    artist: string
    creativeDirector: string
    rarity: string
    itemName: string
    minRoyalty: number,
    maxRoyalty: number,
    sweetspotProbability: number,
    maxProbability: number,
    minProbability: number,
    resources: ResourceData[],
    metadataCidDirect: string,
    metadataCidDelegated: string
}

export interface UserItem {
    wallet: string,
    amountConsidered: string,
    chances: number[],
    selectedIndex: number,
    dragonEquipped: string,
    quizCorrect: number,
    identity: number
}

export interface ConfigData {
    referendumIndex: number
    minValue: number
    maxValue: number
    median: number
    first: number
    blockCutOff: number
    directOnly: boolean
    createNewCollection: boolean
    newCollectionSymbol: string
    newCollectionPath: string
    newCollectionFile: string
    newCollectionName: string
    newCollectionDescription: string
    newCollectionMetadataCid: string
    makeEquippable: [string]
    babyBonus: number
    toddlerBonus: number
    adolescentBonus: number
    adultBonus: number
    quizBonus: number
    identityBonus: number
    minAmount: string
    seed: string
    defaultRoyalty: number
    options: OptionData[]
    min: number
    max: number
}

export interface AnswerOptions {
    text: string
}

export interface QuestionData {
    text: string
    answerOptions: AnswerOptions[]
}

export interface QuizData {
    questions: QuestionData[]
}

export interface AnswerData {
    quizVersion: number
    answers: number[]
}

export interface CorrectAnswerData {
    quizVersion: number
    correctAnswerIndeces: number[]
}