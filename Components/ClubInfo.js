import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import COLORS from './Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {getData, postData} from '../helpers/axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';

const ClubInfo = ({item}) => {

const userDetail=useSelector(state=>state.user);


  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [about, setAbout] = useState('');
  const [stadium, setStadium] = useState('');
  const [id, setId] = useState('');
  const [result,setResult] = useState('');


  const AddData = async () => {
    
    let body = {
      uiid: item.id,
      about,
      our_stedium: stadium,
    };

    let res = await postData(`add-about-section`, body);
    if (res?.success == true) {
      setToggle(false);
      GetData();
      console.log(res.data);
    } else {
      alert('error...');
    }
  };

  const GetData = async () => {
    let res = await getData(`add-about-section-get/${item?.id}`);
    setResult(res.data);
    setAbout(res?.data.about);
    setStadium(res?.data.our_stedium);
    setId(res?.data.id);
  };

  useEffect(() => {
    GetData();
  }, []);

  const UpdateData = async () => {
    let body = {
      id: id,
      about,
      our_stedium: stadium,
    };

    let res = await postData(`update-about-section`, body);
    console.log(res);
    GetData();
    setToggle(false);
    setToggle1(false);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingLeft: 15,
          paddingTop: 15,
          backgroundColor: COLORS.dark,
          marginTop: 10,
          marginBottom: 10,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '95%',
          }}>
          <View>
            <Text
              style={{fontSize: 18, fontWeight: 'bold', color: COLORS.white}}>
              About
            </Text>
          </View>
        {userDetail?.userData?.id==item.id?  <TouchableOpacity
            onPress={() => setToggle(true)}
            style={{
              backgroundColor: COLORS.headerColor,
              borderRadius: 100,
              padding: 5,
            }}>
            {result ? (
              <AntDesign
                name="edit"
                size={20}
                color={COLORS.dark}
                style={{justifyContent: 'center'}}
              />
            ) : (
              <Ionicons
                name="add"
                size={20}
                color={COLORS.white}
                style={{justifyContent: 'center'}}
              />
            )}
          </TouchableOpacity>:""}
        </View>

        <View>
          <Text
            style={{
              paddingRight: 10,
              paddingTop: 10,
              paddingBottom: 20,
              color: COLORS.lightGrey,
            }}>
            {about}
          </Text>
        </View>
      </View>

      <View
        style={{
          paddingLeft: 15,
          paddingTop: 15,
          backgroundColor: COLORS.dark,
          marginTop: 10,
          marginBottom: 10,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '95%',
          }}>
          <View>
            <Text
              style={{fontSize: 18, fontWeight: 'bold', color: COLORS.white}}>
              Our Stadiums
            </Text>
          </View>
       {userDetail?.userData?.id==item.id?   <TouchableOpacity
            onPress={() => setToggle1(true)}
            style={{
              backgroundColor: COLORS.headerColor,
              borderRadius: 100,
              padding: 5,
            }}>
            {result ? (
              <AntDesign
                name="edit"
                size={20}
                color={COLORS.dark}
                style={{justifyContent: 'center'}}
              />
            ) : (
              <Ionicons
                name="add"
                size={20}
                color={COLORS.white}
                style={{justifyContent: 'center'}}
              />
            )}
          </TouchableOpacity>:""}
        </View>

        <View>
          <Text
            style={{
              paddingRight: 10,
              paddingTop: 10,
              paddingBottom: 20,
              color: COLORS.lightGrey,
            }}>
            {stadium}
          </Text>
        </View>
      </View>
      <Modal visible={toggle} transparent={true} animationType="slide">
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              height: responsiveHeight(25),
              width: responsiveWidth(90),
              backgroundColor: COLORS.dark,
              borderRadius: responsiveWidth(2),
              borderWidth:1,
              borderColor:COLORS.white
            }}>
            <TextInput
              placeholder="Enter Text..."
              placeholderTextColor={COLORS.white}
              value={about}
              onChangeText={val => setAbout(val)}
              style={{
                color: COLORS.white,
                height: responsiveHeight(20),
                width: responsiveWidth(90),
              }}
            />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  result ? UpdateData() : AddData();
                }}>
                <View
                  style={{
                    height: responsiveHeight(5),
                    width: responsiveWidth(45),
                    backgroundColor: COLORS.headerColor,
                    borderBottomLeftRadius: responsiveWidth(2),
                    borderRightWidth: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: COLORS.dark,
                  }}>
                  <Text style={{color: COLORS.dark, fontWeight: 'bold'}}>
                    Add
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setToggle(false)}>
                <View
                  style={{
                    height: responsiveHeight(5),
                    width: responsiveWidth(45),
                    backgroundColor: COLORS.headerColor,
                    borderLeftWidth: 0.5,
                    borderBottomRightRadius: responsiveWidth(2),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: COLORS.dark,
                  }}>
                  <Text style={{color: COLORS.dark,fontWeight:'bold'}}>
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={toggle1} transparent={true} animationType="slide">
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              height: responsiveHeight(25),
              width: responsiveWidth(90),
              backgroundColor: COLORS.dark,
              borderRadius: responsiveWidth(2),
              borderWidth:1,
              borderColor:COLORS.white
            }}>
            <TextInput
              placeholder="Enter Text..."
              placeholderTextColor={COLORS.white}
              value={stadium}
              onChangeText={val => setStadium(val)}
              style={{
                color: COLORS.white,
                height: responsiveHeight(20),
                width: responsiveWidth(90),
              }}
            />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  result ? UpdateData() : AddData();
                }}>
                <View
                  style={{
                    height: responsiveHeight(5),
                    width: responsiveWidth(45),
                    backgroundColor: COLORS.headerColor,
                    borderBottomLeftRadius: responsiveWidth(2),
                    borderRightWidth: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: COLORS.dark,
                  }}>
                  <Text style={{color: COLORS.dark, fontWeight: 'bold'}}>
                    Add
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setToggle1(false)}>
                <View
                  style={{
                    height: responsiveHeight(5),
                    width: responsiveWidth(45),
                    backgroundColor: COLORS.headerColor,
                    borderLeftWidth: 0.5,
                    borderBottomRightRadius: responsiveWidth(2),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: COLORS.dark,
                  }}>
                  <Text style={{color: COLORS.dark, fontWeight: 'bold'}}>
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ClubInfo;
