import useTimer from "../hooks/timer"

const Timer = () => {
  const timer = useTimer(20)

  return(
  <div>
    <p>
      {timer.formatedTime()}
    </p>
    <button onClick={()=>timer.pause()}>pause</button>
    <button onClick={()=>timer.reset()}>reset</button>
    <button onClick={()=>timer.start()}>start</button>
    <button onClick={()=>timer.zero()}>zero</button>
  </div>)    
}

export default Timer