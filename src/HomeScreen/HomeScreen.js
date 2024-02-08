import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

//Importing Components
import Attendance_FeesDue from '../components/HomeScreenComponents/Attendance_FeesDue'
import Options from '../components/HomeScreenComponents/Options'

//Importing Assets
import AttendanceIcon from '../assets/images/HomeScreen/attendanceIcon.png'
import FeesDueIcon from '../assets/images/HomeScreen/feesdueIcon.png'
import PlayQuizIcon from '../assets/images/HomeScreen/playquizIcon.png'
import AssignmentIcon from '../assets/images/HomeScreen/assignmentIcon.png'
import HolidayIcon from '../assets/images/HomeScreen/holidayIcon.png'
import TimeTableIcon from '../assets/images/HomeScreen/timetableIcon.png'
import ResultIcon from '../assets/images/HomeScreen/resultIcon.png'
import DateSheetIcon from '../assets/images/HomeScreen/datesheetIcon.png'
import DoubtsIcon from '../assets/images/HomeScreen/doubtsIcon.png'
import GalleryIcon from '../assets/images/HomeScreen/galleryIcon.png'
import LeaveIcon from '../assets/images/HomeScreen/leaveIcon.png'
import ChangePasswordIcon from '../assets/images/HomeScreen/changepasswordIcon.png'
import EventIcon from '../assets/images/HomeScreen/eventIcon.png'
import LogoutIcon from '../assets/images/HomeScreen/logoutIcon.png'


const Home = () => {
  const navigation = useNavigation()

  const tapProfile = () => {
    console.log("Profile")
    navigation.navigate("Profile")
  }

  return (
    <>
      <View style={styles.mainContainer}>
      </View>

      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.greetingContainer}>
          <View style={styles.userInfoContainer}>
            <Text style={{ color: 'white', fontSize: 30, fontWeight: 700, marginBottom: 10 }}>Hi Md Abdul</Text>
            <Text style={{ color: '#C3D0EA', fontSize: 16, fontWeight: 500, marginBottom: 10 }}>Class XI-B | Roll No: 04</Text>
            <View style={{ flex: 1, backgroundColor: 'transparent', }}>
              <Text style={{ width: '40%', backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 7, borderRadius: 50, textAlign: 'center', color: '#4477BB', fontSize: 15, fontWeight: 700 }}>2024-2025</Text>
            </View>
          </View>
          <TouchableOpacity onPress={tapProfile} activeOpacity={0.7} style={styles.userImageContainer}>

            <View style={styles.userImage}>
              {/* Insert Image Here */}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.statContainer}>
          <View style={{ width: '48%' }}>
            <Attendance_FeesDue icon={AttendanceIcon} data='80.39%' desc='Attendance' bgColor='#FCF3E2'></Attendance_FeesDue>
          </View>
          <View style={{ width: '48%' }}>
            <Attendance_FeesDue icon={FeesDueIcon} data='Rs. 6400' desc='Fees Due' bgColor='#FFD8FF'></Attendance_FeesDue>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={PlayQuizIcon} desc={'Play Quiz'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={AssignmentIcon} desc={'Assignment'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={HolidayIcon} desc={'Coaching Holiday'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={TimeTableIcon} desc={'Time Table'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={ResultIcon} desc={'Result'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={DateSheetIcon} desc={'Date Sheet'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={DoubtsIcon} desc={'Ask Doubts'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={GalleryIcon} desc={'Coaching Gallery'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={LeaveIcon} desc={'Leave Application'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={ChangePasswordIcon} desc={'Change Password'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={EventIcon} desc={'Events'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={LogoutIcon} desc={'Logout'}></Options>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 265,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  scrollViewContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 1,
    flex: 1,
    paddingHorizontal: 15,
  },
  greetingContainer: {
    marginTop: 50,
    marginBottom: 20,
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfoContainer: {
    flex: 2,
  },
  userImageContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    width: '80%',
    height: '80%',
    backgroundColor: 'grey',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 50,
  },
  statContainer: {
    marginBottom: 15,
    flex: 1,
    flexDirection: 'row',
    rowGap: 14,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default Home