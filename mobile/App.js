import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { File } from 'expo-file-system';
const Backend_Url = 'http://10.63.5.129:8000';


export default function App() {
  const [photoUri, setPhotoUri] = useState(null);
  const [message, setMessage] = useState('');

  async function pickphoto() {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], });

    if (result.canceled) {
      return;
    }
    setPhotoUri(result.assets[0].uri);
    setMessage('');
  }
  async function sendPhoto() {
    const form = new FormData();
    form.append('photo', new File(photoUri));

    setMessage('Checking....')

    try {
      const response = await fetch(Backend_Url + '/analyse',
        {
          method: 'POST',
          body: form,
        });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail);
        return;
      }

      setMessage('Skin health score: ' + data.skin_health_score + '/100\n\n' + data.summary);
    }
    catch (error) {
      setMessage('could not reach the backend. is it running?' + error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text>welcome to Skinsense</Text>
      <Button title="Choose photo" onPress={pickphoto} />
      {photoUri ? <Image source={{ uri: photoUri }} style={styles.photo} /> : null}
      {photoUri ? <Button title="Check photo" onPress={sendPhoto} /> : null}
      <Text style={styles.message}>{message}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create
  ({
      container:
      {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      photo:
      {
        width: 300,
        height: 300,
        marginTop: 20,
        marginBottom: 20,
      },
      message:
      {
        marginTop: 20,
      },
  });
