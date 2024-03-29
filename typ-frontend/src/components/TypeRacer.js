import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Word from "./Word";
import { setWords, addWords } from "../reducers/wordsReducer";
import { setCopied, resetCopied} from "../reducers/copiedWordsReducer";
import { setTyped, resetTyped } from "../reducers/typedReducer";
import { setCurrentWord, resetCurrentWord } from "../reducers/currentWordReducer";
import { setDisplayedWords, changeDisplayedWordAt, addDisplayedWords } from "../reducers/displayedWordsReducer";
import { setLastStroke, updateLastStroke, resetLastStroke } from "../reducers/lastStrokeReducer";
import { setWpm, resetWpm } from "../reducers/wpmReducer";
import { addLineIndex, removeLineIndex } from "../reducers/lineIndexReducer";
import { updateCharetPosition } from "../reducers/charetPositionReducer";
import { addWpm, resetInstantWpms } from "../reducers/instantWpmsReducer";
import { setAverageGrossWpm, resetAverageGrossWpm } from "../reducers/averageGrossWpmReducer";
import { addAverageWpms, resetAverageWpms } from "../reducers/averageWpmsReducer";
import { initializeWordPool } from "../reducers/wordPoolReducer";
import useTimer from '../hooks/useTimer'
import Timer from "./Timer";
import WordsPerMinute from "./WordsPerMinute";
import {ReactComponent as Refresh} from '../resources/refresh.svg'
import {ReactComponent as RefreshHover} from '../resources/refresh_hover.svg'
import {ReactComponent as Shuffle} from '../resources/shuffle.svg'
import {ReactComponent as ShuffleHover} from '../resources/shuffle_hover.svg'
import {ReactComponent as Clock} from '../resources/clock.svg'
import ClickableSvg from "./ClickableSvg";
import Statistics from "./Statistics"
import theme from "../theme";
import { initialTextLength, preGeneratedWordNumber } from "../constants/typeRacerConstants";
import TimeSelector from './TimeSelector'
import Header from "./Header";
import { useMutation, useQuery } from '@apollo/client';
import { ME_QUERY } from "../graphql/queries";
import { ADD_STATISTIC } from "../graphql/mutations";

const styles = {
  container: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
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
  },
  buttonContainer:{
    display: 'flex',
    flexDirection: 'row',
  },
  TimeSelector:{
    display: 'flex',
    justifyContent: 'center',
    padding:10,
    marginBottom: '2rem'
  }
}

