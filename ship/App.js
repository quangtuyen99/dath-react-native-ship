import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

//Navigators
import Main from "./Navigators/Main";

//Components
import Header from "./Shared/Header";

//Context API
import Auth from "./Context/store/Auth";

//Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}
