import theme from "../theme";

const styles = {
    text: {
      color: theme.colors.textPrimary,
      fontSize: theme.fontSizes.body,
      fontFamily: theme.fonts.main,
      fontWeight: theme.fontWeights.regular,
      fontStyle: theme.fontStyles.regular,
    },
    colorTextClickable: {
      color: theme.colors.clickable,
    },
    fontSizeSubheading: {
      fontSize: theme.fontSizes.subheading,
    },
    fontWeightBold: {
      fontWeight: theme.fontWeights.bold,
    },
    fontStyleBold: {
      fontStyle: theme.fontStyles.bold
    }
  };

const Text = ({ color, fontStyle, fontSize, fontWeight, style, ...props }) => {
  const newFontStyle = fontStyle === 'bold' ? styles.fontStyleBold.fontStyle : styles.text.fontStyle
  const newColor = color === 'clickable' ? styles.colorTextClickable.color : styles.text.color
  const newFontSize = fontSize === 'subheading' ? styles.fontSizeSubheading.fontSize :styles.text.fontSize
  const newFontWeight = fontWeight === 'bold' ? styles.fontWeightBold.fontWeight : styles.text.fontWeight
  

  const textStyle = {
    ...styles.text,
    fontStyle: newFontStyle,
    color: newColor,
    fontSize: newFontSize,
    fontWeight: newFontWeight,
    ...style,
  }
  return(
    <div style={textStyle} {...props}>{props.children}</div>
  ) 
}

export default Text