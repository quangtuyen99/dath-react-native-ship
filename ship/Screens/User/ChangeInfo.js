import React, { useState } from "react";
import { View, Text } from "react-native";
import Input from "../../Shared/Form/Input";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

const ChangeInfo = (props) => {
  const [name, setName] = useState();
  const [pass, setPass] = useState();
  const [newPass, setNewPass] = useState();
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={{ padding: 10, fontSize: 25, fontWeight: "bold" }}>
        Thông tin
      </Text>
      <Input
        placeholder={props.route.params.name}
        name="name"
        id="name"
        value={name}
        autoCorrect={false}
        onChangeText={(text) => setName(text.toLowerCase())}
      />

      <Input
        placeholder="Mật khẩu hiện tại"
        name="pass"
        id="pass"
        value={pass}
        autoCorrect={false}
        onChangeText={(text) => setPass(text.toLowerCase())}
      />

      <Input
        placeholder="Mật khẩu mới"
        name="newpass"
        id="newpass"
        value={newPass}
        autoCorrect={false}
        onChangeText={(text) => setNewPass(text.toLowerCase())}
      />

      <EasyButton
        large
        secondary
        onPress={() => {
          props.navigation.goBack();
        }}
      >
        <Text style={{ color: "white" }}>Xác nhận</Text>
      </EasyButton>
    </View>
  );
};

export default ChangeInfo;
