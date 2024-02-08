import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';


const SocialSignInButton = () => {
    const GoogleIcon = <Entypo name="google--with-circle" size={28} color="#3B71F3" />;
    const FacebookIcon = <Ionicons name="logo-facebook" size={25} color="#3B71F3"/>;

    const onSignInFacebook=()=>{
        console.warn("onSignInFacebook")
      }
    
      const onSignInGoogle=()=>{
        console.warn("onSignInGoogle")
      }

  return (
    <>
      <CustomButton 
     text="Sign In with Facebook" 
     onPress={onSignInFacebook} 
     bgColor="#E7EAF4"
     fgColor="#4765A9"
     Icon={FacebookIcon} 
     />
    <CustomButton 
     text="Sign In with Google" 
     onPress={onSignInGoogle} 
     bgColor="#E7EAF4"
     fgColor="#de4551" 
     Icon={GoogleIcon}
     />
    </>
  )
}

export default SocialSignInButton