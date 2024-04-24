import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import ItemCard from "../../components/ItemCard";

const FavoriteScreen = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const isFocused = useIsFocused();
  const getItem = async () => {
    try {
      const result = await AsyncStorage.getItem("favorite");
      return result === null ? [] : JSON.parse(result);
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const isInFavoriteList = (name) => {
    try {
      return (
        favoriteList.findIndex((item) => {
          return item.name === name;
        }) !== -1
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleFavoriteList = async (item) => {
    try {
      if (isInFavoriteList(item.name)) {
        const updatedFavorite = favoriteList.filter(
          (favoriteItem) => favoriteItem.name !== item.name
        );
        await AsyncStorage.setItem("favorite", JSON.stringify(updatedFavorite));
        setFavoriteList(updatedFavorite);
      } else {
        setFavoriteList([...favoriteList, item]);
        await AsyncStorage.setItem(
          "favorite",
          JSON.stringify([...favoriteList, item])
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearFavoriteList = async () => {
    try {
      Alert.alert(
        "Delete confirmation",
        "Are you sure you want to delete all orchid from favorite?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            async onPress() {
              setFavoriteList([]);
              await AsyncStorage.clear();
            },
          },
        ]
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getItem();
        setFavoriteList(data);
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {};
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {favoriteList.length > 1 && (
        <Button title="Clear all" onPress={handleClearFavoriteList} />
      )}
      {favoriteList.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "darkgrey",
            }}
          >
            Favorite list empty
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteList || []}
          renderItem={({ item, index }) => (
            <ItemCard
              onChangeFavList={() => handleFavoriteList(item)}
              favorite={isInFavoriteList(item.name)}
              image={item.image}
              name={item.name}
              key={index}
            />
          )}
          keyExtractor={(item) => item.name}
        />
      )}
    </SafeAreaView>
  );
};

export default FavoriteScreen;
