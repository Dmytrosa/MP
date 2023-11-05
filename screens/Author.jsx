import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';
import { Text } from 'react-native';
import {View, Image } from 'react-native';

const AuthorScreen = () => {

  const navigation = useNavigation();
  const goToCalk = () => {
    navigation.navigate("Calculator"); 
  };
  return (
    <View style={{display: 'flex', justifyContent: "center", alignItems:'center'}}>
        <Image source={require('../assets/myava.jpg')}
        style={{width: 200, height: 200}} />
        <Text>Алексенко Дмитро</Text>
    </View>
  );
};

export default AuthorScreen;
