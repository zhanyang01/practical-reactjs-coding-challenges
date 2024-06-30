import { pronouns } from "../data/pronouns"

// this is also used in counting pronouns and finding longest word as we need to find words
// first i split based on words with a regex /\b[w']+\b/g
// what the regex do is 
// /b beginning word boundary
// [w'] => check for any word characters and '
// + is to add
// \b ending word boundary
// /g check for all words not just the first word
export const countWords = (content: string) => {
    const contentArray = content.split(/\b[\w']+\b/g)
    const words = contentArray.filter((word) => word !== "")
    return words.length
}

export const countCharacters = (content: string) => {
    return content.length
}

// we split based on sentences which is basically
// (?<=[.!?]) positive lookbehind, basically check whether there is a . or ? or ! in front
// \s matches for whitespaces
// + is to add
// (?=[A-Z]) -> this is to check positive lookahead which is to check whether it starts with a capital letter
export const countSentences = (content : string) => {
    const sentences = content.split(/(?<=[.!?])\s+(?=[A-Z])/)
    return sentences.length
}

// i split based on newline which is \n
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