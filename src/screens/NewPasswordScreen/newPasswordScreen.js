import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,

  ScrollView

} from 'react-native'


import CustomInput from '../../components/CustomeInput/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import Logo from '../../assets/images/bottomvector.png';


const NewPasswordScreen = () => {

  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, watch } = useForm();
  const Navigation = useNavigation();

  const onSubmitPressed = () => {
    Navigation.navigate('home')
  };
  const onSignInpress = () => {
    Navigation.navigate('SignIn')
  };


  return (

    <View style={styles.container}>
      <View style={styles.section1_Container}>
        <View style={styles.section1}>
          <Text style={styles.title}>Reset your password</Text>

          <CustomInput
            placeholder='Enter your confirmation code'
            name='code'
            control={control}
            rules={{
              required: 'code is required',
              numPattern: true
            }}
            maxLength={6}
          />
          <CustomInput
            name="password"
            placeholder="Enter a new password"
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
          <CustomButton
            text="Submit"
            onPress={handleSubmit(onSubmitPressed)}

          />

          <CustomButton
            text='Back to Sign in'
            onPress={onSignInpress}
            type='TERTIARY2'
          />
        </View>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} resizeMode='contain' />
        </View>
      </View>
    </View>

  )
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor:'red'
  },
  section1_Container: {

    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 40,
  },
  // blackSection: {
  //   flex: 1,
  //   backgroundColor: 'black',
  // },

  section1: {
    padding: 20,
    flex: 1,
    // justifyContent:'center',
    // alignItems:'center'
  },

  logoContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

  },
  logo: {
    width: '100%',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },

})
export default NewPasswordScreen