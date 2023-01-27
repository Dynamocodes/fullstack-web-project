
import { connect } from "react-redux"
import Text from "./Text"
const WordsPerMinute = ({ wpm }) => {

    return(
        <Text fontWeight='bold'>{wpm} wpm</Text>
    )
}
const mapStateToProps = (state) => {
    return {
      wpm: state.wpm,
    }
  }
  
  const mapDispatchToProps = {
  }
  
  const ConnectedWordsPerMinute = connect(
    mapStateToProps,
    mapDispatchToProps
  )(WordsPerMinute)
  
  export default ConnectedWordsPerMinute