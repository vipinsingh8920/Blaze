import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import COLORS from '../../Components/Color';
import { Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ClubCriteria = ({ navigation }) => {
    return (
        <View style={styles.mainContainer}>

            <View style={styles.container}>
                <MaterialIcons
                    name="arrow-back-ios"
                    size={22}
                    color={COLORS.white}
                    style={{ paddingLeft: 20 }}
                    onPress={navigation.goBack}
                />
                <Text style={styles.club}>Club Criteria</Text>
            </View>
            <View style={{ marginTop: 30 }}>
                <View style={styles.fieldSet}>
                    <Text style={styles.legend}>Minimum Salary (per month)</Text>
                    <TextInput
                        placeholder="2000 euro"
                        placeholderTextColor={COLORS.lightGrey}
                        style={{color:COLORS.lightGrey}}
                    />
                </View>
            </View>

            <View style={{ marginBottom: 10, marginTop: 20, paddingBottom: 10, borderBottomColor: COLORS.lightGrey, borderWidth: 1, borderColor: COLORS.white }}>
                <Text style={{ paddingLeft: 15, fontSize: 16, fontWeight: 'bold',color:COLORS.lightGrey }}>Country</Text>
            </View>
            <View style={{ margin: 10, display: 'flex', flexDirection: 'row' }}>

                <TouchableOpacity style={{
                    display: 'flex', borderColor: COLORS.white, borderRadius: 100, borderWidth: 1, backgroundColor: COLORS.headerColor,
                    width: windowWidth / 4.5, height: windowHeight / 26, justifyContent: 'center', marginRight: 5
                }}>
                    <Text style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center', fontSize: 12,color:COLORS.dark }}>Germany</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    display: 'flex', borderColor: COLORS.white, borderRadius: 100, borderWidth: 1, backgroundColor: COLORS.headerColor,
                    width: windowWidth / 4.5, height: windowHeight / 26, justifyContent: 'center', marginRight: 5
                }}>
                    <Text style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center', fontSize: 12,color:COLORS.dark }}>USA</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    display: 'flex', borderColor: COLORS.white, borderRadius: 100, borderWidth: 1, backgroundColor: COLORS.headerColor,
                    width: windowWidth / 4.5, height: windowHeight / 26, justifyContent: 'center', marginRight: 5
                }}>
                    <Text style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center', fontSize: 12,color:COLORS.dark }}>Italy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    display: 'flex', borderColor: COLORS.white, borderRadius: 100, borderWidth: 1, backgroundColor: COLORS.headerColor,
                    width: windowWidth / 4.5, height: windowHeight / 26, justifyContent: 'center'
                }}>
                    <Text style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center', fontSize: 12,color:COLORS.dark }}>France</Text>
                </TouchableOpacity>
            </View>


            <View style={{ marginBottom: 10, marginTop: 20, paddingBottom: 10, borderBottomColor: COLORS.lightGrey, borderWidth: 1, borderColor: COLORS.white }}>
                <Text style={{ paddingLeft: 15, fontSize: 16, fontWeight: 'bold',color:COLORS.lightGrey }}>Choose League</Text>
            </View>
            <View style={{ margin: 10, display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity style={{
                    display: 'flex', borderColor: COLORS.white, borderRadius: 100, borderWidth: 1, backgroundColor: COLORS.headerColor,
                    width: windowWidth / 4.5, height: windowHeight / 26, justifyContent: 'center', marginRight: 5
                }}>
                    <Text style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center', fontSize: 12,color:COLORS.dark }}>EFL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    display: 'flex', borderColor: COLORS.white, borderRadius: 100, borderWidth: 1, backgroundColor: COLORS.headerColor,
                    width: windowWidth / 4.5, height: windowHeight / 26, justifyContent: 'center', marginRight: 5
                }}>
                    <Text style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center', fontSize: 12,color:COLORS.dark }}>La Liga</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    display: 'flex', borderColor: COLORS.white, borderRadius: 100, borderWidth: 1, backgroundColor: COLORS.headerColor,
                    width: windowWidth / 4.5, height: windowHeight / 26, justifyContent: 'center', marginRight: 5
                }}>
                    <Text style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center', fontSize: 12,color:COLORS.dark }}>Bundesliga</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    display: 'flex', borderColor: COLORS.white, borderRadius: 100, borderWidth: 1, backgroundColor: COLORS.headerColor,
                    width: windowWidth / 4.5, height: windowHeight / 26, justifyContent: 'center'
                }}>
                    <Text style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center', fontSize: 12,color:COLORS.dark }}>Serie A</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 10, marginTop: 20, paddingBottom: 10, borderBottomColor: COLORS.lightGrey, borderWidth: 1, borderColor: COLORS.white }}>
                <Text style={{ paddingLeft: 15, fontSize: 16, fontWeight: 'bold',color:COLORS.lightGrey }}>Choose Club</Text>
            </View>
            <View style={{ margin: 10, display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity style={{
                    display: 'flex', borderColor: COLORS.white, borderRadius: 100, borderWidth: 1, backgroundColor: COLORS.headerColor,
                    width: windowWidth / 5, height: windowHeight / 26, justifyContent: 'center', marginRight: 5
                }}>
                    <Text style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center', fontSize: 12,color:COLORS.dark }}>Barcelona</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    display: 'flex', borderColor: COLORS.white, borderRadius: 100, borderWidth: 1, backgroundColor: COLORS.headerColor,
                    width: windowWidth / 4.5, height: windowHeight / 26, justifyContent: 'center', marginRight: 5
                }}>
                    <Text style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center', fontSize: 12,color:COLORS.dark }}>Real Madrid</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    display: 'flex', borderColor: COLORS.white, borderRadius: 100, borderWidth: 1, backgroundColor: COLORS.headerColor,
                    width: windowWidth / 4.5, height: windowHeight / 26, justifyContent: 'center', marginRight: 5
                }}>
                    <Text style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center', fontSize: 12,color:COLORS.dark }}>Juventus</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    display: 'flex', borderColor: COLORS.white, borderRadius: 100, borderWidth: 1, backgroundColor: COLORS.headerColor,
                    width: windowWidth / 4.5, height: windowHeight / 26, justifyContent: 'center'
                }}>
                    <Text style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center', fontSize: 12,color:COLORS.dark }}>Manchester</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: COLORS.dark
    },
    container: {
        marginTop: 70,
        display: 'flex',
        alignSelf: 'center',
        width: '100%',

    },
    club: {
        fontSize: 20,
        fontWeight: 'bold',
        display: 'flex',
        alignSelf: 'center',
        color:COLORS.white
    },
    fieldSet: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.lightGrey,
        width: '90%',
        display: 'flex',

    },
    legend: {
        position: 'absolute',
        top: -10,
        left: 10,
        fontWeight: 'bold',
        backgroundColor: COLORS.headerColor,
        color: COLORS.dark,

    },

});

//make this component available to the app
export default ClubCriteria;
