import { useEffect, useState } from 'react'
import './App.scss'
import BottomResultBox from './components/BottomResultBox'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ResultBox from './components/ResultBox'
import TextArea from './components/TextArea'
import { countCharacters, countWords, countParagraphs, countPronouns, countSentences, readingDuration, findLongestWord } from './utils'
const App = () => {
  const [text, setText] = useState("")
  const [result, setResult] = useState({
    words : 0,
    characters : 0,
    sentences : 0,
    paragraphs : 0,
    pronouns : 0
  })

  const [bottomResult, setBottomResult] = useState({
    avgReadingTime : "-",
    longestWord : "-"
  })

  // the text component
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setText(value)
  }

  // change the results in the results component
  useEffect(() => {
    if (text.length === 0) {
      setResult({
        words : 0,
        characters : 0,
        sentences : 0,
        paragraphs : 0,
        pronouns : 0
      })
      setBottomResult({
        avgReadingTime : "-",
        longestWord : "-"
      })
    } else if (text.length !== 0) {
      setResult({
        words : countWords(text),
        characters : countCharacters(text),
        sentences : countSentences(text),
        paragraphs : countParagraphs(text),
        pronouns : countPronouns(text)
      })
      setBottomResult({
        avgReadingTime : readingDuration(text),
        longestWord : findLongestWord(text)
      })
    }
  }, [text])

  return (
    <>
      <Navbar />
      <div className="small-container">
        <div className="main-app">
          <ResultBox result={result}/>
          <TextArea text={text} handleChange={handleChange}/>
          <BottomResultBox bottomResult={bottomResult}/>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
