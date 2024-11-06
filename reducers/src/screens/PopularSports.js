import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import Card from '../../Components/Card';
import COLORS from '../../Components/Color';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';


export default function PopularSports({topPlayer}) {
  const navigation=useNavigation();
  return (
    <View
      style={{
        width: '100%',
        marginTop: responsiveHeight(1.6),
        borderBottomColor: COLORS.lightGrey,
        borderColor: COLORS.white,
        //borderWidth: 1,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          marginTop: -5,
          marginBottom: 10,
        }}>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              paddingTop: 15,
              paddingLeft: 15,
              color: COLORS.white,
            }}>
            Top Players
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('AllPlayers',{item:topPlayer})}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              paddingTop: 18,
              paddingRight: 15,
              color: COLORS.white,
            }}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10}}>
        <Card topplayer={topPlayer} />
      </View>
    </View>
  );
}
