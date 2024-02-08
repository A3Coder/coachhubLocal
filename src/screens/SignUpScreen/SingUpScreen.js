import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image, useWindowDimensions, KeyboardAvoidingView, Platform } from 'react-native';
import CustomInput from '../../components/CustomeInput/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButton from '../../components/SocialSignInButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import Logo from '../../assets/images/bgvector.png';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&`*+/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const role = ['Patient', 'Doctor'];
const gender = ['Male', 'Female', 'Other'];

const SignUpScreen = () => {
  const { control, handleSubmit, watch, setValue } = useForm();
  const pwd = watch('password');
  const roleValue = watch('role') || 'Patient'; // Watch the 'role' value
  const genderValue = watch('gender'); // Watch the 'gender' value

  const [showPassword, setShowPassword] = useState(false);
  const [errormsg, setErrormsg] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { height } = useWindowDimensions();

  const onRegisterPressed = (data) => {
    setLoading(true);
    console.log(data, roleValue, genderValue);
    try {
      const apiUrl = 'http://192.168.206.123:3000/api/v1/auth/register';

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ ...data, role: roleValue, gender: genderValue }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          setLoading(false);
          if (responseData.error) {
            setErrormsg(responseData.error);
          } else {
            Alert.alert('Account Created Successfully');
            navigation.navigate('SignIn');
            setErrormsg(null);
          }
        })
        .catch((error) => {
          console.error('Error:', error.message);
          setErrormsg('An error occurred while processing your request.');
        });
    } catch (error) {
      console.error('Error:', error.message);
    }
    setLoading(false);
    navigation.navigate('home');
  };

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.root}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode='contain' />
        </View>
        <View style={styles.section2}>
          <Text style={styles.title}>Hi Student</Text>
          <Text style={styles.content}>Sign Up to continue</Text>
        </View>
        <View style={styles.section3}>
          <Text style={styles.title2}>Create an account</Text>
          {errormsg ? <Text style={styles.errormsg}>{errormsg}</Text> : null}
          <CustomInput
            name="name"
            placeholder="Full Name"
            control={control}
            rules={{
              required: 'Full Name is required',
            }}
          />
          <CustomInput
            name="email"
            placeholder="Enter your Email"
            control={control}
            rules={{
              pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
              required: 'Email is required',
            }}
            onChange2={() => { setErrormsg(null) }}
          />
          <CustomInput
            name="password"
            placeholder="Password"
            control={control}
            securityTextEntry={!showPassword}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password should be at least 8 characters long',
              },
              maxLength: {
                value: 16,
                message: 'Password should be max 16 characters long',
              },
            }}
            maxLength={16}
          />
          <CustomInput
            name="confirm-password"
            control={control}
            placeholder="Confirm Password"
            securityTextEntry={!showPassword}
            rules={{
              validate: value => value === pwd || 'Password do not match',
            }}
            maxLength={16}
          />
          <CustomButton
            text={loading ? 'Registering...' : 'Register'}
            onPress={handleSubmit(onRegisterPressed)}
            disabled={loading}
            onPress2={() => { setErrormsg(null) }}
          />
          <Text style={styles.text}>
            By registering, you confirm that you accept our{' '}
            <Text style={styles.Link} onPress={onTermsOfUsePressed}>
              Term of Use
            </Text>{' '}
            and{' '}
            <Text style={styles.Link} onPress={onPrivacyPressed}>
              Privacy policy
            </Text>
          </Text>
          <CustomButton
            text="Have an account?"
            text2=" Sign in"
            onPress={onSignInPressed}
            type="TERTIARY2"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    // alignItems: 'center',
    // padding: 20,
    flex: 1,
    flexDirection: 'column',
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'grey',
    marginVertical: 10,
  },
  Link: {
    color: '#FDB075',
  },

  errormsg: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: 'yellow',
    paddingVertical: 5,
    borderRadius: 5,
    fontWeight: '500',
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
    // flex:1,
    // alignItems:'center',
    // justifyContent:'center'
  },
  section2: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 34,
    color: '#FFFFFF',
    fontWeight: '600',
    paddingBottom: 5,
  },
  content: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  section3: {
    paddingHorizontal: 25,
    paddingVertical: 50,
    backgroundColor: 'white',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
});

export default SignUpScreen;
