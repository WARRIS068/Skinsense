import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { styles } from '../styles/theme';

export default function WelcomeScreen({ agreed, setAgreed, setScreen }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>SkinSense</Text>
      <Text style={styles.subtitle}>General feedback on visible skin concerns</Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Before you start</Text>
        <Text style={styles.text}>• SkinSense gives general information only. It is not a medical diagnosis.</Text>
        <Text style={styles.text}>• It does not replace a dermatologist or a doctor.</Text>
        <Text style={styles.text}>• Your photo is sent to an AI service to be checked. SkinSense does not save it.</Text>
        <Text style={styles.text}>• Only use photos of your own face.</Text>
      </View>

      <Pressable style={styles.checkRow} onPress={() => setAgreed(!agreed)}>
        <Text style={styles.checkBox}>{agreed ? '☑' : '☐'}</Text>
        <Text style={styles.text}>I understand and agree</Text>
      </Pressable>

      <Pressable
        style={[styles.button, !agreed ? styles.buttonDisabled : null]}
        onPress={() => setScreen('home')}
        disabled={!agreed}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>

      <StatusBar style="dark" />
    </ScrollView>
  );
}
