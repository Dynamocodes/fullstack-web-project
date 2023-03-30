import { useState } from 'react'

const ClickableSvg = ({normal, hovered, handleClick}) =>{

    const [isHover, setIsHover] = useState(false)
    const [isClick, setIsClick] = useState(false)

    const comp = isHover && !isClick ? hovered : normal

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
        onMouseUp={handleMouseUp}>
            {comp}
        </div>
    )
}

export default ClickableSvg