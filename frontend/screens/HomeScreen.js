import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { COLORS, styles } from '../styles/theme';

export default function HomeScreen({ photoUri, loading, message, pickphoto, sendPhoto, setScreen, openHistory }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SkinSense</Text>
        <View style={styles.headerLinks}>
          <Pressable onPress={openHistory}>
            <Text style={styles.link}>History</Text>
          </Pressable>
          <Pressable onPress={() => setScreen('about')}>
            <Text style={styles.link}>About</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.card}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.photo} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.greyText}>No photo chosen yet</Text>
          </View>
        )}

        <Pressable style={styles.buttonOutline} onPress={pickphoto}>
          <Text style={styles.buttonOutlineText}>
            {photoUri ? 'Choose a different photo' : 'Choose photo'}
          </Text>
        </Pressable>

        {photoUri ? (
          <Pressable
            style={[styles.button, loading ? styles.buttonDisabled : null]}
            onPress={sendPhoto}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Check my skin</Text>
          </Pressable>
        ) : null}

        {loading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={COLORS.primary} />
            <Text style={styles.greyText}>  Checking your photo...</Text>
          </View>
        ) : null}

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Tips for a good photo</Text>
        <Text style={styles.text}>• Face the camera, with only one face in the photo</Text>
        <Text style={styles.text}>• Use natural light and no filters</Text>
        <Text style={styles.text}>• Remove make-up and glasses if you can</Text>
      </View>

      <StatusBar style="dark" />
    </ScrollView>
  );
}
