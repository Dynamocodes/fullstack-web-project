import { useQuery } from '@apollo/client';
import { ALL_STATISTICS, ME_QUERY } from '../graphql/queries';
import Text from './Text';
import theme from '../theme'
import Header from './Header';

const styles = {
    container: {
      display: 'flex',
      flexDirection:'column',
      alignItems: 'center'
    },
    statContainer:{
      background: theme.colors.backgroundSecondary,
      margin:'0.5rem',
      borderRadius: 10,
      width: '50%',
    },
    topInfoContainer : {
      padding: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      marginLeft: '2rem',
    }
  }

const StatisticList = () => {

  const { loading: meLoading, data: meData } = useQuery(ME_QUERY);
  const userId = meData ? meData.me.id : null;
  const { loading: statsLoading, data: statsData } = useQuery(ALL_STATISTICS, {
    variables: { userId },
  });
  
  if (meLoading || statsLoading) {
    return <Text>Loading statistics...</Text>;
  }

  const statistics = statsData.allStatistics;

  return(
    <div style={{width: '100%', display: 'flex', flexDirection: 'column',}}>
      <Header/>
      
      <div style={styles.container}>
      <Text fontWeight="bold" style={{fontSize: theme.fontSizes.title, margin: '2rem'}}> Statistics </Text>
      {statistics.map((stats) => (<div key={stats.id} style={styles.statContainer}>
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
            <Text color="highlight" fontWeight='bold'>{stats.right}/{stats.wrong}/{stats.extra}/{stats.missing}</Text>
          </div>
          <div style={styles.dateTimeContainer}>
            <Text color="highlight"> date: {stats.date} </Text>
            <Text color="highlight"> time: {stats.time}s</Text>
          </div>
        </div>
      </div>
      ))}
      </div>
    </div>
      
  )
}

export default StatisticList