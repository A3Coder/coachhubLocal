import { View, Text, Image, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

//Import Components
import CustomInput from '../../components/CustomeInput/CustomInput'
import ProfileInput from '../../components/ProfileComponents/ProfileInput'

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera'

const ProfileScreen = () => {
    const [selectedImage, setSelectedImage] = React.useState(null);

    const handleImagePicker = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: true,
                maxHeight: 200,
                maxWidth: 200,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else {
                    // Update the state with the selected image URI
                    setSelectedImage({ uri: response.assets[0].uri });
                }
            },
        );
    };

    const tapDone = () => {
        console.log('DONE')
    }
    return (
        <>
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <TouchableWithoutFeedback>
                        <View>
                            <FontAwesomeIcon size={20} style={styles.headerIcon} icon={faLessThan}></FontAwesomeIcon>
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.headerText}>My Profile</Text>
                </View>
                <TouchableHighlight onPress={tapDone} underlayColor={'#C3D0EA'} activeOpacity={0.8} style={styles.doneButton}>
                    <View style={styles.doneButtonContent}>
                        <FontAwesomeIcon color='#4477BB' size={20} icon={faCheck}></FontAwesomeIcon>
                        <Text style={styles.doneButtonText}> DONE </Text>
                    </View>
                </TouchableHighlight>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.profileImageContainer}>
                    <View style={{ height: 100, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'center', backgroundColor: '#C3D0EA', height: '100%', width: '30%', borderRadius: 20, overflow: 'hidden' }}>
                            {selectedImage != null ? <Image source={{ uri: selectedImage.uri }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Text>IMAGE</Text>}
                        </View>
                        <View style={styles.profileDetailsContainer}>
                            <Text style={styles.profileName}>Md Abdul</Text>
                            <Text style={styles.profileInfo}>Class XI-B | Roll no: 04</Text>
                        </View>

                        <TouchableOpacity onPress={handleImagePicker} activeOpacity={0.7} style={styles.cameraIconContainer}>
                            <FontAwesomeIcon color='#C3D0EA' size={25} icon={faCamera}></FontAwesomeIcon>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '47%' }}>
                            <ProfileInput heading={'Aadhar No'} value={'1234567890'} isLock={false}></ProfileInput>
                        </View>
                        <View style={{ width: '47%' }}>
                            <ProfileInput heading={'Academic Year'} value={'2024-2025'} isLock={false}></ProfileInput>
                        </View>
                        <View style={{ width: '47%' }}>
                            <ProfileInput heading={'Admission Class'} value={'XI'} isLock={true}></ProfileInput>
                        </View>
                        <View style={{ width: '47%' }}>
                            <ProfileInput heading={'Admission No'} value={'T00224'} isLock={true}></ProfileInput>
                        </View>
                        <View style={{ width: '47%' }}>
                            <ProfileInput heading={'Date of Admission'} value={'05 Jan 2024'} isLock={true}></ProfileInput>
                        </View>
                        <View style={{ width: '47%' }}>
                            <ProfileInput heading={'Date of Birth'} value={'22 July 2003'} isLock={true}></ProfileInput>
                        </View>
                        <View style={{ width: '100%' }}>
                            <ProfileInput heading={'Email Id'} value={'A@gmail.com'} isLock={true}></ProfileInput>
                        </View>
                        <View style={{ width: '100%' }}>
                            <ProfileInput heading={'Mother Name'} value={'Sana Parveen'} isLock={true}></ProfileInput>
                        </View>
                        <View style={{ width: '100%' }}>
                            <ProfileInput heading={'Father Name'} value={'Aminul Akhtar'} isLock={true}></ProfileInput>
                        </View>
                        <View style={{ width: '100%' }}>
                            <ProfileInput heading={'Permanent Add.'} value={'Kolkata'} isLock={true}></ProfileInput>
                        </View>
                    </View>
                </ScrollView>
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
    doneButton: {
        width: '30%',
        backgroundColor: 'white',
        paddingHorizontal: 13,
        paddingVertical: 5,
        borderRadius: 50,
    },
    doneButtonContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    doneButtonText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#4477BB',
    },
    contentContainer: {
        height: '100%',
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 15,
    },
    profileImageContainer: {
        borderWidth: 2,
        borderColor: '#4477BB',
        borderRadius: 20,
        padding: 15,
        marginBottom: 20,
    },
    profileDetailsContainer: {
        width: '50%',
    },
    profileName: {
        color: 'black',
        fontSize: 30,
        fontWeight: '500',
        marginBottom: 10,
    },
    profileInfo: {
        color: '#C3D0EA',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
    },
    cameraIconContainer: {
        width: '10%',
        alignItems: 'center',
    },
    scrollView: {
        height: '100%',
    },
});

export default ProfileScreen