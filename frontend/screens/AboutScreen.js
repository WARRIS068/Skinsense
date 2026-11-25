import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { styles } from '../styles/theme';

export default function AboutScreen({ setScreen }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => setScreen('home')}>
          <Text style={styles.link}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>About</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>What SkinSense does</Text>
        <Text style={styles.text}>
          SkinSense uses an AI model to look at one photo of your face and describe signs of acne,
          hyperpigmentation, dark circles and skin texture, with a skin health score.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>What it does not do</Text>
        <Text style={styles.text}>
          It does not diagnose any condition and does not replace a dermatologist. If any sign looks
          severe, it suggests seeing a professional instead of giving ingredient suggestions.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Your privacy</Text>
        <Text style={styles.text}>
          Your photo is made smaller, its location data is removed, and it is sent to the AI service
          to be checked. SkinSense does not save your photo.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>About this project</Text>
        <Text style={styles.text}>Final Year Project, BSc Computer Science.</Text>
        <Text style={styles.text}>Made by Muhammad Waris.</Text>
      </View>

      <StatusBar style="dark" />
    </ScrollView>
  );
}
