import { connect } from "react-redux"
import Letter from "./Letter"
import theme from "../theme"

const styles = {
  container : {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 20,
    fontSize: theme.fontSizes.body,
    position: 'relative',
  }
}
const Word = ({word, wordIndex, id, className, typed}) => {

  const charet = typed.new.length === 0 ? 0 : typed.new.length - 1

  return(
    <div id={id} className={className} style={styles.container}>
      {word.split('').map((letter, letterIndex) => {
      return id === 'activeword' && charet === letterIndex 
      ? <Letter className='letter' id='activeletter' key={letterIndex} letter={letter} letterIndex={letterIndex} wordIndex={wordIndex}/>
      : <Letter className='letter' key={letterIndex} letter={letter} letterIndex={letterIndex} wordIndex={wordIndex}/>})}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    typed: state.typed,
  }
}

const ConnectedWord = connect(
  mapStateToProps
)(Word)

export default ConnectedWord