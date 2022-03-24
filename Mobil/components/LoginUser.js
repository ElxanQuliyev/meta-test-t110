import React, { useState, useEffect, useStatus } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View, Dimensions, ImageBackground, ScrollView, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;



const image = { uri: "https://wallpapercave.com/dwp1x/wp7948338.png" };







const LoginUser = () => {
    const navigation = useNavigation();

    const [userName, setUserName] = useState([]);
    const [userPassword, setPassword] = useState([]);
    const [accessToken, setToken] = useState('')


    var testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InpON0Exc1p6YjJXTkpNMW9MQ21ZIiwicm9sZSI6WyJTdWJzY3JpYmVyIl0sImlhdCI6MTY0NTI4NzY0MiwiZXhwIjoxNjQ3ODc5NjQyfQ.AOHcy--FQTyK9xYmsvUfil1vCgD4saC_4csAfy1wT5o"

    

    
    const putUser = props => {
        // http://192.168.1.133:2022/api/user/login
        // senan@gmail.com
        setToken('')
        if (userName == '') {
            
        } else if (userPassword == '') {
            
        } else {
            fetch('http://192.168.1.133:2022/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: userName,
                    Password: userPassword
                })
            }).then(response => response.json())
                .then((res) => setToken(res)).done();

            
        }
        
    }
 


    if (accessToken.status == 200) {
        const storeData = async (value) => {
            try {
              const jsonValue = JSON.stringify(value)
              await AsyncStorage.setItem('userLogin', jsonValue)
            } catch (e) {
              // saving error
            }
          }
          storeData(accessToken)
          if (accessToken != null) {
              
            navigation.push('Home',{token: accessToken})  
          }
        
    }else{
        
    }


    return (
        <ScrollView>
            <ImageBackground borderBottomLeftRadius={200} aborderBottomRightRadius={200} source={image} style={styles.image}>
                <View style={styles.bgOpacity}>
                    <View style={styles.logoText}>
                        <Text style={styles.textLeft}>Meta</Text><Text style={styles.textRight}>Flix</Text>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.inputContainer}>
                {/* <Text style={{color: '#000'}}>{setError}</Text> */}
                <Text style={styles.textLabel}>
                    Email or Phone number
                </Text>
                <TextInput
                    placeholder="exapmle@metaflix.az"
                    style={styles.inputs}
                    onChangeText={(val) => setUserName(val)}
                />

                <Text style={styles.textLabel}>
                    Paswword
                </Text>
                <TextInput
                    placeholder="******"
                    secureTextEntry
                    style={styles.inputs}
                    onChangeText={(val) => setPassword(val)}
                />
                <View style={styles.buttonContainer}>
                    <Text onPress={() => putUser()} style={styles.btnLogin}>Login</Text>
                    {/* <Text onPress={() => navigation.navigate('Home')} style={styles.btnLogin}>Login</Text> */}
                    <Text onPress={() => navigation.push('Home')} style={styles.btnRegister}>Register</Text>

                </View>
            </View>
        </ScrollView>
    )
}

export default LoginUser

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: '#fff',
        height: deviceHeight,
    },
    image: {
        width: deviceWidth,
        height: 400,
        borderBottomEndRadius: 200,

    },
    bgOpacity: {
        width: deviceWidth,
        height: 400,
        backgroundColor: '#9e08089e',
        borderBottomStartRadius: 200
    },
    logoText: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignSelf: 'center',
        fontSize: 10,
        textAlign: 'center',
        marginTop: 150
    },
    textLeft: {
        backgroundColor: 'red',
        fontSize: 50,
        color: '#fff',
        fontWeight: 'bold'
    },
    textRight: {
        backgroundColor: '#000f2600',
        color: '#fff',
        fontSize: 50,
    },
    inputs: {
        borderBottomWidth: 1,
        padding: 5,
        width: 300,
        borderBottomColor: '#dedede',

    },
    inputContainer: {
        width: 300,
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: 30
    },
    textLabel: {
        marginTop: 10,
        color: '#6e6363',
        fontSize: 16
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    btnLogin: {
        backgroundColor: '#000f26',
        color: '#fff',
        padding: 10,
        paddingHorizontal: 40
    },
    btnRegister: {
        color: '#fff',
        padding: 10,
        paddingHorizontal: 40,
        borderWidth: 1.5,
        color: '#9e0808',
        borderColor: '#9e0808'
    }
})