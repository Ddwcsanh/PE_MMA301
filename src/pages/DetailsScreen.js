import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { Categories } from "../data/db";
import { AntDesign } from "@expo/vector-icons";
import { Rating } from "react-native-elements";

const DetailsScreen = ({ route }) => {
  const { name } = route.params;
  
  // const data = Categories.flatMap((category) => category.data);

  const data = Categories.flatMap((category) =>
    category.data.map((dataObj) => ({ ...dataObj, category: category.name }))
  );

  const detailData = data.find((item) => item.name === name);

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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFF",
      }}
    >
      <View>
        <Image
          style={{
            height: 300,
          }}
          source={{ uri: detailData?.image }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingTop: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 24,
            }}
          >
            {detailData?.name}
          </Text>
          <Pressable
            onPress={() => {
              if (detailData) handleFavoriteList(detailData);
            }}
            style={{
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign
              size={30}
              name={
                isInFavoriteList(detailData?.name || "") ? "heart" : "hearto"
              }
              color="tomato"
            />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 15,
          }}
        >
          <Rating imageSize={24} startingValue={detailData?.rating} />
        </View>
        <Text
          style={{
            fontSize: 20,
            paddingHorizontal: 15,
            marginTop: 20,
          }}
        >
          Category: {detailData?.category}
        </Text>
        <Text
          style={{
            fontSize: 20,
            paddingHorizontal: 15,
            marginTop: 5,
          }}
        >
          Weight: {detailData.weight}g
        </Text>
        <Text
          style={{
            fontSize: 20,
            paddingHorizontal: 15,
            marginTop: 5,
          }}
        >
          Origin: {detailData.origin}
        </Text>
        <Text
          style={{
            fontSize: 20,
            paddingHorizontal: 15,
            marginTop: 5,
          }}
        >
          Color: {detailData.color}
        </Text>
        <Text
          style={{
            fontSize: 20,
            paddingHorizontal: 15,
            marginTop: 5,
          }}
        >
          Price: ${detailData.price}
        </Text>
        {detailData.bonus.toLocaleLowerCase() !== "no" && (
          <Text
            style={{
              fontSize: 20,
              paddingHorizontal: 15,
              marginTop: 5,
            }}
          >
            Bonus: {detailData.bonus}
          </Text>
        )}
        {detailData.isTopOfTheWeek && (
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: "tomato",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
              position: "absolute",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "#FFF",
              }}
            >
              TOP
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DetailsScreen;
