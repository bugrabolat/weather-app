export const weatherNames: { [key: number]: string } = {
  0: "Güneşli",
  1: "Az Bulutlu",
  2: "Parçalı Bulutlu",
  3: "Çok Bulutlu",

  45: "Sisli",
  48: "Buz Sis",

  51: "Hafif Çiseliyor",
  53: "Orta Şiddetli Çiseleme",
  55: "Yoğun Çiseleme",

  61: "Hafif Yağmurlu",
  63: "Orta Şiddetli Yağmur",
  65: "Şiddetli Yağmur",

  71: "Hafif Kar Yağışlı",
  73: "Orta Kar Yağışlı",
  75: "Yoğun Kar Yağışlı",

  80: "Hafif Sağanak Yağışlı",
  81: "Orta Sağanak Yağışlı",
  82: "Yoğun Sağanak Yağışlı",

  95: "Fırtınalı",
  96: "Hafif Dolu Fırtınası",
  99: "Şiddetli Dolu Fırtınası"
};

export const useSelectorWeatherName = (weatherCode: number): string => {
  return weatherNames[weatherCode] || "Bilinmeyen Hava Durumu";
};