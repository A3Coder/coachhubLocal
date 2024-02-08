import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity, ScrollView, StyleSheet, Animated, Dimensions, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan'
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock'
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'

//Importing Components
import QuizOptions from '../../components/QuizComponents/QuizOptions'

const QuizScreen = () => {
  const navigation = useNavigation()

  //Variables
  const [wrongAnswer, setwrongAnswer] = useState(true)
  const [rightAnswer, setrightAnswer] = useState(true)
  const widthScale = new Animated.Value(0);
  const [timer, setTimer] = useState(10);

  //Dummy Data for Quiz - (Should be fetched from Backend)
  const quizz = [
    {
      ques: `In 2017, which player become the leading run scorer of all tie in women's ODI cricket?`,
      option: [
        'A. Stefanie Taylor', 'B. Mithali Raj', 'C. Suzia Betes', 'D. Harmanpreet Kaur'
      ],
      correct: 'B. Mithali Raj'
    },
    {
      ques: `What is the Capital of India?`,
      option: [
        'A. First Letter I', 'B. Delhi', 'C. Kolkata', 'D. Last Letter A'
      ],
      correct: 'B. Delhi'
    },
    {
      ques: `What is your Daddy's Name?`,
      option: [
        'A. Aasif Ali Aadil', 'B. Aasif', 'C. Md. Aasif', 'D. Md. Aasif Ali Aadil'
      ],
      correct: 'D. Md. Aasif Ali Aadil'
    }
  ]

  //Variables for Quiz Control
  const [currQuestion, setcurrQuestion] = useState(0)
  const [answer, setAnswer] = useState(null)
  const [correctAnswer, setcorrectAnswer] = useState(null)
  const [count, setCount] = useState(0) //To Track only one time Answer

  //Logic for Handling Quiz Options and Question
  const handleOptionPress = (item, index) => {
    if (count < 1) {
      setAnswer(item)
      if (item != quizz[currQuestion].correct) {
        setcorrectAnswer(quizz[currQuestion].correct)
      }
    } else {
      console.log('You Already Answered')
      return
    }
    setCount(prevValue => prevValue + 1)

    if (currQuestion < quizz.length - 1) {
      //Go to Next Question
      setTimeout(() => {
        setcurrQuestion(prevQues => prevQues + 1)
        setCount(0)
      }, 500)
    } else {
      console.log("You are at the Last Question")
    }
  }

  const handleSkipQuestion = () => {
    if (currQuestion < quizz.length - 1) {
      setcorrectAnswer(quizz[currQuestion].correct) //Remove this code if you don't want to show answer after Tapping Skip
      //Go to Next Question
      setTimeout(() => {
        setcurrQuestion(prevQues => prevQues + 1)
        setCount(0)
      }, 500)
    } else {
      setcorrectAnswer(quizz[currQuestion].correct) //Remove this code if you don't want to show answer after Tapping Skip
      console.log("Quiz Completed")
    }
  }
  //Logic for Handling Quiz Options and Question - Ends Here

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
            <View>
              <FontAwesomeIcon size={20} style={styles.headerIcon} icon={faLessThan}></FontAwesomeIcon>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.headerText}>Timetable</Text>
        </View>
        <TouchableWithoutFeedback onPress={handleSkipQuestion}>
          <Text style={styles.headerText}>{currQuestion < quizz.length - 1 ? "Skip" : ''}</Text>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.contentContainer}>
        <View style={{ padding: 15 }}>
          <View style={{ width: '100%', backgroundColor: '#05518B', borderRadius: 20, padding: 3, justifyContent: 'center', overflow: 'hidden' }}>
            <Text style={{ position: 'absolute', left: 15, zIndex: 1, color: 'white', fontSize: 15, fontWeight: 900 }}>{timer} Sec</Text>
            <FontAwesomeIcon size={20} style={{ position: 'absolute', right: 10, zIndex: 1, color: 'white', fontSize: 15, fontWeight: 900 }} icon={faClock}></FontAwesomeIcon>
            {/* <Text style={{ position: 'absolute', right: 8, zIndex: 1, color: 'white', fontSize: 15, fontWeight: 900 }}>Time</Text> */}
            <Animated.View style={{ transform: [{ scaleX: widthScale }], height: 35, backgroundColor: '#46D9BF', borderRadius: 50, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}></Animated.View>
          </View>

          <View style={{ marginTop: 25, marginBottom: 30, paddingBottom: 15, borderBottomWidth: 1, borderColor: 'white', borderStyle: 'dashed', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ color: 'white', fontSize: 30 }}>Question {currQuestion + 1} <Text style={{ color: 'white', fontSize: 22 }}>/{quizz.length}</Text></Text>
            </View>
            <View style={{ backgroundColor: '#FFFFFF1F', paddingHorizontal: 20, paddingVertical: 6, borderRadius: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
              <FontAwesomeIcon size={20} icon={faUsers} color='white'></FontAwesomeIcon>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 900 }}>265</Text>
            </View>
          </View>

          <View style={{ height: 480 }}>
            <View style={{ padding: 15, backgroundColor: 'white', borderRadius: 20, width: '100%' }}>
              <Text style={{ marginBottom: 18, fontSize: 22, fontWeight: 900 }}>{quizz[currQuestion].ques}</Text>

              <ScrollView showsVerticalScrollIndicator={false} style={{ height: 325 }}>
                <View style={{ gap: 15, height: '100%' }}>
                  {
                    quizz[currQuestion].option.map((item, index) => (
                      <TouchableOpacity key={index} onPress={() => handleOptionPress(item, index)} activeOpacity={0.6} style={[answer === item ? item === quizz[currQuestion].correct ? { backgroundColor: '#6AC2591A', borderColor: '#6AC259' } : { backgroundColor: '#E92E301A', borderColor: '#E92E30' } : correctAnswer === item ? { backgroundColor: '#6AC2591A', borderColor: '#6AC259' } : { borderColor: 'grey' }, { width: '100%', paddingHorizontal: 10, paddingVertical: 20, borderWidth: 1, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <Text style={[answer === item ? item === quizz[currQuestion].correct ? { color: '#6AC259' } : { color: '#E92E30' } : correctAnswer === item ? { color: '#6AC259' } : { color: 'grey' }, { marginLeft: 10, fontSize: 18, }]}>{item}</Text>
                        <View style={[answer === item ? item === quizz[currQuestion].correct ? { backgroundColor: '#6AC259', borderWidth: 0 } : { backgroundColor: 'red', borderWidth: 0 } : correctAnswer === item ? { backgroundColor: '#6AC259', borderWidth: 0 } : { borderWidth: 1 }, { width: 27, height: 27, borderWidth: 1, borderColor: 'grey', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }]}>
                          {
                            answer === item ? item === quizz[currQuestion].correct ? (<FontAwesomeIcon icon={faCheck} size={18} color='white'></FontAwesomeIcon>) : (<FontAwesomeIcon icon={faXmark} size={18} color='white'></FontAwesomeIcon>) : correctAnswer === item ? (<FontAwesomeIcon icon={faCheck} size={18} color='white'></FontAwesomeIcon>) : ''
                          }
                        </View>
                      </TouchableOpacity>
                    ))
                  }
                </View>
              </ScrollView>
              <View style={{ padding: 15, backgroundColor: 'white', borderRadius: 20, width: '98%', alignSelf: 'center', height: '110%', position: 'absolute', zIndex: -1, opacity: 0.7 }}>
              </View>
              <View style={{ padding: 15, backgroundColor: 'white', borderRadius: 20, width: '88%', alignSelf: 'center', height: '112%', position: 'absolute', zIndex: -2, opacity: 0.4 }}>
              </View>
            </View>
          </View>
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
    gap: 8,
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

export default QuizScreen