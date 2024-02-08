import { Dimensions, ImageBackground, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//importing Assets
import BG from '../assets/images/ResultScreen/BG.png'
import screenBG from '../assets/images/screenBG.png';
import homescreenBG from '../assets/images/homescreenBG.png'

//Importing Screens
import StartingPageScreen from '../screens/StartingPageScreen/StartingPage';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
// import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import Home from '../HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AttendanceHolidayScreen from '../screens/AttendanceHolidayScreen/AttendanceHolidayScreen';
import CoachingGalleryScreen from '../screens/CoachingGalleryScreen/CoachingGalleryScreen';
import ImageScreen from '../screens/ImageScreen/ImageScreen';
import TimetableScreen from '../screens/TimetableScreen/TimetableScreen';
import ResultScreen from '../screens/ResultScreen/ResultScreen';
import QuizScreen from '../screens/QuizScreen/QuizScreen';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='StartingPage'>
          {() => (
            <View style={{ flex: 1 }}>
              <StartingPageScreen />
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen name='SignIn'>
          {() => (
            <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
              <SignInScreen />
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen name='SignUp'>
          {() => (
            <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
              <SignUpScreen />
            </View>
          )}
        </Stack.Screen>


        <Stack.Screen name='ForgotPassword'
          options={{
            headerShown: true,
            title: 'Forgot Password',
            headerStyle: {
              backgroundColor: '#4477BB'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          {() => (
            <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
              <ForgotPasswordScreen />
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen name='NewPassword'>
          {() => (
            <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
              <NewPasswordScreen />
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen name='home'>
          {() => (
            <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
              <ImageBackground resizeMode='contain' source={homescreenBG} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 415, }}></ImageBackground>
              <Home />
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen name='Profile'>
          {() => (
            <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
              <ImageBackground resizeMode='contain' source={screenBG} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 650, position: 'absolute', top: 8 }}></ImageBackground>
              <ProfileScreen />
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen name='AttendanceHoliday'>
          {() => (
            <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
              <ImageBackground resizeMode='contain' source={screenBG} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 650, position: 'absolute', top: 8 }}></ImageBackground>
              <AttendanceHolidayScreen />
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen name='CoachingGallery'>
          {() => (
            <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
              <ImageBackground resizeMode='contain' source={screenBG} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 650, position: 'absolute', top: 8 }}></ImageBackground>
              <CoachingGalleryScreen />
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen name='ImageScreen'>
          {() => (
            <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
              <ImageBackground resizeMode='contain' source={screenBG} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 650, position: 'absolute', top: 8 }}></ImageBackground>
              <ImageScreen />
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen name='Timetable'>
          {() => (
            <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
              <ImageBackground resizeMode='contain' source={screenBG} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 650, position: 'absolute', top: 8 }}></ImageBackground>
              <TimetableScreen />
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen name='Result'>
          {() => (
            <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
              <ImageBackground resizeMode='contain' source={BG} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 465, position: 'absolute', top: 0 }}>
              </ImageBackground>
              <ResultScreen />
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen name='Quiz'>
          {() => (
            <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
              <ImageBackground resizeMode='contain' source={screenBG} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 650, position: 'absolute', top: 8 }}></ImageBackground>
              <QuizScreen />
            </View>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
