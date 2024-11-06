import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import TopTenClub from '../../Components/TopTenClub';
import COLORS from '../../Components/Color';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('screen');

export default function UpcomingMatches({topClub}) {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: COLORS.dark, width: '100%', flex: 1}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
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
            {' '}
            Popular Clubs
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('club')}>
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
      <TopTenClub topClub={topClub} />
    </View>
  );
}
