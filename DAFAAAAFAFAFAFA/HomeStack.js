// import React, {useContext} from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// import {View, Text, Button, TouchableOpacity} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {FlatList} from 'react-native-gesture-handler';
// import {AuthContext} from './AuthProvider';
// import faker from 'faker';

// const Stack = createStackNavigator();

// const Feed = () => {
//   const ppl = [
//     'Landon',
//     'Joshua',
//     'Jackson',
//     'Aiden',
//     'James',
//     'Hunter',
//     'Christopher',
//     'William',
//     'Jayden',
//     'Anthony',
//     'John',
//     'Ryan',
//   ];

//   const whatever = Array.from(Array(50), () => faker.company.companyName());
//   console.log(ppl);

//   return (
//     <FlatList
//       contentContainerStyle={{alignSelf: 'center'}}
//       renderItem={({item}) => {
//         return (
//           <TouchableOpacity
//             style={{
//               alignItems: 'center',
//               backgroundColor: '#ffffff',
//               borderBottomWidth: 1,
//               padding: 20,
//               margin: 10,
//               borderColor: 'gray',
//             }}
//             onPress={() => {}}>
//             <Text
//               style={{
//                 color: 'black',
//                 fontSize: 20,
//               }}>
//               {item}
//             </Text>
//           </TouchableOpacity>
//         );
//       }}
//       keyExtractor={item => item}
//       data={whatever}
//     />
//   );
// };

// export default function HomeStack() {
//   const {logout} = useContext(AuthContext);
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: {elevation: 0},
//         cardStyle: {backgroundColor: '#fff'},
//       }}>
//       <Stack.Screen
//         name="feed"
//         component={Feed}
//         options={{
//           headerTitleAlign: 'center',
//           headerRight: () => {
//             return (
//               <TouchableOpacity
//                 onPress={() => {
//                   logout();
//                 }}>
//                 <Text>LOGOUT</Text>
//               </TouchableOpacity>
//             );
//           },
//         }}
//       />
//     </Stack.Navigator>
//   );
// }
