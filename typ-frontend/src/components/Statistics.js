import { useState } from "react";
import LineChart from "./LineChart";
import theme from "../theme";
import Text from "./Text";

const styles = {
  container: {
    background: theme.colors.backgroundSecondary,
    borderRadius: 20,
    padding: 20,
  },
  topInfoContainer : {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bottomInfoContainer: {
    padding: 10,
    display: 'flex',
    flexDirection:'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  dateTimeContainer: {

  }
}

const Statistics = ({stats}) => {

  
  const [chartData] = useState({
    labels: [...Array(stats.instantWpms.length).keys()], 
    datasets: [
      {
        label: "Instant WPM ",
        data: stats.instantWpms,
      },
      {
        label: "Avertage Gross WPM ",
        data: stats.averageWpms,
        backgroundColor: theme.colors.copiedRightText,
        borderColor: theme.colors.extraText,
      }
    ],
  });

  
  return(
    <div>
      <div id='chartContainer' style={styles.container}>
        <LineChart chartData={chartData}/>
      </div>
      <div>
        <div style={styles.topInfoContainer}>
          <div style={styles.infoContainer}>
            <Text color="highlight">net WPM</Text>
            <Text color="highlight" fontWeight='bold'>{stats.netWpm}</Text>
          </div>
          <div style={styles.infoContainer}>
            <Text color="highlight">gross WPM</Text>
            <Text color="highlight" fontWeight='bold'>{stats.grossWpm}</Text>
          </div>
          <div style={styles.infoContainer}>
            <Text color="highlight">accuracy</Text>
            <Text color="highlight" fontWeight='bold'>{stats.accuracy}%</Text>
          </div>
        </div>
        <div style={styles.bottomInfoContainer}>
          <div style={styles.infoContainer}>
            <Text color="highlight"> r/w/e/m</Text>
            <Text color="highlight" fontWeight='bold'>{stats.advancedKeystrokeStats.right}/{stats.advancedKeystrokeStats.wrong}/{stats.advancedKeystrokeStats.extra}/{stats.advancedKeystrokeStats.missing}</Text>
          </div>
          <div>
            <Text color="highlight"> date: {stats.date} </Text>
            <Text color="highlight"> time: {stats.time}s</Text>
          </div>
        </div>
        
        
        
        
        
      </div>
    </div>
  )
}

export default Statistics