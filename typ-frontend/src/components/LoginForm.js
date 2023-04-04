import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Text from "./Text";
import theme from "../theme";

const inlineStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    padding: "2rem",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "none",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
    width:'100%',
    boxSizing: "border-box"
  },
  button: {
    width: "100%",
    backgroundColor: theme.colors.backgroundPrimary,
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "0.5rem",
    border: "none",
  },
  signUp: {
    marginTop: "1rem",
    color: theme.colors.placeholder,
    fontFamily: theme.fonts.main,
    fontSize: theme.fontSizes.info,
  },
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div style={inlineStyles.container}>
      <div style={inlineStyles.form}>
        <Text style={{ color: theme.colors.backgroundPrimary }} fontWeight="bold">
          Login
        </Text>
          <input
            style={inlineStyles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            style={inlineStyles.input}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        <button
          style={inlineStyles.button}
          className="login-button"
          onClick={handleLogin}
        >
          LOGIN
        </button>
        <div style={inlineStyles.signUp}>
          Not a member? <u><a href="/signup" style={{textDecoration: 'none', color: 'inherit',}}>Sign up now</a></u>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;