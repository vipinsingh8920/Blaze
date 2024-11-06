import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Platform} from 'react-native';
import {Text} from 'react-native';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import COLORS from '../../Components/Color';
import Loader from '../../loader/Loader';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {postData} from '../../helpers/axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Image} from 'react-native';

export default function ChangePassword({navigation}) {
  const [platForm, setPlatForm] = useState(Platform.OS);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [conformPassword, setConformPassword] = useState('');
  const {userData} = useSelector(state => state.user);

  const passwordChange = async () => {
    setIsLoading(true);

    if (password.trim() == '' || conformPassword.trim() == '') {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'All fields are required to be filled.',
      });
      setIsLoading(false);
      return false;
    } else if (password !== conformPassword) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Password and confirm passowrd not match.',
      });
      setIsLoading(false);
      return false;
    }

    try {
      const result = await postData('changePassword', {
        password,
        uid: userData.id,
      });
      console.log(result);
      setPassword('');
      setConformPassword('');
      setIsLoading(false);

      if (result.success) {
        showMessage({
          type: 'success',
          icon: 'success',
          message: result.message,
        });
      } else {
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Some error is occurred..',
        });
      }
    } catch (error) {
      setIsLoading(false);
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: error + 'Some error is occurred in server..',
      });
    }
  };

  return (
    <ScrollView style={styles.maincontainer}>
      {isLoading == true && <Loader />}

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
              Change Password
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          alignSelf: 'flex-start',
          width: '100%',
          borderRadius: 10,
          marginTop: 20,
          paddingTop: 10,
          paddingBottom: 20,
        }}>
        <View style={{alignItems: 'center', width: '100%'}}>
          <Image
            style={{width: responsiveWidth(25), height: responsiveWidth(25),borderWidth:1,borderColor:COLORS.white,borderRadius:responsiveWidth(100)}}
            source={require('../../Assets/applogo.png')}
          />
        </View>
        <TextInput
          style={styles.input}
          onChangeText={password => setPassword(password)}
          value={password}
          secureTextEntry={true}
          placeholder="New password..."
          placeholderTextColor={COLORS.lightGrey}
        />

        <TextInput
          style={styles.input}
          onChangeText={conformPassword => setConformPassword(conformPassword)}
          value={conformPassword}
          secureTextEntry={true}
          placeholder="Confirm password..."
          placeholderTextColor={COLORS.lightGrey}
        />

        <TouchableOpacity style={styles.btn} onPress={() => passwordChange()}>
          <Text style={styles.txt}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor:COLORS.dark
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  heading: {
    display: 'flex',
    alignSelf: 'center',
  },
  boat: {
    fontSize: 22,
    color: '#000000',
    fontWeight: 'bold',
  },
  input: {
    marginTop: 20,
    borderWidth: 1,
    padding: 15,
    borderColor: '#D7D7D7',
    width: '90%',
    borderRadius: 10,
    color: COLORS.lightGrey,
    fontSize: 14,
    display: 'flex',
    alignSelf: 'center',
    paddingLeft: 10,
  },
  btn: {
    backgroundColor: COLORS.headerColor,
    width: '90%',
    padding: 15,
    borderRadius: 10,
    display: 'flex',
    alignSelf: 'center',
    marginTop: 31,
  },
  txt: {
    color: COLORS.dark,
    fontSize: 16,
    display: 'flex',
    alignSelf: 'center',
    fontWeight:"bold"
  },
});
