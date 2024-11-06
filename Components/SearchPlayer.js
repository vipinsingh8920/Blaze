import {
  StyleSheet,
  Text,
  View,
  Image,
  platForm,
  Modal,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import COLORS from './Color';
import Entypo from 'react-native-vector-icons/Entypo';
import {getData} from '../helpers/axios';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const SearchPlayer = ({toggle, setToggle}) => {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const [playerData, setPlayerData] = useState([]);

  const userDetail = useSelector(state => state.user);
  const isFocused = useIsFocused();

  const PlayerData = async () => {
    await getData(`top-player/2/${userDetail?.userData.id}`)
      .then(res => {
        setPlayerData(res.data);
        //setVisible(false);
      })
      .catch(err => {
        alert(err);
        // setVisible(false);
      });
  };

  useEffect(() => {
    PlayerData();
  }, [isFocused]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.trim() != '') {
        GetResult();
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const GetResult = async () => {
    //setVisible(true);
    await getData(`top-player-search/2/${search}`)
      .then(res => {
        setResult(res.data);
        //setVisible(false);
      })
      .catch(err => {
        alert(err);
      });
  };

  const RenderItem = ({item, index}) => {
    return (
      <View key={index}>
        <View
          style={{
            height: responsiveHeight(11),
            width: responsiveWidth(100),
            backgroundColor: COLORS.dark,
            borderBottomWidth: 1.5,
            borderColor:COLORS.darkgrey,
            marginTop: index == 0 ? responsiveHeight(3) : responsiveHeight(0),
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
          <View>
            <Text
              style={{
                color: COLORS.white,
                fontSize: responsiveFontSize(2.4),
                fontWeight: 'bold',
                marginTop: 0,
                marginLeft: responsiveWidth(3),
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                color: COLORS.white,
                marginLeft: responsiveWidth(3),
                marginTop: 3,
                fontSize: responsiveFontSize(1.8),
              }}>
              {item.email}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const ShowDataByCondition = () => {
    if (search !== '') {
      if (result.length > 0) {
        return (
          <View>
            {result.map((item, index) => {
              return <RenderItem item={item} index={index} />;
            })}
          </View>
        );
      } else {
        return (
          <View
            style={{
              height: responsiveHeight(40),
              width: responsiveWidth(100),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: COLORS.white, fontSize: responsiveFontSize(2.7)}}>
              Sorry! Result Not Found...
            </Text>
          </View>
        );
      }
    } else {
      return (
        <View>
          {playerData.map((item, index) => {
            return <RenderItem item={item} index={index} />;
          })}
        </View>
      );
    }
  };

  return (
    <View>
      <Modal
        visible={toggle}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setToggle(false)}>
        <View
          style={{
            height: responsiveHeight(100),
            width: responsiveWidth(100),
            backgroundColor:COLORS.dark,
          }}>
          <View style={{backgroundColor: COLORS.headerColor}}>
            <View
              style={{
                marginTop: platForm == 'ios' ? responsiveHeight(5) : 0,
                flexDirection: 'row',
                width: '100%',
                paddingBottom: 10,
                alignItems: 'center',
              }}>
              <MaterialIcons
                name="chevron-left"
                size={30}
                color={COLORS.dark}
                style={{paddingLeft: 10}}
                onPress={() => setToggle(false)}
              />
              <View
                style={{
                  height: responsiveHeight(6),
                  width: responsiveWidth(80),
                  backgroundColor: COLORS.dark,
                  marginLeft: responsiveWidth(3),
                  borderRadius: responsiveWidth(2),
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth:1,
                  borderColor:COLORS.white
                }}>
                <MaterialIcons
                  name="search"
                  size={28}
                  style={{paddingLeft: 5, color: COLORS.white}}
                  onPress={() => setToggle(true)}
                />
                <TextInput
                  placeholder="Name or Email..."
                  placeholderTextColor={COLORS.white}
                  style={{color: COLORS.white, width: responsiveWidth(60)}}
                  value={search}
                  onChangeText={val => setSearch(val)}
                />

                {search.length > 0 ? (
                  <Entypo
                    name="cross"
                    size={22}
                    style={{color: COLORS.white, marginLeft: responsiveWidth(2)}}
                    onPress={() => setSearch('')}
                  />
                ) : (
                  ''
                )}
              </View>
            </View>
          </View>
          <ShowDataByCondition />
        </View>
      </Modal>
    </View>
  );
};

export default SearchPlayer;

const styles = StyleSheet.create({});
