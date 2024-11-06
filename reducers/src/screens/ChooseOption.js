import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../Components/Color'
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

export default function ChooseOption() {
    // const [player, setPlayer] = useState();
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, width: '100%', marginTop: 50 }}>
            <View style={{display:'flex',flexDirection:'row'}}>
                <Text style={{ fontSize: 20, fontWeight: '700', padding: 20 }}> Let us know who are you!</Text>
                <View style={{marginTop:10}}>
                    <Image
                        style={{ width: 50, height: 50, resizeMode: 'contain' }}
                        source={require('../../Assets/LOGO_BLAZE_FINAL.png')}
                    />
                </View>
            </View>

            <View style={{ borderRadius: 10, borderColor: '#D3D3D3', borderWidth: 1, width: '90%', height: '35%', marginTop: 20, display: 'flex', alignSelf: 'center' }}>
               
                <TouchableOpacity style={{ marginTop: 30 }}>
                    <Text style={{ fontSize: 20, fontWeight: '700', paddingTop: 10, display: 'flex', alignSelf: 'center' }}>Continue as a Player</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 30 }}>
                    <Text style={{ fontSize: 20, fontWeight: '700', paddingTop: 10, display: 'flex', alignSelf: 'center' }}>Continue as a Club</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ backgroundColor: COLORS.purple, borderRadius: 10, padding: 10, marginTop: 40, display: 'flex', alignSelf: 'center', width: '90%' }} onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={{ fontSize: 16, fontWeight: '700', display: 'flex', alignSelf: 'center', color: COLORS.white, justifyContent: 'center' }}>Continue </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}