import {View, Text, Platform, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../Components/Color';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import SearchClub from '../../Components/SearchClub';

export default function Discover() {
  const navigation = useNavigation();

  const [platForm, setPlatForm] = useState(Platform.OS);
  const [toggle, setToggle] = useState(false);

  return (
    <View style={{width: '100%', backgroundColor: COLORS.headerColor}}>
      <View
        style={{
          marginTop: platForm == 'ios' ? responsiveScreenHeight(5) : 0,
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          // justifyContent: 'space-between',
          paddingBottom: 10,
        }}>
        <TouchableOpacity onPress={navigation.goBack}>
          <MaterialIcons
            name="chevron-left"
            size={30}
            color={COLORS.dark}
            style={{paddingLeft: 10}}
          />
        </TouchableOpacity>

        <View style={{width: '70%'}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              paddingLeft: 15,
              color: COLORS.dark,
            }}>
            Club
          </Text>
        </View>

        <View
          style={{
            width: '20%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => setToggle(true)}>
            <Ionicons
              name="search-outline"
              size={25}
              color={COLORS.dark}
              style={{marginLeft: responsiveWidth(0)}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Ionicons
              name="notifications-outline"
              size={25}
              color={COLORS.dark}
              style={{paddingRight: 10}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <SearchClub toggle={toggle} setToggle={setToggle}/>
    </View>
  );
}
