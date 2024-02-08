import { View, Text } from 'react-native'
import React from 'react'

const HolidayList = ({date, dayName, holidayName}) => {
    return (
        <View style={{ marginTop: 15, backgroundColor: 'white', height: 85, borderRadius: 13, borderWidth: 1, borderColor: 'grey', overflow: 'hidden' }}>
            <View style={{ width: '100%', height: '100%', padding: 13, justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 22, fontWeight: 900 }}>{holidayName}</Text>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 500, color: '#C3D0EA' }}>{date}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 500, color: '#C3D0EA' }}>{dayName}</Text>
                </View>
            </View>
        </View>
    )
}

export default HolidayList