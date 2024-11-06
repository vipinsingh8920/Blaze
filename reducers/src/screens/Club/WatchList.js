//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../../Components/Color';
import WatchListPlayer from '../../../Components/WatchListPlayer';

// create a component
const WatchList = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={{ paddingBottom: 10, borderBottomColor: COLORS.lightGrey, borderWidth: 1, borderColor: COLORS.white }}>
                <View style={{ display: 'flex', flexDirection: 'row', width: '35%', justifyContent: 'space-around' }}>
                    <View style={{ marginTop: 20 }}>
                        <Ionicons
                            name="chevron-back"
                            size={26}
                            color={COLORS.dark}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                    <View style={{ marginTop: 24 }}>
                        <Text style={{ fontSize: 16, color: COLORS.dark, fontWeight: '700' }}>Watch List</Text>
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 10 }}>
                <TextInput
                    placeholder='Search player'
                    placeholderTextColor={'#888'}
                    style={styles.input}
                />
            </View>
            <WatchListPlayer />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        width: '95%',
        display: 'flex',
        alignSelf: 'center',
        borderColor: COLORS.lightGrey,
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: COLORS.white,
        elevation: 10
    },
});

//make this component available to the app
export default WatchList;
