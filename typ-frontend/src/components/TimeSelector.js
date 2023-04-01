import { connect } from "react-redux"
import theme from "../theme"
import ClickableText from "./ClickableText"
import { setSelectedTime } from "../reducers/selectedTimeReducer"
import { useState } from "react"

const TimeSelector = ({setSelectedTime}) => {

    const styles = {
        container:{
            display: 'inline-flex',
            flexDirection: 'row',
            background: theme.colors.backgroundSecondary,
            borderRadius: 5,
            justifyContent: 'space-around',
            width:'50%',
        },
        selectedContainer:{
            borderRadius: 5,
            paddingLeft: 5,
            paddingRight:5,
        }
    }

    const [selected, setSelected] = useState(60)

    const selectTime = (time) => {
        setSelected(time)
        setSelectedTime(time)
        
    }

    return(
        <div style={styles.container}>
            <div style={{
                ...styles.selectedContainer,
                background: 
                    selected === 15 ? 
                    theme.colors.backgroundSecondaryHover : 
                    theme.colors.backgroundSecondary,}}>
                <ClickableText 
                text='15' 
                normalColor={theme.colors.clickable} 
                hoveredColor={theme.colors.clickableOnHover}
                handleClick={() => selectTime(15)}/>
            </div>
            <div style={{
                ...styles.selectedContainer,
                background: 
                    selected === 30 ? 
                    theme.colors.backgroundSecondaryHover : 
                    theme.colors.backgroundSecondary,}} >
                <ClickableText 
                text='30' 
                normalColor={theme.colors.clickable} 
                hoveredColor={theme.colors.clickableOnHover}
                handleClick={() => selectTime(30)}/>
            </div>
            <div style={{
                ...styles.selectedContainer,
                background: 
                    selected === 60 ? 
                    theme.colors.backgroundSecondaryHover : 
                    theme.colors.backgroundSecondary,}}>
                <ClickableText 
                text='60' 
                normalColor={theme.colors.clickable} 
                hoveredColor={theme.colors.clickableOnHover}
                handleClick={() => selectTime(60)}/>
            </div>
            <div style={{
                ...styles.selectedContainer,
                background: 
                    selected === 120 ? 
                    theme.colors.backgroundSecondaryHover : 
                    theme.colors.backgroundSecondary,}}>
                <ClickableText 
                text='120' 
                normalColor={theme.colors.clickable} 
                hoveredColor={theme.colors.clickableOnHover}
                handleClick={() => selectTime(120)}/>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectTime: state.selectedTime,
    }
}

const mapDispatchToProps = {
setSelectedTime
}

const ConnectedTimeSelector = connect(
mapStateToProps,
mapDispatchToProps
)(TimeSelector)

export default ConnectedTimeSelector