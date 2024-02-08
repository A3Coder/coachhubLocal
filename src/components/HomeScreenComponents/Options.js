import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Options({ icon, desc }) {
    const navigation = useNavigation()

    const onTap = () => {
        console.log(desc)
        if(desc == 'Coaching Gallery'){
            navigation.navigate('CoachingGallery')
        }
        if(desc == 'Time Table'){
            navigation.navigate('Timetable')
        }
        if(desc == 'Result'){
            navigation.navigate('Result')
        }
        if (desc == 'Play Quiz'){
            navigation.navigate('Quiz')
        }
    }

    return (
        <TouchableHighlight
            style={[styles.container]}
            activeOpacity={0.8}
            underlayColor={'white'}
            onPress={onTap}
        >
            <View style={styles.touchableHighlight}>
                <View style={styles.circleContainer}>
                    <Image source={icon} style={styles.icon} />
                </View>
                <Text style={styles.text}>{desc}</Text>
            </View>
        </TouchableHighlight>
    );
}

//StyleSheet
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F6FC',
        padding: 13,
        borderRadius: 13,
    },
    touchableHighlight: {
        flex: 1,
        gap: 7,
    },
    circleContainer: {
        flex: 1,
        marginBottom: 7,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain',
    },
    text: {
        fontSize: 20,
        fontWeight: '400',
        color: 'black',
    },
});