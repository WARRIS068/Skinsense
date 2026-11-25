import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { severityColor, styles } from '../styles/theme';

export default function ResultsScreen({ result, setScreen }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => setScreen('home')}>
          <Text style={styles.link}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Your results</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Skin health score</Text>
        <Text style={styles.score}>
          {result.skin_health_score}
          <Text style={styles.scoreOutOf}> / 100</Text>
        </Text>
        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: result.skin_health_score + '%' }]} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>What the photo shows</Text>

        <View style={styles.row}>
          <Text style={styles.text}>Acne</Text>
          <Text style={[styles.badge, { backgroundColor: severityColor(result.acne) }]}>{result.acne}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Hyperpigmentation</Text>
          <Text style={[styles.badge, { backgroundColor: severityColor(result.hyperpigmentation) }]}>{result.hyperpigmentation}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Dark circles</Text>
          <Text style={[styles.badge, { backgroundColor: severityColor(result.dark_circles) }]}>{result.dark_circles}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Skin texture</Text>
          <Text style={[styles.badge, { backgroundColor: severityColor(result.texture) }]}>{result.texture}</Text>
        </View>

        <Text style={styles.summary}>{result.summary}</Text>
      </View>

      {result.needs_dermatologist ? (
        <Text style={styles.warning}>
          Some signs in this photo look severe. Please see a dermatologist or a doctor for advice.
        </Text>
      ) : null}

      {result.ingredients.length > 0 ? (
        <View style={styles.card}>
          <Text style={styles.heading}>Ingredients that may help</Text>
          {result.ingredients.map((item) => (
            <View key={item.concern} style={styles.ingredientBlock}>
              <Text style={styles.ingredientConcern}>{item.concern}</Text>
              <Text style={styles.text}>{item.ingredients.join(', ')}</Text>
            </View>
          ))}
          <Text style={styles.smallGrey}>
            These are general ingredient types, not product recommendations. Patch test anything new on a small area first.
          </Text>
        </View>
      ) : null}

      <Text style={styles.disclaimer}>
        SkinSense gives general information only. It is not a medical diagnosis and does not replace a dermatologist.
      </Text>

      <Pressable style={styles.button} onPress={() => setScreen('home')}>
        <Text style={styles.buttonText}>Check another photo</Text>
      </Pressable>

      <StatusBar style="dark" />
    </ScrollView>
  );
}
