import { useState } from "react"
import Text from "./Text"

const ClickableText = ({text, normalColor, hoveredColor, handleClick}) => {
  const [isHover, setIsHover] = useState(false)
  const [isClick, setIsClick] = useState(false)

  const comp = isHover && !isClick ? hoveredColor : normalColor

  const handleMouseEnter = () => {
      setIsHover(true)
  }

  const handleMouseLeave = () => {
      setIsHover(false)
  }

  const handleMouseDown = () => {
      setIsClick(true)
  }

  const handleMouseUp = () => {
      setIsClick(false)
      handleClick()
  }

  return(
    <div
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    >
      <Text style={{color: comp,}}>{text}</Text>
    </div>
  )
}

export default ClickableText