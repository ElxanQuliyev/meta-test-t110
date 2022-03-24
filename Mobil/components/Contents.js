import React, { useState, useEffect, useStatus } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { GET, getLang } from "../services/Api";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Contents = ({ name, catalogName, typeName, typeId, catelogId }) => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [accessToken, setAccessToken] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("userLogin");
        return jsonValue != null ? setAccessToken(JSON.parse(jsonValue)) : null;
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);


  useEffect(() => {
    const getMovies = async () => {
      const response = await GET(
        "filter/contents/AZ/" + name + "/" + typeId + "/" + catelogId + ""
      );
      setMovies(response);
    };

    getMovies();
  }, []);

  var movieDetail = typeName;

  if (typeName == "Film") {
    movieDetail = "MovieDetail";
  } else if (typeName == "Serial") {
    movieDetail = "SeriesDetail";
  }

  return (
    <View>
      <Text style={{ color: "#fff", fontSize: 20 }}>{name}</Text>
      <Text style={{ color: "#fff", fontSize: 20 }}>
        {catalogName} {typeName}
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {movies.map((e, index) => {
          
          return (
            <TouchableOpacity
              key={e.Id + String(Math.random()).slice(2)}
              onPress={() =>
                navigation.navigate(movieDetail, {
                  movieId: e.Id,
                  refUserToke: accessToken.message,
                })
              }
            >
              <View style={styles.contentContainer}>
                <Image
                  style={styles.itemImage}
                  source={{
                    uri: e.MainPicture,
                  }}
                />
                <View style={{ color: "#000f26", padding: 10 }}>
                  <Text
                    style={{ color: "#fff", textAlign: "center", width: 150 }}
                  >
                    IMDB {e.Name}
                  </Text>
                </View>
                <Text style={styles.imdb}></Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Contents;

const styles = StyleSheet.create({
  itemImage: {
    width: 200,
    height: 300,
  },
  contentContainer: {
    marginRight: 20,
    marginTop: 20,
  },
});
