import {ReactComponent as Login} from '../resources/login.svg'
import {ReactComponent as LoginHover} from '../resources/login_hover.svg'
import {ReactComponent as Logout} from '../resources/logout.svg'
import {ReactComponent as LogoutHover} from '../resources/logout_hover.svg'
import {ReactComponent as Stats} from '../resources/stats.svg'
import {ReactComponent as StatsHover} from '../resources/stats_hover.svg'
import theme from '../theme'
import Text from './Text'
import ClickableSvg from './ClickableSvg'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ME_QUERY } from '../graphql/queries'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    background: theme.colors.backgroundSecondary,
    justifyContent: 'space-between',
    minHeight: theme.fontSizes.title * theme.lineHeights.default,
    maxHeight: theme.fontSizes.title * theme.lineHeights.default,
    alignItems: 'center',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  svg: {
    height: theme.fontSizes.body,
    width: theme.fontSizes.title
  }
}

const Header = () => {

  const { loading, data } = useQuery(ME_QUERY);
  const navigate = useNavigate()

  const user = loading ? '...' : data.me

  const isLoggedIn = () => {
    return localStorage.getItem('token') !== null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const stats = isLoggedIn() ? <ClickableSvg  normal={<Stats style={styles.svg}/>} hovered={<StatsHover style={styles.svg}/>} handleClick={() => navigate('/myStats')}/> : null
  const logButton = 
  isLoggedIn() ? 
  <ClickableSvg normal={<Logout style={styles.svg} />} hovered={<LogoutHover style={styles.svg}/>} handleClick={handleLogout}/> : 
  <ClickableSvg normal={<Login style={styles.svg}/>} hovered={<LoginHover style={styles.svg}/>} handleClick={() => navigate('/login')}/>

  const greeting = 
  isLoggedIn() ? 
  <Text style={{fontSize: theme.fontSizes.subheading}}> Hello {user.username} ! </Text>:
  <Text style={{fontSize: theme.fontSizes.subheading}}> Hello, guest ! </Text>

  return(
    <div style={styles.container}>
      <div style={styles.subContainer}>
        {greeting}
      </div>
      <div style={styles.subContainer}>
        {stats}{logButton}
      </div>
    </div>

  )
}

export default Header
