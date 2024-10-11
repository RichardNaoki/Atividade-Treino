import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WeatherCardProps {
  country: string;
  city: string;
  weather: string;
  temperature: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ country, city, weather, temperature }) => {
  return (
    <View style={styles.weatherCard}>
      <Text style={styles.country}>{country}</Text>
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.weather}>{weather}</Text>
      <Text style={styles.temperature}>{temperature}°C</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherCard: {
    padding: 16,
    backgroundColor: '#8A55D9', // Cor roxa para os cards
    borderRadius: 8,
    marginBottom: 10, // Espaço entre os cards
    width: '90%', // Largura dos cards
  },
  // ... outros estilos para o WeatherCard
  country: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Cor branca para o texto dos cards
  },
  city: {
    fontSize: 18,
    fontWeight: 'bold', // Negrito para o nome da cidade
    marginVertical: 4,
    color: '#fff',
  },
  weather: {
    fontSize: 14,
    color: '#fff',
  },
  temperature: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right', // Alinhamento à direita para a temperatura
  },
});

export default WeatherCard;