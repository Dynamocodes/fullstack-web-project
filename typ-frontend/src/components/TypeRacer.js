import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Word from "./Word";
import { setWords } from "../reducers/wordsReducer";
import { setCopied, resetCopied} from "../reducers/copiedWordsReducer";
import { setTyped, resetTyped } from "../reducers/typedReducer";
import { setCurrentWord, resetCurrentWord } from "../reducers/currentWordReducer";
import { setDisplayedWords, changeDisplayedWordAt } from "../reducers/displayedWordsReducer";
import { setLastStroke, updateLastStroke, resetLastStroke } from "../reducers/lastStrokeReducer";
import { setWpm, resetWpm } from "../reducers/wpmReducer";
import { addLineIndex, removeLineIndex } from "../reducers/lineIndexReducer";
import { updateCharetPosition } from "../reducers/charetPositionReducer";
import useTimer from '../hooks/useTimer'
import Timer from "./Timer";
import WordsPerMinute from "./WordsPerMinute";
import ResetButton from "./ResetButton";
import theme from "../theme";

const styles = {
  container: {
    width: '50%'
  },
  input:{
    opacity: 0,
    border: 'none',
    position: 'absolute',
    zIndex: -1,
  },
  realTimeInfoContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textContainer:{
    display: 'flex',
    height: `${4 * theme.fontSizes.body * theme.lineHeights.default}px`,
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'relative',
  }
}

const TypeRacer = ({
  addLineIndex,
  removeLineIndex,
  charetPosition,
  lineIndex,
  updateLastStroke,
  lastStroke,
  setWpm, 
  words, 
  currentWord, 
  copied, 
  displayedWords, 
  typed, 
  setWords, 
  setDisplayedWords, 
  setCurrentWord, 
  setCopied, 
  setTyped, 
  setLastStroke,
  resetCopied,
  resetCurrentWord,
  resetLastStroke,
  resetTyped,
  resetWpm,
  updateCharetPosition,
}) => {

  const timer = useTimer(40)
  const dispatch = useDispatch()

  useEffect(() => {
    const myWords = ['this', 'is', 'a', 'typing', 'test', 'and', 'this', 'is', 'the', 'first', 'iteration','I', 'am', 'going', 'to', 'add', 'a', 'few', 'words', 'just', 'so', 'I', 'can', 'get', 'a', 'feel', 'of', 'the', 'real', 'thing', 'for', 'now', 'it', 'is', 'working', 'pretty', 'well', 'and', 'I', 'would', 'love', 'to', 'be', 'able', 'to', 'limit', 'the', 'amount', 'of', 'visible', 'lines', 'this', 'text', 'has', 'hopefully', 'this', 'did', 'the', 'trick', 'well', 'nevermind', 'it', 'did', 'not'];
    setWords(myWords)
    setDisplayedWords(myWords)
  }, [])//eslint-disable-line

  useEffect(() => {
    if(lastStroke.length === 5){
        setWpm(Math.round(1/((lastStroke[0] - lastStroke[4])/60000)) )
    }
  }, [lastStroke, setWpm])

  useEffect(()=> {
    updateLastStroke(Date.now())
  },[timer.time, updateLastStroke])

  useEffect(()=>{
    const charet = document.querySelector("#activeword")
    const elements  = document.getElementsByClassName('word')
    if(charet && elements){
      const charetY = Math.round(charet.offsetTop/(theme.fontSizes.body*theme.lineHeights.default))
      updateCharetPosition(charetY)
      if(Math.round(charet.offsetTop/(theme.fontSizes.body*theme.lineHeights.default))=== 2 && charetPosition.positionY === 1){
        addLineIndex(currentWord)
        const wordElements = [...document.getElementsByClassName('word')].reverse()
        wordElements.map((word) => {
          if(Math.round(word.offsetTop/(theme.fontSizes.body*theme.lineHeights.default)) === 0){
            word.style.display = 'none'
          }
          return word
        })
      }else if(Math.round(charet.offsetTop/(theme.fontSizes.body*theme.lineHeights.default))=== 0 && charetPosition.positionY === 1){
        const wordElements = [...document.getElementsByClassName('word')]
        removeLineIndex()
        const lines = [...lineIndex]
        lines.pop()
        wordElements.map((word, index) => {
          if(index >= lines[lines.length-1] && index <= currentWord){
            word.style.display = 'flex'
          }
          return word
        })

      }
    }
    
  },[typed, currentWord, addLineIndex, charetPosition.positionY, removeLineIndex, lineIndex])// eslint-disable-line

  const reset = () => {
    resetWpm()
    timer.reset()
    resetLastStroke()
    resetCurrentWord()
    setDisplayedWords(words)
    resetCopied()
    resetTyped()
    const wordElements = [...document.getElementsByClassName('word')].map((word)=>{
      word.style.display = 'flex'
      return word
    })
  }

  const handleChange = (event) => {
    if(!timer.finished){
      
      if(!timer.running && !timer.infinite){
        timer.start()
      }
      setTyped(event.target.value)
      if(event.target.value.length >= typed.new.length){
        setLastStroke(Date.now())
      }
      if(event.target.value.length > words[currentWord].length ){
        const wordToDisplay = words[currentWord] + event.target.value.substring(words[currentWord].length)
        dispatch(changeDisplayedWordAt(currentWord, wordToDisplay))
      }else{
        dispatch(changeDisplayedWordAt(currentWord, words[currentWord]))
      }
    }
  }

  const handleKeyDown = (event) => {
    
    if(timer.finished){
      event.preventDefault()
      return
    }
    if(typed.new === ""){
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
    <div style={styles.container}>
      <div style={styles.realTimeInfoContainer}>
        <WordsPerMinute/>
        <Timer time={timer.formatedTime()} infinite={false}/>
        <ResetButton handleClick={() => {reset()}}/>
      </div>
      
      <div style={styles.textContainer}>
        {displayedWords.map((e,i) => {
          const active = i === currentWord ? 'activeword' : undefined
          return <Word id={active} className='word' key={i} word={e} wordIndex={i}/> 
        })}
      </div>
      <input
      style={styles.input}
      type='text'
      value={typed.new}
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
    displayedWords: state.displayedWords,
    lastStroke: state.lastStroke,
    charetPosition: state.charetPosition,
    lineIndex: state.lineIndex,
  }
}

const mapDispatchToProps = {
  setCopied,
  setTyped,
  setCurrentWord,
  setWords,
  setDisplayedWords,
  setLastStroke,
  setWpm,
  updateLastStroke,
  resetCopied,
  resetCurrentWord,
  resetWpm,
  resetLastStroke,
  resetTyped,
  addLineIndex,
  updateCharetPosition,
  removeLineIndex,
  
}

const ConnectedTypeRacer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeRacer)

export default ConnectedTypeRacer
