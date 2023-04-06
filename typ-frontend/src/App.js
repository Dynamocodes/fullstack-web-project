
import { useEffect } from "react";
import WebFont from "webfontloader";
import TypeRacer from "./components/TypeRacer";
import theme from "./theme";
import LoginForm from "./components/LoginForm";
import SignupForm from './components/SignupForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StatisticList from "./components/StatisticList";

const styles = {
  container:{
    backgroundColor: theme.colors.backgroundPrimary,
  }
}

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto Mono:400,700']
      }
    });
   }, []);

  return (
    <Router>
      <div id="App" style={styles.container}>
        <Routes>
          <Route exact path="/" element={<TypeRacer/>} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/signup" element={<SignupForm/>} />
          <Route path="/myStats" element={<StatisticList/>}/>
          
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
