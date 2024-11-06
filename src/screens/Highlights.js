import { View, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'
import COLORS from '../../Components/Color'
const { width } = Dimensions.get('screen');

export default function Highlights() {
    return (
        <View style={{display:'flex',flexDirection:'row'}}>
            <View style={{ borderRadius: 100, borderColor: '#fff', borderWidth: 1, height: 80, width: 80, display: 'flex', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 20, marginLeft: 10 }}>
                <Image
                    style={{ width: Dimensions.get('screen').width - 325, height: Dimensions.get('screen').width - 325, borderRadius: 40, resizeMode: 'cover' }}
                    source={require('../../Assets/football2.jpg')}
                />
            </View>
            <View style={{ borderRadius: 100, borderColor: '#fff', borderWidth: 1, height: 80, width: 80, display: 'flex', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 20, marginLeft: 10 }}>
                <Image
                    style={{ width: Dimensions.get('screen').width - 325, height: Dimensions.get('screen').width - 325, borderRadius: 40, resizeMode: 'cover' }}
                    source={require('../../Assets/basketball.jpeg')}
                />
            </View>
            <View style={{ borderRadius: 100, borderColor: '#fff', borderWidth: 1, height: 80, width: 80, display: 'flex', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 20, marginLeft: 10 }}>
                <Image
                    style={{ width: Dimensions.get('screen').width - 325, height: Dimensions.get('screen').width - 325, borderRadius: 40, resizeMode: 'cover' }}
                    source={require('../../Assets/football1.jpeg')}
                />
            </View>
            <View style={{ borderRadius: 100, borderColor: '#fff', borderWidth: 1, height: 80, width: 80, display: 'flex', alignSelf: 'flex-start', justifyContent: 'center', marginTop: 20, marginLeft: 10 }}>
                <Image
                    style={{ width: Dimensions.get('screen').width - 325, height: Dimensions.get('screen').width - 325, borderRadius: 40, resizeMode: 'cover' }}
                    source={require('../../Assets/football2.jpg')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profiles: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center'
    },
})