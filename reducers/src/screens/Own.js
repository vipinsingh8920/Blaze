import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import COLORS from '../../../Components/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';



export default function Own({ navigation }) {
    return (
        <View style={styles.Filter}>
            <View style={styles.header}>
                <Icon
                    name="arrow-back-ios"
                    size={24}
                    color={COLORS.dark}
                    onPress={navigation.goBack}
                />
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.Filtertext}>Filter According To Your Preferences!!</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <View style={styles.fieldSet}>
                    <Text style={styles.legend}>Salary</Text>
                    <TextInput
                        placeholder="Enter Salary Range"
                    />
                </View>
                <View style={styles.fieldSet}>
                    <Text style={styles.legend}>Leagues</Text>
                    <TextInput
                        placeholder="Enter No of leagues"
                    />
                </View>
                <View style={styles.fieldSet}>
                    <Text style={styles.legend}>Country</Text>
                    <TextInput
                        placeholder="Enter Country Name"
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txtt}>Filter</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    Filter: {
        marginTop: 60,
        paddingLeft: 15,
        backgroundColor: COLORS.white,
        paddingBottom: 20
    },
    Filtertext: {
        paddingTop: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    header: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    fieldSet: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        // alignItems: 'center',
        borderColor: COLORS.lightGrey,
        width: '90%',
        display: 'flex',

    },
    legend: {
        position: 'absolute',
        top: -10,
        left: 10,
        fontWeight: 'bold',
        backgroundColor: '#FFF',
        color: COLORS.purple,

    },
    txt: {
        fontSize: 12,
        color: COLORS.dark
    },
    txtt: {
        fontSize: 18,
        color: COLORS.white,
        display: 'flex',
        alignSelf: 'center'
    },
    btn: {
        backgroundColor: COLORS.purple,
        padding: 10,
        width: '30%',
        display: 'flex',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        borderColor: COLORS.white,
        borderWidth: 1
    },
});