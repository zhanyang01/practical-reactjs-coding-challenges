import {Quote} from "../interfaces/quote"

const shuffleArray = (list : Quote[]) => {
    let curIndex = list.length - 1
    let randomIndex : number

    while (curIndex !== 0) {
        randomIndex = Math.floor(Math.random() * curIndex)
        ;[list[curIndex], list[randomIndex]] = [list[randomIndex], list[curIndex]]
        curIndex = curIndex - 1
    }

    return list
};

export default shuffleArray;