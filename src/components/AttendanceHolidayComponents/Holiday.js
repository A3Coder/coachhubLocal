import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import { Calendar, LocaleConfig } from 'react-native-calendars'

//Components
import HolidayList from './HolidayList'

const Holiday = ({formattedHolidays}) => {
    return (
        <>
            <Text style={{ marginTop: 20, fontSize: 20, fontWeight: 500 }}>List of Holiday</Text>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {
                    formattedHolidays.map((item, index) => {
                        return (<HolidayList key={index} date={item.date} dayName={item.dayName} holidayName={item.holidayName}></HolidayList>)
                    })
                }
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        height: '100%',
    },
});


export default Holiday