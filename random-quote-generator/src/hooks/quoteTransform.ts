import axios from "axios";
import { useEffect, useState } from "react";
import {Quote} from "../interfaces/quote"
import shuffleArray from "../utils/shuffleArray";

const useQuoteTransform = (url: string) => {
    const [index, setIndex] = useState(0)
    const [quoteList, setQuoteList] = useState<Quote[]>([])
    const [loading, setLoading] = useState(false)
    const retrieveQuotes = async () => {
        setLoading(true)
        const response = await axios.get<Quote[]>(url)
        const quotes = response.data
        setQuoteList(shuffleArray(quotes))
        setLoading(false)
    }

    const toNextQuote = () => {
        if (index === quoteList.length - 1) {
            setIndex(0)
        } else {
            setIndex(index + 1)
        }
    }

    const toPrevQuote = () => {
        setIndex(index - 1)
    }

    const shareOnWhatsapp = () => {
        const { quote, author } = quoteList[index]
        const url = `https://wa.me/?=text=${encodeURIComponent(
            quote + "\n- " + author
        )}`
        window.open(url, "_blank")
    }

    const shareOnTwitter = () => {
        const {quote, author} = quoteList[index]
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            quote + "\n- " + author
        )}`
        window.open(url, "_blank")
    }
    const { quote, author} = quoteList[index] || {}

    useEffect(() => {
        retrieveQuotes()
    }, [])
    

    return {quote, author, index, loading, retrieveQuotes, toNextQuote, toPrevQuote, shareOnTwitter, shareOnWhatsapp}
};

export default useQuoteTransform;
