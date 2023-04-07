import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Text from "./Text";
import theme from "../theme";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import ClickableText from "./ClickableText";

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
  const [errorMessage, setErrorMessage] = useState(null);

  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      setErrorMessage("Invalid username or password");
    },
    onCompleted: (data) => {
      localStorage.setItem("token", data.login.value);
      navigate("/");
    },
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          me: () => {
            return {
              __typename: "User",
              id: data.login.id,
              username: data.login.username,
            };
          },
        },
      });
    },
  });

  const handleLogin = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div style={inlineStyles.container}>
      <form style={inlineStyles.form} onSubmit={handleLogin}>
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
        <button style={inlineStyles.button} type="submit">
          LOGIN
        </button>
        {errorMessage && (
          <Text style={{ color: "red", fontSize: theme.fontSizes.info }}>
            {errorMessage}
          </Text>
        )}
        <div style={inlineStyles.signUp}>
          Not a member yet?{" "}
          <ClickableText 
            text='sign up now' 
            normalColor={theme.colors.placeholder} 
            hoveredColor={theme.colors.placeholder} 
            style={{fontSize: theme.fontSizes.info, textDecoration: 'underline'}}
            handleClick={()=>navigate('/signup')}/>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
