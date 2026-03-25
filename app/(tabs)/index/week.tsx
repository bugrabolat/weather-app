import { useSelectorIcon } from "@/hooks/use-selector-icon";
import { useSelectorWeatherName } from "@/hooks/use-selector-weather-name";
import { getWeather } from "@/services/weather";
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function showAlert(message: any) {
  if (Platform.OS === 'web') {
    window.alert(message);
  } else {
    Alert.alert(message);
  }
}

export default function Week() {
  const [weather, setWeather] = useState<any>(null);
  const now = new Date();
  const nowTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:00`;
  const [nowData, setNowData] = useState<any>(null);
  const { lat, lon, name } = useLocalSearchParams();
  const [weekData, setWeekData] = useState<any[]>([]);

  useEffect(() => {
    if (!lat || !lon) return;
    getWeather(Number(lat), Number(lon)).then(setWeather);
  }, [lat, lon]);

  useEffect(() => {
    if (!weather?.daily) return;
    const dailyData: Array<{
      date: string;
      tempMax: number;
      tempMin: number;
      weatherCode: number;
    }> = weather.daily.time.map(
      (_: string, i: number) => ({
        date: weather.daily.time[i],
        tempMax: weather.daily.temperature_2m_max[i],
        tempMin: weather.daily.temperature_2m_min[i],
        weatherCode: weather.daily.weathercode[i],
      })
    );
    setWeekData(dailyData);
  }, [weather]);

  useEffect(() => {
    if (!weather?.hourly?.time) {
      setNowData(null);
      return;
    }
    let found = false;
    weather.hourly.time.forEach((item: any, index: number) => {
      if (nowTime === item) {
        setNowData({
          temperature: weather?.hourly?.temperature_2m[index],
          precipitation: weather?.hourly?.precipitation[index],
          relativehumidity_2m: weather?.hourly?.relativehumidity_2m[index],
          wind_speed_10m: weather?.hourly?.wind_speed_10m[index],
          weathercode: weather?.hourly?.weathercode[index],
        });
        found = true;
      }
    });
    if (!found) {
      setNowData(null);
    }
  }, [weather, nowTime]);

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
              <View style={styles.hero}>
                <View style={styles.info}>
                  <View style={styles.imgContainer}>
                    <Image
                      style={styles.firstImg}
                      source={useSelectorIcon(nowData?.weathercode)}
                    />
                    <View style={styles.row}>
                      <View style={styles.degreeContainer}>
                        <Text style={styles.big}>
                          {nowData?.temperature !== undefined && nowData?.temperature !== null
                            ? nowData.temperature.toFixed(0)
                            : "--"}
                        </Text>
                        <Text style={styles.degreeSymbol}>°</Text>
                      </View>
                      <Text style={styles.slash}> / </Text>
                      <View style={styles.degreeContainer}>
                        <Text style={styles.small}>
                          {weekData && weekData[0]?.tempMin !== undefined && weekData[0]?.tempMin !== null
                            ? weekData[0].tempMin.toFixed(0)
                            : "--"}
                        </Text>
                        <Text style={styles.degreeSymbolSmall}>°</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.textContainer}>
                    <View style={styles.infoContent}>
                      <Ionicons name="rainy-outline" size={24} color="black" style={styles.infoTitle} />
                      <Text style={styles.infoTitle}>
                        {nowData?.precipitation !== undefined && nowData?.precipitation !== null
                          ? nowData.precipitation + '%'
                          : "--"}
                      </Text>
                      <Text style={styles.infoLabel}>Yağış Miktarı</Text>
                    </View>
                    <View style={styles.infoContent}>
                      <Ionicons name="water-outline" size={24} color="black" style={styles.infoTitle} />
                      <Text style={styles.infoTitle}>
                        {nowData?.relativehumidity_2m !== undefined && nowData?.relativehumidity_2m !== null
                          ? nowData.relativehumidity_2m + '%'
                          : "--"}
                      </Text>
                      <Text style={styles.infoLabel}>Nem Oranı</Text>
                    </View>
                    <View style={styles.infoContent}>
                      <Ionicons name="leaf-outline" size={24} color="black" style={styles.infoTitle} />
                      <Text style={styles.infoTitle}>
                        {nowData?.wind_speed_10m !== undefined && nowData?.wind_speed_10m !== null
                          ? nowData.wind_speed_10m + ' km/h'
                          : "--"}
                      </Text>
                      <Text style={styles.infoLabel}>Rüzgar Hızı</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.second}>
                  <View style={{ width: "100%", marginTop: 20 }}>
                    <Text style={styles.weekTitle}>Haftalık Tahmin</Text>
                    <FlatList
                      data={Array.isArray(weekData) ? weekData : []}
                      keyExtractor={(item, index) => String(index)}
                      showsVerticalScrollIndicator={false}
                      scrollEnabled={false}
                      style={{ marginTop: 10 }}
                      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                      renderItem={({ item }) => (
                        <View style={styles.verticalCard}>
                          <View style={styles.verticalDateSection}>
                            <Text style={styles.verticalDay}>
                              {item.date
                                ? new Date(item.date).toLocaleDateString('tr-TR', { weekday: 'long' })
                                : "--"}
                            </Text>
                            <Text style={styles.verticalDate}>
                              {item.date
                                ? new Date(item.date).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' })
                                : "--"}
                            </Text>
                          </View>
                          <View style={styles.verticalWeatherSection}>
                            <Image
                              style={styles.verticalIcon}
                              source={useSelectorIcon(item.weatherCode)}
                            />
                            <Text style={styles.verticalWeatherText}>
                              {item.weatherCode !== undefined && item.weatherCode !== null
                                ? useSelectorWeatherName(item.weatherCode)
                                : "--"}
                            </Text>
                          </View>
                          <View style={styles.verticalTempsSection}>
                            <Text style={styles.verticalTempMin}>
                              {item.tempMin !== undefined && item.tempMin !== null
                                ? item.tempMin.toFixed(0) + "°"
                                : "--"}
                            </Text>
                            <Text style={styles.verticalTempMax}>
                              {item.tempMax !== undefined && item.tempMax !== null
                                ? item.tempMax.toFixed(0) + "°"
                                : "--"}
                            </Text>
                          </View>
                        </View>
                      )}
                      ListEmptyComponent={
                        <View style={{ alignItems: "center", marginTop: 30 }}>
                          <Text style={{ color: "white", fontSize: 16, opacity: 0.6 }}>
                            Haftalık hava durumu bulunamadı.
                          </Text>
                        </View>
                      }
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
    width: 120,
    height: 120,
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
    justifyContent: "space-between",
    width: "90%",
    padding: 10,
    marginVertical: 30
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
  weekTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    marginLeft: 4,
    marginTop: 10,
    letterSpacing: 0.5,
  },
  // Card for vertical weekly forecast
  verticalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(67,67,67,0.60)",
    borderRadius: 13,
    paddingVertical: 14,
    paddingHorizontal: 16,
    width: "100%",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(200,200,200,0.13)",
  },
  verticalDateSection: {
    alignItems: "flex-start",
    flex: 1.4,
    gap: 0,
  },
  verticalDay: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    textTransform: "capitalize",
    letterSpacing: 0.15,
  },
  verticalDate: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    marginTop: 2,
  },
  verticalWeatherSection: {
    flex: 1.8,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  verticalIcon: {
    width: 40,
    height: 40,
    marginRight: 3,
  },
  verticalWeatherText: {
    color: "white",
    fontSize: 15,
    fontWeight: "400",
    opacity: 0.90
  },
  verticalTempsSection: {
    alignItems: "flex-end",
    flex: 1,
    gap: 1,
    paddingLeft: 8,
  },
  verticalTempMin: {
    color: "#a3e3ff",
    fontWeight: "500",
    fontSize: 16,
  },
  verticalTempMax: {
    color: "#ffe29a",
    fontWeight: "500",
    fontSize: 16,
  },
  // the rest unchanged...
  otherCards: {
    // not used in new design, but kept for compatibility
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  widget: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    gap: 25,
    padding: 10,
    alignItems: "center"
  },
  widgetImg: {
    width: 50,
    height: 50,
  },
  widgetTexts: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    textAlign:"left"
  },
  widgetCountry: {
    color: "rgb(251, 251, 251)",
    fontWeight: "500",
    fontSize:18,
  },
  widgetWeather: {
    color: "white",
    opacity: 0.75,
    fontSize: 18
  },
  rating: {
    color: "white",
  },
  third: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
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
  },
  imgContainer: {
    gap: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
    flexDirection: "row",
  },
  mainText: {
    color: "white",
    fontSize: 50,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  degreeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
  },
  big: {
    fontSize: 70,
    fontWeight: "300",
    color: "white",
    lineHeight: 80,
  },
  degreeSymbol: {
    fontSize: 33,
    fontWeight: "200",
    fontStyle: "italic",
    color: "white",
    alignSelf: 'flex-start',
    marginTop: 4,
    marginLeft: 1,
  },
  slash: {
    fontSize: 45,
    marginHorizontal: 6,
    opacity: 0.7,
    color: "white",
    alignSelf: "flex-end"
  },
  small: {
    fontSize: 35,
    opacity: 0.8,
    color: "white",
    lineHeight: 42,
  },
  degreeSymbolSmall: {
    fontSize: 19,
    fontWeight: "200",
    fontStyle: "italic",
    color: "white",
    alignSelf: 'flex-start',
    marginTop: 6,
    marginLeft: 1,
  },
  // removed old degreeTop and degreeBottom styles
});