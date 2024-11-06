import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from '../src/screens/Style';
import COLORS from './Color';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ApiURL, ImageURL} from '../helpers/axios';
import axios from 'react-native-axios';

export default function Card(topPlayer) {
  const [defaultRating, setDefaultRating] = useState([]);
  const [img, setImg] = useState('');

  const navigation = useNavigation();

  const starImageFilled =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

  const starImageCorner =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
  const [maxRating] = useState([1, 2, 3, 4, 5]);
  const CustomRatingBar = rating => {
    return (
      <View
        style={{justifyContent: 'center', flexDirection: 'row', marginTop: 30}}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              {/* <Image
                style={{width: 17, height: 17, resizeMode: 'cover'}}
                source={
                  item <= rating
                    ? {uri: starImageFilled}
                    : {uri: starImageCorner}
                }
              /> */}
              <AntDesign name="star" size={20} style={{color: 'orange'}} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const userProfile = async item => {
    let response = await axios.get(`${ApiURL}user-details/${item.item.id}`);
    let userData = response.data.data.userDetail[0];
    let user = response.data.data.userData[0];
    navigation.navigate('profile', {
      item: item,
      userData: userData,
      user: user,
    });
  };

  

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => userProfile({item})}
        style={{borderColor: '#fff', padding: 10}}>
        <View style={styles1.imgview}>
          <Image
            style={[styles.players, {marginTop: responsiveHeight(2)}]}
            source={{uri: item.photo}}
          />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                paddingTop: 10,
                color: COLORS.white,
              }}>
              {item.name}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: -25,
            }}>
            <CustomRatingBar ratingimg={item} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={{marginTop: -15}}>
        <FlatList
          horizontal
          data={topPlayer.topplayer}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
    </View>
  );
}

const styles1 = StyleSheet.create({
  imgview: {
    height: responsiveHeight(27),
    width: responsiveWidth(40),
    //backgroundColor:COLORS.darkgrey,
    alignItems: 'center',
    borderRadius: responsiveWidth(2),
    borderWidth:1,
    borderColor:COLORS.darkgrey
  },
});
