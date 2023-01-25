import { useEffect, useState } from "react"

const useTimer = (timeInSec) => {

  const [time, setTime] = useState(timeInSec)
  const [deadline, setDeadline] = useState(new Date(Date.now() + timeInSec * 1000))
  const [intervalId, setIntervalId] = useState(null)

  useEffect(()=> {
    if(time <= 0){
      clearInterval(intervalId)
    }
  }, [time, intervalId])

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
    clearInterval(intervalId)
    setIntervalId(null)
    setTime(timeInSec)
  }

  const start = () => {
    if(!intervalId){
      const newDeadline = new Date(Date.now() + time * 1000)
      setDeadline(newDeadline)
      const interval = setInterval(()=>{
        setTime(Math.round((newDeadline - Date.now())/1000))
      },1000)
      setIntervalId(interval)
    }
  }
  
  const pause = () => {
    clearInterval(intervalId)
    setIntervalId(null)
  }

  const zero = () => {
    clearInterval(intervalId)
    setIntervalId(null)
    setTime(0)
  }

  return {time, deadline, reset, start, zero, pause, formatedTime}
}

export default useTimer