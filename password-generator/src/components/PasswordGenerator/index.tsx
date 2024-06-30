import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Checkbox from '../Checkbox'

import passwordGif from '../../assets/gif/password.gif'
import copyIcon from '../../assets/icons/copy.svg'
import refreshIcon from '../../assets/icons/refresh.svg'

import './index.css'

const PasswordGenerator = () => {
  const upperCaseLettersList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lowerCaseLettersList = "abcdefghijklmnopqrstuvwxyz"
  const numbersList = "0123456789"
  const specialCharactersList = "!@#$%^&*()"
  const [passwordLength, setPasswordLength] = useState<number>(10)
  const [password, setPassword] = useState<string>("")
  const [checkBox, setCheckBox] = useState({
    upper : true,
    lower : false,
    numbers : true,
    specialChars : false
  })
  const [isCopy, setIsCopy] = useState<boolean>(false)
  const [passwordStrength, setPasswordStrength] = useState({
    strength : "",
    cssClass : ""
  })

  const {upper, lower, numbers, specialChars } = checkBox
  const { strength, cssClass } = passwordStrength

  const generatePassword = () => {
    let charList = "" 
    let tempPassword = ""
    if (upper) {
      charList += upperCaseLettersList
    }
    if (lower) {
      charList += lowerCaseLettersList
    }
    if (numbers) {
      charList += numbersList
    }
    if (specialChars) {
      charList += specialCharactersList
    }

    for (let i = 0; i < passwordLength; i++) {
      const position = Math.floor(Math.random() * charList.length)
      tempPassword += charList.charAt(position)
    }

    setPassword(tempPassword)
    determinePasswordStrength(tempPassword)
  }

  const determinePasswordStrength = (password: string) => {
    if (password.length < 8) {
      setPasswordStrength({strength : "Too short", cssClass : "danger"})
    } else {
      let numberOfCheckbox = 0
      if (upper) {
        numberOfCheckbox += 1
      }
      if (lower) {
        numberOfCheckbox += 1
      }
      if (numbers) {
        numberOfCheckbox += 1
      }
      if (specialChars) {
        numberOfCheckbox += 1
      }
      
      if (numberOfCheckbox === 4) {
        setPasswordStrength({strength : "Hard", cssClass : "success"})
      } else if (numberOfCheckbox === 3) {
        setPasswordStrength({strength : "Medium", cssClass : "warning"})
      } else {
        setPasswordStrength({strength : "Weak", cssClass : "danger"})
      }
    }
  }

  const onChangePasswordLength = (value: any) => {
    setPasswordLength(value)
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setCheckBox((previousState) => ({
      ...previousState, 
      [name] : checked
    } as any))
  }

  useEffect(() => {
  if (!upper && !lower && !numbers && !specialChars) {
    setCheckBox({
      upper : false,
      lower : true,
      numbers : false,
      specialChars : false
    })
  }
  }, [lower, numbers, specialChars, upper])
  

  useEffect(() => {
    generatePassword()}, [])

  const copyPassword = () => {
    setIsCopy(true)
    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  }
  
   return (
    <div className="password-wrapper">
      <div className="gif">
        <img src={passwordGif} alt="Password Gif" />
      </div>
      <div className="tac">
        <h2 className="title">PASSWORD GENERATOR</h2>
        <p className="subtitle">
          Ensure online account safety by creating strong and secure passwords
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input type="text" placeholder="your password" value={password} onChange={onChangePassword}/>
          <img src={refreshIcon} alt="refresh the password" onClick={generatePassword} />
        </div>
        <CopyToClipboard text={password} onCopy={copyPassword}>
          <button className="copy-btn" >
            <img src={copyIcon} alt="copy password"/>
            {isCopy ? `Copied` : `Copy`}
          </button>
        </CopyToClipboard>
      </div>
      <span className={`fw-500 ${cssClass}`}>{strength}</span>
      <div className="slider">
        <div>
          <label id="slider-label">Password Length: </label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={5}
          value={passwordLength}
          onChange={onChangePasswordLength}
          className="slider-style"
        />
      </div>
      <div className="elements">
        <Checkbox id="uppercase" label="Uppercase" checked={upper} name="upper" onChange={onChangeCheckbox}/>
        <Checkbox id="lowercase" label="Lowercase" checked={lower} name="lower" onChange={onChangeCheckbox} />
        <Checkbox id="numbers" label="Numbers" checked={numbers} name="numbers" onChange={onChangeCheckbox} />
        <Checkbox
          id="special chars"
          label="Special Characters"
          checked={specialChars}
          name="specialChars"
          onChange={onChangeCheckbox}
        />
      </div>
    </div>
  )
}

export default PasswordGenerator
