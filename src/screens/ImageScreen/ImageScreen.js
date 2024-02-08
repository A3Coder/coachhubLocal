import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

const ImageScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()

  return (
    <View style={{ backgroundColor: 'white', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
      <Image resizeMode='contain' style={{ width: '100%', height: '85%' }} src={route.params.download_url}></Image>
      <TouchableOpacity activeOpacity={0.5} onPress={() => { navigation.goBack() }} style={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: 'grey', paddingHorizontal: 15, paddingVertical: 10, alignContent: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 900 }}>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ImageScreen