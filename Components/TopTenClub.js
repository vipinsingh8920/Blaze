import {useNavigation} from '@react-navigation/native';
import react from 'react';
import {Image, View, ScrollView} from 'react-native';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {styles} from '../src/screens/Style';
import COLORS from './Color';
import { ApiURL } from '../helpers/axios';
import axios from 'react-native-axios'

export default function TopTenClub({topClub}) {
const navigation = useNavigation();


const userProfile = async item => {
  let response = await axios.get(`${ApiURL}user-details/${topClub[0].id}`);
  let userData = response.data.data.userDetail[0];
  let user = response.data.data.userData[0];

  navigation.navigate('ClubProfile', {
    item: topClub[0],
    userData: userData,
    user: user,
    type: 'club'
  });
};

  return (
    <ScrollView>
      {topClub.map((curelm, index) => {
        return (
          <TouchableOpacity
            key={index.toString()}
            style={{
              backgroundColor: COLORS.dark,
              padding: 10,
             // borderColor: '#fff',
              borderWidth: 1,
              borderBottomColor: COLORS.darkgrey2,
            }}
            onPress={() =>
              userProfile()
            }>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '80%',
                justifyContent: 'space-around',
              }}>
              <View>
                <Image style={styles.sportt} source={{uri: curelm.photo}} />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: 20,
                }}>
                <View style={styles.item}>
                  <Text style={styles.name}>{curelm.name}</Text>
                </View>
                <View>
                  <Text style={styles.date}>{curelm.ClubType}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
