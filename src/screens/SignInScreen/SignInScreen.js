// SignInScreen.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import Logo from '../../assets/images/bgvector.png';
import CustomInput from '../../components/CustomeInput/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useForm, Controller } from "react-hook-form";
import SocialSignInButton from '../../components/SocialSignInButton';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const [showPassword, setShowPassword] = useState(false);
  const [errormsg, setErrormsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&`*+/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();
  console.log(errors);

  const onSignInPressed = async (data) => {
    setLoading(true);
    try {
      const apiUrl = await 'http://192.168.206.123:3000/api/v1/auth/login';
      setTimeout(() => {
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({ ...data }),
        }).then((res) => res.json())
          .then((resData) => {
            setLoading(false);
            if (resData.error) {
              setErrormsg(resData.error);
            } else {
              Alert.alert('Login successfully');
              navigation.navigate('home');
              setErrormsg(null);
            }
          }).catch((error) => {
            console.log('Error: ', error);
            setErrormsg('Error occurred while processing your request');
          });
      }, 2000);
    } catch (error) {
      console.log('Error: ', error);
    }
    setLoading(false);
    navigation.navigate('home');
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.root}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.Section1_conatainer}>
          <View style={styles.logoContainer}>
            <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode='contain' />
          </View>
        </View>
        <View style={styles.section2_container}>
          <Text style={styles.title}>Hi Student</Text>
          <Text style={styles.content}>Sign in to continue</Text>
        </View>
        <View style={styles.Section3_container}>
          <View style={styles.section3}>
            {errormsg ? <Text style={styles.errormsg} >{errormsg}</Text> : null}
            <CustomInput
              name="email"
              placeholder='Enter your Email'
              control={control}
              rules={{ 
                required: 'Email is required',
                pattern: { value: EMAIL_REGEX, message: 'Email is invalid' }, 
                }}
              onChange2={() => { setErrormsg(null) }}
            />
            <CustomInput
              name="password"
              placeholder='Password'
              control={control}
              securityTextEntry={!showPassword}
              rules={{ required: 'Password is required' }}
              onChange2={() => setErrormsg(null)}
              maxLength={16}
            />
            <CustomButton
              text={loading ? 'Login...' : 'Sign In'}
              onPress={handleSubmit(onSignInPressed)}
              onPress2={() => setErrormsg(null)}
              disabled={loading}
            />
            <CustomButton
              text="Forgot Password?"
              onPress={onForgotPasswordPressed}
              type="TERTIARY"
            />
            <CustomButton
              text="Don't have an account? "
              text2=" Create one"
              onPress={onSignUpPress}
              type="TERTIARY2"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
  },
  section2_container: {
    paddingHorizontal: 20,
  },
  Section1_conatainer: {
  },
  Section3_container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
  },
  logo: {
    width: '100%',
    maxWidth: 300,
    maxHeight: 200,
  },
  logoContainer: {
    width: '80%',
    maxWidth: 300,
    maxHeight: 300,
    marginLeft: 64,
    marginTop: 40,
    justifyContent: 'center'
  },
  title: {
    fontSize: 34,
    color: '#FFFFFF',
    fontWeight: '600',
    paddingBottom: 5
  },
  content: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '300'
  },
  section3: {
    flex: 1,
    padding: 25
  },
  errormsg: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: 'yellow',
    paddingVertical: 5,
    borderRadius: 5,
    fontWeight: '500'
  }
});

export default SignInScreen;
