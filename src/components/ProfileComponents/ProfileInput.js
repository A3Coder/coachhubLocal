import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

//Importing FontAwesome
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const ProfileInput = ({ heading, value, isLock }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>{heading}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor="black"
          value={value}
          editable={isLock ? false : true}
          // onChangeText={(text) => {
          //     const maxLength = getMaxLength();
          //     if (isPassword && text.length > maxLength) {
          //         return; // Skip setting value for password beyond max length
          //     }
          //     onChange(text);
          // }}
          style={styles.input}
        // keyboardType={rules.numPattern ? 'numeric' : 'default'}
        />
        {isLock && (<FontAwesomeIcon color='#C3D0EA' size={15} icon={faLock}></FontAwesomeIcon>)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 5,
    justifyContent: 'center',
  },
  headingText: {
    color: '#4477BB',
    fontSize: 18,
    fontWeight: '600',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e8e8e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: 'black',
  }
});

export default ProfileInput