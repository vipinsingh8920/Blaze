import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StatusBar,
  platForm,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../Components/Color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getData, ImageURL, postData } from '../../helpers/axios';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Notification = ({navigation}) => {
 
const isFocused=useIsFocused();

  const {userData}=useSelector(state=>state.user);
  const [notiData,setNotiData] = useState([]);
  const [status,setStatus] = useState();
 

const StatusUpdate=async(item)=>{
  let res=await getData(`read-notification/${item.sender_id}/${item.reciver_id}`)
 setStatus(res.data[0].message_status);
   navigation.navigate('UserList');
}

  useEffect(()=>{
    GetStatus();
  },[isFocused])

const GetStatus=async()=>{
  let res2=await getData(`get-notification/${userData.id}`)
  setNotiData(res2.data);
  setStatus(res2.data[0].message_status)
}

  const renderItem = ({item, index}) => {
 
  return (
      <View key={index}>
        <TouchableOpacity onPress={()=>StatusUpdate(item)}>
        <View style={styles.notibox1}>
          <View style={styles.iconview}>
            <Image
            source={{uri:`${item.sender_photo}`}}
            style={{
              height:responsiveHeight(8),
              width:responsiveWidth(16),
              borderRadius:responsiveWidth(10)
            }}
            />
          </View>
          <View style={styles.txtview}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: responsiveWidth(67),
               
              }}>
              <ScrollView style={{flexDirection:"row"}}>
              {status==0?  <Text
                  style={[
                    styles.todaytxt,
                    {
                      marginTop: responsiveHeight(1),
                      width: responsiveWidth(53),
                      color:status==1?COLORS.white:COLORS.lightGrey,
                     
                    },
                  ]}>
                    {item.sender_name} Message you !
                
                </Text>
:
                <Text
                  style={[
                    styles.todaytxt,
                    {
                      marginTop: responsiveHeight(1),
                      width: responsiveWidth(55),
                      color:COLORS.lightGrey
                    },
                  ]}>
                    {item.sender_name} 
                
                </Text>
}
              </ScrollView>
              <Text style={styles.timetxt}>2 hour</Text> 
            </View>

              <Text
                style={[styles.titletxt2, {marginTop: responsiveHeight(0.8),overflow:"scroll"}]}>
             {item.sender_name} is waiting for response!
              </Text>
               
          </View>
        </View>
        </TouchableOpacity>
      </View>
    );
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
            onPress={()=>navigation.goBack()}
          />
          </View>
          <Text style={[styles.profiltxt]}>Notifications</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Text style={styles.todaytxt}>Today</Text> */}

        {notiData.map((item, index) => {
          return renderItem({item, index});
        })}
       
        <View style={{height: 10}} />
      </ScrollView>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  todaytxt: {
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(3),
    fontWeight: 'bold',
    width: responsiveWidth(53),
  },
  notibox1: {
    height: responsiveHeight(12),
    width: responsiveWidth(90),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(2),
    borderRadius: responsiveWidth(2),
    backgroundColor: COLORS.darkgrey,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: COLORS.lightGrey,
  },
  iconview: {
    height: responsiveHeight(10),
    width: responsiveWidth(20),
    borderRadius: responsiveWidth(3),
    marginLeft: responsiveWidth(1),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:COLORS.darkgrey2,
    borderRadius:responsiveWidth(2)
  },
  titletxt2: {
    color:COLORS.Grey,
    marginLeft: responsiveWidth(3),
    fontSize: responsiveFontSize(1.6),
    height:responsiveHeight(4.5),

  },
  timetxt: {
    color: COLORS.Grey,
    marginTop: responsiveHeight(0),
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
   
  },
  txtview: {
    height: responsiveHeight(10),
    width: responsiveWidth(56),

  },
  backbtnview: {
    height: responsiveHeight(8),
    width: responsiveWidth(100),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.darkblue,
  },
  profiltxt: {
    color: COLORS.dark,
    fontSize: responsiveFontSize(2.6),
    fontWeight: '900',
    marginLeft: responsiveWidth(23),
  },
});
