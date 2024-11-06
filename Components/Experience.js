import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Dimensions,
  View,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import COLORS from './Color';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {ApiURL} from '../helpers/axios';
import axios from 'react-native-axios';
import Loader from '../loader/Loader';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ImagePicker from 'react-native-image-crop-picker';
import { useIsFocused } from '@react-navigation/native';

const Experience = ({item}) => {

const isFocused=useIsFocused();

  const [isVisible, setIsVisible] = useState(false);
  const [viewModel, setViewModel] = useState(false);

  const [clubName, setClubName] = useState('');
  const [experience, setExperience] = useState('');
  const [clubImage, setClubImage] = useState('');
  const [update, setUpdate] = useState(0);
  const userDetail = useSelector(state => state.user);
  const [expId, setExpId] = useState('');
  const [imageUpdate, setImageUpdate] = useState(0);
  const [experienceData, setExperienceData] = useState([]);

  async function viewData() {
    try {
      const pageData = await axios.get(
        `${ApiURL}view-experience/experiences/${item?.item?.id}`,
      );
      setExperienceData(pageData.data.data);
      setIsLoading(false);
    } catch (e) {
      console.log('ssss', e.message);
    }
  }

  useEffect(() => {
    viewData();
  }, [isFocused]);

  const AddExperience = async () => {
    setIsLoading(true);
    if (clubName.trim() == '' || experience.trim() == '') {
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
    } else {
      await setIsVisible(false);
      try {
        let formdata = new FormData();
        formdata.append('uiid', userDetail?.userData?.id);
        formdata.append('clubName', clubName);
        formdata.append('experience', experience);
        formdata.append('clubImage', {
          uri: clubImage,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
        const res = await axios.post(`${ApiURL}add-experience`, formdata, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        });
console.log('wqqqw',res)
        if (res.data.success) {
          showMessage({
            type: 'success',
            icon: 'success',
            message: res.data.message,
          });
          viewData();
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        await setIsVisible(false);
        setIsLoading(false);
      }
    }
  };

  const [isloading, setIsLoading] = useState(false);

  const pickClubImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(coverimg => {
      setImageUpdate(1);
      setClubImage(coverimg.path);
    });
  };

  function EditExperience(item) {
    setClubName(item?.clubName);
    setExperience(item?.experience);
    setClubImage(item?.clubImage);
    setExpId(item?.id);
    setImageUpdate(0);
    setIsVisible(!isVisible);
    setUpdate(1);
  }
  function OpenModal() {
    setClubName('');
    setExperience('');
    setClubImage('');
    setImageUpdate(0);
    setIsVisible(!isVisible);
    setUpdate(0);
  }

  function ViewDataModel(item) {
    setViewModel(!viewModel);
    setClubName(item.clubName);
    setExperience(item.experience);
    setClubImage(item.clubImage);
    console.log(item);
  }

  const UpdateExperience = async () => {
    setIsLoading(true);
    if (clubName.trim() == '' || experience.trim() == '') {
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
    } else {
      await setIsVisible(false);
      try {
        let formdata = new FormData();
        formdata.append('id', expId);
        formdata.append('imageUpdate', imageUpdate);
        formdata.append('uiid', userDetail?.userData?.id);
        formdata.append('clubName', clubName);
        formdata.append('experience', experience);
        if (imageUpdate == 1) {
          formdata.append('clubImage', {
            uri: clubImage,
            name: 'image.jpg',
            type: 'image/jpeg',
          });
        } else {
          formdata.append('clubImage', clubImage);
        }
        const res = await axios.post(`${ApiURL}edit-experience`, formdata, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(res.data);
        if (res.data.success) {
          viewData();
          showMessage({
            type: 'success',
            icon: 'success',
            message: res.data.message,
          });
        }
      } catch (error) {
        console.log(error);
        await setIsVisible(false);
        setIsLoading(false);
      }
    }
  };

  const DeleteExperience = async item => {
    console.log(`${ApiURL}delete-experience/${item}`);
    try {
      const data = await axios.get(`${ApiURL}delete-experience/${item}`);
      viewData();
      console.log(data.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <View>
        <>
          <View style={{paddingBottom: 10}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 15,
                paddingTop: 15,
                backgroundColor: COLORS.dark,
              }}>
              <Text
                style={{fontSize: 18, fontWeight: 'bold', color: COLORS.white}}>
                Experience
              </Text>
              {item?.item?.id==userDetail.userData?.id?<TouchableOpacity onPress={() => OpenModal()}>
                <FontAwesome
                  style={{marginLeft: 10,color:COLORS.white}}
                  name="plus"
                  size={responsiveFontSize(2)}
                />
              </TouchableOpacity>:""}
            </View>



            {experienceData.map((item,index) => {
             // console.log(item)
              return(
              <View key={index}>
              <TouchableOpacity
                onPress={() => ViewDataModel(item)}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  borderColor: COLORS.white,
                  borderBottomColor: COLORS.lightGrey,
                  borderWidth: 0,
                  backgroundColor:COLORS.dark
                }}>
                <View style={{ padding: 15}}>
                  <Image
                    resizeMode="contain"
                    style={{
                      borderRadius: responsiveWidth(10),
                      width: Dimensions.get('screen').width - 320,
                      height: Dimensions.get('screen').width - 320,
                      resizeMode: 'cover',
                      borderWidth:.5,
                      borderColor:COLORS.white
                    }}
                    source={{uri: `${item.clubImage}`}}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: COLORS.dark,
                    paddingLeft: 15,
                    width: '100%',
                    paddingTop: 15,
                    paddingBottom: 10,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      numberOfLines={1}
                      style={{
                        width: responsiveWidth(37),
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: COLORS.white,
                      }}>
                      {item.clubName}
                    </Text>
                    <TouchableOpacity onPress={() => EditExperience(item)}>
                      <FontAwesome
                        style={{marginLeft: 10,color:COLORS.white}}
                        name="pencil"
                        size={responsiveFontSize(2)}
                      
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => DeleteExperience(item.id)}>
                      <FontAwesome
                        style={{marginLeft: 10}}
                        color={COLORS.warning}
                        name="trash"
                        size={responsiveFontSize(2)}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    numberOfLines={3}
                    style={{
                      width: responsiveWidth(40),
                      fontSize: 14,
                      paddingTop: 3,
                      color: "lightgrey",
                    }}>
                    {item.experience}
                  </Text>
                </View>
              </TouchableOpacity>
              </View>
              )})}
            
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
                onPress={() => pickClubImage()}
                style={{
                  width: responsiveWidth(73),
                  marginTop: 10,
                  height: responsiveHeight(10),
                  borderWidth: responsiveFontSize(0.2),
                  borderColor: COLORS.white,
                  borderStyle: 'dotted',
                  borderRadius: responsiveFontSize(0.5),
                  justifyContent: 'center',
                  alignItems: 'center'
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
              <TextInput
                style={styles.textArea}
                textAlignVertical="top"
                onChangeText={experience => setExperience(experience)}
                value={experience}
                placeholder="Enter experience detail"
                multiline={true}
                numberOfLines={4}
                placeholderTextColor={COLORS.white}
              />
              {update == 1 ? (
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => UpdateExperience()}>
                  <Text style={styles.txt}>Update</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => AddExperience()}>
                  <Text style={styles.txt}>Submit</Text>
                </TouchableOpacity>
              )}
            </View>
          </Modal>

          {/* Model view */}
          <Modal isVisible={viewModel}>
            <View
              style={{
                backgroundColor: COLORS.dark,
                padding: responsiveFontSize(2),
                marginBottom: responsiveHeight(7),
                borderRadius: responsiveFontSize(1),
                borderWidth:1,
                borderColor:COLORS.white
              }}>
              <TouchableOpacity
                onPress={() => setViewModel(!viewModel)}
                style={{alignItems: 'flex-end', width: '100%'}}>
                <FontAwesome
                  name="window-close"
                  color={COLORS.white}
                  size={responsiveFontSize(3)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: responsiveWidth(73),
                  marginTop: 10,
                  height: responsiveHeight(10),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: `${clubImage}`}}
                  style={{
                    width: responsiveWidth(25),
                    height: responsiveWidth(25),
                    borderWidth:.5,
                    borderColor:COLORS.white
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: 20,
                  color: COLORS.white,
                  fontSize: responsiveFontSize(1.8),
                  fontWeight: '700',
                }}>
                Club name
              </Text>
              <Text
                style={{
                  marginTop: 2,
                  fontSize: responsiveFontSize(1.8),
                  color: COLORS.lightGrey,
                }}>
                {clubName}
              </Text>

              <Text
                style={{
                  marginTop: 20,
                  color: COLORS.white,
                  fontSize: responsiveFontSize(1.8),
                  fontWeight: '700',
                }}>
                Experience
              </Text>
              <Text
                style={{
                  marginTop: 2,
                  fontSize: responsiveFontSize(1.8),
                  color: COLORS.lightGrey,
                }}>
                {experience}
              </Text>
            </View>
          </Modal>

          <Loader visible={isloading} />
        </>
    </View>
  );
};

export default Experience;

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    borderWidth: 1,
    padding: 15,
    borderColor: COLORS.white,
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
    borderColor: COLORS.white,
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
