import React, { useState, useEffect, useStatus } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, Modal, Picker, ImageBackground } from "react-native";
import { GET } from '../services/Api'
import { EvilIcons } from '@expo/vector-icons';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';





const MovieDetail = props => {
    const navigation = useNavigation();
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        const getMovies = async () => {
            const response = await GET('Film/AZ/getById/' + props.route.params.movieId,);
            setMovies(response)
        }

        getMovies();

    }, [])

console.log(movies);
    function CategoryList() {

        const renderCategory = ({ item, index }) => (
            <View key={index} style={styles.itemContainer}>
                <View>
                    <View>
                        <Text style={styles.contentCategory}>{item.Name} </Text>
                    </View>
                </View>
            </View>
        )

        return (
            <FlatList
                horizontal
                data={movies.Categories}
                renderItem={renderCategory}
                keyExtractor={item => item.id}
            />
        );
    }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.navbar}
                source={{
                    uri: movies.SliderImage
                }}
                blurRadius={12}
            >
                <Image
                    style={styles.contentImage}
                    source={{
                        uri: movies.MainPicture
                    }}
                />
                <View style={{ width: '50%' }}>
                    <Text style={{
                        color: '#fff', fontSize: 25, textShadowColor: 'rgba(0, 0, 0, 0.75)',
                        textShadowOffset: { width: -1, height: 1 },
                        textShadowRadius: 10
                    }}>{movies.Name}</Text>
                    <CategoryList />
                </View>
            </ImageBackground>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <TouchableOpacity style={styles.playButton}>
                    <EvilIcons name="play" size={30} color="#fff" /><Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 19 }}> Play</Text>
                </TouchableOpacity>
            </View>
            <View>
                <View>

                </View>
            </View>
            <View>
                <Text style={{ color: '#fff', fontSize: 16, marginTop: 20 }}>{movies.Description}</Text>
            </View>
        </View>
    )
}

export default MovieDetail

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000f26',
        height: deviceHeight,
    },
    contentImage: {
        width: 170,
        height: 250,
    },
    navbar: {
        paddingVertical: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'black'
    },
    contentCategory: {
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    playButton: {
        backgroundColor: '#ed303d',
        textAlign: 'center',
        alignItems: 'center',
        padding: 10,
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
})