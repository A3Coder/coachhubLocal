import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity, ScrollView, StyleSheet, Dimensions, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated'

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan'
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock'
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { faCircleDot } from '@fortawesome/free-solid-svg-icons/faCircleDot'

const QuizScreen = () => {
  const navigation = useNavigation()

  //Variables for Animation
  const DURATION = 15 * 1000 //15 Secs
  const [timer, setTimer] = useState(DURATION / 1000)

  const timeDecrease = () => {
    setTimer(prevTime => prevTime - 1)
  }

  const width = useSharedValue(15) //width starting from 15%
  const animatedStyles = useAnimatedStyle(() => (
    { width: `${width.value}%` }
  ))

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

  const [score, setscore] = useState(0)
  const [right, setright] = useState(0)
  const [wrong, setwrong] = useState(0)
  const [attempted, setattempted] = useState(0)

  const [quizEnd, setQuizEnd] = useState(false)

  //Logic for Handling Quiz Options and Question
  const handleOptionPress = (item, index) => {
    if (count < 1) {
      setAnswer(item)
      setattempted(prevValue => prevValue + 1)
      if (item != quizz[currQuestion].correct) {
        setwrong(prevValue => prevValue + 1)
        setcorrectAnswer(quizz[currQuestion].correct)
      } else {
        setright(prevValue => prevValue + 1)
        setscore(prevValue => prevValue + 10)
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
      setQuizEnd(true)
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

  const handleOKpress = () => {
    console.log('OK Pressed')
    navigation.navigate('home')
  }

  const stopAnimation = () => {

  }
  //Logic for Handling Quiz Options and Question - Ends Here

  useEffect(() => {
    const intervalId = setInterval(timeDecrease, 1000)
    width.value = withTiming(100, { duration: DURATION })

    setTimeout(() => {
      clearInterval(intervalId)
      setQuizEnd(true)
      console.log('End Reached') //From here we can add Quiz End Logic
    }, DURATION)
  }, [])

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
            <Animated.View style={[animatedStyles, { height: 35, backgroundColor: '#46D9BF', borderRadius: 50, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }]}></Animated.View>
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

          {
            !quizEnd && (
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
            )
          }

          {
            quizEnd && (
              <View>
                <View style={{ padding: 15, backgroundColor: 'white', borderRadius: 20, width: '100%' }}>
                  <Text style={{ marginBottom: 10, fontSize: 30, fontWeight: 900, color: '#4477BB', alignSelf: 'center' }}>Quiz Completed!!!</Text>

                  <View style={{ alignSelf: 'center', marginBottom: 10, width: 175, height: 175, borderRadius: 100, backgroundColor: '#4477BB', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '80%', height: '80%', borderRadius: 100, backgroundColor: 'white', opacity: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                      <View style={{ width: '90%', height: '90%', borderRadius: 100, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, color: '#4477BB', fontWeight: 900 }}>Your Score</Text>
                        <Text style={{ fontSize: 35, color: '#4477BB', fontWeight: 900 }}>{score}pts</Text>
                      </View>
                    </View>
                  </View>

                  <View style={{ width: '100%', gap: 13 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'row', width: '50%', gap: 8 }}>
                        <View style={{ paddingTop: 5 }}><FontAwesomeIcon icon={faCircleDot} color='#4477BB' /></View>
                        <View>
                          <Text style={{ fontSize: 23, color: '#4477BB', fontWeight: 700 }}>{attempted}</Text>
                          <Text style={{ fontSize: 20, color: 'black' }}>Attempted</Text>
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', width: '50%', gap: 8 }}>
                        <View style={{ paddingTop: 5 }}><FontAwesomeIcon icon={faCircleDot} color='#4477BB' /></View>
                        <View>
                          <Text style={{ fontSize: 23, color: '#4477BB', fontWeight: 700 }}>{quizz.length}</Text>
                          <Text style={{ fontSize: 20, color: 'black' }}>Total Question</Text>
                        </View>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'row', width: '50%', gap: 4 }}>
                        <View ><FontAwesomeIcon size={20} icon={faCheck} color='#6AC259' /></View>
                        <View>
                          <Text style={{ fontSize: 23, color: '#6AC259', fontWeight: 700 }}>{right}</Text>
                          <Text style={{ fontSize: 20, color: 'black' }}>Correct</Text>
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', width: '50%', gap: 4 }}>
                        <View ><FontAwesomeIcon icon={faXmark} size={20} color='red' /></View>
                        <View>
                          <Text style={{ fontSize: 23, color: 'red', fontWeight: 700 }}>{wrong}</Text>
                          <Text style={{ fontSize: 20, color: 'black' }}>Wrong</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity onPress={handleOKpress} activeOpacity={0.8}>
                    <View style={{ marginTop: 15, width: '100%', padding: 5, backgroundColor: '#4477BB', borderRadius: 10 }}>
                      <Text style={{ fontSize: 30, textAlign: 'center', color: 'white', fontWeight: 900 }}>OK</Text>
                    </View>
                  </TouchableOpacity>

                  <View style={{ padding: 15, backgroundColor: 'white', borderRadius: 20, width: '98%', alignSelf: 'center', height: '110%', position: 'absolute', zIndex: -1, opacity: 0.7 }}>
                  </View>

                  <View style={{ padding: 15, backgroundColor: 'white', borderRadius: 20, width: '88%', alignSelf: 'center', height: '112%', position: 'absolute', zIndex: -2, opacity: 0.4 }}>
                  </View>
                </View>
              </View>
            )
          }
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