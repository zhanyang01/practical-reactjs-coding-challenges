import { pronouns } from "../data/pronouns"

export const countWords = (content: string) => {
    const contentArray = content.split(/\b[\w']+\b/g)
    const words = contentArray.filter((word) => word !== "")
    return words.length
}

export const countCharacters = (content: string) => {
    return content.length
}

export const countSentences = (content : string) => {
    const sentences = content.split(/(?<=[.!?])\s+(?=[A-Z])/)
    return sentences.length
}

export const countParagraphs = (content : string) => {
    const paragraphs = content.split(/\n/)
    const filteredParagraphs = paragraphs.filter((paragraph) => paragraph.trim().length > 0)
    return filteredParagraphs.length
}

export const countPronouns = (content : string) => {
    var numberOfPronouns = 0
    const words = content.match(/\b[\w']+\b/g) || []
    for (let word of words) {
        if (pronouns.includes(word.toLowerCase())) {
            numberOfPronouns += 1
        }
    }
    return numberOfPronouns
}

export const readingDuration = (content : string) => {
    const readingSpeed = 225
    var minute : number = Math.ceil(countWords(content) / readingSpeed)
    if (minute > 1) {
        return '~' + minute + " minutes"
    } else {
        return '~' + minute + " minute"
    }
}

export const findLongestWord = (content : string) => {
    const words = content.match(/\b[\w']+\b/g) || []
    var longestWord = ""
    var lengthOfWord = 0
    for (const word of words) {
        if (word.length > lengthOfWord) {
            longestWord = word
            lengthOfWord = word.length
        }
    }
    return longestWord
}