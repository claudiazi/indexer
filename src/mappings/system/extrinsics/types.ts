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
    title: string
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
    resources: ResourceData[],
    metadataCidDirect: string,
    metadataCidDelegated: string
}

export interface UserItem {
    wallet: string,
    amountConsidered: string,
    chances: number[],
    selectedIndex: number,
    dragonEquipped: string
}

export interface ConfigData {
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