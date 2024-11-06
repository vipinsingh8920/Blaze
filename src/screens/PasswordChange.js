import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  StatusBar,
  platForm,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../Components/Color';
import {postData} from '../../helpers/axios';
import {showMessage} from 'react-native-flash-message';

const PasswordChange = ({navigation, route}) => {
  const {email} = route.params;

  const [toggle, setToggle] = useState(true);
  const [pass, setPass] = useState('');
  const [newPass, setNewPass] = useState('');


  const PassChange = async () => {
    if (pass !== newPass) {
      showMessage({
        message: 'Password does not match!',
        type: 'danger',
        icon: 'danger',
      });
    } else {
      let body = {
        email: email,
        new_password: newPass,
      };
      let res = await postData(`update-password`, body);
      if(res.success==true){
        navigation.navigate('onboardScreen')
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.dark}}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.headerColor} />
      <View
        style={{
          backgroundColor: COLORS.headerColor,
          height: responsiveHeight(5),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
            width: '100%',
            marginTop: platForm == 'ios' ? responsiveHeight(5) : 0,
            flexDirection: 'row',
          }}>
          <View style={styles.header}>
            <MaterialIcons
              name="chevron-left"
              size={30}
              color={COLORS.dark}
              style={{paddingLeft: 10}}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </View>

      <View style={styles.centeredView}>
        <View style={{}}>
          <View style={{marginTop: 30, alignItems: 'center'}}>
            <View style={{marginTop: responsiveHeight(7)}}>
              <Text style={styles.txt}>New Password</Text>
              <View style={styles.box1}>
                <TextInput
                  value={pass}
                  placeholder="Enter new password"
                  placeholderTextColor={COLORS.Grey}
                  style={{
                    color: COLORS.white,
                    marginLeft: 5,
                    width: responsiveWidth(78),
                  }}
                  onChangeText={val => setPass(val)}
                  secureTextEntry={toggle}
                  multiline={false}
                />
             
                  <Entypo
                    name={toggle?"eye-with-line":"eye"}
                    size={22}
                    color={COLORS.white}
                    onPress={() => setToggle(!toggle)}
                  />
               
              </View>

              <Text style={[styles.txt, {marginTop: responsiveHeight(3)}]}>
                Confirm New Password
              </Text>
              <View style={styles.box1}>
                <TextInput
                  value={newPass}
                  placeholder="Enter new password"
                  placeholderTextColor={COLORS.Grey}
                  style={{
                    color: COLORS.white,
                    marginLeft: 5,
                    width: responsiveWidth(78),
                  }}
                  onChangeText={val => setNewPass(val)}
                  secureTextEntry={toggle}
                  multiline={false}
                />
                <Entypo
                    name={toggle?"eye-with-line":"eye"}
                    size={22}
                    color={COLORS.white}
                    onPress={() => setToggle(!toggle)}
                  />
              </View>
            </View>

            <Pressable onPress={() => PassChange()}>
              <View style={styles.btn}>
                <Text style={styles.btntxt}>Submit</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PasswordChange;

const styles = StyleSheet.create({
  btntxt: {
    color: COLORS.dark,
    fontWeight: 'bold',
  },
  box1: {
    height: responsiveHeight(7),
    width: responsiveWidth(90),
    borderWidth: 1,
    borderColor: COLORS.white,
    flexDirection: 'row',
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
  },
  txt: {
    color: COLORS.lightGrey,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  btn: {
    height: responsiveHeight(6),
    width: responsiveWidth(80),
    backgroundColor: COLORS.headerColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(5),
    borderRadius: responsiveWidth(2),
  },
});
