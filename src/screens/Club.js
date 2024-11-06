import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import Discover from './Discover';
import {ApiURL} from '../../helpers/axios';
import COLORS from '../../Components/Color';
import axios from 'react-native-axios';
import {useNavigation} from '@react-navigation/native';
import {styles} from './Style';
import { responsiveWidth } from 'react-native-responsive-dimensions';

let loaderMore = true;
export default function Club() {
  const navigation = useNavigation();
  //pagination
 
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(1);
  const [showLoader, setShowLoader] = useState(true);

  const itemSeparatorComponent = useCallback(() => {
    return <View style={{height: 20}} />;
  }, [data]);

  const listFooterComponent = useCallback(() => {
    return <ActivityIndicator style={{marginVertical: 16}} size="large" />;
  }, []);

  const getAllClub = async () => {
    // setShowLoader(true);
    let query = `?page=${skip}`;
    axios
      .get(`${ApiURL}top-club/3${query}`)
      .then(function (response) {
        if (response?.data.data.length == 0) {
          loaderMore = false;
        }
        if (response?.data.data.length != 0) {
          setData([...data, ...response?.data.data]);
          setSkip(skip + 1);
          setShowLoader(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const userProfile = async item => {
    let response = await axios.get(`${ApiURL}user-details/${item.id}`);
    let userData = response.data.data.userDetail[0];
    let user = response.data.data.userData[0];

    navigation.navigate('ClubProfile', {
      item: item,
      userData: userData,
      user: user,
      type: 'club'
    });
  };

  const renderItem = useCallback(
    ({item}) => {
   
      return (
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.dark,
            padding: 10,
            borderWidth: 1,
            width:responsiveWidth(92),
            marginLeft:responsiveWidth(4),
            borderRadius:responsiveWidth(2)
          }}
          onPress={() =>
            userProfile(item)
          }>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '80%',
              justifyContent: 'space-around',
            }}>
            <View>
              <Image style={styles.sportt} source={{uri: item.photo}} />
            </View>
            <View
              style={{display: 'flex', flexDirection: 'column', marginTop: 20}}>
              <View style={styles.item}>
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <View>
                <Text style={styles.date}>{item.ClubType}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [data],
  );

  const keyExtractor = useCallback(item => `${item.id}`);

  useEffect(() => {
    getAllClub();
  }, []);

  const onEndReached = () => {
    if (loaderMore) {
      getAllClub();
    }
  };

  return (
    <View style={{flex: 1, width: '100%'}}>
      <Discover />
      <View style={{backgroundColor: COLORS.dark, width: '100%', flex: 1}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginTop: 5,
            marginBottom: 10,
          }}>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                paddingTop: 15,
                paddingLeft: 15,
                color: COLORS.white,
              }}>
              All Club
            </Text>
          </View>
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={itemSeparatorComponent}
          onEndReached={onEndReached}
          ListFooterComponent={showLoader && listFooterComponent}
        />
      </View>
    </View>
  );
}
