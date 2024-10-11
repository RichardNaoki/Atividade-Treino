import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import WeatherCard from './components/WeatherCard';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Search: undefined;
  Weather: undefined;
};

interface CityWeatherData {
  id: number;
  name: string;
  sys: {
    country: string;
  };
  weather: {
    main: string;
  }[];
  main: {
    temp: number;
  };
}

const WeatherPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [weatherData, setWeatherData] = useState<CityWeatherData[]>([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          'https://api.openweathermap.org/data/2.5/group?id=3451190,5128581,1850147&appid=f6965a53c6428a31d70d4d5ab157c7b3&units=metric'
        );
        const data = await response.json();

        // Log the API response to inspect its structure
        console.log('API Response:', data); 

        // Correctly access weather data from the API response
        setWeatherData(data.list); // Access weather data from 'list' property

        // Log the weatherData state for debugging
        console.log('weatherData:', weatherData); 
      } catch (error) {
        console.error('Erro ao buscar dados do tempo:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá User,</Text>
          <Text style={styles.greeting}>Descubra o clima</Text>
        </View>
        <TouchableOpacity style={styles.globeIcon}>
          <FontAwesomeIcon icon={faGlobe} size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('Search')}>
        <Text style={styles.searchButtonText}>Pesquise por uma cidade</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Ao redor do mundo</Text>
      <ScrollView style={styles.weatherCards} contentContainerStyle={styles.weatherCardsContent}> 
        {Array.isArray(weatherData) && weatherData.length > 0 ? ( 
           weatherData.map((cityData) => (
             <WeatherCard
               key={cityData.id}
               country={cityData.sys.country}
               city={cityData.name}
               weather={cityData.weather[0].main}
               temperature={cityData.main.temp}
             />
           ))
         ) : (
           <Text>Carregando dados do tempo...</Text>
         )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6C4AB6',
  },
  globeIcon: {
    padding: 10,
  },
  searchButton: {
    backgroundColor: '#8A55D9',
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  searchButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6C4AB6',
  },
  weatherCards: {
    flexDirection: 'column',
    flex: 1, 
  },
  weatherCardsContent: {
    justifyContent: 'space-between',
  }
});

export default WeatherPage;