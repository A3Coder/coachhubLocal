import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import { Calendar, LocaleConfig } from 'react-native-calendars'

const Attendance = ({countAbsent, countHoliday}) => {
    return (
        <>


            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <View style={{ marginTop: 20, backgroundColor: '#E92020', height: 60, borderRadius: 13, borderWidth: 2, borderColor: '#E92020', overflow: 'hidden' }}>
                    <View style={{ backgroundColor: 'white', width: '95%', alignSelf: 'flex-end', height: '100%', padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 500 }}>Absent</Text>
                        <View style={{ width: 35, height: 35, backgroundColor: '#FFB1B1', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 900, color: '#E92020' }}>{String(countAbsent).padStart(2, 0)}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 10, backgroundColor: '#0BAC00', height: 60, borderRadius: 13, borderWidth: 2, borderColor: '#0BAC00', overflow: 'hidden' }}>
                    <View style={{ backgroundColor: 'white', width: '95%', alignSelf: 'flex-end', height: '100%', padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 500 }}>Festive & Holidays</Text>
                        <View style={{ width: 35, height: 35, backgroundColor: '#A9F2A4', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 900, color: '#0BAC00' }}>{String(countHoliday).padStart(2, 0)}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        height: '100%',
    },
});


export default Attendance