import React, { useState, useEffect, useStatus } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Modal,
  Picker,
  ImageBackground,
} from "react-native";
import { GET } from "../services/Api";
import { EvilIcons } from "@expo/vector-icons";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import { useNavigation } from "@react-navigation/native";
import { render } from "react-dom";
import MFlixPlayer from "./MFlixPlayer";

const SeriesDetail = (props) => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("Trailler");
  const [selectedValue, setSelectedValue] = useState("1");
  const [accessToken, setAccessToken] = useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userLogin");
      return jsonValue != null ? setAccessToken(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
    const getMovies = async () => {
      const response = await GET(
        "TvShow/getById/AZ/" + props.route.params.movieId,
        props.route.params.refUserToke
      );
      setMovies(response.data);
    };

    getMovies();
  }, []);


  console.log(movies);
  const setStatusFilter = (status) => {
    if (status !== "Trailler") {
      setDatalist([...data[0].sezons.filter((e) => e.status === status)]);
    } else {
      setDatalist([...data[0].sezons.filter((e) => e.status === "Trailler")]);
    }
    setStatus(status);
  };

  //

  function CategoryList() {
    const renderCategory = ({ item, index }) => (
      <View key={item.Id} style={styles.itemContainer}>
        <View>
          <View>
            <Text style={styles.contentCategory}>{item.Name} </Text>
          </View>
        </View>
      </View>
    );

    return (
      <FlatList
        horizontal
        data={movies.Categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.Id}
      />
    );
  }

  
  function SezonList() {
    const renderSezons = ({ item, index }) => (
      <ScrollView style={{ marginTop: 20 }} horizontal>
        {item.Series.filter((item) => item.SeasonName == selectedValue).map(
          (d) => (
            <View key={d.Id}>
              <View>
                <TouchableOpacity
                  onPress={() => setSelectedVideo(d.MainPicture)}
                >
                  <Image
                    style={styles.sezonImage}
                    source={{
                      uri: d.MainPicture,
                    }}
                  />

                  <Text style={styles.videoPlayButton}>
                    <EvilIcons name="play" size={30} color="#fff" />
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.itemText}>{d.Name}</Text>
            </View>
          )
        )}
      </ScrollView>
    );

    return (
      <FlatList
        horizontal
        data={movies.Season}
        renderItem={renderSezons}
        keyExtractor={(item) => item.Id}
      />
    );
  }

  function SezonCountList() {
    const renderSezonCount = ({ item, index }) => (
      <View>
        <Text
          onPress={(itemValue, itemIndex) => setSelectedValue(item.Name)}
          style={styles.sezonList}
        >
          Sezon {item.Name}
        </Text>
      </View>
    );

    return (
      <FlatList
        horizontal
        data={movies.Season}
        renderItem={renderSezonCount}
        keyExtractor={(item) => item.id}
      />
    );
  }

  function ActorsList() {
    const renderActors = ({ item, index }) => (
      <View key={index} style={styles.itemContainer}>
        <View>
          <Image
            style={styles.actorImage}
            source={{
              uri: item.Picture,
            }}
          />
          <View>
            <Text style={styles.contentCategory}>{item.Name}</Text>
          </View>
        </View>
      </View>
    );

    return (
      <FlatList
        horizontal
        data={movies.Actors}
        renderItem={renderActors}
        keyExtractor={(item) => item.Id}
      />
    );
  }

  function ViedeoURL({ urlName }) {
    if (urlName != null) {
      return (
        <TouchableOpacity style={styles.playButton}>
          <EvilIcons name="play" size={30} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 19 }}>
            Play
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.playButton}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 19 }}>
            {" "}
            Abune ol
          </Text>
        </TouchableOpacity>
      );
    }
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.navbar}
        source={{
          uri: movies.SliderImage,
        }}
        blurRadius={12}
      >
        <Image
          style={styles.contentImage}
          source={{
            uri: movies.MainPicture,
          }}
        />
        <View style={{ width: "50%" }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 25,
              textShadowColor: "rgba(0, 0, 0, 0.75)",
              textShadowOffset: { width: -1, height: 1 },
              textShadowRadius: 10,
            }}
          >
            {movies.Name}
          </Text>
          <View style={styles.contentInfo}>
            <View>
              <Text style={styles.contentCategory}>
                <Text>IMDB {movies.IMDB}</Text>
                {movies.Age}
                {movies.Type}
                {movies.ContentDate}
              </Text>
            </View>
          </View>

          <CategoryList />
        </View>
      </ImageBackground>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity style={styles.playButton}>
          <ViedeoURL urlName={null} />
        </TouchableOpacity>
      </View>
      <View>
        <View>
          <MFlixPlayer />
        </View>
      </View>
      <View>
        <Text style={{ color: "#fff", fontSize: 16, marginTop: 20 }}>
          {movies.Description}
        </Text>
      </View>

      <View>
        <SezonCountList />
        <SezonList />
      </View>
      <View>
        <ActorsList />
      </View>
    </ScrollView>
  );
};

export default SeriesDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000f26",
    height: deviceHeight,
  },
  contentImage: {
    width: 170,
    height: 250,
  },
  navbar: {
    paddingVertical: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "black",
  },
  contentCategory: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  playButton: {
    backgroundColor: "#ed303d",
    textAlign: "center",
    alignItems: "center",
    padding: 10,
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  sezonImage: {
    width: 200,
    height: 100,
    marginRight: 20,
  },
  videoPlayButton: {
    backgroundColor: "#ed303d",
    textAlign: "center",
    alignItems: "center",
    padding: 5,
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  itemText: {
    color: "#fff",
    fontSize: 16,
  },
  sezonList: {
    color: "#fff",
    marginRight: 10,
    padding: 5,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "red",
    marginBottom: 15,
  },
  actorImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginTop: 50,
  },
  contentInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    width: "100%",
  },
});
