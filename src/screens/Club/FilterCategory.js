//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../Components/Color';

// create a component
const FilterCategory = ({ navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
            <View style={{ paddingBottom: 5, borderColor: COLORS.white, borderBottomColor: COLORS.lightGrey, borderWidth: 1 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'space-between' }}>
                        <View>
                            <MaterialIcons
                                name="chevron-left"
                                size={30}
                                color={COLORS.dark}
                                onPress={navigation.goBack}
                                style={{ paddingLeft: 10 }}
                            />
                        </View>
                        <View style={{ marginTop: 6, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Filter Category</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', borderBottomColor: COLORS.Grey, borderWidth: 1, borderColor: COLORS.white, padding: 15 }} onPress={() => navigation.navigate('SalaryFilter')}>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '500', paddingLeft: 10 }}>Amount</Text>
                    </View>
                    <View>
                        <MaterialIcons
                            name="chevron-right"
                            size={25}
                            color={COLORS.dark}
                            onPress={() => navigation.navigate('SalaryFilter')}
                            style={{ paddingLeft: 10 }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', borderBottomColor: COLORS.Grey, borderWidth: 1, borderColor: COLORS.white, padding: 15 }} onPress={() => navigation.navigate('Position')}>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '500', paddingLeft: 10 }}>Position</Text>
                    </View>
                    <View>
                        <MaterialIcons
                            name="chevron-right"
                            size={25}
                            color={COLORS.dark}
                            onPress={() => navigation.navigate('Position')}
                            style={{ paddingLeft: 10 }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', borderBottomColor: COLORS.Grey, borderWidth: 1, borderColor: COLORS.white, padding: 15 }} onPress={() => navigation.navigate('age')}>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '500', paddingLeft: 10 }}>Age</Text>
                    </View>
                    <View>
                        <MaterialIcons
                            name="chevron-right"
                            size={25}
                            color={COLORS.dark}
                            onPress={() => navigation.navigate('age')}
                            style={{ paddingLeft: 10 }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        marginTop:20
    },
});

//make this component available to the app
export default FilterCategory;
