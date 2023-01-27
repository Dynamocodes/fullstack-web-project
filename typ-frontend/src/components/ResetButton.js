import { useState } from 'react'
import {ReactComponent as Refresh} from '../resources/refresh.svg'
import {ReactComponent as RefreshHover} from '../resources/refresh_hover.svg'
import theme from '../theme'

const ResetButton = ({handleClick}) =>{

    const [isHover, setIsHover] = useState(false)
    const [isClick, setIsClick] = useState(false)

    const style = {
        height: theme.fontSizes.body,
    }

    const comp = isHover && !isClick ? <RefreshHover style={style}/> : <Refresh style={style}/>

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

export default ResetButton