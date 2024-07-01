import classnames from "classnames"
import { ReactComponent as Button } from "../src/assets/icons/button.svg"
import { ReactComponent as Quotation } from "../src/assets/icons/quotation.svg"
import { ReactComponent as Twitter } from "../src/assets/icons/twitter.svg"
import { ReactComponent as Whatsapp } from "../src/assets/icons/whatsapp.svg"
import "./App.css"

import useQuoteTransform from "./hooks/quoteTransform"

function App() {
  const { quote, author, index, loading, toNextQuote, toPrevQuote, shareOnTwitter, shareOnWhatsapp} = useQuoteTransform("http://localhost:4000/quotes")
  return (
    loading ? (
      <p>Loading...</p>
     ) : (
      <div>
      <header>
        <div className="top-strip" />
      </header>
      <div className="container">
        <div className="quotation-box ">
          <Quotation />
          <div className="quote">
            <p>
              {quote}
            </p>
            <span>- {author}</span>
          </div>
          <div className="bottom-navigation">
            <div>
              <Button className={classnames("rotate cp", {"disabled-button" : index < 1})} onClick={toPrevQuote}/>
              <Button className="cp" onClick={toNextQuote}/>
            </div>
            <div className="share">
              <span>Share At:</span>
              <Twitter title="Post this quote on twitter!" className="cp" onClick={shareOnTwitter}/>
              <Whatsapp title="Post this quote on WhatsApp!" className="cp" onClick={shareOnWhatsapp}/>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-strip" />
    </div>
     ))}

export default App
