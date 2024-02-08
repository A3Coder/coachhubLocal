import { View, Text, Image, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import LinearGradient from 'react-native-linear-gradient'

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons/faShareNodes'

//Importing Assets
import StarIcon from '../../assets/images/ResultScreen/star.png'
import Logo from '../../assets/images/bottomvector.png';
import PDFIcon from '../../assets/images/ResultScreen/pdfIcon.png'

const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get('window').height

const ResultScreen = () => {
    const navigate = useNavigation()

    const calculateGrade = (totalMarks, marksObtained) => {
        var percentage = (marksObtained / totalMarks) * 100

        if (percentage >= 91 && percentage <= 100) {
            return 'AA'
        } else if (percentage >= 81 && percentage <= 90) {
            return 'A'
        } else if (percentage >= 71 && percentage <= 80) {
            return 'B'
        } else if (percentage >= 61 && percentage <= 70) {
            return 'C'
        } else if (percentage >= 51 && percentage <= 60) {
            return 'D'
        } else {
            return 'F'
        }
    }

    //Dummy Result Data (Should be fetched from Backend)
    const resultData = [
        {
            subject: 'English',
            totalMarks: 100,
            marksObtained: 74,
            grade: calculateGrade(100, 74)
        },
        {
            subject: 'Hindi',
            totalMarks: 100,
            marksObtained: 87,
            grade: calculateGrade(100, 87)
        },
        {
            subject: 'Science',
            totalMarks: 100,
            marksObtained: 74,
            grade: calculateGrade(100, 74)
        },
        {
            subject: 'Math',
            totalMarks: 100,
            marksObtained: 87,
            grade: calculateGrade(100, 87)
        },
        {
            subject: 'Social Study',
            totalMarks: 100,
            marksObtained: 89,
            grade: calculateGrade(100, 89)
        },
        {
            subject: 'Drawing',
            totalMarks: 100,
            marksObtained: 78,
            grade: calculateGrade(100, 78)
        },
        {
            subject: 'Computer',
            totalMarks: 100,
            marksObtained: 96,
            grade: calculateGrade(100, 96)
        }
    ]

    return (
        <>
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <TouchableWithoutFeedback onPress={() => { navigate.goBack() }}>
                        <View>
                            <FontAwesomeIcon size={20} style={styles.headerIcon} icon={faLessThan}></FontAwesomeIcon>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableHighlight activeOpacity={0.7} onPress={() => console.log('Share')}>
                        <View>
                            <FontAwesomeIcon size={20} style={styles.headerIcon} icon={faShareNodes}></FontAwesomeIcon>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>

            <View style={{ width: '100%', height: ScreenHeight - 600, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ borderRadius: 100, borderWidth: 6, borderColor: 'rgba(0,0,0,0.13)', position: 'relative', bottom: 28 }}>
                    <LinearGradient
                        colors={['#FFFFFF', '#656565', '#C9C9C9']}
                        style={{ width: 135, height: 135, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}
                    >
                        <View style={{ width: '85%', height: '85%', borderRadius: 100, backgroundColor: '#C2D7F2', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 900, color: 'black' }}>85%</Text>
                            <Text style={{ fontSize: 18, fontWeight: 900, color: 'black' }}>GRADE A</Text>
                        </View>
                    </LinearGradient>
                </View>
                <Image source={StarIcon} resizeMode='contain' style={{ position: 'relative', bottom: 73, right: 45 }}></Image>
            </View>

            <View style={styles.contentContainer}>
                <View style={{ padding: 15, height: '100%' }}>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 900, color: 'black' }}>You are Excellent,</Text>
                        <Text style={{ fontSize: 30, fontWeight: 900, color: 'black' }}>MD AMIR!!</Text>
                    </View>
                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                        <View style={{ marginVertical: 20, borderWidth: 1, borderColor: '#C3D0EA', borderRadius: 20, flexDirection: 'row', overflow: 'hidden' }}>
                            <View style={{ backgroundColor: 'white', opacity: 0.7, padding: 14, width: '50%', gap: 8, }}>
                                {
                                    resultData.map((item, index) => (
                                        <Text key={index} style={{ fontSize: 16, color: 'black' }}>{item.subject}</Text>
                                    ))
                                }
                            </View>
                            <View style={{ padding: 14, width: '25%', backgroundColor: 'rgba(230, 239, 255, 1)', alignItems: 'center', gap: 8, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                                {
                                    resultData.map((item, index) => (
                                        <Text key={index} style={{ fontSize: 16, color: 'black' }}>{item.totalMarks}</Text>
                                    ))
                                }
                            </View>
                            <View style={{ padding: 14, width: '25%', backgroundColor: 'rgba(106, 194, 89, 0.1)', alignItems: 'center', gap: 8, }}>
                                {
                                    resultData.map((item, index) => (
                                        <Text key={index} style={{ fontSize: 16, fontWeight: 900, color: 'black' }}>{item.marksObtained} - {item.grade}</Text>
                                    ))
                                }
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => console.log('Download PDF')}>
                            <LinearGradient
                                colors={['#2855AE', '#7292CF']}
                                style={{ width: 217, justifyContent: 'center', alignItems: 'center', borderRadius: 13, alignSelf: 'center', paddingHorizontal: 15, paddingVertical: 12, flexDirection: 'row', gap: 8, }}
                            >
                                <Text style={{ fontSize: 16, fontWeight: 900, color: 'white' }}>DOWNLOAD PDF</Text>
                                <View>
                                    <Image source={PDFIcon} resizeMode='contain'></Image>
                                </View>
                                {/* <View style={{ width: '85%', height: '85%', borderRadius: 100, backgroundColor: '#C2D7F2', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 900, color: 'black' }}>85%</Text>
                            <Text style={{ fontSize: 18, fontWeight: 900, color: 'black' }}>GRADE A</Text>
                        </View> */}
                            </LinearGradient>
                        </TouchableOpacity>
                    </ScrollView>
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
        paddingHorizontal: 18,
        marginTop: 15,
        marginBottom: 40,
    },
    headerLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // gap: 12,
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

export default ResultScreen