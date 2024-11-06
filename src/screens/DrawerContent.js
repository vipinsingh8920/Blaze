import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Iconn from 'react-native-vector-icons/Ionicons';
import Iccon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image} from 'react-native';
import COLORS from '../../Components/Color';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../reducers/authReducer';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {ApiURL} from '../../helpers/axios';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import auth from '@react-native-firebase/auth';

export function DrawerContent(props) {
  const dispatch = useDispatch();

  const [image, setImage] = useState(
    'https://media.istockphoto.com/id/959257646/photo/professional-soccer-player-about-to-kick-football-during-soccer-match.jpg?s=612x612&w=is&k=20&c=FebQ8O3WGH6Usg7GKGGlBCZacfCmMDt29ICWhsH1yL4=',
  );

  const navigation = useNavigation();
  const LogoutUser = () => {
    dispatch(logout());
    navigation.navigate('onboardScreen');
  };

  const userProfile = async item => {
    navigation.navigate('EditProfile', {
      data: userDetail,
    });
  };

  const userDetail = useSelector(state => state.user);

  return (
    <View style={{flex: 1,backgroundColor:COLORS.dark}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <TouchableOpacity onPress={() => userProfile()}>
                <View>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: 'cover',
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: COLORS.white,
                    }}
                    source={{
                      uri: image,
                    }}
                  />
                </View>
              </TouchableOpacity>

              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>Lionel Messi</Title>
              </View>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <DrawerItem
              icon={({color, size}) => (
                <Iconn name="home" color={COLORS.headerColor} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('HomeScreen');
              }}
              labelStyle={{color:COLORS.white}}
            />
          </View>

          <DrawerItem
            icon={({ size}) => (
              <Entypo name="sports-club" color={COLORS.headerColor} size={size} />
            )}
            label="Club"
            onPress={() => {
              props.navigation.navigate('club');
            }}
            labelStyle={{color:COLORS.white}}
          />

          <DrawerItem
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
            labelStyle={{color:COLORS.white}}
          />
          <DrawerItem
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
            labelStyle={{color:COLORS.white}}
          />

          <DrawerItem
            icon={({color, size}) => (
              <Iccon name="contacts" color={COLORS.headerColor} size={size} />
            )}
            label="Contact"
            onPress={() => {
              props.navigation.navigate('contact');
            }}
            labelStyle={{color:COLORS.white}}
          />
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Iccon name="exit-to-app" color={COLORS.headerColor} size={size} />
          )}
          label="Log Out"
          onPress={() => LogoutUser()}
          labelStyle={{color:COLORS.white}}
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
    paddingLeft: 20,
    height: responsiveHeight(11.5),
    borderBottomWidth: 0.5,
    borderColor: COLORS.lightGrey,
  },
  title: {
    fontSize: 16,
    marginTop: 8,
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
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
