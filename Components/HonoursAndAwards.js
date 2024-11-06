import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import COLORS from './Color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import Loader from '../loader/Loader';
import axios from 'react-native-axios';
import {ApiURL} from '../helpers/axios';
import ImagePicker from 'react-native-image-crop-picker';
import {showMessage} from 'react-native-flash-message';
import {useIsFocused} from '@react-navigation/native';

const HonoursAndAwards = ({item}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [clubName, setClubName] = useState('');
  const [clubImage, setClubImage] = useState('');
  const [trofyImage, setTrofyImage] = useState('');
  const [trofyName, setTrofyName] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [honours, setHonours] = useState([]);
  const [expId, setExpId] = useState('');
  const [update, setUpdate] = useState(0);
  const [imageUpdate, setImageUpdate] = useState(0);
  const [imageUpdate1, setImageUpdate1] = useState(0);

  const isFocused = useIsFocused();

  async function viewData() {
    try {
     
      const pageData = await axios.get(
        `${ApiURL}view-experience/data/${item?.item?.id}`,
      );
      setHonours(pageData.data.data);
      setIsLoading(false);
    } catch (e) {
      console.log('ssss', e.message);
    }
  }

  useEffect(() => {
    viewData();
  }, [isFocused]);

  const userDetail = useSelector(state => state.user);
  const pickClubImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(coverimg => {
      setClubImage(coverimg.path);
      setImageUpdate(1);
    });
  };

  const trofyClubImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(coverimg => {
      setTrofyImage(coverimg.path);
      setImageUpdate1(1);
    });
  };

  const AddHonoursAndAward = async () => {
    setIsLoading(true);
    if (clubName.trim() == '' || trofyName.trim() == '') {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'All fields is required to be filled.',
      });
      setIsLoading(false);
    } else if (clubImage.trim() == '') {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Club image required to be filled.',
      });
      setIsLoading(false);
    } else if (trofyImage.trim() == '') {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Trofy image required to be filled.',
      });
      setIsLoading(false);
    } else {
      setIsVisible(false);
      try {
        let formdata = new FormData();
        formdata.append('uiid', userDetail?.userData?.id);
        formdata.append('clubName', clubName);
        formdata.append('clubImage', {
          uri: clubImage,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
        formdata.append('trofyName', trofyName);
        formdata.append('trofyImage', {
          uri: trofyImage,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
        const res = await axios.post(`${ApiURL}add-honours`, formdata, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(res.data);
        if (res.data.success) {
          showMessage({
            type: 'success',
            icon: 'success',
            message: res.data.message,
          });
        }
        setIsLoading(false);
        viewData();
      } catch (error) {
        console.log(error);
        await setIsVisible(false);
        setIsLoading(false);
      }
    }
  };

  function EditHonours(item) {
    setClubName(item.clubName);
    setTrofyImage(item.trofyImage);
    setTrofyName(item.trofyName);
    setClubImage(item.clubImage);
    setExpId(item?.id);
    setImageUpdate(0);
    setIsVisible(!isVisible);
    setUpdate(1);
  }

  const DeleteData = async item => {
    try {
      const data = await axios.get(`${ApiURL}delete-honour/${item}`);
      viewData();
      console.log(data.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  function OpenModal() {
    setClubName('');
    setClubImage('');
    setTrofyImage('');
    setTrofyName('');
    setIsVisible(!isVisible);
    setUpdate(0);
  }

  async function updateHonourData() {
    setIsLoading(true);
    if (clubName.trim() == '' || trofyName.trim() == '') {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'All fields is required to be filled.',
      });
      setIsLoading(false);
    } else if (clubImage.trim() == '') {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Club image required to be filled.',
      });
      setIsLoading(false);
    } else if (trofyImage.trim() == '') {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Trofy image required to be filled.',
      });
      setIsLoading(false);
    } else {
      setIsVisible(false);
      try {
        let formdata = new FormData();
        formdata.append('uiid', userDetail?.userData?.id);
        formdata.append('id', expId);
        formdata.append('imageUpdate', imageUpdate);
        formdata.append('imageUpdate1', imageUpdate1);
        formdata.append('clubName', clubName);
        if (imageUpdate == 1) {
          formdata.append('clubImage', {
            uri: clubImage,
            name: 'image.jpg',
            type: 'image/jpeg',
          });
        } else {
          formdata.append('clubImage', clubImage);
        }
        formdata.append('trofyName', trofyName);
        if (imageUpdate1 == 1) {
          formdata.append('trofyImage', {
            uri: trofyImage,
            name: 'image.jpg',
            type: 'image/jpeg',
          });
        } else {
          formdata.append('trofyImage', trofyImage);
        }
        const res = await axios.post(`${ApiURL}update-honours`, formdata, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(res.data);
        if (res.data.success) {
          showMessage({
            type: 'success',
            icon: 'success',
            message: res.data.message,
          });
        }
        setIsLoading(false);
        viewData();
      } catch (error) {
        console.log(error);
        await setIsVisible(false);
        setIsLoading(false);
      }
    }
  }

  return (
    <View style={{marginBottom: 10}}>
      <>
        <View
          style={{
            backgroundColor: COLORS.dark,
            paddingLeft: 15,
            paddingTop: 15,
            paddingBottom: 10,
            borderColor: COLORS.white,
            borderBottomColor: COLORS.lightGrey,
            borderWidth: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 15,
              backgroundColor: COLORS.dark,
            }}>
            <Text
              style={{fontSize: 18, fontWeight: 'bold', color: COLORS.white}}>
              Honours & Awards
            </Text>
            {item?.item?.id == userDetail?.userData?.id ? (
              <TouchableOpacity onPress={() => OpenModal()}>
                <FontAwesome
                  style={{marginLeft: 10, color: COLORS.white}}
                  name="plus"
                  size={responsiveFontSize(2)}
                />
              </TouchableOpacity>
            ) : (
              ''
            )}
          </View>
          {honours.map(item => (
            <>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <View style={{paddingTop: 10}}>
                  <Image
                    style={{
                      borderRadius: responsiveWidth(7),
                      width: Dimensions.get('screen').width - 340,
                      height: Dimensions.get('screen').width - 340,
                      resizeMode: 'cover',
                      borderWidth:.5,
                      borderColor:COLORS.white
                    }}
                    source={{uri: `${item.trofyImage}`}}
                  />
                </View>
                <View style={{paddingTop: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: responsiveWidth(2),
                      alignItems: 'center',
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        width: responsiveWidth(37),
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: COLORS.white,
                      }}>
                      {item.trofyName}
                    </Text>
                    <TouchableOpacity onPress={() => EditHonours(item)}>
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
                  </View>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <View style={{paddingTop: 10}}>
                  <Image
                    style={{
                      borderRadius: responsiveWidth(7),
                      width: Dimensions.get('screen').width - 340,
                      height: Dimensions.get('screen').width - 340,
                      resizeMode: 'cover',
                      borderWidth:.5,
                      borderColor:COLORS.white
                    }}
                    source={{uri: `${item.clubImage}`}}
                  />
                </View>
                <View style={{paddingTop: 10, marginLeft: responsiveWidth(2)}}>
                  <Text
                    style={{
                      width: responsiveWidth(78),
                      fontSize: 14,
                      color: COLORS.white,
                    }}>
                    {item?.clubName}
                  </Text>
                </View>
              </View>
            </>
          ))}
        </View>

        <Modal isVisible={isVisible}>
          <View
            style={{
              backgroundColor: COLORS.dark,
              padding: responsiveFontSize(2),
              alignItems: 'center',
              borderWidth:1,
              borderColor:COLORS.white
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
            <TouchableOpacity
              onPress={() => trofyClubImage()}
              style={{
                width: responsiveWidth(73),
                marginTop: 10,
                height: responsiveHeight(10),
                borderWidth: responsiveFontSize(0.2),
                borderColor: COLORS.white,
                borderStyle: 'dotted',
                borderRadius: responsiveFontSize(0.5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {trofyImage ? (
                <Image
                  source={{uri: `${trofyImage}`}}
                  style={{
                    width: responsiveWidth(10),
                    height: responsiveWidth(10),
                    borderWidth:.5,borderColor:COLORS.white
                  }}
                />
              ) : (
                <FontAwesome
                  name="cloud-upload"
                  size={responsiveFontSize(3.5)}
                  color={COLORS.white}
                />
              )}
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: responsiveFontSize(1.8),
                }}>
                Upload Trofy image
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              onChangeText={trofyName => setTrofyName(trofyName)}
              value={trofyName}
              placeholder="Enter match name"
              placeholderTextColor={COLORS.white}
            />
            <TouchableOpacity
              onPress={() => pickClubImage()}
              style={{
                width: responsiveWidth(73),
                marginTop: 16,
                height: responsiveHeight(10),
                borderWidth: responsiveFontSize(0.2),
                borderColor: COLORS.white,
                borderStyle: 'dotted',
                borderRadius: responsiveFontSize(0.5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {clubImage ? (
                <Image
                  source={{uri: `${clubImage}`}}
                  style={{
                    width: responsiveWidth(10),
                    height: responsiveWidth(10),
                    borderWidth:.5,
                    borderColor:COLORS.white
                  }}
                />
              ) : (
                <FontAwesome
                  name="cloud-upload"
                  size={responsiveFontSize(3.5)}
                  color={COLORS.white}
                />
              )}
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: responsiveFontSize(1.8),
                }}>
                Upload club image
              </Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              onChangeText={clubName => setClubName(clubName)}
              value={clubName}
              placeholder="Enter club name"
              placeholderTextColor={COLORS.white}
            />

            {update == 0 ? (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => AddHonoursAndAward()}>
                <Text style={styles.txt}>Submit</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => updateHonourData()}>
                <Text style={styles.txt}>Update</Text>
              </TouchableOpacity>
            )}
          </View>
        </Modal>
        <Loader visible={isloading} />
      </>
    </View>
  );
};

export default HonoursAndAwards;

const styles = StyleSheet.create({
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
  textArea: {
    marginTop: 20,
    height: responsiveHeight(15),
    borderWidth: 1,
    padding: 15,
    borderColor: '#D7D7D7',
    width: '90%',
    borderRadius: 10,
    color: '#000000',
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
    borderWidth:1,
    borderColor:COLORS.white
  },
  txt: {
    color: COLORS.dark,
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    display: 'flex',
    alignSelf: 'center',
  },
});
