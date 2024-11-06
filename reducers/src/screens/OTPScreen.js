import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  platForm,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import COLORS from '../../Components/Color';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OTPTextInput from 'react-native-otp-textinput';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

const OTPScreen = ({navigation,route}) => {
const {email}=route.params;

const isFocused=useIsFocused();

  const [value, setValue] = useState('');
  const [otp,setOtp] = useState('');


  const setText = val => {
    setValue(val);
  };

useEffect(()=>{
    GetOtp();
},[isFocused])

const GetOtp=async()=>{
    const result=await AsyncStorage.getItem('otp');
    setOtp(result)
}

const SubmitOtp=()=>{
    if(value.length==0){
        showMessage({
            message:"Email is Required ()*",
            type:"danger",
            icon:"danger"
        })
    }else if (value!==otp){
        showMessage({
            message:"Please enter a valid Otp!",
            type:"danger",
            icon:"danger"
        })
    }else{
       navigation.navigate('PasswordChange',{email:email})
    }
}

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
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: responsiveHeight(5),
        }}>
        <Image
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/009/387/014/original/otp-authentication-and-secure-verification-never-share-otp-and-bank-details-concept-vector.jpg',
          }}
          style={{
            height: responsiveHeight(15),
            width: responsiveWidth(30),
            borderRadius: responsiveWidth(100),
          }}
        />
        <Text style={styles.otptxt}>OTP Verification</Text>
        <Text style={styles.subtxt}>Enter the OTP sent your email!</Text>
      </View>
      <View style={{alignItems: 'center', marginTop: responsiveHeight(2)}}>
        <OTPTextInput
          handleTextChange={val => setText(val)}
          inputCellLength={1}
          tintColor={COLORS.headerColor}
          inputCount={6}
          textInputStyle={{
            color: COLORS.white,
            width: responsiveWidth(12),
          }}
        />

        <Pressable onPress={() => SubmitOtp()}>
          <View style={styles.btn}>
            <Text style={styles.btntxt}>Submit</Text>
          </View>
        </Pressable>
      </View>

    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  otptxt: {
    color: COLORS.white,
    fontSize: responsiveFontSize(3.3),
    fontWeight: 'bold',
    marginTop: responsiveHeight(1),
  },
  subtxt: {
    color: COLORS.lightGrey,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
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
  btntxt: {
    color: COLORS.dark,
    fontWeight: 'bold',
  },

  txt:{
    color:COLORS.lightGrey,
    fontWeight:"bold",
    marginBottom:2
  }
});
