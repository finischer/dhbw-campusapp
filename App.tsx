import { useFonts } from "@expo-google-fonts/source-sans-pro";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

import { QueryClient, QueryClientProvider } from "react-query";
import { DualisProvider } from "./src/hooks/useDualis/useDualis";
import { LecturesProvider } from "./src/hooks/useLectures";
import { MetaDataProvider } from "./src/hooks/useMetadata";
import { RestaurantProvider } from "./src/hooks/useRestaurant/useRestaurant";
import "./src/services/i18next/i18next.config";
import Navigation from "./src/infrastructure/navigation/Navigation";

import "./src/utilities/tasks";
import { useNotifications } from "./src/hooks/useNotification/useNotification";

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({
    SourceSansProRegular: require("./assets/fonts/SourceSansPro-Regular.ttf"),
    SourceSansProBold: require("./assets/fonts/SourceSansPro-Bold.ttf"),
  });
  const { initializeNotificationListeners, resetBadgeCount } = useNotifications();

  useEffect(() => {
    resetBadgeCount();
    initializeNotificationListeners();
  }, []);

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
