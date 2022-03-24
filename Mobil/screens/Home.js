import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import Slider from '../components/Slider'
import Contents from '../components/Contents';
import { GET } from '../services/Api';
import MovieDetail from '../components/MovieDetail';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';





const deviceHeight = Dimensions.get('window').height;
const Home = props => {
    const navigation = useNavigation();
    const [platforms, setPlatforms] = useState([])
    const [accessToken, setAccessToken] = useState([])



    useEffect(() =>{
        const getData = async () => {
            try {
              const jsonValue = await AsyncStorage.getItem('userLogin')
              return jsonValue != null ? setAccessToken(JSON.parse(jsonValue)) : null;
            } catch(e) {
              // error reading value
            }
          }
          getData()
    },[])

//    



    useEffect(() => {
        const getMovies = async () => {
            let response = await GET('platform/AZ/getall');
            response.forEach(element => {
                element.id = String(Math.random()).slice(2)
            })
            setPlatforms(response)
        }

        getMovies();

    }, [])


    


    // 


    return (
        <ScrollView style={styles.container}>
            <StatusBar style="auto" />
            {/* <MovieDetail /> */}
            <Slider />
            {
                platforms.map((e) => {
                    return(
                    <Contents key={e.Id + String(Math.random())} name={e.Platform} catalogName={e.CatalogName} typeName={e.Typename} typeId={e.TypeId} catelogId={e.CatalogId} userToken={accessToken.message}/>
                )})
            }
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: '#000f26',
        height: deviceHeight,
    },
})