import React from 'react';
import {View, Text} from 'react-native';
import {AuthContext} from '../AuthStuff/AuthProvider';

export default function PlayerTabs() {
  const {logout, user} = useContext(AuthContext);
  return (
    <View>
      <Text>welcome</Text>
      <Button
        title="logout"
        onPress={() => {
          logout();
        }}
      />
    </View>
  );
}
