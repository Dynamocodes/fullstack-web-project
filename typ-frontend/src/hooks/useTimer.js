import { useEffect, useState } from "react"

const useTimer = (timeInSec) => {

  const [time, setTime] = useState(timeInSec)
  const [deadline, setDeadline] = useState(new Date(Date.now() + timeInSec * 1000))
  const [intervalId, setIntervalId] = useState(null)
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)
  const [infinite, setInfinite] = useState(false)

  useEffect(()=> {
    if(time <= 0 && !infinite){
      clearInterval(intervalId)
      setFinished(true)
      setRunning(false)
    }
  }, [time, intervalId, infinite])

  const getSeconds = () => {
    return time % 60
  }

  const getMinutes = () => {
    return Math.floor(time/60) % 60
  }

  const getHours = () => {
    return Math.floor(time /3600) % 24
  }

  const getDays = () => {
    return Math.floor(time/86400)
  }

  const formatedTime = () => {
    const formatedSecondsAndMinutes  = `${getMinutes().toString().padStart(2, '0')}:${getSeconds().toString().padStart(2, '0')}`
    const formatedDays = getDays() === 0 ? `` : `${getDays()/toString().padStart(2, '0')}:`
    const formatedHours = getHours() === 0 && getDays() === 0 ? `` : `${getHours().toString().padStart(2, '0')}:`
    return `${formatedDays}${formatedHours}${formatedSecondsAndMinutes}` 
  }

  const reset = () => {
    if(!infinite){
      clearInterval(intervalId)
      setIntervalId(null)
      setTime(timeInSec)
      setRunning(false)
      setFinished(false)
    }
  }

  const start = () => {
    if(!intervalId && !infinite){
      const newDeadline = new Date(Date.now() + time * 1000)
      setDeadline(newDeadline)
      setRunning(true)
      const interval = setInterval(()=>{
        setTime(Math.round((newDeadline - Date.now())/1000))
      },1000)
      setIntervalId(interval)
    }
  }
  
  const pause = () => {
    if(!infinite){
      clearInterval(intervalId)
      setIntervalId(null)
      setRunning(false)
    }
  }

  const zero = () => {
    if(!infinite){
      clearInterval(intervalId)
      setIntervalId(null)
      setTime(0)
      setRunning(false)
      setFinished(true)
    }
  }

  return {time, deadline, running, finished, infinite, reset, start, zero, pause, formatedTime, setInfinite}
}

export default useTimer