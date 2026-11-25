import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { styles } from '../styles/theme';

export default function HistoryScreen({ history, setScreen }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => setScreen('home')}>
          <Text style={styles.link}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>History</Text>
      </View>

      {history.length === 0 ? (
        <Text style={styles.greyText}>No checks saved yet.</Text>
      ) : null}

      {history.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.text}>{item.created_at.replace('T', ' ')}</Text>
            <Text style={styles.historyScore}>{item.skin_health_score}/100</Text>
          </View>
          <Text style={styles.greyText}>
            Acne: {item.acne}, Pigmentation: {item.hyperpigmentation}, Dark circles: {item.dark_circles}, Texture: {item.texture}
          </Text>
          {item.needs_dermatologist ? (
            <Text style={styles.message}>Dermatologist advised</Text>
          ) : null}
        </View>
      ))}

      <StatusBar style="dark" />
    </ScrollView>
  );
}