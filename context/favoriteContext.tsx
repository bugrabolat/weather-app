import * as Haptics from "expo-haptics";
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Toast from "react-native-toast-message";
const FAVORITE_KEY = "favoriteCities";
const FavoriteContext = createContext<any>(null);


export const FavoriteProvider = ({ children }: any) => {
    const [favoritesStorage, setFavoritesStorage] = useState<any[]>([]);

    useEffect(() => {
        SecureStore.getItemAsync(FAVORITE_KEY).then((data) => {
            if (data) setFavoritesStorage(JSON.parse(data));
        });
    }, []);


    const addFavorite = async (city: any) => {
        const exists = favoritesStorage.some((c) => c.name === city.name);
        if (exists) {
            await Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
            Toast.show({
                type: "info",
                text1: "Zaten Favorilerde",
                text2: `${city.name} zaten favori şehirlerinizde bulunuyor.`,
                visibilityTime: 2000,
                position: "bottom"
            });
            return;
        }

        const updated = [...favoritesStorage, city];
        setFavoritesStorage(updated);
        await SecureStore.setItemAsync(FAVORITE_KEY, JSON.stringify(updated));
        await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        );
        Toast.show({
            type: "success",
            text1: "Favorilere Eklendi ⭐",
            text2: `${city.name} favori şehirlerinize eklendi.`,
            visibilityTime: 2000,
            position: "bottom"
        });
    };

    const removeFavorite = async (cityName: string) => {
        const updated = favoritesStorage.filter((c) => c.name !== cityName);
        setFavoritesStorage(updated);
        await SecureStore.setItemAsync(FAVORITE_KEY, JSON.stringify(updated));
        if (updated.length === 0) {
            if (typeof window !== "undefined") {
                window.location.reload();
            }
        }
    };

    return (
        <FavoriteContext.Provider value={{ favoritesStorage, addFavorite, removeFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoriteContext);