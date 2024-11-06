import {View, Text, Platform, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './Style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Awards from '../../Components/Awards';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../Components/Color';
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Image} from 'react-native-elements';
import {ImageURL} from '../../helpers/axios';

export default function DetailScreen({route}) {
  const data = route.params;

  const navigation = useNavigation();
  const [platForm, setPlatForm] = useState(Platform.OS);

  if (data.type == 'news') {
    return (
      <View style={{flex: 1, backgroundColor: COLORS.dark}}>
        <View style={{backgroundColor: COLORS.headerColor}}>
          <View
            style={{
              marginTop: platForm == 'ios' ? responsiveScreenHeight(5) : 0,
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
                }}>{`News`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.aboutClub}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.white,
              paddingLeft: 5,
            }}>
            {data.item.title}
          </Text>
          <View>
            <Image
              resizeMode="stretch"
              style={{
                width: responsiveWidth(92),
                height: responsiveWidth(90),
                borderRadius: responsiveWidth(2),
                marginTop: 5,
                borderWidth:1,
                borderColor:COLORS.white
              }}
              source={{uri: `${ImageURL}${data.item.image}`}}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '300',
              color: COLORS.white,
              marginTop: responsiveHeight(2),
              letterSpacing: 0.5,
            }}>
            {data.item.description}
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, backgroundColor: COLORS.dark}}>
        <View style={{backgroundColor: COLORS.headerColor}}>
          <View
            style={{
              marginTop: platForm == 'ios' ? responsiveScreenHeight(5) : 0,
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
                {data.item.name}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.aboutClub}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              paddingBottom: 15,
              color: COLORS.white,
              paddingLeft: 5,
            }}>
            ABOUT CLUB
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '300',
              color: COLORS.white,
              letterSpacing: 0.5,
            }}>
            Explore every sportsman’s future to the world. Join World Sports
            Club and get exposure to world. Dreams needs to be driven by passion
            to make it come true. World Sports Club is one true dream, formed by
            keeping sheer passion for the men and women game-Cricket. World
            Sports Club was conceived by a group of passionate people leading
            businessman from Ahmedabad in 2019. The Sports Club gets its
            flamboyant and elegant design in the heart of city from the renowned
            architect; World Sports Club has gradually spread sports,
            entertainment and leisure in the thriving city of Ahmedabad. Today,
            World Sports Club is one of the most regal clubs of Ahmedabad and
            renowned for its state of the art amenities and splendid aura.
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              paddingTop: 25,
              paddingBottom: 20,
              color: COLORS.dark,
            }}>
            AWARDS
          </Text>
        </View>
        <View>
          <Awards />
        </View>
      </View>
    );
  }
}
