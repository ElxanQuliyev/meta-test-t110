import React, { useState, useEffect, useStatus } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View, Dimensions, ImageBackground, ScrollView, TextInput, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const { width } = Dimensions.get("window");
const image = { uri: "https://wallpapercave.com/dwp1x/wp7948338.png" };
import { GET } from '../services/Api'



const UserDashboard = () => {
    const navigation = useNavigation();
    const log = ""
    const [user, setUser] = useState([]);
    const [accessToken, setAccessToken] = useState([])



    useEffect(() => {
        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('userLogin')
                return jsonValue != null ? setAccessToken(JSON.parse(jsonValue)) : null;
            } catch (e) {
                // error reading value
            }
        }
        getData()
    }, [])

  
    useEffect(() => {
        if (accessToken.message) {
            (async () => {
                const response = await GET('user/get', accessToken.message);
                setUser(response)
            })()
        }
    }, [accessToken.message])

    console.log(user)    

    const logout = () => {
        const storeData = async (value) => {
            try {
                const jsonValue = JSON.stringify("300")
                await AsyncStorage.setItem('userLogin', jsonValue)
            } catch (e) {
                // saving error
            }
        }
        storeData()
        navigation.push("Home")
    }







    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.label}>Profil</Text>
                <View style={styles.sectionOne}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: 'https://cdn.pixabay.com/photo/2016/12/07/21/01/cartoon-1890438_960_720.jpg'
                        }}
                    />
                    <Text style={styles.userName}>
                        {user.Name} {user.Surname}
                    </Text>
                </View>
                <Text style={styles.label}>Hesab məlumatları</Text>
                <View style={styles.sectionTwo}>
                    <Text style={styles.labelHeader}>
                        Email
                    </Text>
                    <Text style={styles.labelFooter}>
                        {user.Email}
                    </Text>
                    <Text style={styles.labelHeader}>
                        Telefon nömrəsi
                    </Text>
                    <Text style={styles.labelFooter}>
                        {user.Phonenumber}
                    </Text>
                    <Text style={styles.labelHeader}>
                        Şifrə
                    </Text>
                    <Text style={styles.labelFooter}>
                        *******
                    </Text>
                </View>

                <Text style={styles.label}>Abunəlik</Text>
                <View style={styles.sectionTwo}>
                    <Text style={styles.labelHeader}>
                        Paket adı
                    </Text>
                    <Text style={styles.labelFooter}>
                        Sadə
                    </Text>
                </View>

                <Text style={styles.label}>Dil</Text>
                <View style={styles.sectionThree}>
                    <TouchableOpacity onPress={(e) => storeLang("AZ")}>
                        <Image
                            style={styles.lang}
                            source={{
                                uri: 'https://cdn.pixabay.com/photo/2020/02/21/05/49/azerbaijan-4866530_960_720.png'
                            }}

                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={(e) => storeLang("TR")}>
                        <Image
                            style={styles.lang}
                            source={{
                                uri: 'https://cdn.pixabay.com/photo/2013/07/13/14/17/turkey-162445_960_720.png'
                            }}

                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={(e) => storeLang("RU")}>
                        <Image
                            style={styles.lang}
                            source={{
                                uri: 'https://cdn.pixabay.com/photo/2012/04/10/23/12/russia-26896_960_720.png'
                            }}

                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={(e) => storeLang("EN")}>
                        <Image
                            style={styles.lang}
                            source={{
                                uri: 'https://cdn.pixabay.com/photo/2017/03/14/21/00/american-flag-2144392_960_720.png'
                            }}

                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.label}></Text>
                <View style={styles.sectionThree}>

                    <Text onPress={() => logout()} style={styles.labelHeader}>
                        Çıxış
                    </Text>
                </View>
                <View style={{ marginTop: 100 }}>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default UserDashboard

const styles = StyleSheet.create({

    container: {
        marginTop: 20,
        backgroundColor: '#000f26',
        height: deviceHeight,
    },
    sectionOne: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#0d1d36',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#fff',
        paddingHorizontal: 10
    },
    avatar: {
        width: 80,
        height: 80,
    },
    userName: {
        color: '#fff',
        alignContent: 'center',
        marginHorizontal: 10,
        fontSize: 18
    },
    label: {
        fontSize: 18,
        color: '#fff',
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 10,

    },
    sectionTwo: {
        backgroundColor: '#0d1d36',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#fff',
        paddingHorizontal: 10
    },
    labelHeader: {
        color: '#fff',
        fontSize: 16,
        marginTop: 20
    },
    labelFooter: {
        color: '#fff'
    },
    lang: {
        width: 40,
        height: 30,
        marginRight: 10
    },
    sectionThree: {
        backgroundColor: '#0d1d36',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#fff',
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',

    }
});
