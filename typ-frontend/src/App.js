
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
        families: ['Roboto Mono:300,700']
      }
    });
   }, []);

  return (
    <div style={styles.container}>
      <TypeRacer/>
    </div>
    
  );
}

export default App;
