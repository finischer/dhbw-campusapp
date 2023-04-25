import { useFonts } from "@expo-google-fonts/source-sans-pro";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";


import { QueryClient, QueryClientProvider } from "react-query";
import { DualisProvider } from "./src/hooks/useDualis/useDualis";
import { LecturesProvider } from "./src/hooks/useLectures";
import { MetaDataProvider } from "./src/hooks/useMetadata";
import { RestaurantProvider } from "./src/hooks/useRestaurant/useRestaurant";
import "./src/services/i18next/i18next.config";
import Navigation from "./src/infrastructure/navigation/Navigation";

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({
    SourceSansProRegular: require("./assets/fonts/SourceSansPro-Regular.ttf"),
    SourceSansProBold: require("./assets/fonts/SourceSansPro-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Schriften werden geladen ...</Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <MetaDataProvider>
        <DualisProvider>
          <RestaurantProvider>
            <LecturesProvider>
              <StatusBar style="light" />
              <Navigation />
            </LecturesProvider>
          </RestaurantProvider>
        </DualisProvider>
      </MetaDataProvider>
    </QueryClientProvider>
  );
}
