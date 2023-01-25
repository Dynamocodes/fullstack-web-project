import { useState } from "react"

const useTimer = (timeInSec) => {

//  const SECONDS = timeInSec % 60
//  const MINUTES = ((timeInSec - SECONDS ) / 60) % 60
//  const HOURS = ((timeInSec - SECONDS - (MINUTES * 60)) / 3600) % 24
//  const DAYS = (timeInSec - SECONDS - (MINUTES * 60) - (HOURS * 3600)) / (3600 * 24)

  const [time, setTime] = useState(timeInSec)
  const [deadline, setDeadline] = useState(new Date(Date.now() + timeInSec * 1000))
  const [intervalId, setIntervalId] = useState(null)

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
    setTime(timeInSec)
  }

  const start = () => {
    if(time){
      const newDeadline = new Date(Date.now() + time * 1000)
      setDeadline(newDeadline)
      if(!intervalId){
        setIntervalId(setInterval(() => {
        setTime(Math.round((newDeadline - Date.now())/1000))
        if(Date.now() >= newDeadline){
          clearInterval(intervalId)
        }
        
        }, 1000))
      }
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