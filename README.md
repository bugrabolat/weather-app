# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# 🌤️ Weather App

Modern, performans odaklı ve kullanıcı dostu bir hava durumu mobil uygulaması.
React Native (Expo) kullanılarak geliştirilmiştir.

---

## 🚀 Proje Amacı

Bu proje, gerçek zamanlı hava durumu verilerini kullanıcıya hızlı ve sade bir şekilde sunmak amacıyla geliştirilmiştir.
Aynı zamanda modern mobil uygulama mimarisi ve state yönetimi pratiklerini uygulamak için oluşturulmuş bir portfolyo projesidir.

---

## 🧩 Özellikler

* 📍 Kullanıcının konumuna göre hava durumu
* 🔍 Şehir arama
* ⭐ Favori şehir ekleme ve silme
* 🌡️ Anlık sıcaklık ve hava durumu bilgileri
* 🧠 Akıllı ikon seçimi (hava durumuna göre)
* 📱 Minimal ve modern kullanıcı arayüzü
* ⚡ Hızlı veri çekme ve performans optimizasyonu

---

## 🛠️ Kullanılan Teknolojiler

* **React Native (Expo)**
* **TypeScript**
* **Context API** (global state yönetimi)
* **Custom Hooks**
* **Expo Secure Store** (local veri saklama)
* **Open-Meteo API** (hava durumu verisi)
* **Tailwind / NativeWind**

---

## 🧠 Mimari & Yaklaşım

Projede sürdürülebilir ve okunabilir bir yapı hedeflenmiştir:

* Veri işlemleri `services` katmanında yönetildi
* Tekrarlanabilir logicler için **custom hook** yapısı kuruldu
* Global state için **Context API** kullanıldı
* UI componentleri **modüler ve reusable** şekilde tasarlandı

---

## 📂 Klasör Yapısı

```id="p1f9da"
/components     → UI bileşenleri  
/hooks          → custom hook yapıları  
/services       → API ve veri işlemleri  
/context        → global state yönetimi  
/app            → sayfa ve navigation yapısı  
/assets         → görseller ve ikonlar  
```

---

## ⚙️ Kurulum

Projeyi lokal ortamda çalıştırmak için:

```bash id="l2s9dp"
git clone https://github.com/bugrabolat/weather-app.git
cd weather-app
npm install
npx expo start
```

---

## 🔄 Geliştirme Süreci

Bu proje geliştirilirken:

* API entegrasyonu sıfırdan kuruldu
* Async veri yönetimi optimize edildi
* Kullanıcı deneyimi için loading ve hata yönetimi eklendi
* Kod tekrarını azaltmak için reusable yapı kuruldu
* Mobil performans göz önünde bulunduruldu

---

## 🎯 Gelecek Geliştirmeler

* 🔔 Bildirim sistemi (hava durumu uyarıları)
* 📊 Saatlik / haftalık grafikler
* 🌍 Çoklu dil desteği (i18n)
* 🌙 Dark / Light tema desteği
* 📡 Offline veri cache sistemi

---

## 👨‍💻 Geliştirici

Bu proje bireysel olarak geliştirilmiş olup portfolyo amaçlıdır.

---

## ⭐ Not

Bu proje, modern React Native geliştirme, state yönetimi ve API entegrasyonu konularındaki yetkinliği göstermek amacıyla hazırlanmıştır.

## 🧩 Challenges & Learnings

Bu proje geliştirilirken karşılaşılan bazı zorluklar ve kazanımlar:

### ⚡ Asenkron Veri Yönetimi

API’den gelen verilerin doğru şekilde yönetilmesi ve UI’a senkronize edilmesi başlangıçta zorluk oluşturdu.
Bu süreçte:

* Custom hook yapıları geliştirildi
* Loading ve error state yönetimi optimize edildi

---

### 📍 Konum Tabanlı Veri Alma

Kullanıcının anlık konumuna göre veri çekmek için izin yönetimi ve fallback senaryoları ele alındı.
Bu sayede:

* Daha stabil bir kullanıcı deneyimi sağlandı
* Konum alınamadığında alternatif çözümler geliştirildi

---

### ⭐ Favori Şehir Yönetimi

Favori şehirlerin kalıcı olarak saklanması ve yönetilmesi sürecinde veri senkronizasyonu önemli bir konuydu.
Bu noktada:

* Expo Secure Store kullanılarak local storage çözümü geliştirildi
* State ile storage arasında tutarlılık sağlandı

---

### 🧠 Kod Organizasyonu ve Ölçeklenebilirlik

Proje büyüdükçe kodun yönetilebilir kalması için mimari kararlar alındı:

* Component yapısı modüler hale getirildi
* Servis katmanı ayrıştırıldı
* Reusable hook yapıları oluşturuldu

---

### 🎯 Öğrenilenler

Bu proje sayesinde:

* React Native ile gerçek dünya uygulama geliştirme pratiği kazanıldı
* API entegrasyonu ve veri yönetimi konusunda deneyim elde edildi
* State management (Context API) yapısı derinlemesine öğrenildi
* Daha temiz, sürdürülebilir ve ölçeklenebilir kod yazma pratiği geliştirildi
