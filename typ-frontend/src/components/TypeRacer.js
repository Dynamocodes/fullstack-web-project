import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { initializeWords } from "../reducers/wordsReducer";
import { setCopied } from "../reducers/copiedWordsReducer";
import { setTyped } from "../reducers/typedReducer";
import { setCurrentWord } from "../reducers/currentWordReducer";


const TypeRacer = (props) => {

  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeWords()) 
  }, [dispatch])

  const isLast = (index) => {
    return index === props.words.length - 1
  }

  const handleChange = (event) => {
    props.setTyped(event.target.value)
  }

  const handleKeyDown = (event) => {
    if(props.typed === ""){
      if(event.code === 'Backspace'){
        if(props.currentWord !== 0){
          const newCopied = [...props.copied]
          const word = newCopied.pop()
          props.setCopied(newCopied)
          props.setTyped(word)
          props.setCurrentWord(props.currentWord - 1)
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
        if(props.currentWord < props.words.length - 1){
          props.setCopied(props.copied.concat(event.target.value))
          props.setTyped("")
          props.setCurrentWord(props.currentWord + 1)
          console.log('copied:', props.copied)
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
        {props.words.map((e,i) => { return isLast(i) ? e : e + " " })}
      </div>
      <input
      type='text'
      value={props.typed}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      autoFocus
      onBlur={({ target }) => target.focus()}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    words: state.words,
    currentWord: state.currentWord,
    copied: state.copied,
    typed: state.typed,
  }
}

const mapDispatchToProps = {
  setCopied,
  setTyped,
  setCurrentWord,
}

const ConnectedTypeRacer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeRacer)

export default ConnectedTypeRacer
