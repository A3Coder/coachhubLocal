import { View, Text, Image, StyleSheet, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Attendance_FeesDue({ icon, data, desc, bgColor }) {
  const navigation = useNavigation()
  const onTap = () => {
    if(desc == 'Attendance'){
      navigation.navigate('AttendanceHoliday')
    } else {
      console.log(desc)
    }
  }

  return (
    <TouchableNativeFeedback onPress={onTap} background={TouchableNativeFeedback.Ripple(bgColor, false, 75)}>
      <View style={styles.container}>
        <View style={[styles.circleContainer, { backgroundColor: bgColor }]}>
          <Image source={icon} style={styles.icon} />
        </View>
        <Text style={styles.text}>{data}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

//StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: 'white',
    padding: 13,
    borderWidth: 1,
    borderColor: '#4477BB',
    borderRadius: 13,
  },
  circleContainer: {
    flex: 1,
    marginBottom: 7,
    padding: 7,
    width: 70,
    height: 70,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '65%',
    height: '65%',
    resizeMode: 'contain',
  },
  text: {
    fontSize: 33,
    fontWeight: '900',
  },
  desc: {
    fontSize: 16,
    fontWeight: '500',
    color: 'grey',
  },
});