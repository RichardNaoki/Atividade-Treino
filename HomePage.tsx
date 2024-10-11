import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WeatherIndicator from './components/WeatherIndicator';

const HomePage: React.FC = () => {
  const navigation = useNavigation(); // Navegação sem tipo explícito

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <WeatherIndicator />
        <Text style={styles.title}>
          Veja como está o tempo ao redor do mundo{' '}
          <Text style={styles.earthEmoji}>🌎</Text>
        </Text>
        <Text style={styles.subtitle}>Comece agora gratuitamente</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Weather' as never)} // Use 'as never'
        >
          <Text style={styles.buttonText}>Vamos lá</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          Já tem uma conta?{' '}
          <Text style={styles.loginLink}>Log in</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C4AB6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 24,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  earthEmoji: {
    fontSize: 18,
  },
  subtitle: {
    color: '#888',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#8A55D9',
    padding: 12,
    borderRadius: 24,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginText: {
    color: '#888',
  },
  loginLink: {
    color: '#4285F4',
  },
});

export default HomePage;