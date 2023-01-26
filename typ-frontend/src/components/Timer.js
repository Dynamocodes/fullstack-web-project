import useTimer from "../hooks/useTimer"
import Text from "./Text"

const Timer = () => {
  const timer = useTimer(5)

  return(
  <div>
    <Text fontStyle='bold' fontWeight='bold'>
      {timer.formatedTime()}
    </Text>
  </div>)    
}

export default Timer