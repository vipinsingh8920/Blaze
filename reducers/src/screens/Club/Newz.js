import React from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import COLORS from '../../../Components/Color';
import {styles} from '../Style';
import {useNavigation} from '@react-navigation/native';
import {WebURL} from '../../../helpers/axios';

export default function Newz({topNews}) {
  const navigation = useNavigation();

  return (
    <View style={{marginTop: 10}}>
      <View
        style={{
          paddingBottom: 10,
          //borderWidth: 1,
          borderBottomColor: COLORS.lightGrey,
          borderColor: COLORS.white,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            paddingLeft: 20,
            paddingBottom: 5,
            color:COLORS.white
          }}>
          Newsz
        </Text>
      </View>
      <View>
        {topNews.length > 0 &&
          topNews.map((curelm, index) => {
           
            return (
              <TouchableOpacity
                key={index.toString()}
                style={{
                  padding: 10,
                  borderColor: '#353535',
                  borderWidth: 1,
                  borderBottomColor: '#DFDFDF',
                }}
                onPress={() =>
                  navigation.navigate('Detail', {item: curelm, type: 'news'})
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    justifyContent: 'space-around',
                  }}>
                  <View style={{marginRight: 5}}>
                    <Image
                      style={styles.sport}
                      source={{uri: `${WebURL}${curelm.image}`}}
                    />
                  </View>

                  <View style={{flexDirection: 'column', marginTop: 5}}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '70%',
                      }}>
                      <View style={{marginTop: 5}}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: COLORS.white,
                            fontWeight: '600',
                          }}>
                          {curelm.title}
                        </Text>
                      </View>
                      <View style={{marginTop: 5, paddingLeft: 10}}>
                        <Text style={{fontSize: 14, color: COLORS.white}}>
                          {curelm.created_at}
                        </Text>
                      </View>
                    </View>
                    <View style={{paddingTop:5}}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.short_desc}>
                        {curelm.short_desc}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
}
