//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import COLORS from '../../../Components/Color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from 'react-native-paper';

// create a component
const Age = ({ navigation }) => {
    const [checked, setChecked] = useState(false);
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
                        <View style={{ marginTop: 6, marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Filter By Age</Text>
                        </View>
                    </View>
                </View>

                <ScrollView>
                    <View style={{ marginTop:10 }}>
                        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', borderBottomColor: COLORS.Grey, borderWidth: 1, borderColor: COLORS.white, padding: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ display: 'flex', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: '500', paddingLeft: 10 }}>23 yrs.</Text>
                                </View>

                            </View>
                            <View style={{ borderColor: COLORS.white, borderWidth: 0.2, width: '10%', height: 30 }}>
                                <Checkbox
                                    color={COLORS.blue}
                                    style={{ backgroundColor: COLORS.blue }}
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', borderBottomColor: COLORS.Grey, borderWidth: 1, borderColor: COLORS.white, padding: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ display: 'flex', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: '500', paddingLeft: 10 }}>16 yrs.</Text>
                                </View>

                            </View>
                            <View style={{ borderColor: COLORS.white, borderWidth: 0.2, width: '10%', height: 30 }}>
                                <Checkbox
                                    color={COLORS.blue}
                                    style={{ backgroundColor: COLORS.blue }}
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', borderBottomColor: COLORS.Grey, borderWidth: 1, borderColor: COLORS.white, padding: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ display: 'flex', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: '500', paddingLeft: 10 }}>21 yrs.</Text>
                                </View>

                            </View>
                            <View style={{ borderColor: COLORS.white, borderWidth: 0.2, width: '10%', height: 30 }}>
                                <Checkbox
                                    color={COLORS.blue}
                                    style={{ backgroundColor: COLORS.blue }}
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', borderBottomColor: COLORS.Grey, borderWidth: 1, borderColor: COLORS.white, padding: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ display: 'flex', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: '500', paddingLeft: 10 }}>29 yrs.</Text>
                                </View>

                            </View>
                            <View style={{ borderColor: COLORS.white, borderWidth: 0.2, width: '10%', height: 30 }}>
                                <Checkbox
                                    color={COLORS.blue}
                                    style={{ backgroundColor: COLORS.blue }}
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', borderBottomColor: COLORS.Grey, borderWidth: 1, borderColor: COLORS.white, padding: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ display: 'flex', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: '500', paddingLeft: 10 }}>30 yrs.</Text>
                                </View>

                            </View>
                            <View style={{ borderColor: COLORS.white, borderWidth: 0.2, width: '10%', height: 30 }}>
                                <Checkbox
                                    color={COLORS.blue}
                                    style={{ backgroundColor: COLORS.blue }}
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', borderBottomColor: COLORS.Grey, borderWidth: 1, borderColor: COLORS.white, padding: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ display: 'flex', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: '500', paddingLeft: 10 }}>45 yrs.</Text>
                                </View>

                            </View>
                            <View style={{ borderColor: COLORS.white, borderWidth: 0.2, width: '10%', height: 30 }}>
                                <Checkbox
                                    color={COLORS.blue}
                                    style={{ backgroundColor: COLORS.blue }}
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', borderBottomColor: COLORS.Grey, borderWidth: 1, borderColor: COLORS.white, padding: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ display: 'flex', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: '500', paddingLeft: 10 }}>32 yrs.</Text>
                                </View>

                            </View>
                            <View style={{ borderColor: COLORS.white, borderWidth: 0.2, width: '10%', height: 30 }}>
                                <Checkbox
                                    color={COLORS.blue}
                                    style={{ backgroundColor: COLORS.blue }}
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', borderBottomColor: COLORS.Grey, borderWidth: 1, borderColor: COLORS.white, padding: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ display: 'flex', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: '500', paddingLeft: 10 }}>22 yrs.</Text>
                                </View>

                            </View>
                            <View style={{ borderColor: COLORS.white, borderWidth: 0.2, width: '10%', height: 30 }}>
                                <Checkbox
                                    color={COLORS.blue}
                                    style={{ backgroundColor: COLORS.blue }}
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.txt}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        marginTop:20
    },
    btn: {
        backgroundColor: COLORS.purple,
        width: '50%',
        padding: 15,
        borderRadius: 10,
        display: 'flex',
        alignSelf: 'center',
        marginTop: 20
    },
    txt: {
        color: COLORS.white,
        fontSize: 16,
        display: 'flex',
        alignSelf: 'center',

    },
});

//make this component available to the app
export default Age;
