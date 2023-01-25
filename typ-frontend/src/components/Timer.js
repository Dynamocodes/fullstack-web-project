import useTimer from "../hooks/useTimer"
import Text from "./Text"

const Timer = () => {
  const timer = useTimer(5)

  return(
  <div>
    <Text fontStyle='bold' fontWeight='bold'>
      {timer.formatedTime()}
    </Text>
    <button onClick={()=>timer.pause()}>pause</button>
    <button onClick={()=>timer.reset()}>reset</button>
    <button onClick={()=>timer.start()}>start</button>
    <button onClick={()=>timer.zero()}>zero</button>
  </div>)    
}

export default Timer