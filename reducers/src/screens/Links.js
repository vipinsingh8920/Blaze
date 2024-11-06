import React, {useEffect, useState} from 'react';
import {
  View,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import COLORS from '../../Components/Color';
import Modal from 'react-native-modal';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {ApiURL, postData} from '../../helpers/axios';
import {showMessage} from 'react-native-flash-message';
import axios from 'react-native-axios';
import Loader from '../../loader/Loader';
import { useIsFocused } from '@react-navigation/native';

export default function Links({item}) {

const isFocused=useIsFocused();

  const [isVisible, setIsVisible] = useState(false);
  const [social, setSocial] = useState('');
  const [update, setUpdate] = useState(0);
  const userDetail = useSelector(state => state.user);
  const [socialMediaLink, setSocialMediaLink] = useState('');
  const [data, setData] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [expId, setExpId] = useState('');

  function OpenModal() {
    setIsVisible(!isVisible);
    setSocial('');
    setSocialMediaLink('');
    setUpdate(0);
  }
  async function ViewData() {
    try {
      setIsLoading(true);
      const resultData = await axios.get(
        `${ApiURL}view-social-link/${item.item.id}`,
      );
      
      setData(resultData.data.data);
      //console.log(resultData.data.data);
      setIsLoading(false);
    } catch (e) {
      console.log('ssss', e.message);
      setIsLoading(false);
    }
  }
  async function AddData() {
    setIsLoading(true);
    try {
      if (social.trim() == '' || socialMediaLink.trim() == '') {
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'All fields is required to be filled.',
        });
        setIsLoading(false);
      } else {
        const insertBody = {
          uid: item.item.id,
          title: social,
          link: socialMediaLink,
        };
        const addDataResult = await postData('add-social-link', insertBody);
        setIsLoading(false);
        showMessage({
          type: 'success',
          icon: 'success',
          message: addDataResult.message,
        });
        setSocial('');
        setSocialMediaLink('');
        ViewData();
        OpenModal();

        //console.log(addDataResult)
      }
    } catch (error) {
      console.log('ssss', error.message);
      setIsLoading(false);
    }
  }
  function viewEdit(item) {
    setUpdate(1);
    setIsVisible(!isVisible);
    setSocial(item.title);
    setExpId(item.id);
    setSocialMediaLink(item.link);
  }
  async function EditData() {
    setIsLoading(true);
    try {
      if (social.trim() == '' || socialMediaLink.trim() == '') {
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'All fields is required to be filled.',
        });
        setIsLoading(false);
      } else {
        const insertBody = {
          uid: userDetail.userData.id,
          title: social,
          id: expId,
          link: socialMediaLink,
        };
        const addDataResult = await postData('edit-social-link', insertBody);
        setIsLoading(false);
        showMessage({
          type: 'success',
          icon: 'success',
          message: addDataResult.message,
        });
        setSocial('');
        setSocialMediaLink('');
        OpenModal();
        ViewData();
        console.log(addDataResult);
      }
    } catch (error) {
      console.log('ssss', error.message);
      setIsLoading(false);
    }
  }
  async function DeleteData(item) {
    Alert.alert('Delete', 'Do you want to delete this?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          try {
            setIsLoading(true);
            await axios.get(`${ApiURL}delete-social-link/${item}`);
            ViewData();
            setIsLoading(false);
          } catch (e) {
            setIsLoading(false);
            console.log(e.message);
          }
        },
      },
    ]);
  }
  useEffect(() => {
    ViewData();
  }, [isFocused]);
  return (
    <View
      style={{
        marginTop: 20,
        backgroundColor: COLORS.dark,
        paddingBottom: 20,
        paddingTop: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: responsiveWidth(2),
          backgroundColor: COLORS.dark,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: COLORS.white}}>
          Social media link
        </Text>
       {item.item.id==userDetail?.userData.id? <TouchableOpacity onPress={() => OpenModal()}>
          <FontAwesome
            style={{marginLeft: 10, color: COLORS.white}}
            name="plus"
            size={responsiveFontSize(2)}
          />
        </TouchableOpacity>:""}
      </View>
      {data.length > 0 &&
        data.map((item,index) => {
          //console.log(item)
          return(
          <View key={index}>
          <View
            style={{
              marginTop: responsiveHeight(1.7),
              marginHorizontal: responsiveWidth(2),
              flexDirection: 'column',
            }} >
            <View
              style={{
                flexDirection: 'row',
                width: responsiveWidth(95),
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.8),
                  fontWeight: '600',
                  color: COLORS.white,
                }}>
                {item.title}
              </Text>
              {item.uid==userDetail?.userData.id?<View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => viewEdit(item)}>
                  <FontAwesome
                    style={{marginLeft: 10, color: COLORS.white}}
                    name="pencil"
                    size={responsiveFontSize(2)}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => DeleteData(item.id)}>
                  <FontAwesome
                    style={{marginLeft: 10}}
                    color={COLORS.warning}
                    name="trash"
                    size={responsiveFontSize(2)}
                  />
                </TouchableOpacity>
              </View>:""}
            </View>
            <Text
              style={{
                fontSize: responsiveFontSize(1.8),
                fontWeight: '600',
                color: COLORS.lightGrey,
              }}>
              {item.link}
            </Text>
          </View>
          </View>
        )})}

      <Modal isVisible={isVisible}>
        <View
          style={{
            backgroundColor: COLORS.dark,
            padding: responsiveFontSize(2),
            alignItems: 'center',
            borderWidth:1,
            borderColor:COLORS.white,
            borderRadius:responsiveWidth(2)
          }}>
          <TouchableOpacity
            onPress={() => OpenModal()}
            style={{alignItems: 'flex-end', width: '100%'}}>
            <FontAwesome
              name="window-close"
              color={COLORS.white}
              size={responsiveFontSize(3)}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            onChangeText={social => setSocial(social)}
            value={social}
            placeholder="Enter socail media name (Required)"
            placeholderTextColor={COLORS.lightGrey}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={socialMediaLink =>
              setSocialMediaLink(socialMediaLink)
            }
            value={socialMediaLink}
            placeholder="Enter  socail media link (Required)"
            placeholderTextColor={COLORS.lightGrey}
          />
          {update == 1 ? (
            <TouchableOpacity style={styles.btn} onPress={() => EditData()}>
              <Text style={styles.txtBtn}>Update</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.btn} onPress={() => AddData()}>
              <Text style={styles.txtBtn}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
      {/* <Loader visible={isloading} /> */}
      {isloading&&<View
        style={{
          position: 'absolute',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}>
        <ActivityIndicator size={'large'} />
      </View>}
    </View>
  );
}
const styles = StyleSheet.create({
  fieldSet: {
    margin: 10,
    // padding: 5,
    height: '20%',
    borderRadius: 5,
    borderWidth: 1,
    // alignItems: 'center',
    borderColor: COLORS.lightGrey,
    width: '90%',
    // display: 'flex',
    // alignSelf: 'center'
  },
  input: {
    marginTop: 20,
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
  legend: {
    position: 'absolute',
    top: -10,
    left: 10,
    fontWeight: 'bold',
    backgroundColor: '#FFF',
    color: COLORS.purple,
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
    fontSize: 12,
    color: COLORS.dark,
  },
  txtBtn: {
    color: COLORS.dark,
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    display: 'flex',
    alignSelf: 'center',
  },
});
