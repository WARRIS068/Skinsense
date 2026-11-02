import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [photoUri, setPhotoUri]=useState(null);

  async function pickphoto() {
    const result=await ImagePicker.launchImageLibraryAsync({mediaTypes: ['images'],});
   
  if(result.canceled){
    return;
  }
  setPhotoUri(result.assets[0].uri);
  }
  return (
    <View style={styles.container}>
      <Text>welcome to Skinsense</Text>
      <Button title="Choose photo" onPress={pickphoto}/>
      {photoUri ? <Image source={{uri: photoUri}} style={styles.photo}/> :  null }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: 300,
    height:300,
    marginTop: 20,
  },
});
