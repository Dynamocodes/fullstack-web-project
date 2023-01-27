import { connect } from "react-redux"
import theme from "../theme"
import Text from "./Text"


const styles = {
  copiedRight:{
    color: theme.colors.copiedRightText,
  },
  copiedWrong:{
    color: theme.colors.copiedWrongText,
  },
  extra:{
    color: theme.colors.extraText,
  },
  toCopy:{
    color: theme.colors.toCopyText,
  },
}

const Letter = ({letter, letterIndex, wordIndex, typed, currentWord, copied, words}) => {

  let style
  // words that are yet to be typed
  if(wordIndex > currentWord){
    style = styles.toCopy
  // words that have been typed
  }else if(wordIndex < currentWord){
    if(copied[wordIndex].length === words[wordIndex].length){
      style = copied[wordIndex][letterIndex] === words[wordIndex][letterIndex] ? styles.copiedRight : styles.copiedWrong
    }else if(copied[wordIndex].length > words[wordIndex].length){
      if(letterIndex < words[wordIndex].length){
        style = copied[wordIndex][letterIndex] === words[wordIndex][letterIndex] ? styles.copiedRight : styles.copiedWrong
      }else{
        style = styles.extra
      }
    }else{
      if(letterIndex < copied[wordIndex].length){
        style = copied[wordIndex][letterIndex] === words[wordIndex][letterIndex] ? styles.copiedRight : styles.copiedWrong
      }else{
        style = styles.toCopy
      }
    }
  // word currently being typed
  }else{
    if(typed.new.length === words[wordIndex].length){
      style = typed.new[letterIndex] === words[wordIndex][letterIndex] ? styles.copiedRight : styles.copiedWrong
    }else if(typed.new.length > words[wordIndex].length){
      if(letterIndex < words[wordIndex].length){
        style = typed.new[letterIndex] === words[wordIndex][letterIndex] ? styles.copiedRight : styles.copiedWrong
      }else{
        style = styles.extra
      }
    }else{
      if(letterIndex < typed.new.length){
        style = typed.new[letterIndex] === words[wordIndex][letterIndex] ? styles.copiedRight : styles.copiedWrong
      }else{
        style = styles.toCopy
      }
    }
  }

  const myStyle = {
    ...style,
  }

  return(
    <Text style={myStyle}>{letter}</Text>
  )
  
}

const mapStateToProps = (state) => {
  return {
    typed: state.typed,
    currentWord: state.currentWord,
    copied: state.copied,
    words: state.words,
  }
}

const ConnectedLetter = connect(
  mapStateToProps
)(Letter)

export default ConnectedLetter
