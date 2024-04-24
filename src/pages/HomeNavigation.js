import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./(tabs)/HomeScreen";
import FavoriteScreen from "./(tabs)/FavoriteScreen";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => {
            return props.focused ? (
              <Ionicons name="home" size={24} color={props.color} />
            ) : (
              <Ionicons name="home-outline" size={24} color={props.color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon(props) {
            return props.focused ? (
              <AntDesign name="heart" size={24} color={props.color} />
            ) : (
              <AntDesign name="hearto" size={24} color={props.color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
