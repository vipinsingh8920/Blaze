import { View, Text, FlatList, Dimensions, ScrollView, Image } from 'react-native'
import React from 'react'
import Card from '../../Components/Card';
import Teams from '../../Components/Teams';



export default function PopularTeams() {


    return (

        <View style={{ width: '100%' }}>
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' ,borderBottomColor:'#DFDFDF',borderColor:'#fff',borderWidth:1,paddingBottom:15}}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', paddingTop: 15, paddingLeft: 15 }}>Popular Teams</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', paddingTop: 18, paddingRight: 15 }}>View All</Text>
                </View>
            </View>
            <View>
                <Teams />

            </View>

        </View>

    )
}