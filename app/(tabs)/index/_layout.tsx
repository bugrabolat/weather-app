import { Stack } from "expo-router";

export default function HomeStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="week"
        options={({
          route,
        }: {
          route: { params?: { name?: string } };
        }) => {
          const cityName = route?.params?.name;
          return {
            title: cityName ? cityName.split("/")[0] : "7 Days",
            headerTransparent: true,
            headerBackButtonDisplayMode: "minimal",
            headerTintColor: "white",
          };
        }}
      />
    </Stack>
  );
}