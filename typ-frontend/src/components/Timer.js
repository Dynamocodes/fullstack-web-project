import Text from "./Text"

const Timer = ({time, infinite}) => {
  if(infinite){
    return <Text fontWeight>Infinite</Text>
  }

  return(
  <div>
    <Text fontWeight='bold' color='highlight'>
      {time}
    </Text>
  </div>)    
}

export default Timer