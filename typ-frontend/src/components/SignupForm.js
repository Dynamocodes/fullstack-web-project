import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Text from "./Text";
import theme from "../theme";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

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

const SignupForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log(error.message);
    },
    onCompleted: () => {
      navigate("/login");
    },
  });

  const handleSignup = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    createUser({ variables: { username, password } });
  };

  return (
    <div style={inlineStyles.container}>
      <form onSubmit={handleSignup} style={inlineStyles.form}>
        <Text style={{ color: theme.colors.backgroundPrimary }} fontWeight="bold">
          Sign up
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
        <input
          style={inlineStyles.input}
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button style={inlineStyles.button} type="submit">
          SIGN UP
        </button>
        <div style={inlineStyles.signUp}>
          Already have an account?{" "}
          <u>
            <a href="/login" style={{ textDecoration: "none", color: "inherit" }}>
              Login
            </a>
          </u>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
