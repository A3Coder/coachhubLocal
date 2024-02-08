import { View, Text, Image, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan'

const CoachingGalleryScreen = () => {
    const navigation = useNavigation()

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://picsum.photos/v2/list');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();

                // Assuming the data from the API is an array
                const dataArray = Array.isArray(result) ? result : [result];



                // Set the data state
                var middleIndex = dataArray.length / 2
                setData(dataArray.slice(0, middleIndex));
                setData2(dataArray.slice(middleIndex, dataArray.length))

                // Do something with the array, for example, log it
            } catch (error) {
                console.error('Error fetching data:', error.message);
                // Handle the error or update the state accordingly
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, [])

    const renderItem = useCallback(({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ImageScreen', item)} activeOpacity={0.7} style={{ width: '100%', borderRadius: 13, overflow: 'hidden', marginBottom: 13 }}>
            <Image src={item.download_url} style={{ width: '100%', height: item.height / 15 }}></Image>
        </TouchableOpacity>
    ), [])

    const renderItem2 = useCallback(({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ImageScreen', item)} activeOpacity={0.7} style={{ width: '100%', borderRadius: 13, overflow: 'hidden', marginBottom: 13 }}>
            <Image src={item.download_url} style={{ width: '100%', height: item.height / 15 }}></Image>
        </TouchableOpacity>
    ), [])

    return (
        <>
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
                        <View>
                            <FontAwesomeIcon size={20} style={styles.headerIcon} icon={faLessThan}></FontAwesomeIcon>
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.headerText}>Coaching Gallery</Text>
                </View>
            </View>

            <View style={styles.contentContainer}>
                {/* <ScrollView style={styles.scrollView}> */}
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                    <View style={{ width: '48%', gap: 13 }}>
                        {/* {data.map((item, index) => 
                                (
                                    <TouchableOpacity onPress={() => navigation.navigate('ImageScreen', item)} activeOpacity={0.7} key={index} style={{ width: '100%', borderRadius: 13, overflow: 'hidden' }}>
                                        <Image src={item.download_url} style={{width: '100%', height: item.height / 15}}></Image>
                                    </TouchableOpacity>
                                )
                            )} */}
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                        ></FlatList>

                    </View>
                    <View style={{ width: '48%', gap: 13 }}>
                        {/* {data2.map((item, index) =>
                            (
                                <View key={index} style={{ width: '100%', borderRadius: 13, overflow: 'hidden' }}>
                                    <Image src={item.download_url} style={{ width: '100%', height: item.height / 15 }}></Image>
                                </View>
                            )
                            )} */}
                        <FlatList
                            data={data2}
                            renderItem={renderItem2}
                            showsVerticalScrollIndicator={false}
                        ></FlatList>
                    </View>
                </View>
                {/* </ScrollView> */}
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
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 15,
    },
    scrollView: {
        height: '100%',
    },
});

export default CoachingGalleryScreen