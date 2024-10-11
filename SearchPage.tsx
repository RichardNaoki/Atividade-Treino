import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

type RootStackParamList = {
  Search: undefined;
  Weather: undefined;
};

const SearchPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f6965a53c6428a31d70d4d5ab157c7b3` // Use a API de cidade aqui
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Erro ao buscar dados do tempo:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchInput}>
        <TextInput
          style={styles.textInput}
          placeholder="Digite aqui"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={16} color="#000" />
        </TouchableOpacity>
      </View>

      {weatherData && (
        <View style={styles.weatherContainer}>
          <View style={styles.weatherCard}>
            <Image
              source={{
                uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
              }}
              style={styles.weatherIcon}
            />
            <Text style={styles.cityName}>{weatherData.name}</Text>
            <Text style={styles.temperature}>
              {Math.round(weatherData.main.temp - 273.15)}°C
            </Text>
            <Text style={styles.weatherCondition}>
              {weatherData.weather[0].description}
            </Text>
          </View>

          <View style={styles.otherInfo}>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Umidade:</Text>
              <Text style={styles.infoText}>{weatherData?.main?.humidity}%</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Velocidade do Vento:</Text>
              <Text style={styles.infoText}>
                {weatherData?.wind?.speed} m/s
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center', // Centraliza os elementos horizontalmente
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: '100%', // Ocupa toda a largura da tela
  },
  textInput: {
    flex: 1,
    marginRight: 10,
  },
  searchIcon: {
    padding: 5,
  },
  weatherContainer: {
    alignItems: 'center',
    width: '100%', // Ocupa toda a largura da tela
  },
  weatherCard: {
    backgroundColor: '#8A55D9', // Cor do card
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Cor do texto do card
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff', // Cor do texto do card
    marginBottom: 10,
  },
  weatherCondition: {
    fontSize: 16,
    color: '#fff', // Cor do texto do card
  },
  otherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20, // Adicione espaço entre a previsão e as informações adicionais
    width: '100%', // Ocupa toda a largura da tela
  },
  infoCard: {
    backgroundColor: '#f2f2f2', // Cor de fundo dos cards de informações
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
  },
});

export default SearchPage;