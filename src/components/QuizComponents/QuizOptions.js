import { View, Text, Image, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity, ScrollView, StyleSheet, FlatList, Animated, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan'
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock'
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'

const QuizOptions = ({ option, options }) => {
    //Variables
    const [answer, setAnswer] = useState('')
    const [correctAnswer, setcorrectAnswer] = useState(options.correct)

    const handleOptionPress = () => {
            setAnswer(option)
            console.log(answer)
        // if (answer != options.correct) {        
        // }
    }

    return (
        <TouchableOpacity onPress={handleOptionPress} activeOpacity={0.6} style={[answer == options.correct ? { backgroundColor: '#6AC2591A', borderColor: '#6AC259' } : answer == "" ? { borderColor: 'grey' } : { backgroundColor: '#E92E301A', borderColor: '#E92E30' }, { width: '100%', paddingHorizontal: 10, paddingVertical: 20, borderWidth: 1, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={[answer == options.correct ? { color: '#6AC259' } : answer == "" ? { color: 'grey' } : { color: '#E92E30' }, { marginLeft: 10, fontSize: 18, }]}>{option}</Text>
            <View style={[answer == options.correct ? { backgroundColor: '#6AC259', borderWidth: 0 } : answer == "" ? { borderWidth: 1 } : { backgroundColor: 'red', borderWidth: 0 }, { width: 27, height: 27, borderWidth: 1, borderColor: 'grey', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }]}>
                {
                    answer === options.correct ? (<FontAwesomeIcon icon={faCheck} size={18} color='white'></FontAwesomeIcon>) : (<FontAwesomeIcon icon={faXmark} size={18} color='white'></FontAwesomeIcon>)
                }
            </View>
        </TouchableOpacity>
    )
}

export default QuizOptions