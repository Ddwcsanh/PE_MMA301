import { SafeAreaView, SectionList, Text, View } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Categories } from "../../data/db";
import ItemCard from "../../components/ItemCard";

const HomeScreen = () => {
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

  useEffect(() => {
    (async () => {
      const data = await getItem();
      setFavoriteList(data);
    })();
    return () => {};
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SectionList
        sections={Categories}
        renderSectionHeader={({ section: { name } }) => (
          <View>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "700",
                marginLeft: 20,
                marginTop: 20,
              }}
            >
              {name}
            </Text>
          </View>
        )}
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
    </SafeAreaView>
  );
};

export default HomeScreen;
