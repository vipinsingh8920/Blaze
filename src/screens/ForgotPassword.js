import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './Style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../Components/Color';
import {useNavigation} from '@react-navigation/native';
import {getData, postData} from '../../helpers/axios';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {SaveOtp} from '../../reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../loader/Loader';

export default function ForgotPassword() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [visible,setVisible] = useState(false);

  const SendOtp = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setVisible(true);
    if (email.trim() === '') {
      showMessage({
        message: 'Email id is Required()*',
        type: 'danger',
        icon: 'danger',
      });
      setVisible(false);
    } else if (reg.test(email) === false) {
      showMessage({
        message: 'Email is not correct!',
        type: 'danger',
        icon: 'danger',
      });
      setVisible(false);
    } else {
      let data = {
        email: email,
      };
      let res = await postData(`sendotp`, data);
      if (res.success == true) {
        await AsyncStorage.setItem('otp', JSON.stringify(res?.data?.otp));
        navigation.navigate('OTPScreen',{email:email});
        setVisible(false);
      } else {
        Alert('error');
        setVisible(false);
      }
    }
  };

  return (
    <View style={{flex: 1, width: '100%', backgroundColor: COLORS.dark}}>
      <View style={{marginTop: 30}}>
        <Icon
          name="chevron-left"
          size={30}
          color={COLORS.white}
          style={{paddingLeft: 10}}
          onPress={navigation.goBack}
        />
      </View>
      <View style={styles.forgotpass}>
        <View style={styles.passwInp}>
          <Text style={styles.emaill}>Enter Email address</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="Enter Email Address"
            placeholderTextColor={COLORS.lightGrey}
            onChangeText={val => setEmail(val)}
          />
        </View>
        <TouchableOpacity style={styles.requestbtn} onPress={() => SendOtp()}>
          <Text style={styles.request}>Send OTP</Text>
        </TouchableOpacity>
      </View>
      <Loader visible={visible}/>
    </View>
  );
}
