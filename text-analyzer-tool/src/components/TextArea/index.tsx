import './index.scss'
import { ChangeEventHandler, useState } from 'react'

interface TextAreaProps {
  text : string;
  handleChange: (e: any) => void
}

function TextArea(props : TextAreaProps) {
  const {text, handleChange} = props

  //active text area use autofocus
  return <textarea
    className="text-area"
    placeholder="Paste your text here..."
    autoFocus
    value={text}
    onChange={handleChange} />;
}

export default TextArea
