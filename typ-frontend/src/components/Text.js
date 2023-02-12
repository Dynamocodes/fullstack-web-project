import theme from "../theme";

const styles = {
    text: {
      cursor: 'default',
      color: theme.colors.textPrimary,
      fontSize: theme.fontSizes.body,
      fontFamily: theme.fonts.main,
      fontWeight: theme.fontWeights.normal,
      lineHeight: theme.lineHeights.default,
    },
    colorTextClickable: {
      color: theme.colors.clickable,
    },
    colorTextHighlighted: {
      color: theme.colors.copiedRightText,
    },
    fontSizeSubheading: {
      fontSize: theme.fontSizes.subheading,
    },
    fontWeightBold: {
      fontWeight: theme.fontWeights.bold,
    },
  };

const Text = ({ color, fontStyle, fontSize, fontWeight, style, ...props }) => {
  let newColor
  switch(color){
    case 'clickable':
      newColor = styles.colorTextClickable.color
      break
    case 'highlight':
      newColor = styles.colorTextHighlighted.color
      break
    default : 
      newColor = styles.text.color

  }
  const newFontSize = fontSize === 'subheading' ? styles.fontSizeSubheading.fontSize :styles.text.fontSize
  const newFontWeight = fontWeight === 'bold' ? styles.fontWeightBold.fontWeight : styles.text.fontWeight
  

  const textStyle = {
    ...styles.text,
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