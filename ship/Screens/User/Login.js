import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
//Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.action";

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("UserProfile");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Your email or password is empty!");
    } else {
      loginUser(user, context.dispatch);
    }
  };

  return (
    <FormContainer title={"Login"}>
      <Input
        placeholder="Enter email"
        name="email"
        id="email"
        value={email}
        autoCorrect={false}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />

      <Input
        placeholder="Enter password"
        name="password"
        id="password"
        value={password}
        autoCorrect={false}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />

      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <EasyButton large primary onPress={() => handleSubmit()}>
          <Text style={{ color: "white" }}>Login</Text>
        </EasyButton>
      </View>

      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Dont't have account?</Text>
        <EasyButton
          large
          secondary
          onPress={() => {
            props.navigation.navigate("Register");
          }}
        >
          <Text style={{ color: "white" }}>Register</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    fontSize: 16,
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default Login;
