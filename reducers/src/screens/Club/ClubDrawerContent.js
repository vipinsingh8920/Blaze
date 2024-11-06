import React, {useState,useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Title,
  Drawer,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Iconn from 'react-native-vector-icons/Ionicons';
import Iccon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../reducers/authReducer';
import COLORS from '../../../Components/Color';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { ApiURL, ImageURL } from '../../../helpers/axios';
import axios from 'react-native-axios'

export function ClubDrawerContent(props) {
  const dispatch = useDispatch();

  const [image, setImage] = useState(`'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/800px-Chelsea_FC.svg.png'`);

  const navigation = useNavigation();
  const LogoutUser = () => {
    console.log('hhh');
    //  alert('KL');
    dispatch(logout());
    navigation.navigate('onboardScreen');
  };

const userDetail=useSelector(state=>state.user);


useEffect(()=>{
  setImage(`${ImageURL}${userDetail.userDetailData[0].profile_img}`);
},[])



const userProfile = async item => {
  let response = await axios.get(`${ApiURL}user-details/${userDetail?.userData.id}`);
  let userData = response.data.data.userDetail[0];
  let user = response.data.data.userData[0];

  navigation.navigate('ClubProfile', {
    item:userDetail?.userData,
    userData: userData,
    user: user,
  });
};

  return (
    <View style={{flex: 1,backgroundColor:COLORS.dark}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15,borderBottomWidth:1.5,height:responsiveHeight(10),borderColor:COLORS.darkgrey}}>
              <TouchableOpacity
                onPress={() => userProfile()}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'cover',
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: COLORS.white,
                    marginLeft:responsiveWidth(5)
                  }}
                  source={{
                    uri:image
                  }}
                />
              </TouchableOpacity>

              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>{userDetail?.userData.name}</Title>
              </View>
            </View>
          </View>
          <View style={{marginTop:10}}>
            <DrawerItem
              icon={({ size}) => (
                <Iconn name="home" color={COLORS.headerColor} size={size} />
              )}
              label="Home"
            labelStyle={{color:COLORS.white}}
              onPress={() => {
                props.navigation.navigate('ClubHome');
              }}
            />
          </View>

          <DrawerItem
           labelStyle={{color:COLORS.white}}
            icon={({color, size}) => (
              <Entypo name="sports-club" color={COLORS.headerColor} size={size} />
            )}
            label="Club"
            onPress={() => {
              props.navigation.navigate('club');
            }}
          />

<DrawerItem
 labelStyle={{color:COLORS.white}}
            icon={({color, size}) => (
              <Entypo name="sports-club" color={COLORS.headerColor} size={size} />
            )}
            label="FavouriteList"
            onPress={() => {
              props.navigation.navigate('FavouriteList');
            }}
          />

          <DrawerItem
           labelStyle={{color:COLORS.white}}
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="filter-variant"
                color={COLORS.headerColor}
                size={size}
              />
            )}
            label="Filter"
            onPress={() => {
              props.navigation.navigate('FilterPlayer');
            }}
          />

          {/* <DrawerItem
            icon={({color, size}) => (
              <Iccon name="watch-later" color={color} size={size} />
            )}
            label="Watch List"
            onPress={() => {
              props.navigation.navigate('WatchList');
            }}
          /> */}

          <DrawerItem
           labelStyle={{color:COLORS.white}}
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="onepassword"
                color={COLORS.headerColor}
                size={size}
              />
            )}
            label="Change Password"
            onPress={() => {
              props.navigation.navigate('ChangePass');
            }}
          />

          <DrawerItem
           labelStyle={{color:COLORS.white}}
            icon={({color, size}) => (
              <Iccon name="contacts" color={COLORS.headerColor} size={size} />
            )}
            label="Support"
            onPress={() => {
              props.navigation.navigate('contact');
            }}
          />
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
         labelStyle={{color:COLORS.white}}
          icon={({ size}) => (
            <Iccon name="exit-to-app" color={COLORS.headerColor} size={size} />
          )}
          label="Log Out"
          onPress={() => LogoutUser()}
        
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
   // paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color:COLORS.white
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: COLORS.darkgrey,
    //borderTopWidth: 1,
   
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
