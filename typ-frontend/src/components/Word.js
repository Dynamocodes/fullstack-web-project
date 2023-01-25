import Letter from "./Letter"
import theme from "../theme"

const styles = {
  container : {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 20,
    fontSize: theme.fontSizes.body
  }
}
const Word = ({word, wordIndex}) => {
  return(
    <div style={styles.container}>{word.split('').map((letter, letterIndex) => {return <Letter key={letterIndex} letter={letter} letterIndex={letterIndex} wordIndex={wordIndex}/>})}</div>
  )
}

export default Word