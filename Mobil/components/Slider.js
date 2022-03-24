import React, { useState, useEffect, useStatus } from 'react';
import { Text, View, Image, Dimensions, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import { GET } from '../services/Api';
const { width } = Dimensions.get('window')
const Slider = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const response = await  GET('filter/slidercontents/AZ');
            setMovies(response)
        }

        getMovies();

    }, [])

 

    return (
        <View style={styles.container}>


            <Swiper
                style={styles.wrapper}

                autoplay={true}
                dot={
                    <View
                        style={{
                            backgroundColor: '#000f26',
                            width: 30,
                            height: 1,
                            borderRadius: 4,
                            marginLeft: 3,
                            marginRight: 3,
                            marginTop: 3,
                            marginBottom: 3
                        }}
                    />
                }
                activeDot={
                    <View
                        style={{
                            backgroundColor: '#000f26',
                            width: 20,
                            height: 3,
                            borderRadius: 4,
                            marginLeft: 3,
                            marginRight: 3,
                            marginTop: 3,
                            marginBottom: 3
                        }}
                    />
                }
                paginationStyle={{
                    bottom: -23,
                    left: null,
                    right: 10
                }}
                loop
            >

                {
                    movies.map((e)=>(
                        <View
                        key={e.Id}
                        style={styles.slide}
                    >
                        <Image
                            resizeMode="cover"
                            style={styles.image}
                            source={{
                                uri: e.SliderImage
                            }}
                        />
                    </View>
                    ))
                }
               
            </Swiper>
        </View>
    )
}

export default Slider

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 30
    },
    container: {
        height: 400,
        backgroundColor: "#000f26"
    },


    slide: {
        backgroundColor: '#fff',
    },

    slide1: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000f26'
    },

    slide2: {
        flex: 1,
        backgroundColor: '#000f26'
    },

    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000f26'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        backgroundColor: "#000f26"
    },

    image: {
        width,
        height: 400
    },
    contentName: {
        color: '#fff',
        fontSize: 23,

    }
})