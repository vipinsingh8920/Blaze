import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  platForm,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLORS from '../../Components/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {getData} from '../../helpers/axios';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Loader from '../../loader/Loader';

const FavouriteList = ({navigation}) => {
  const isFocused = useIsFocused();
  const userDetail = useSelector(state => state.user);

  const [favPlayer, setFavPlayer] = useState([]);
  const [visible,setVisible] = useState(false);

  const GetFavData = async () => {
    setVisible(true);
    await getData(`favourite-player-list/${userDetail.userData.id}`)
      .then(res => {
        setFavPlayer(res?.data);
        setVisible(false);
      })
      .catch(err => {
        console.log(err);
        setVisible(false);
      });
  };

  useEffect(() => {
    GetFavData();
  }, [isFocused]);

  const RemoveFav = async item => {
    setVisible(true);
    await getData(`favourite-delete/${item.favourite_id}`)
      .then(res => {
        if (res.success == true) {
          setVisible(false);
          GetFavData();
        }
      })
      .catch(err => {
        alert(err);
        setVisible(false);
      });
  };

  return (
    <View style={{flex:1,backgroundColor:COLORS.dark}}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.headerColor} />
      <View style={{backgroundColor: COLORS.headerColor}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
            width: '100%',
            justifyContent: 'space-between',
            marginTop: platForm == 'ios' ? responsiveScreenHeight(5) : 0,
            flexDirection: 'row',
          }}>
          <View style={styles.header}>
            <Icon
              name="arrow-back-ios"
              size={24}
              color={COLORS.dark}
              onPress={() => navigation.goBack()}
            />
            <Text
              style={{
                color: COLORS.dark,
                fontSize: responsiveFontSize(2.5),
                fontWeight: 'bold',
                marginLeft: responsiveWidth(22),
              }}>
              Favourite Players
            </Text>
          </View>
        </View>
      </View>
      {favPlayer.length > 0 ? (
        <View>
          {favPlayer.map((item, index) => {
            return (
              <View
                style={{
                  height: responsiveHeight(11),
                  width: responsiveWidth(100),
                  backgroundColor: COLORS.darkgrey2,
                  borderBottomWidth: 1,
                  borderColor: COLORS.lightGrey,
                  marginTop:
                    index == 0 ? responsiveHeight(3) : responsiveHeight(0),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: item.photo}}
                  style={{
                    height: responsiveHeight(8),
                    width: responsiveWidth(16),
                    marginLeft: responsiveWidth(3),
                    borderRadius: responsiveWidth(2),
                    borderWidth:.5,
                    borderColor:COLORS.white
                  }}
                />
                <View style={{width: responsiveWidth(52)}}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: responsiveFontSize(2.4),
                      fontWeight: 'bold',
                      marginTop: 0,
                      marginLeft: responsiveWidth(3),
                      width: responsiveWidth(52),
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.lightGrey,
                      marginLeft: responsiveWidth(3),
                      marginTop: 3,
                      fontSize: responsiveFontSize(1.8),
                      width: responsiveWidth(52),
                    }}>
                    {item.email}
                  </Text>
                </View>

                <TouchableOpacity onPress={() => RemoveFav(item)}>
                  <View
                    style={{
                      height: responsiveHeight(4.5),
                      width: responsiveWidth(25),
                      backgroundColor: COLORS.headerColor,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: responsiveWidth(2),
                    }}>
                    <Text style={{color: COLORS.dark, fontWeight: 'bold'}}>
                      Remove
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      ) : (
        <View
          style={{
            height: responsiveHeight(100),
            width: responsiveWidth(100),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: COLORS.dark,
              fontSize: responsiveFontSize(3),
              fontWeight: 'bold',
            }}>
            Nothing to show ! 
          </Text>
        </View>
      )}
      <Loader visible={visible}/>
    </View>
  );
};

export default FavouriteList;

const styles = StyleSheet.create({
  header: {
    // marginTop: 10
    marginBottom: 10,
    flexDirection: 'row',
  },
});
