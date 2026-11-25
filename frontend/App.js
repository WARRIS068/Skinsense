import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { analysePhoto, getHistory } from './services/api';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/ResultsScreen';
import AboutScreen from './screens/AboutScreen';
import HistoryScreen from './screens/HistoryScreen';

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [agreed, setAgreed] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

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
    setMessage('');
    setLoading(true);

    try {
      const answer = await analysePhoto(photoUri);

      if (!answer.ok) {
        setMessage(answer.data.detail);
      }
      else {
        setResult(answer.data);
        setScreen('results');
      }
    }
    catch (error) {
      setMessage('could not reach the backend. is it running? ' + error.message);
    }

    setLoading(false);
  }

  async function openHistory() {
    setMessage('');

    try {
      const answer = await getHistory();

      if (!answer.ok) {
        setMessage('Could not load history. Please try again.');
      }
      else {
        setHistory(answer.data);
        setScreen('history');
      }
    }
    catch (error) {
      setMessage('could not reach the backend. is it running? ' + error.message);
    }
  }

  if (screen === 'welcome') {
    return <WelcomeScreen agreed={agreed} setAgreed={setAgreed} setScreen={setScreen} />;
  }

  if (screen === 'home') {
    return (
      <HomeScreen
        photoUri={photoUri}
        loading={loading}
        message={message}
        pickphoto={pickphoto}
        sendPhoto={sendPhoto}
        setScreen={setScreen}
        openHistory={openHistory}
      />
    );
  }

  if (screen === 'results') {
    return <ResultsScreen result={result} setScreen={setScreen} />;
  }

  if (screen === 'history') {
    return <HistoryScreen history={history} setScreen={setScreen} />;
  }

  return <AboutScreen setScreen={setScreen} />;
}