const TypeRacer = ({
  wpm,
  instantWpms,
  addWpm,
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
  addWords,
  setDisplayedWords,
  addDisplayedWords,
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
  resetInstantWpms,
  setAverageGrossWpm,
  addAverageWpms,
  resetAverageGrossWpm,
  resetAverageWpms,
  averageWpms,
  wordPool,
  selectedTime,
}) => {
  const time = selectedTime
  const timer = useTimer(time)
  const dispatch = useDispatch()

  const { data } = useQuery(ME_QUERY);
  const [addStatistic] = useMutation(ADD_STATISTIC);

  let newStats

  // fetching the wordPool
  useEffect(() => {
    if(wordPool && wordPool.length === 0){
      dispatch(initializeWordPool())
    }
  })

  // initialising the words to be copied
  useEffect(() => {
    if(wordPool && wordPool.length !== 0){
      const myWords = pickNWords(initialTextLength)
      setWords(myWords)
      setDisplayedWords(myWords)
    }
  }, [wordPool])//eslint-disable-line


  // updating the wpm counter each time a new keystroke is made
  useEffect(() => {
    if(lastStroke.length >= 2){
      setWpm(Math.round((lastStroke.length/5)/((lastStroke[0] - lastStroke[lastStroke.length-1])/60000)) )
    }
    if(time-timer.time !== 0){
      const minutes = (time - timer.time)/60
      setAverageGrossWpm(((copied.join() + typed.new).length/5)/minutes)
    }
  }, [lastStroke, setWpm])//eslint-disable-line

  // updating the timestamp of the lastkeystroke so the wpm counter changes as the timer is updated
  useEffect(()=> {
    updateLastStroke(Date.now())
  },[timer.time, updateLastStroke])

  // generating new words when the user gets too close to the end of the text
  useEffect(() => {
    if(wordPool && words){
      if(currentWord > words.length - preGeneratedWordNumber){
        const pickedWords = pickNWords(initialTextLength)
        addWords(pickedWords)
        addDisplayedWords(pickedWords)
      }
    }
  }, [currentWord])//eslint-disable-line


  // updating charet placement
  useEffect(() => {
    const charet = document.querySelector("#activeword");
    const elements = document.getElementsByClassName('word');
    if (charet && elements) {
      const charetY = Math.round(charet.offsetTop / (theme.fontSizes.body * theme.lineHeights.default));
      updateCharetPosition(charetY);
      if (charetY === 2 && charetPosition.positionY === 1) {
        addLineIndex(currentWord);
        const wordElements = [...document.getElementsByClassName('word')].reverse();
        wordElements.map((word) => {
          if (Math.round(word.offsetTop / (theme.fontSizes.body * theme.lineHeights.default)) === 0) {
            word.style.display = 'none';
          }
          return word;
        });
      } else if (charetY === 0 && charetPosition.positionY === 1) {
        const wordElements = [...document.getElementsByClassName('word')];
        removeLineIndex();
        const lines = [...lineIndex];
        lines.pop();
        wordElements.map((word, index) => {
          if (index >= lines[lines.length - 1] && index <= currentWord) {
            word.style.display = 'flex';
          }
          return word;
        });
      }
    }
  }, [typed, currentWord, addLineIndex, charetPosition.positionY, removeLineIndex, lineIndex]); // eslint-disable-line  

  //handling the evolution of the stats for the graph and the stats.
  useEffect(() => {
    if(timer.time === 0){
      hideWords()
      newStats = {//eslint-disable-line
        netWpm: calculateNetWpm(),
        grossWpm: calculateGrossWpm(),
        accuracy: calculateAccuracy(),
        right: calculateCorrectLetters(),
        wrong: calculateTypos(),
        extra: calculateExtraLetters(),
        missing: calculateMissingLetters(),
        time: time,
        date: (new Date(Date.now())).toLocaleString()
      }
      handleAddStatistic(newStats)
    }
    if(timer.running){
      if(instantWpms.length === 0){
        addWpm(0)
        addAverageWpms(0)
      }
      if(time-timer.time !== 0){
        addWpm(wpm)
        addAverageWpms(((copied.join('') + typed.new).length/5)/((time - timer.time)/60))
      }
    }
    
  }, [timer.time, addWpm])//eslint-disable-line

  // reseting the game when the user changes the time in the time selector
  useEffect(()=>{
    reset()
  },[selectedTime])//eslint-disable-line

  // hide words when showing stats
  const hideWords = () => {
    const wordElements = [...document.getElementsByClassName('word')]
    wordElements.map((word)=>{
      word.style.display = 'none'
      return word
    })
    document.querySelector('#text').style.display = 'none'
  }

  // show words when restarting a game
  const showWords = () => {
    const wordElements = [...document.getElementsByClassName('word')]
    wordElements.map((word)=>{
      word.style.display = 'flex'
      return word
    })
    document.querySelector('#text').style.display = 'flex'
  }

  const handleAddStatistic = (statisticInput) => {
    if (!data || !data.me) {
      console.log('User not logged in');
      return;
    }
    const user = data.me.id;
    addStatistic({
      variables: { user, statisticInput },
      update: (cache, { data: { addStatistic } }) => {
        const { me } = cache.readQuery({ query: ME_QUERY });
        cache.writeQuery({
          query: ME_QUERY,
          data: {
            me: {
              ...me,
            },
          },
        });
      },
    });
  };

  // pick words words for random word generation
  const pickNWords = (n) => {
    const tmpWordPool = [...wordPool]
    return tmpWordPool.sort(() => .5 - Math.random()).slice(0,n)
  }

  // reseting the game without shuffling the words
  const reset = () => {
    resetWpm()
    timer.reset()
    resetLastStroke()
    resetCurrentWord()
    setDisplayedWords(words)
    resetCopied()
    resetTyped()
    showWords()
    resetInstantWpms()
    resetAverageGrossWpm()
    resetAverageWpms()
  }

  const shuffle = () => {
    const newWords = pickNWords(initialTextLength)
    reset()
    setWords(newWords)
    setDisplayedWords(newWords)
    
  }

  // handling input changes in the hidden text input
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

  // handling regular keypresses 
  // as well as special keys such as space and backspace
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

  //stat calculation, displayed at the end of a game
  const calculateExtraLetters = () => {
    const typedExtra = typed.new.length > words[currentWord].length ? typed.new.length - words[currentWord].length : 0
    return typedExtra + copied.reduce((extra, word, index) => {
      return word.length > words[index].length ? extra + (word.length - words[index].length) : extra
    }, 0)
  }
  
  const calculateCorrectLetters = () => {
    const typedCorrect = typed.new.split("").reduce((typedRight, typedLetter, typedLetterIndex) => {
      return typedLetter === words[currentWord][typedLetterIndex] && typedLetterIndex < Math.min(typed.new.length, words[currentWord].length) ? typedRight + 1 : typedRight
    },0)
    return typedCorrect + copied.reduce((totalRight, word, wordIndex) => {
      return totalRight + word.split("").reduce((right, letter, letterIndex) => {
        return letter === words[wordIndex][letterIndex] && letterIndex < Math.min(word.length, words[wordIndex].length) ? right + 1 : right
      }, 0)
    }, 0)
  }

  const calculateTypos = () => {
    const typedIncorrect = typed.new.split("").reduce((typedWrong, typedLetter, typedLetterIndex) => {
      return typedLetter !== words[currentWord][typedLetterIndex] &&  typedLetterIndex < Math.min(typed.new.length, words[currentWord].length) ? typedWrong + 1 : typedWrong
    },0)
    return typedIncorrect + copied.reduce((totalWrong, word, wordIndex) => {
      return totalWrong + word.split("").reduce((wrong, letter, letterIndex) => {
        return letter !== words[wordIndex][letterIndex] && letterIndex < Math.min(word.length, words[wordIndex].length) ? wrong + 1 : wrong
      }, 0)
    }, 0)
  }

  const calculateMissingLetters = () => {
    return copied.reduce((missing, word, index) => {
      return word.length < words[index].length ? missing + (words[index].length - word.length) : missing
    }, 0)
  }

  const calculateNetWpm = () => {
    const minutes = (time/60)
    return Math.round(((calculateCorrectLetters()/5)/minutes)*10)/10
  }

  const calculateGrossWpm = () => {
      const minutes = (time/60)
      return Math.round((((copied.join("") + typed.new).length/5)/minutes)*10)/10
  }

  const calculateAccuracy = () => {
    return Math.round(((calculateCorrectLetters() * 100) /(typed.new.length + copied.join("").length))*10)/10
  }

  const stats = instantWpms.length === time+1 
  ? <Statistics stats={{
    instantWpms: instantWpms,
    averageWpms: averageWpms,
    netWpm: calculateNetWpm(),
    grossWpm: calculateGrossWpm(),
    accuracy: calculateAccuracy(),
    right: calculateCorrectLetters(),
    wrong: calculateTypos(),
    extra: calculateExtraLetters(),
    missing: calculateMissingLetters(),
    time: time,
    date: (new Date(Date.now())).toLocaleString()
  }}/> 
  : null

  return (
    <>
    <Header/>
    <div style={styles.container}>
      <div style={styles.TimeSelector}><Clock style={{height: theme.fontSizes.body * theme.lineHeights.default}} /><TimeSelector/></div>
      <div style={styles.realTimeInfoContainer}>
        <WordsPerMinute/>
        <Timer time={timer.formatedTime()} infinite={false}/>
        <div style={styles.buttonContainer}>
          <ClickableSvg 
          normal={<Refresh style={{height: theme.fontSizes.body, width: theme.fontSizes.body, paddingRight:20}}/>} 
          hovered={<RefreshHover style={{height: theme.fontSizes.body, width: theme.fontSizes.body, paddingRight:20}}/>} 
          handleClick={() => {reset()}}/>
          <ClickableSvg 
          normal={<Shuffle style={{height: theme.fontSizes.body, width: theme.fontSizes.body*theme.lineHeights.default}}/>} 
          hovered={<ShuffleHover style={{height: theme.fontSizes.body, width: theme.fontSizes.body*theme.lineHeights.default}}/>} 
          handleClick={() => {shuffle()}}/>
        </div>
        
      </div>
      
      <div id='text' style={styles.textContainer}>
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
      {stats}
    </div>
    </>
    
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
    instantWpms: state.instantWpms,
    wpm: state.wpm,
    averageGrossWpm: state.averageGrossWpm,
    averageWpms: state.averageWpms,
    wordPool: state.wordPool,
    selectedTime: state.selectedTime,
  }
}

const mapDispatchToProps = {
  setCopied,
  setTyped,
  setCurrentWord,
  setWords,
  addWords,
  setDisplayedWords,
  addDisplayedWords,
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
  addWpm,
  resetInstantWpms,
  setAverageGrossWpm,
  addAverageWpms,
  resetAverageGrossWpm,
  resetAverageWpms,
  initializeWordPool,
  
}

const ConnectedTypeRacer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeRacer)

export default ConnectedTypeRacer
