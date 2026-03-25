import { useFavorites } from "@/context/favoriteContext";
import { useSelectorIcon } from "@/hooks/use-selector-icon";
import { useSelectorWeatherName } from "@/hooks/use-selector-weather-name";
import { getWeather } from "@/services/weather";
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from "expo-haptics";
import * as Location from 'expo-location';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, Image, ImageBackground, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function showAlert(message: any) {
  if (Platform.OS === 'web') {
    window.alert(message);
  } else {
    Alert.alert(message);
  }
}

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const now = new Date();
  const nowTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:00`;
  const [nowData, setNowData] = useState<any>(null);
  const [favoritesData, setFavoritesData] = useState<object[]>([]);
  const { favoritesStorage, removeFavorite } = useFavorites();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadFavoritesWeather();  
  }, [favoritesStorage])

  const loadFavoritesWeather = async () => {
    if (!favoritesStorage.length) return;
  
    const results = await Promise.all(
      favoritesStorage.map((item: any) =>
        getWeather(item.lat, item.lon)
      )
    );
  
    setFavoritesData(results);
  };

  useEffect(() => {
    getWeather(location?.coords.latitude ?? 0, location?.coords.longitude ?? 0).then((data: any) => {
      setWeather(data);
    });
  }, [location]);

  useEffect(() => {
    weather?.hourly?.time.forEach((item: any, index: number) => {
      if (nowTime === item) {
        setNowData({
          temperature: weather?.hourly?.temperature_2m[index],
          precipitation: weather?.hourly?.precipitation[index],
          relativehumidity_2m: weather?.hourly?.relativehumidity_2m[index],
          wind_speed_10m: weather?.hourly?.wind_speed_10m[index],
          weathercode: weather?.hourly?.weathercode[index],
        });
      }
    });

  }, [weather]);

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
  console.log(favoritesData,"data");
  console.log(favoritesStorage,"str");
  

  return (
    <ImageBackground
      source={require('@/assets/images/bg-bulutlu.webp')}
      resizeMode="cover"
      style={styles.image}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <SafeAreaProvider style={styles.firstContainer}>
            <SafeAreaView style={{ flex: 1 }}>
              <Text style={styles.title}>
                {weather?.timezone?.split('/')[1]}
              </Text>
              <View style={styles.hero}>
                <Text style={styles.weatherTitle}>Mostly Sunny</Text>
                <Image style={styles.firstImg} source={useSelectorIcon(nowData?.weathercode)}></Image>
                <View style={styles.info}>
                  <View style={styles.infoContent}>
                    <Ionicons name="rainy-outline" size={24} color="black" style={styles.infoTitle} />
                    <Text style={styles.infoTitle}>{nowData?.precipitation?.toFixed(0)} mm</Text>
                    <Text style={styles.infoLabel}>Yağış Miktarı</Text>
                  </View>
                  <View style={styles.infoContent}>
                    <Ionicons name="water-outline" size={24} color="black" style={styles.infoTitle} />
                    <Text style={styles.infoTitle}>{nowData?.relativehumidity_2m?.toFixed(0)} %</Text>
                    <Text style={styles.infoLabel}>Nem Oranı</Text>
                  </View>
                  <View style={styles.infoContent}>
                    <Ionicons name="leaf-outline" size={24} color="black" style={styles.infoTitle} />
                    <Text style={styles.infoTitle}>{nowData?.wind_speed_10m?.toFixed(0)} km/h</Text>
                    <Text style={styles.infoLabel}>Rüzgar Hızı</Text>
                  </View>
                </View>
                <View style={styles.second}>
                  <View style={styles.other}>
                    <Text style={styles.titleOther}>Favoriler</Text>
                    <Pressable
                      onPress={() =>  router.push({ pathname: "./search" })}
                      android_ripple={{ color: "rgba(255,255,255,0.2)" }}
                      hitSlop={10}
                    >
                      <Text style={styles.addBtnText}>+</Text>
                    </Pressable>
                  </View>
                  
                    <View style={styles.otherCards}>
                      <View style={{ width: "100%" }}>
                  {favoritesData && favoritesData.length > 0 ? (
                        <FlatList
                          data={favoritesData}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          keyExtractor={(item: any, index) => index.toString()}
                          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                          renderItem={({ item, index }) => (
                            <Pressable
                              onPress={() => router.push({
                                pathname: "./week",
                                params: { 
                                  lat: favoritesStorage[index].lat,
                                  lon: favoritesStorage[index].lon,
                                  name: favoritesStorage[index].name,
                                }
                              })}
                              onLongPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                            
                                Alert.alert(
                                  "Favoriden Sil",
                                  `${favoritesStorage[index].name} favorisinden silinsin mi?`,
                                  [
                                    { text: "İptal", style: "cancel" },
                                    {
                                      text: "Sil",
                                      style: "destructive",
                                      onPress: () => removeFavorite(favoritesStorage[index]?.name)
                                    }
                                  ]
                                );
                              }}
                              delayLongPress={300}
                              style={styles.widget}
                            >
                              <Image
                                style={styles.widgetImg}
                                source={useSelectorIcon(
                                  (() => {
                                    const nowHourIndex = item?.hourly?.time?.findIndex((t: string) => t === nowTime);
                                    return nowHourIndex !== -1
                                      ? item?.hourly?.weathercode[nowHourIndex]
                                      : item?.hourly?.weathercode[0];
                                  })()
                                )}
                              />

                              <View style={styles.widgetTexts}>
                                <Text style={styles.widgetCountry} numberOfLines={1}>
                                  {favoritesStorage[index]?.name?.split(",")[0]}
                                </Text>

                                <Text style={styles.widgetWeather} numberOfLines={1}>
                                  {useSelectorWeatherName((() => {
                                    const nowHourIndex = item?.hourly?.time?.findIndex((t: string) => t === nowTime);
                                    return nowHourIndex !== -1
                                      ? item?.hourly?.weathercode[nowHourIndex]
                                      : item?.hourly?.weathercode[0];
                                  })())}
                                </Text>
                              </View>

                              <Text style={styles.rating}>
                                {(() => {
                                  const nowHourIndex = item?.hourly?.time?.findIndex((t: string) => t === nowTime);
                                  return nowHourIndex !== -1
                                    ? item?.hourly?.temperature_2m[nowHourIndex]?.toFixed(0) + "°C"
                                    : item?.hourly?.temperature_2m[0]?.toFixed(0) + "°C";
                                })()}
                              </Text>
                            </Pressable>
                          )}
                        />
                  ) : (
                    <View style={styles.other}>
                      <Text style={styles.widgetCountry}>Favori Şehriniz Yok</Text>
                    </View>
                  )}
                      </View>
                    </View>
                </View>
                <View style={styles.third}>
                  <View style={styles.other}>
                    <Text style={styles.titleOther}>Bugün</Text>
                    <Text style={styles.dailyText}>24 Saatlik Tahminler</Text>
                  </View>
                  <View style={styles.dailyCards}>
                    <FlatList
                      data={weather?.hourly?.time}
                      contentContainerStyle={styles.dailyCards}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item) => item}
                      renderItem={({ item, index }) => (
                        <View style={styles.todayWidget}>
                          <Text style={styles.widgetCountry}>{item.split('T')[1]}</Text>
                          <Image style={styles.widgetImg} source={useSelectorIcon(weather?.hourly?.weathercode[weather?.hourly?.weathercode[index]])}></Image>
                          <Text style={styles.rating}>{weather?.hourly?.temperature_2m[index]?.toFixed(0)}°C</Text>
                        </View>
                      )}
                    />
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </SafeAreaProvider>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  title: {
    color: "white",
    fontSize: 24,
    marginHorizontal: "auto"
  },
  firstImg: {
    width: 170,
    height: 170,
  },
  firstContainer: {
    flex: 1,
    alignItems: "center",
  },
  hero: {
    flex: 1,
    alignItems: "center",
    marginVertical: 30,
  },
  weatherTitle: {
    color: "white",
  },
  info: {
    backgroundColor: "rgba(81, 81, 81, 0.53)",
    borderWidth: 1,
    borderColor: "rgba(188, 188, 188, 0.4)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    borderStyle: "solid",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    gap: 30,
  },
  infoContent: {
    padding: 20,
    alignItems: "center",
    gap: 1,
  },
  infoTitle: {
    color: "white",
    fontWeight: "bold"
  },
  infoLabel: {
    color: "white",
    fontWeight: "300",
    fontSize: 11,
  },
  other: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 20,
  },
  titleOther: {
    color: "white",
    fontSize: 20
  },
  second: {
    flex: 1,
  },
  otherCards: {
    flexDirection: "row",
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
    shadowRadius: 20,
    borderStyle: "solid",
    borderRadius: 10,
    flexDirection: "row",
    width: "auto",
    gap: 15,
    padding: 10,
    alignItems: "center"
  },
  widgetImg: {
    width: 50,
    height: 50,
  },
  widgetTexts: {
    alignItems: "flex-start",
  },
  widgetCountry: {
    color: "white",
    fontWeight: "bold",
  },
  widgetWeather: {
    color: "white",
    fontSize: 10
  },
  rating: {
    color: "white",
  },
  third: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  todayWidget: {
    backgroundColor: "rgba(81, 81, 81, 0.53)",
    borderWidth: 1,
    borderColor: "rgba(188, 188, 188, 0.4)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    borderStyle: "solid",
    borderRadius: 15,
    width: "auto",
    gap: 3,
    padding: 5,
    alignItems: "center"
  },
  dailyCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  dailyText: {
    color: "white",
  },
  addBtnText: {
    color: "white",
    fontSize: 32
  }
});
