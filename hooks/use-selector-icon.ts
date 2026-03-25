export const weatherIcons = {
    0: require("@/assets/images/sun.png"),
    1: require("@/assets/images/partly-cloudy.png"),
    2: require("@/assets/images/partly-cloudy.png"),
    3: require("@/assets/images/sunny-cloud.png"),
  
    45: require("@/assets/images/rainy.png"),
    48: require("@/assets/images/rainy.png"),
  
    51: require("@/assets/images/rainy.png"),
    53: require("@/assets/images/rainy.png"),
    55: require("@/assets/images/rainy.png"),
  
    61: require("@/assets/images/rainy.png"),
    63: require("@/assets/images/rainy-cloud.png"),
    65: require("@/assets/images/rainy.png"),
  
    71: require("@/assets/images/snow.png"),
    73: require("@/assets/images/snow.png"),
    75: require("@/assets/images/snow.png"),
  
    80: require("@/assets/images/rainy.png"),
    81: require("@/assets/images/rainy.png"),
    82: require("@/assets/images/rainy.png"),
  
    95: require("@/assets/images/bolt-cloud.png"),
    96: require("@/assets/images/bolt-cloud.png"),
    99: require("@/assets/images/bolt-cloud.png"),
  };
  export const useSelectorIcon = (weatherCode: number) => {
    return weatherIcons[weatherCode as keyof typeof weatherIcons];
  };