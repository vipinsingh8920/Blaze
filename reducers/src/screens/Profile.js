import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../Components/Color';
import {ScrollView, Platform, StatusBar} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import Gallery from './Gallery';
import Modal from 'react-native-modal';
import About from '../../Components/About';
import PlayerInfo from '../../Components/PlayerInfo';
import Links from './Links';
import {ApiURL, ImageURL, WebURL} from '../../helpers/axios';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Loader from '../../loader/Loader';
import {showMessage} from 'react-native-flash-message';
import {setNextMatchTime} from '../../reducers/authReducer';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

export default function Profile({route}) {
  const {item, userData, user} = route.params;

  const [platForm, setPlatForm] = useState(Platform.OS);
  const userDetail = useSelector(state => state.user);
  //console.log(userDetail.userData.id_cms_privileges)
  const navigation = useNavigation();
  const [tab, seTtAB] = useState(0);
  const [view, setView] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [matchVsMatch, setMatchVsMatch] = useState('');
  const [nextMatchDate, setNextMatchDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [selectDate, setSelectDate] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const [expiryDate, setExpiryDate] = useState(
    new Date(userDetail?.userData?.nextMatchDate),
  );
  const [timeUnits, setTimeUnits] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeUnits = timeDifference => {
      const seconds = Math.floor(timeDifference / 1000);

      setTimeUnits({
        years: Math.floor(seconds / (365 * 24 * 60 * 60)),
        days: Math.floor((seconds % (365 * 24 * 60 * 60)) / (24 * 60 * 60)),
        hours: Math.floor((seconds % (24 * 60 * 60)) / (60 * 60)),
        minutes: Math.floor((seconds % (60 * 60)) / 60),
        seconds: seconds % 60,
      });
    };

    const updateCountdown = () => {
      const currentDate = new Date().getTime();
      const expiryTime = expiryDate.getTime();
      const timeDifference = expiryTime - currentDate;

      if (timeDifference <= 0) {
        calculateTimeUnits(0);
      } else {
        calculateTimeUnits(timeDifference);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  const formatTime = time => {
    return time.toString().padStart(2, '0');
  };

  async function imageUpload(type, path) {
    setLoading(true);
    let formdata = new FormData();
    formdata.append('uid', item.item.id);
    formdata.append('type', type);
    formdata.append('file', {uri: path, name: 'image.jpg', type: 'image/jpeg'});
    fetch(`${ApiURL}profile-update`, {
      method: 'post',
      body: formdata,
    })
      .then(response => response.json())
      .then(response => {
        setLoading(false);
        console.log(response);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const coverImage = () => {
    ImagePicker.openPicker({
      width: 1000,
      height: 400,
      cropping: true,
    }).then(coverimg => {
      setCoverImg(coverimg.path);
      imageUpload('coverImg', coverimg.path);
    });
  };
  const ProfileImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(coverimg => {
      imageUpload('profile', coverimg.path);
    });
  };
  const handleConfirm = date => {
    console.log(moment(date).format('YYYY-MM-DD HH:MM:SS'));
    setExpiryDate(date);
    setNextMatchDate(moment(date).format('YYYY-MM-DD HH:MM:SS'));
    let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    let month = date.getMonth() + 1;
    month = month > 9 ? month : `0${month}`;
    let year = date.getFullYear();
    setSelectDate(`${day}-${month}-${year}`);
    hideDatePicker();
  };
  const UpdateMatch = async () => {
    if (matchVsMatch.trim() == '' || nextMatchDate.trim() == '') {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'All fields is required to be filled.',
      });
    } else {
      setIsLoading(true);
      await dispatch(
        setNextMatchTime({
          id: item.item.id,
          matchVsMatch,
          nextMatchDate,
        }),
      );
      setIsLoading(false);
      showMessage({
        type: 'success',
        icon: 'success',
        message: 'Data update successfully',
      });
    }
  };

  const [coverimg, setCoverImg] = useState(`${ImageURL}${userData.cover_img}`);


  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create

    let clubid = item?.item.id;
    const combinedId =
      userDetail?.userData?.id > clubid
        ? userDetail?.userData?.id + '-' + clubid
        : clubid + '-' + userDetail?.userData?.id;

    console.log(combinedId);
   
    //player
    const playerDetail = firestore()
      .collection('userChats')
      .doc(userDetail?.userData?.id.toString());
    const playerdoc = await playerDetail.get();
    if (!playerdoc.exists) {
      firestore()
        .collection('userChats')
        .doc(userDetail?.userData?.id.toString())
        .set({})
        .then(() => {
          firestore()
            .collection('userChats')
            .doc(userDetail?.userData?.id.toString())
            .update({
              [combinedId.toString() + '.userInfo']: {
                uid: clubid.toString(),
                displayName: `${item.item.name}`,
                photoURL:
                  `${item.item.photo}`,
              },
              [combinedId.toString() + '.date']: new Date(),
            });
          navigation.navigate('UserList');
        });
    } else {
      firestore()
        .collection('userChats')
        .doc(userDetail.userData.id.toString())
        .update({
          [combinedId.toString() + '.userInfo']: {
            uid: clubid.toString(),
            displayName: `${item?.item?.name}`,
            photoURL:
              `${item?.item?.photo}`,
          },
          [combinedId.toString() + '.date']: new Date(),
        });
      console.log('Document data:', playerdoc);
      navigation.navigate('UserList');
    }

    //club

    const clubDetail = firestore()
      .collection('userChats')
      .doc(clubid.toString());
    const clubdoc = await clubDetail.get();
    if (!clubdoc.exists) {
      firestore()
        .collection('userChats')
        .doc(clubid.toString())
        .set({})
        .then(() => {
          firestore()
            .collection('userChats')
            .doc(clubid.toString())
            .update({
              [combinedId.toString() + '.userInfo']: {
                uid: userDetail?.userData?.id.toString(),
                displayName: `${userDetail?.userData?.name}`,
                photoURL: `${ImageURL}${userDetail?.userData[0]?.profile_img}`,
              },
              [combinedId.toString() + '.date']: new Date(),
            });
        });
    } else {
      firestore()
        .collection('userChats')
        .doc(userDetail.userData.id.toString())
        .update({
          [combinedId.toString() + '.userInfo']: {
            uid: userDetail?.userData?.id.toString(),
                  displayName: `${userDetail?.userData.name}`,
                photoURL: `${ImageURL}${userDetail?.userData[0]?.profile_img}`,
          },
          [combinedId.toString() + '.date']: new Date(),
        });
      console.log('Document data:', clubdoc);
    }
  };

  const Item = () => {
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          width: '98%',
          justifyContent: 'space-around',
          alignSelf: 'center',
          padding: 5,
          borderBottomColor: COLORS.Grey,
          borderColor: "#474747",
          borderTopWidth:1,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor:COLORS.darkgrey2
        }}>
        <View style={{width: '10%', borderRightColor: COLORS.lightGrey}}>
          <Text style={{color: COLORS.white, fontSize: 14, fontWeight: 'bold'}}>
            {' '}
            {formatTime(timeUnits.days)}{' '}
          </Text>
          <Text style={{color: COLORS.white}}>days</Text>
        </View>
        <View style={{width: '10%'}}>
          <Text style={{color: COLORS.white, fontSize: 14, fontWeight: 'bold'}}>
            {formatTime(timeUnits.hours)}{' '}
          </Text>
          <Text style={{color: COLORS.white}}>hrs</Text>
        </View>
        <View style={{width: '10%'}}>
          <Text style={{color: COLORS.white, fontSize: 14, fontWeight: 'bold'}}>
            {formatTime(timeUnits.minutes)}{' '}
          </Text>
          <Text style={{color: COLORS.white}}>mins{}</Text>
        </View>
        <View style={{width: '10%'}}>
          <Text style={{color: COLORS.white, fontSize: 14, fontWeight: 'bold'}}>
            {formatTime(timeUnits.seconds)}{' '}
          </Text>
          <Text style={{color: COLORS.white}}>secs</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.maincontainer}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.headerColor}
        />
        <View style={{backgroundColor: COLORS.headerColor}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
              paddingRight: 10,
              width: '100%',
              justifyContent: 'space-between',
              marginTop: platForm == 'ios' ? responsiveScreenHeight(5) : 0,
              flexDirection: 'row',
            }}>
            <View style={styles.header}>
              <Icon
                name="arrow-back-ios"
                size={24}
                color={COLORS.dark}
                onPress={() => navigation.goBack()}
              />
              <Text
                style={{
                  color: COLORS.dark,
                  fontSize: responsiveFontSize(2.5),
                  fontWeight: 'bold',
                  marginLeft: responsiveWidth(25),
                }}>
                Player Profile
              </Text>
            </View>
            {item?.item?.id == userDetail?.userData?.id ? (
              <TouchableOpacity>
                <FontAwesome5
                  name="user-edit"
                  size={22}
                  color={COLORS.dark}
                  onPress={() => navigation.navigate('EditProfile')}
                />
              </TouchableOpacity>
            ) : (
              ''
            )}
          </View>
        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={{
              uri: userData.cover_img
                ? coverimg
                : `${WebURL}public/customImg/coverimg.webp`,
            }}
            resizeMode="cover"
            style={styles.image}>
            <View
              style={{
                backgroundColor: COLORS.white,
                borderRadius: 100,
                borderWidth: 1,
                width: Dimensions.get('screen').width - 365,
                height: Dimensions.get('screen').width - 365,
                borderColor: COLORS.white,
                position: 'absolute',
                right: 15,
                top: 20,
              }}>
              {item?.item?.id == userDetail?.userData?.id ? (
                <TouchableOpacity onPress={() => coverImage()}>
                  <Ionicons
                    name="camera-sharp"
                    color={COLORS.dark}
                    size={20}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}
                  />
                </TouchableOpacity>
              ) : (
                ''
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                item?.item?.id == userDetail?.userData?.id ? ProfileImage() : '';
              }}
              style={{
                height: 90,
                width: 90,
                display: 'flex',
                alignSelf: 'flex-start',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'stretch',
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: COLORS.white,
                  position: 'absolute',
                  top: 30,
                  left: 20,
                }}
                source={{
                  uri: userData.profile_img
                    ? `${ImageURL}${userData?.profile_img}`
                    : `${WebURL}public/uploads/2023-04/b480cd35828a8db31e2ed4248f08c199.png`,
                }}
              />
            </TouchableOpacity>
          </ImageBackground>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingBottom: 20,
              paddingTop: 30,
            }}>
            <View style={{paddingLeft: 20}}>
              <Text style={styles.name}>{item?.item.name}</Text>
              <Text style={[styles.names, {width: responsiveWidth(50)}]}>
                {item?.item.email ? item?.item.email : 'demo@gmail.com'}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '45%',
              }}>
              {userDetail?.userData?.id_cms_privileges == 3 ? (
                <View>
                  <TouchableOpacity
                    style={styles.btns}
                    onPress={() => handleSelect()}>
                    <Text style={styles.msg}>Message</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                ''
              )}
              <View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => navigation.navigate('clubcriteria')}>
                  <Text style={styles.txt}> Club Criteria</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {view === false ? (
            <View
              style={{
                paddingLeft: 15,
                paddingRight: 10,
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Text style={styles.info}>
                {' '}
                Forward, Lionel Andrés Messi , Paris{' '}
              </Text>
              <TouchableOpacity onPress={() => setView(!view)}>
                <Text style={styles.view}>View More </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                paddingLeft: 15,
                paddingRight: 10,
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Text style={styles.info}>
                {' '}
                Forward, Lionel Andrés Messi , Paris{' '}
              </Text>
              <TouchableOpacity onPress={() => setView(!view)}>
                <Text style={styles.view}>View Less </Text>
              </TouchableOpacity>
            </View>
          )}

          {view === true && (
            <View
              style={{
                paddingLeft: 15,
                paddingRight: 10,
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Text style={styles.info}>
                -Saint-Germain ,Captains the Argentina National Team.
              </Text>
            </View>
          )}

          <View style={{marginTop: 20}}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: COLORS.headerColor,
                width: '100%',
                display: 'flex',
                alignSelf: 'flex-start',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  padding: 8,
                  color: COLORS.dark,
                  fontWeight: 'bold',
                  display: 'flex',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  textAlign: 'center',
                  
                }}>
                NEXT MATCH
              </Text>
              {item?.item?.id == userDetail?.userData?.id ? (
                <TouchableOpacity onPress={() => setIsVisible(true)}>
                  <FontAwesome
                    style={{marginLeft: 10}}
                    color={COLORS.dark}
                    name="plus"
                    size={responsiveFontSize(2)}
                  />
                </TouchableOpacity>
              ) : (
                ''
              )}
            </View>
            <View
              style={{
                backgroundColor:COLORS.darkgrey2,
                width: '100%',
                display: 'flex',
                alignSelf: 'flex-start',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.white,
                  fontWeight: 'bold',
                  display: 'flex',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  textAlign: 'center',
                
                }}>
                {' '}
                {userDetail?.userData?.matchVsMatch}
              </Text>
            </View>
            <Item />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              borderColor: 'grey',
              paddingBottom: 10,
              borderWidth: 1,
              borderBottomColor: '#888888',
              width: '100%',
              justifyContent: 'space-around',
              paddingTop: 15,
              backgroundColor: COLORS.darkgrey2,
            }}>
            <TouchableOpacity onPress={() => seTtAB(0)}>
              {tab === 0 ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLORS.white,
                  }}>
                  About
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLORS.Grey,
                  }}>
                  About
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => seTtAB(1)}>
              {tab === 1 ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLORS.white,
                  }}>
                  Player Info
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLORS.Grey,
                  }}>
                  Player Info
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => seTtAB(2)}>
              {tab === 2 ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLORS.white,
                  }}>
                  Media
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLORS.Grey,
                  }}>
                  Media
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => seTtAB(3)}>
              {tab === 3 ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLORS.white,
                  }}>
                  Links
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLORS.Grey,
                  }}>
                  Links
                </Text>
              )}
            </TouchableOpacity>
          </View>
          {tab === 0 && <About item={item} />}
          {tab === 1 && (
            <PlayerInfo item={item} userData={userData} user={user} />
          )}
          {tab === 2 && <Gallery item={item} />}
          {tab === 3 && <Links item={item} />}
        </ScrollView>

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
              onPress={() => setIsVisible(false)}
              style={{alignItems: 'flex-end', width: '100%'}}>
              <FontAwesome
                name="window-close"
                color={COLORS.white}
                size={responsiveFontSize(3)}
              />
            </TouchableOpacity>

            <Text
              style={[
                styles.matches,
                {marginTop: 16, alignSelf: 'flex-start', marginLeft: 20},
              ]}>
              Match1 Vs Match2
            </Text>

            <TextInput
              style={styles.input}
              autoFocus={true}
              onChangeText={matchVsMatch => setMatchVsMatch(matchVsMatch)}
              value={matchVsMatch}
              placeholder="Enter Match1 Vs Match2 (Required)"
              placeholderTextColor={COLORS.lightGrey}
            />
            <Text
              style={[
                styles.matches,
                {marginTop: 16, alignSelf: 'flex-start', marginLeft: 20},
              ]}>
              Next Match Date
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 5,
              }}>
              <TouchableOpacity onPress={() => showDatePicker()}>
                <FontAwesome
                  name="calendar"
                  size={responsiveFontSize(3)}
                  style={{color: COLORS.white}}
                />
              </TouchableOpacity>
              <TextInput
                editable={false}
                style={[
                  styles.input,
                  {marginLeft: 4, width: responsiveWidth(65)},
                ]}
                placeholder="Enter  Next Match Date (Required)"
                value={selectDate}
                placeholderTextColor={COLORS.lightGrey}
                onChangeText={nextMatchDate => setNextMatchDate(nextMatchDate)}
              />
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              minimumDate={
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate(),
                )
              }
            />
            <TouchableOpacity style={styles.btn} onPress={() => UpdateMatch()}>
              <Text style={styles.txtBtn}>Update</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Loader visible={isloading} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    width: '100%',
    backgroundColor:COLORS.dark
  },
  image: {
    justifyContent: 'center',
  },
  header: {
    // marginTop: 10
    marginBottom: 10,
    flexDirection: 'row',
  },
  profile: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  profiles: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  head: {
    paddingTop: 5,
    fontSize: 12,
    fontWeight: '200',
    color: COLORS.dark,
  },
  heads: {
    fontSize: 12,
    fontWeight: '200',
    color: COLORS.dark,
  },

  matches: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    paddingTop: 15,
  },
  names: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  caption: {
    fontSize: 16,
    color: COLORS.white,
    paddingTop: 5,
    paddingLeft: 15,
  },
  photos: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    paddingLeft: 20,
  },
 
  btns: {
    marginTop: 20,
    padding: 8,
    borderRadius: 8,
    display: 'flex',
    alignSelf: 'center',
    borderColor: COLORS.white,
    backgroundColor: COLORS.headerColor,
    borderWidth: 1,
    borderRadius: 100,
    width: '100%',
  },
  txt: {
    color: COLORS.dark,
    fontSize: 10,
    display: 'flex',
    alignSelf: 'center',
  },
  msg: {
    color: COLORS.dark,
    fontSize: 10,
    display: 'flex',
    alignSelf: 'center',
  },
  img: {
    width: Dimensions.get('screen').width - 360,
    height: Dimensions.get('screen').width - 360,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  info: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  view: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.headerColor,
  },
  centeredView: {
    flex: 1,
    display: 'flex',
    alignSelf: 'center',
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    display: 'flex',
    borderRadius: 10,
    backgroundColor: COLORS.white,
    margin: 15,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    marginTop: 10,
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
    borderWidth:1,
    borderColor:COLORS.white
  },
  txtBtn: {
    color: COLORS.dark,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    display: 'flex',
    alignSelf: 'center',
  },
});
