import { Image, Pressable, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ItemCard = ({ name, image, favorite, onChangeFavList }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: "#FFF",
        margin: 15,
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOffset: {
          width: 1,
          height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
      }}
    >
      <Pressable onPress={() => navigation.navigate("Details", { name: name })}>
        <Image
          source={{
            uri: image,
          }}
          style={{
            height: 200,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 15,
            paddingVertical: 25,
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              fontSize: 20,
            }}
          >
            {name}
          </Text>
          <Pressable
            onPress={onChangeFavList}
            style={{
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign
              size={30}
              name={favorite ? "heart" : "hearto"}
              color="tomato"
            />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
};

export default ItemCard;
