import { StatusBar } from 'expo-status-bar';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { File } from 'expo-file-system';
const Backend_Url = 'http://10.114.33.57:8000';


export default function App() {
  const [photoUri, setPhotoUri] = useState(null);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);

  async function pickphoto() {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], });

    if (result.canceled) {
      return;
    }
    setPhotoUri(result.assets[0].uri);
    setMessage('');
    setResult(null);
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

      setMessage('');
      setResult(data);
    }
    catch (error) {
      setMessage('could not reach the backend. is it running?' + error.message);
    }
  }

  return (
      <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>welcome to Skinsense</Text>
      <Button title="Choose photo" onPress={pickphoto} />
      {photoUri ? <Image source={{ uri: photoUri }} style={styles.photo} /> : null}
      {photoUri ? <Button title="Check photo" onPress={sendPhoto} /> : null}
      <Text style={styles.message}>{message}</Text>

      {result ? (
        <View style={styles.resultBox}>
          <Text style={styles.score}>Skin health score: {result.skin_health_score}/100</Text>

          <Text style={styles.heading}>What the photo shows</Text>
          <Text style={styles.row}>Acne: {result.acne}</Text>
          <Text style={styles.row}>Hyperpigmentation: {result.hyperpigmentation}</Text>
          <Text style={styles.row}>Dark circles: {result.dark_circles}</Text>
          <Text style={styles.row}>Skin texture: {result.texture}</Text>

          <Text style={styles.summary}>{result.summary}</Text>

          {result.needs_dermatologist ? (
            <Text style={styles.warning}>
              Some signs in this photo look severe. Please see a dermatologist or a doctor for advice.
            </Text>
          ) : null}

          <Text style={styles.disclaimer}>
            SkinSense gives general information only. It is not a medical diagnosis and does not replace a dermatologist.
          </Text>
        </View>
      ) : null}

      <StatusBar style="auto" />
      </ScrollView>
  );
}

const styles = StyleSheet.create
  ({
      container:
      {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop: 60,
      },
      title:
      {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
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
      resultBox:
      {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
      },
      score:
      {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
      },
      heading:
      {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      row:
      {
        fontSize: 16,
        marginBottom: 3,
      },
      summary:
      {
        marginTop: 15,
        fontSize: 15,
      },
      warning:
      {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#fdecea',
        color: '#b71c1c',
        fontWeight: 'bold',
      },
      disclaimer:
      {
        marginTop: 15,
        fontSize: 12,
        color: '#777',
      },
  });
