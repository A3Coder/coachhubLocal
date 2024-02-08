import { View, Text, Image, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Calendar, LocaleConfig } from 'react-native-calendars'

//Components
import Attendance from '../../components/AttendanceHolidayComponents/Attendance'
import Holiday from '../../components/AttendanceHolidayComponents/Holiday'

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan'

//Assets
import Logo from '../../assets/images/bottomvector.png';

const AttendanceHolidayScreen = () => {
    const navigate = useNavigation()

    //Variables
    const [active, setActive] = useState('Attendance')
    const [selected, setSelected] = useState('');

    const date = new Date()
    //Logic for Disabling Arrow Buttons in Calendar
    const [minMonth, setMinMonth] = useState(new Date())
    const [maxMonth, setMaxMonth] = useState(new Date())
    const isMinMonth = minMonth.getFullYear() == date.getFullYear() && minMonth.getMonth() == 0 ? true : false
    const isMaxMonth = maxMonth.getFullYear() == date.getFullYear() && maxMonth.getMonth() == 11 ? true : false
    //Logic for Disabling Arrow Buttons in Calendar - End Here

    //Logic for Calculating Sundays
    const [thisMonth, setThisMonth] = useState(new Date())
    const calculateSunday = () => {
        const currentDate = new Date()
        const firstDayofMonth = new Date(currentDate.getFullYear(), thisMonth.getMonth(), 2)
        const lastDayofMonth = new Date(currentDate.getFullYear(), thisMonth.getMonth() + 1, 1)

        var sundays = []
        for (let date = new Date(firstDayofMonth); date <= lastDayofMonth; date.setDate(date.getDate() + 1)) {
            if (date.getDay() == 1) {
                sundays.push(new Date(date))
            }
        }
        return sundays
    }
    const sundays = calculateSunday()
    //Logic for Calculating Sundays - End Here

    //Logic for Calculating Holidays (Should be Done via Backend)
    const holidays = [
        { date: "2024-04-01", name: 'Diwali' },
        { date: "2024-04-20", name: 'Govardhan Puja' },
        { date: "2024-03-23", name: 'Bhaiya Dooj' },
        { date: "2024-03-29", name: 'Eid-ul-fitr' },
        { date: "2024-04-29", name: 'Eid-ul-adha' }
    ]

    markedHolidays = {}
    holidays.forEach((obj) => {
        markedHolidays[obj.date] = { selected: true, selectedColor: 'green', disableTouchEvent: true }
    })
    //Logic for Calculating Holidays - End Here

    //Logic for Calculating Absent (Should be Done via Backend)
    const absent = [
        { date: "2024-03-08" },
        { date: "2024-03-21" },
        { date: "2024-04-23" },
        // { date: "2024-04-29" }
    ]

    markedAbsent = {}
    if (active == 'Attendance') {
        absent.forEach((obj) => {
            markedAbsent[obj.date] = { selected: true, selectedColor: 'red', disableTouchEvent: true }
        })
    }
    //Logic for Calculating Absent - End Here

    //Total Holidays in Each Month
    const totalHoliday = (thisMonth) => {
        var count = 0
        holidays.forEach((obj) => {
            var currentHoliday = new Date(obj.date)
            if (currentHoliday.getMonth() == thisMonth.getMonth()) {
                count = count + 1
            }
        })
        return count
    }
    var countHoliday = totalHoliday(thisMonth)
    //Total Holidays in Each Month

    //Logic for Total Absents in Each Month
    const totalAbsent = (thisMonth) => {
        var count = 0
        absent.forEach((obj) => {
            var currentHoliday = new Date(obj.date)
            if (currentHoliday.getMonth() == thisMonth.getMonth()) {
                count = count + 1
            }
        })
        return count
    }
    var countAbsent = totalAbsent(thisMonth)
    //Total Absents in Each Month - End Here

    //Logic for formatting Holiday Date
    //Total Holidays in Each Month
    const formatHoliday = (thisMonth) => {
        var array = []
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const dayNames = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ]
        holidays.forEach((obj) => {
            var object = {}
            var currentHoliday = new Date(obj.date)
            if (currentHoliday.getMonth() == thisMonth.getMonth()) {
                // Get day, month components from the Date object
                const monthIndex = currentHoliday.getMonth();
                const monthName = monthNames[monthIndex]

                var day = ``;
                if (currentHoliday.getDate() >= 11 && currentHoliday.getDate() <= 13) {
                    day = `${currentHoliday.getDate()}th`;
                } else {
                    switch (currentHoliday.getUTCDate() % 10) {
                        case 1:
                            day = `${currentHoliday.getUTCDate()}st`;
                            break
                        case 2:
                            day = `${currentHoliday.getDate()}nd`;
                            break
                        case 3:
                            day = `${currentHoliday.getDate()}rd`;
                            break
                        default:
                            day = `${currentHoliday.getDate()}th`;
                            break
                    }
                }
                object.date = `${day} ${monthName}`

                const dayName = dayNames[currentHoliday.getDay()]
                object.dayName = dayName
                object.holidayName = obj.name
                array.push(object)
            }
        })
        return array
    }
    var formattedHolidays = formatHoliday(thisMonth)
    //Logic for Formatting Holiday Date - End Here

    return (
        <>
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <TouchableWithoutFeedback onPress={() => { navigate.goBack() }}>
                        <View>
                            <FontAwesomeIcon size={20} style={styles.headerIcon} icon={faLessThan}></FontAwesomeIcon>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableHighlight activeOpacity={0.7} underlayColor={'#4477BB'} style={{ borderRadius: 50, width: '85%', alignItems: 'center' }} onPress={() => { active == 'Attendance' ? setActive('Holiday') : setActive('Attendance') }}>
                        <View style={{ width: '57%', backgroundColor: '#C3D0EA', flexDirection: 'row', gap: 7, alignItems: 'center', justifyContent: 'center', borderRadius: 50, overflow: 'hidden' }}>
                            <View style={active == 'Attendance' ? { backgroundColor: 'white', paddingHorizontal: 13, paddingVertical: 4, borderRadius: 50, } : { paddingLeft: 10 }}>
                                <Text style={active == 'Attendance' ? { fontWeight: 900, color: '#4477BB' } : { fontWeight: 900, color: 'white' }}>ATTENDANCE</Text>
                            </View>
                            <View style={active == 'Holiday' ? { backgroundColor: 'white', paddingHorizontal: 13, paddingVertical: 4, borderRadius: 50, } : { paddingRight: 10 }}>
                                <Text style={active == 'Holiday' ? { fontWeight: 900, color: '#4477BB' } : { fontWeight: 900, color: 'white' }}>HOLIDAY</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>

            <View style={styles.contentContainer}>
                <View style={{ padding: 15 }}>
                    <Calendar
                        onDayPress={day => {
                            // setSelected(day.dateString);
                        }}
                        markedDates={
                            {
                                // [selected]: { selected: true, disableTouchEvent: true, selectedColor: 'orange'},
                                [`${sundays[0].getFullYear()}-${String(sundays[0].getMonth() + 1).padStart(2, 0)}-${String(sundays[0].getUTCDate()).padStart(2, 0)}`]: { selected: true, selectedColor: '#C3D0EA', disableTouchEvent: true },
                                [`${sundays[1].getFullYear()}-${String(sundays[1].getMonth() + 1).padStart(2, 0)}-${String(sundays[1].getUTCDate()).padStart(2, 0)}`]: { selected: true, selectedColor: '#C3D0EA', disableTouchEvent: true },
                                [`${sundays[2].getFullYear()}-${String(sundays[2].getMonth() + 1).padStart(2, 0)}-${String(sundays[2].getUTCDate()).padStart(2, 0)}`]: { selected: true, selectedColor: '#C3D0EA', disableTouchEvent: true },
                                [`${sundays[3].getFullYear()}-${String(sundays[3].getMonth() + 1).padStart(2, 0)}-${String(sundays[3].getUTCDate()).padStart(2, 0)}`]: { selected: true, selectedColor: '#C3D0EA', disableTouchEvent: true },
                                [sundays[4] != undefined ? `${sundays[4].getFullYear()}-${String(sundays[4].getUTCMonth() + 1).padStart(2, 0)}-${String(sundays[4].getUTCDate()).padStart(2, 0)}` : `${sundays[3].getFullYear()}-${String(sundays[3].getMonth() + 1).padStart(2, 0)}-${String(sundays[3].getDate() - 1).padStart(2, 0)}`]: { selected: true, selectedColor: '#C3D0EA', disableTouchEvent: true },

                                //Holidays
                                ...markedHolidays,

                                //Absents
                                ...markedAbsent
                            }
                        }
                        firstDay={1}
                        onMonthChange={(date) => { setMinMonth(new Date(date.dateString)); setMaxMonth(new Date(date.dateString)); setThisMonth(new Date(date.dateString)); calculateSunday(); totalHoliday(thisMonth); totalAbsent(thisMonth) }}
                        disableArrowLeft={isMinMonth}
                        disableArrowRight={isMaxMonth}
                    />

                    {active == "Attendance" ? (<Attendance countAbsent={countAbsent} countHoliday={countHoliday}></Attendance>) : (<Holiday formattedHolidays={formattedHolidays}></Holiday>)}

                </View>
                <View style={styles.logoContainer}>
                    <Image source={Logo} style={styles.logo} resizeMode='cover'></Image>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 15,
        marginBottom: 40,
    },
    headerLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerIcon: {
        color: 'white',
        fontWeight: '600',
    },
    headerText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '600',
    },
    contentContainer: {
        height: '100%',
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // padding: 15,
    },
    scrollView: {
        height: '100%',
    },
    logoContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: -1
    },
    logo: {
        width: '100%',  // Adjust the width as needed
        maxHeight: 150, // Set a maximum height
    },
});

export default AttendanceHolidayScreen