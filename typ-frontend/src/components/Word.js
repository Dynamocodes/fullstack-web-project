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
const Word = ({word, wordIndex, className, typed}) => {

  const charet = typed.new.length === 0 ? 0 : typed.new.length - 1

  return(
    <div className={className} style={styles.container}>
      {word.split('').map((letter, letterIndex) => {
        console.log(className, typed.new.length, letterIndex)
      return className === 'activeword' && charet === letterIndex 
      ? <Letter className='activeletter' key={letterIndex} letter={letter} letterIndex={letterIndex} wordIndex={wordIndex}/>
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