import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import HomeNavigation from "./src/pages/HomeNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "./src/pages/DetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeNavigation"
          component={HomeNavigation}
          options={{
            headerTitle: "Orchids",
          }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
