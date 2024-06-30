import axios from "axios";
import { useEffect, useState } from "react";
import {Quote} from "../interfaces/quote"
import shuffleArray from "../utils/shuffleArray";

const useQuoteTransform = (url: string) => {
    const [index, setIndex] = useState(0)
    const [quoteList, setQuoteList] = useState<Quote[]>([])
    const retrieveQuotes = async () => {
        const response = await axios.get<Quote[]>(url)
        const quotes = response.data
        setQuoteList(shuffleArray(quotes))
    }

    const { quote, author} = quoteList[index] || {}

    useEffect(() => {
        retrieveQuotes()
    }, [])
    

    return {quote, author, retrieveQuotes}
};

export default useQuoteTransform;
