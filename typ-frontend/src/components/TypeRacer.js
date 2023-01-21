import { useState } from "react";

const TypeRacer = () => {

  const words = ['this', 'is', 'a', 'typing', 'test', 'and', 'this', 'is', 'the', 'first', 'iteration'];

  const [currentWord, setCurrentWord] = useState(0)
  const [typed, setTyped] = useState('')
  const [copied, setCopied] = useState([])

  const isLast = (index) => {
    return index === words.length - 1
  }

  const handleChange = (event) => {
    setTyped(event.target.value)
  }

  const handleKeyDown = (event) => {
    if(typed === ""){
      if(event.code === 'Backspace'){
        if(currentWord !== 0){
          const newCopied = [...copied]
          const word = newCopied.pop()
          setCopied(newCopied)
          setTyped(word)
          setCurrentWord(currentWord - 1)
        }
        event.preventDefault()
        event.cancel()
      }else if(event.code === 'Space'){
        event.preventDefault()
        event.cancel()
      }else{
        event.cancel()
      }
    }else{
      if(event.code === 'Backspace'){
        event.cancel()
      }else if(event.code === 'Space'){
        if(currentWord < words.length - 1){
          setCopied(copied.concat(event.target.value))
          setTyped("")
          setCurrentWord(currentWord + 1)
          console.log('copied:', copied)
        }
        event.preventDefault()
        event.cancel()
      }else{
        event.cancel()
      }
    }
  }

  return (
    <div>
      <div>
        {words.map((e,i) => { return isLast(i) ? e : e + " " })}
      </div>
      <input
      type='text'
      value={typed}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      autoFocus
      onBlur={({ target }) => target.focus()}
      />
    </div>
  )
}

export default TypeRacer;