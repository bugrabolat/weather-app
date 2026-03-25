import { useFavorites } from "@/context/favoriteContext";
import { useLocationWeather } from "@/hooks/use-location-weather";
import { useSelectorIcon } from "@/hooks/use-selector-icon";
import { getLocation } from "@/services/location";
import { Image } from "expo-image";
import * as Location from 'expo-location';
import { useEffect, useState } from "react";
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';




export default function SearchScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [dayWeather, setDayWeather] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [name, setName] = useState<string | null>(null);
  const weatherData = useLocationWeather(lat ?? undefined, lon ?? undefined);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { addFavorite, favoritesStorage } = useFavorites();

  useEffect(() => {
    if (search.length > 2) {
      getLocation(search).then((data: any) => {
        setLat(data.results[0]?.geometry?.location?.lat);
        setLon(data.results[0]?.geometry?.location?.lng);
        setName(data.results[0]?.formatted_address);
      });
    }

  }, [search]);

  useEffect(() => {
    async function getCurrentLocation() {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);
  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const handleAddFavorite = async (city: { name: string; lat: number; lon: number }) => {
    await addFavorite(city);
  };

  return (
    <ImageBackground source={require('@/assets/images/bg-bulutlu.webp')} resizeMode="cover" style={styles.image}>
      <SafeAreaProvider style={styles.firstContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <View>
            <TextInput placeholder="Search Any City" style={styles.input} onChangeText={(text) => setSearch(text)} placeholderTextColor="rgba(255, 255, 255, 0.84)" keyboardType="default" returnKeyType="search" />
          </View>
          <View style={styles.otherCards}>
            <View style={{ width: "100%" }}>
              <FlatList
                data={weatherData ? [weatherData] : []}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(i) => String(i)}
                renderItem={() => (
                  weatherData && search.length > 2 ? (
                    <Pressable onPress={() =>
                      handleAddFavorite({ name: name ?? "", lat: lat ?? 0, lon: lon ?? 0 })
                    } style={styles.widget}>
                      <View style={styles.widgetTexts}>
                        <Text style={styles.rating}>{(weatherData?.daily?.temperature_2m_max[0])?.toFixed(0)}°</Text>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignSelf: "center" }}>
                          <Text style={styles.widgetCountry} numberOfLines={1}>{weather?.name}</Text>
                          <Text style={styles.widgetWeather} numberOfLines={1}>{name}</Text>
                        </View>
                      </View>
                      <Image style={styles.widgetImg} source={useSelectorIcon(weatherData?.daily?.weathercode[0])} />
                    </Pressable>
                  ) : (
                    <View style={styles.widget}>
                      <Text style={styles.widgetCountry}>Aratılan şehir bulunamadı</Text>
                    </View>
                  )
                )}
              />
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 10,
    padding: 10,
    width: "90%",
    height: 50,
    alignSelf: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  otherCards: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  widget: {
    backgroundColor: "rgba(81, 81, 81, 0.53)",
    borderWidth: 1,
    borderColor: "rgba(188, 188, 188, 0.4)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    borderStyle: "solid",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    width: "auto",
    marginVertical: 10,
    gap: 10,
    padding: 30,
    zIndex: 1,
  },
  widgetImg: {
    width: 100,
    height: 100,
    position: "absolute",
    right: -20,
    top: -20,
    zIndex: 2,
  },
  widgetTexts: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 10,
  },
  widgetCountry: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  widgetWeather: {
    color: "white",
    fontSize: 15
  },
  rating: {
    color: "white",
    fontSize: 50,
    fontWeight: "300",
  },
});