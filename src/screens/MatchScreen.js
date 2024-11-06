import { FlatList, StyleSheet } from 'react-native'
import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../Components/Color';
import { useNavigation } from '@react-navigation/native';

export default function MatchScreen() {
    const navigation = useNavigation();

    const data = [
        { id: 'S.No', name: 'MatchesPlayed', name2: 'MatchesWon' },
        { id: 1, name: 30, name2: 25 },
        

    ]

    const nextMatch = [
        { days: '2', hrs: '13', mins: '67', secs: '02' },
    ]


    const Item = ({ item }) => {
        return (
            <View style={{ flex: 1, display: 'flex', flexDirection: 'row', width: '98%', justifyContent: 'space-around', alignSelf: 'center', padding: 10, borderBottomColor: COLORS.lightGrey, borderColor: COLORS.lightGrey, borderWidth: 1 }}>
                <View style={{ backgroundColor: COLORS.white, width: '10%', borderRightColor: COLORS.lightGrey }}>
                    <Text style={{ color: COLORS.dark, fontSize: 20, fontWeight: 'bold' }}>{item.days}</Text>
                    <Text style={{ color: COLORS.dark }}>days</Text>
                </View>
                <View style={{ backgroundColor: COLORS.white, width: '10%' }}>
                    <Text style={{ color: COLORS.dark, fontSize: 20, fontWeight: 'bold' }}>{item.hrs}</Text>
                    <Text style={{ color: COLORS.dark }}>hrs</Text>
                </View>
                <View style={{ backgroundColor: COLORS.white, width: '10%' }}>
                    <Text style={{ color: COLORS.dark, fontSize: 20, fontWeight: 'bold' }}>{item.mins}</Text>
                    <Text style={{ color: COLORS.dark }}>mins</Text>
                </View>
                <View style={{ backgroundColor: COLORS.white, width: '10%' }}>
                    <Text style={{ color: COLORS.dark, fontSize: 20, fontWeight: 'bold' }}>{item.secs}</Text>
                    <Text style={{ color: COLORS.dark }}>secs</Text>
                </View>
            </View>
        );
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, display: 'flex', flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-between', padding: 10, borderBottomColor: COLORS.lightGrey, borderColor: COLORS.lightGrey, borderWidth: 1, marginLeft: 10 }}>
                <View style={{ backgroundColor: COLORS.white, width: '30%', borderRightColor: COLORS.lightGrey }}>
                    <Text style={{ color: COLORS.dark, display: 'flex', alignSelf: 'center', fontSize: 14 }}>{item.id}</Text>
                </View>
                <View style={{ backgroundColor: COLORS.white, width: '40%' }}>
                    <Text style={{ color: COLORS.dark, display: 'flex', alignSelf: 'center', fontSize: 14 }}>{item.name}</Text>
                </View>
                <View style={{ backgroundColor: COLORS.white, width: '30%' }}>
                    <Text style={{ color: COLORS.dark, display: 'flex', alignSelf: 'center', fontSize: 14 }}>{item.name2}</Text>
                </View>

            </View>
        );
    }

    return (

        <View style={{ flex: 1, width: '100%', backgroundColor: '#fff', marginTop: 60 }}>
            <View style={styles.header}>
                <Icon
                    name="arrow-back-ios"
                    size={24}
                    color={COLORS.dark}
                    style={{ paddingTop: 3 }}
                    onPress={navigation.goBack}
                />
            </View>
            <View style={{ marginTop: 20 }}>
                <View style={{ backgroundColor: COLORS.purple, width: '100%', display: 'flex', alignSelf: 'flex-start', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginRight: 10 }}>
                    <Text style={{ fontSize: 20, padding: 10, color: COLORS.dark, fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignSelf: 'center', textAlign: 'center', color: COLORS.white }}>NEXT MATCH</Text>
                </View>
                <View style={{ backgroundColor: COLORS.lightGrey, width: '100%', display: 'flex', alignSelf: 'flex-start', justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: 5 }}>
                    <Text style={{ fontSize: 16, color: COLORS.dark, fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignSelf: 'center', textAlign: 'center', color: COLORS.dark }}>Kangaroo VS Bulls</Text>
                </View>

                <FlatList
                    style={{}}
                    data={nextMatch}
                    renderItem={Item}
                    keyExtractor={(item, index) => String(index)}
                />

                {/* <View style={{ marginTop: 20 }}>
                    <View style={{ backgroundColor: COLORS.purple, width: '100%', display: 'flex', alignSelf: 'flex-start', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, padding: 10, color: COLORS.dark, fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignSelf: 'center', textAlign: 'center', color: COLORS.white }}>CURRENT STATS</Text>
                    </View>
                </View>
                <FlatList
                    style={{ marginTop: 30 }}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => String(index)}
                /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingLeft: 20,
        borderBottomColor: COLORS.lightGrey,
        paddingBottom: 20,
        borderColor: COLORS.white,
        borderWidth: 1,
        paddingTop: 10
    },
});