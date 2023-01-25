import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Word from "./Word";
import { setWords } from "../reducers/wordsReducer";
import { setCopied } from "../reducers/copiedWordsReducer";
import { setTyped } from "../reducers/typedReducer";
import { setCurrentWord } from "../reducers/currentWordReducer";
import { setDisplayedWords, changeDisplayedWordAt } from "../reducers/displayedWordsReducer";
import Timer from "./Timer";


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  }
}

const TypeRacer = ({words, currentWord, copied, displayedWords, typed, setWords, setDisplayedWords, setCurrentWord, setCopied, setTyped}) => {

  
  const dispatch = useDispatch()
  useEffect(() => {
    const myWords = ['this', 'is', 'a', 'typing', 'test', 'and', 'this', 'is', 'the', 'first', 'iteration'];
    setWords(myWords)
    setDisplayedWords(myWords)
  }, [])//eslint-disable-line

  const isLast = (index) => {
    return index === words.length - 1
  }

  const handleChange = (event) => {
    setTyped(event.target.value)
    if(event.target.value.length > words[currentWord].length ){
      const wordToDisplay = words[currentWord] + event.target.value.substring(words[currentWord].length)
      dispatch(changeDisplayedWordAt(currentWord, wordToDisplay))
    }else{
      dispatch(changeDisplayedWordAt(currentWord, words[currentWord]))
    }
  }

  const handleKeyDown = (event) => {
    if(typed === ""){
      if(event.code === 'Backspace'){
        if(currentWord !== 0){
          const newCopied = [...copied]
          const word = newCopied.pop()
          setCopied(newCopied)
          setTyped(word)
          dispatch(changeDisplayedWordAt(currentWord, words[currentWord]))
          setCurrentWord(currentWord - 1)
        }
        event.preventDefault()
      }else if(event.code === 'Space'){
        event.preventDefault()
      }
    }else{
      if(event.code === 'Space'){
        if(currentWord < words.length - 1){
          setCopied(copied.concat(event.target.value))
          setTyped("")
          setCurrentWord(currentWord + 1)
        }
        event.preventDefault()
      }
    }
  }

  return (
    <div>
      <div style={styles.container}>
        {displayedWords.map((e,i) => { return isLast(i) ? <Word key={i} word={e} wordIndex={i}/> : <Word key={i} style={{marginRight: 100}} word={e} wordIndex={i}/> })}
      </div>
      <input
      type='text'
      value={typed}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      autoFocus
      onBlur={({ target }) => target.focus()}
      />
      <Timer/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    words: state.words,
    currentWord: state.currentWord,
    copied: state.copied,
    typed: state.typed,
    displayedWords: state.displayedWords
  }
}

const mapDispatchToProps = {
  setCopied,
  setTyped,
  setCurrentWord,
  setWords,
  setDisplayedWords,
}

const ConnectedTypeRacer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeRacer)

export default ConnectedTypeRacer
