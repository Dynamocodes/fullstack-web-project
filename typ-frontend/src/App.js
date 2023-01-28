
import { useEffect } from "react";
import WebFont from "webfontloader";
import TypeRacer from "./components/TypeRacer";
import theme from "./theme";

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
    <div id='App' style={styles.container}>
      <TypeRacer/>
    </div>
    
  );
}

export default App;
