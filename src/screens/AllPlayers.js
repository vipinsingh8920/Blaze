import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  platForm,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import COLORS from '../../Components/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'react-native-axios';
import {ApiURL, getData, postData} from '../../helpers/axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Loader from '../../loader/Loader';
import SearchPlayer from '../../Components/SearchPlayer';

const AllPlayers = ({route, navigation}) => {
  // const {bool} = route.params;
  

  const data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
   const [toggle, setToggle] = useState(false);
  const [playerData, setPlayerData] = useState([]);
  const [visible, setVisible] = useState(false);

  const userDetail = useSelector(state => state.user);
  const isFocused = useIsFocused();

  const PlayerData = async () => {
    setVisible(true);
    await getData(`top-player/2/${userDetail?.userData.id}`)
      .then(res => {
        setPlayerData(res.data);
        setVisible(false);
      })
      .catch(err => {
        alert(err);
        setVisible(false);
      });
  };

  useEffect(() => {
    PlayerData();
  }, [isFocused]);


  const AddToFavList = async item => {
    setVisible(true);
    let data = {
      uiid: userDetail?.userData.id,
      player_id: item.id,
    };
    await postData(`favourite-add`, data)
      .then(res => {
        if (res.success == true) {
          setVisible(false);
          PlayerData();
        }
      })
      .catch(err => {
        setVisible(false);
        alert(err);
      });
  };

  const RemoveFav = async item => {
    setVisible(true);
    await getData(`favourite-delete/${item.favourite_id}`)
      .then(res => {
        if (res.success == true) {
          setVisible(false);
          PlayerData();
        }
      })
      .catch(err => {
        setVisible(false);
        alert(err);
      });
  };

  const ProfilePage = async item => {
    let response = await axios.get(`${ApiURL}user-details/${item.item.id}`);
    let userData = response.data.data.userDetail[0];
    let user = response.data.data.userData[0];
    navigation.navigate('profile', {
      item: item,
      userData: userData,
      user: user,
    });
  };

  return (
    <View style={{flex:1,backgroundColor:COLORS.dark}}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.headerColor} />
      <View style={{backgroundColor: COLORS.headerColor}}>
        <View
          style={{
            marginTop: platForm == 'ios' ? responsiveHeight(5) : 0,
            flexDirection: 'row',
            width: '100%',
            paddingBottom: 10,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="chevron-left"
              size={30}
              color={COLORS.dark}
              style={{paddingLeft: 10}}
            />
          </TouchableOpacity>
          <View style={styles.discover}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                paddingLeft: 15,
                color: COLORS.dark,
              }}>
              All Players
            </Text>
          </View>

          <MaterialIcons
            name="search"
            size={30}
            style={{
              paddingLeft: 10,
              marginLeft: responsiveWidth(35),
              color: COLORS.dark,
            }}
            onPress={() => setToggle(true)}
          />

          <Ionicons
            name="notifications-outline"
            size={22}
            style={{color: COLORS.dark, marginLeft: responsiveWidth(2)}}
            onPress={() => navigation.navigate('Notification')}
          />
        </View>
      </View>
      {playerData.map((item, index) => {
        return (
          <View key={index}>
            <Pressable onPress={() => ProfilePage({item})}>
              <View style={styles.box1}>
                <View
                  style={[
                    styles.innerview,
                    {
                      marginLeft: responsiveWidth(2),
                      backgroundColor: COLORS.white,
                    },
                  ]}>
                  <Image
                    source={{uri: item.photo}}
                    style={{
                      height: responsiveHeight(16),
                      width: responsiveWidth(28),
                      borderRadius: responsiveWidth(2),
                    }}
                  />
                </View>
                <View style={[styles.innerview, {width: responsiveWidth(62)}]}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.nametxt}>
                      {item ? item.name : 'User'}
                    </Text>

                    {userDetail.userData.id_cms_privileges == 3 ? (
                      <MaterialIcons
                        name="favorite"
                        size={30}
                        style={{marginTop: -5}}
                        color={
                          item.favourite_status == 1 ?"#d60000" : COLORS.white
                        }
                        onPress={() => {
                          item.favourite_status == 1
                            ? RemoveFav(item)
                            : AddToFavList(item);
                        }}
                      />
                    ) : (
                      ''
                    )}
                  </View>
                  <Text
                    style={[
                      styles.nametxt,
                      {
                        fontSize: responsiveFontSize(1.8),
                        fontWeight: 'normal',
                        marginTop: responsiveHeight(0.5),
                      },
                    ]}>
                    {item ? item.email : 'example@gmail.com'}
                  </Text>
                  <ScrollView
                    horizontal={true}
                    style={{marginLeft: 5, marginTop: 5}}>
                    {data.map((item, index) => {
                      return (
                        <View key={index} style={{}}>
                          <AntDesign
                            name="star"
                            size={20}
                            style={{color: 'orange'}}
                          />
                        </View>
                      );
                    })}
                    <Text
                      style={{
                        color: COLORS.Grey,
                        fontSize: responsiveFontSize(1.6),
                        marginTop: 2,
                        marginLeft: 2,
                      }}>
                      (22223)
                    </Text>
                  </ScrollView>
                </View>
              </View>
            </Pressable>
          </View>
        );
      })}
      <SearchPlayer toggle={toggle} setToggle={setToggle}/>
     <Loader visible={visible}/>
    </View>
  );
};

export default AllPlayers;

const styles = StyleSheet.create({
  box1: {
    height: responsiveHeight(18),
    width: responsiveWidth(96),
    marginLeft: responsiveWidth(2),
    borderRadius: responsiveWidth(2),
    //backgroundColor: COLORS.darkgrey,
    marginTop: responsiveHeight(3),
    flexDirection: 'row',
    elevation: 2,
    borderWidth:1,
    borderColor:COLORS.darkgrey
  },
  innerview: {
    height: responsiveHeight(16),
    width: responsiveWidth(28),
    marginTop: responsiveHeight(1),
    borderRadius: responsiveWidth(2),
    marginLeft: responsiveWidth(2),
  },
  nametxt: {
    color: COLORS.white,
    marginLeft: responsiveWidth(2),
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    width: responsiveWidth(53),
  },
});
