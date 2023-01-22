
import TypeRacer from "./components/TypeRacer";
import theme from "./theme";

const styles = {
  container:{
    backgroundColor: theme.colors.backgroundPrimary,
  }
}

function App() {
  return (
    <div style={styles.container}>
      <TypeRacer/>
    </div>
    
  );
}

export default App;
