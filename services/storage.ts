import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITE_KEY = "favoriteCities";

export const getFavoriteCities = async () => {
  try {
    const data = await AsyncStorage.getItem(FAVORITE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Favoriler okunamadı", error);
    return [];
  }
};

export const addFavoriteCity = async (city: string) => {
  try {
    const cities = await getFavoriteCities();

    if (cities.includes(city)) return cities;

    const newCities = [...cities, city];

    await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(newCities));

    return newCities;
  } catch (error) {
    console.log("Favori eklenemedi", error);
  }
};

export const removeFavoriteCity = async (lat: number, lon: number) => {
    try {
      const data = await AsyncStorage.getItem(FAVORITE_KEY);
      const cities = data ? JSON.parse(data) : [];
  
      const filtered = cities.filter(
        (item: any) => item.lat !== lat || item.lon !== lon
      );
  
      await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(filtered));
  
      return filtered;
    } catch (error) {
      console.log("Favori silinemedi", error);
    }
  };