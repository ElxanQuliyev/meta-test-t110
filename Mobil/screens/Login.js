import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useStatus } from 'react';
import { StatusBar } from 'expo-status-bar'
import LoginUser from '../components/LoginUser'
import UserDashboard from '../components/UserDashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { GET } from '../services/Api'
const isLoggedIn = false;



const Login = props => {
    const navigation = useNavigation();
    const [accessToken, setAccessToken] = useState({})
    const [user, setUser] = useState([]);


    useEffect(() =>{
       ( async () => {
            try {
              const jsonValue = await AsyncStorage.getItem('userLogin')
              return jsonValue && setAccessToken(JSON.parse(jsonValue));
            } catch(e) {
              // error reading value
            }
          }
    )()
    },[])
    

    useEffect(() => {
        const getUser = async () => {
            const response = await GET('user/', accessToken.message);
            setUser(response)
        }

        getUser();

    }, [])


//    
//    


    if (accessToken.status == 200 || props.route.params.logIn == "true") {
        

        return (
            <View>
                <StatusBar style='auto' />
                <UserDashboard />
            </View>
        )
    }
    return (
        <View>
            <StatusBar style='auto' />
            <LoginUser />
        </View>
    )
}

export default Login

const styles = StyleSheet.create({})