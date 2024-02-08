import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';

import CustomInput from '../../components/CustomeInput/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import Logo from '../../assets/images/bottomvector.png';

const ForgotPasswordScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&`*+/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const onSendPressed = () => {
    navigation.navigate('NewPassword');
  };

  const onSignInpress = () => {
    navigation.navigate('SignIn');
  };

  return (
    // <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.section1_Container}>
        <ScrollView>
          <View style={styles.section1}>
            <Text style={styles.title}>Reset your password</Text>

            <CustomInput
              control={control}
              placeholder="Enter Your Email"
              name="email"
              rules={{
                required: 'Email is required',
                pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
              }}
            />

            <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />

            <CustomButton
              text="Back to Sign in"
              onPress={onSignInpress}
              type="TERTIARY2"
            />
          </View>
        </ScrollView>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
        </View>
      </View>

    // </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  section1_Container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  section1: {
    padding: 20,
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',  // Center the logo horizontally
    marginBottom: 0,     // Add margin at the bottom
  },
  logo: {
    width: '100%',  // Adjust the width as needed
    maxHeight: 150, // Set a maximum height
  },
});

export default ForgotPasswordScreen;
