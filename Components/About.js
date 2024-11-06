import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import COLORS from './Color';
import Experience from './Experience';
import HonoursAndAwards from './HonoursAndAwards';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {ApiURL, getData, postData} from '../helpers/axios';
import axios from 'react-native-axios';
import Loader from '../loader/Loader';
import {useIsFocused} from '@react-navigation/native';

export default function About({item}) {
  const [isVisible, setIsVisible] = useState(false);
  const [aboutMe, setAboutMe] = useState('');
  const userDetail = useSelector(state => state.user);
  const [isloading, setIsLoading] = useState(false);
  const [stadium, setStadium] = useState('Max Stadium');
  const [id, setId] = useState('');
  const [result, setResult] = useState();

  const isFocused = useIsFocused();

  const AddData = async () => {
    let body = {
      uiid: item?.item.id,
      about: aboutMe,
      our_stedium: stadium,
    };

    let res = await postData(`add-about-section`, body);
    if (res?.success == true) {
      GetData();
      setIsVisible(false);
      console.log(res.data);
    } else {
      alert('error...');
    }
  };
  //console.log(item.item.id)
  const GetData = async () => {
    let res = await getData(`add-about-section-get/${item?.item.id}`);
    setAboutMe(res.data == null ? res?.data : res?.data.about);
    setId(res.data == null ? res?.data : res?.data.id);
  };

  useEffect(() => {
    GetData();
  }, [isFocused]);

  const UpdateData = async () => {
    let body = {
      id: id,
      about: aboutMe,
      our_stedium: stadium,
    };
    let res = await postData(`update-about-section`, body);
    console.log(res);
    GetData();
    setIsVisible(false);
  };

  return (
    <ScrollView>
      <View style={{backgroundColor: COLORS.dark, width: '100%'}}>
        <View
          style={{
            flex: 1,
            paddingLeft: 15,
            paddingTop: 15,
            backgroundColor: COLORS.dark,
            marginTop: 10,
            marginBottom: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{fontSize: 18, fontWeight: 'bold', color: COLORS.white}}>
              About
            </Text>
            {item?.item?.id == userDetail?.userData?.id ? (
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => setIsVisible(!isVisible)}>
                {aboutMe == null ? (
                  <FontAwesome
                    style={{marginLeft: 10, color: COLORS.white}}
                    name="plus"
                    size={responsiveFontSize(2)}
                  />
                ) : (
                  <FontAwesome
                    style={{marginLeft: 10, color: COLORS.white}}
                    name="pencil"
                    size={responsiveFontSize(2)}
                  />
                )}
              </TouchableOpacity>
            ) : (
              ''
            )}
          </View>

          <View>
            {aboutMe == null ? (
              <Text
                style={{
                  paddingRight: 10,
                  paddingTop: 10,
                  paddingBottom: 20,
                  color: COLORS.Grey,
                }}>
                Player does not add about section.
              </Text>
            ) : (
              <Text
                style={{
                  paddingRight: 10,
                  paddingTop: 10,
                  paddingBottom: 20,
                  color: COLORS.Grey,
                }}>
                {aboutMe}
              </Text>
            )}
          </View>
        </View>

        <Experience item={item} />
      </View>
      {/* honours & awards */}
      <HonoursAndAwards item={item} />

      <Modal isVisible={isVisible}>
        <View
          style={{
            backgroundColor: COLORS.dark,
            padding: responsiveFontSize(2),
            borderWidth: 1,
            borderColor: COLORS.white,
            borderRadius:responsiveWidth(2)
          }}>
          <TouchableOpacity
            onPress={() => setIsVisible(!isVisible)}
            style={{alignItems: 'flex-end', width: '100%'}}>
            <FontAwesome
              name="window-close"
              color={COLORS.white}
              size={responsiveFontSize(3)}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.textArea}
            textAlignVertical="top"
            onChangeText={aboutMe => setAboutMe(aboutMe)}
            value={aboutMe}
            placeholder="Message"
            multiline={true}
            numberOfLines={4}
            placeholderTextColor={COLORS.lightGrey}
          />

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              aboutMe == null ? AddData() : UpdateData();
            }}>
            {aboutMe == null ? (
              <Text style={styles.txt}>Add</Text>
            ) : (
              <Text style={styles.txt}>Update</Text>
            )}
          </TouchableOpacity>
        </View>
      </Modal>
      <Loader visible={isloading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textArea: {
    marginTop: 20,
    height: responsiveHeight(15),
    borderWidth: 1,
    padding: 15,
    borderColor: '#D7D7D7',
    width: '90%',
    borderRadius: 10,
    color: COLORS.white,
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
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    display: 'flex',
    alignSelf: 'center',
  },
});
