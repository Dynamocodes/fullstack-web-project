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
  charet:{
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    width: '0.1em',
    height: '100%',
    borderRadius: 2
  },
}

const Letter = ({className, letter, letterIndex, wordIndex, typed, currentWord, copied, words}) => {

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
  const coords = typed.new.length === 0 ? {left: 0,} : {right: 0,}

  if(className === 'activeletter'){
    return(
      <div  className={className} style={{position: 'relative',}}>
        <div style={{...styles.charet,...coords}}></div>
        <Text style={myStyle}>{letter}</Text>
      </div>
    )
  }
  return(
    <div className={className}>
      <Text style={myStyle}>{letter}</Text>
    </div>
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
