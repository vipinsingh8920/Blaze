import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  platForm,
  StatusBar,
} from 'react-native';
import React,{useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../Components/Color';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {Alert, Modal} from 'react-native';
import ClubInfo from '../../../Components/ClubInfo';
import ClubGallery from './ClubGallery';
import OpenPositions from './OpenPositions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
import { ApiURL, ImageURL, WebURL } from '../../../helpers/axios';
import firestore from '@react-native-firebase/firestore' 


export default function ClubProfile({route}) {

  const {item,userData,user} = route.params;


  const navigation = useNavigation();
  const [tab, seTtAB] = useState(0);
  const [view, setView] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(
    'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png',
  );

  async function imageUpload(type, path) {
   
    let formdata = new FormData();
    formdata.append('uid', item.id);
    formdata.append('type', type);
    formdata.append('file', {uri: path, name: 'image.jpg', type: 'image/jpeg'});
    fetch(`${ApiURL}profile-update`, {
      method: 'post',
      body: formdata,
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err);
       
      });
  }


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
  const [coverimg, setCoverImg] = useState(userData?.cover_img==null?`${WebURL}public/customImg/coverimg.webp`:`${ImageURL}${userData?.cover_img}`);

const userDetail=useSelector(state=>state.user);

const handleSelect = async () => {
 
  let clubid = item?.id;
  const combinedId =
  userDetail.userData.id > clubid
      ? userDetail.userData.id+'-'+clubid
      : clubid +'-'+ userDetail.userData.id;
   
 console.log(combinedId);
 //player
 const playerDetail = firestore().collection('userChats').doc(userDetail.userData.id.toString());
 const playerdoc = await playerDetail.get();
 if (!playerdoc.exists) {
      firestore()
      .collection('userChats')
      .doc(userDetail.userData.id.toString())
      .set({})
      .then(() => {
          firestore().collection('userChats').doc(userDetail.userData.id.toString()).update({
              [combinedId.toString() + ".userInfo"]: {
                  uid: clubid.toString(),
                  displayName: `${item.name}`,
                  photoURL: `${item.photo}`,
                },
          [combinedId.toString() + ".date"]: new Date(),
            });
            navigation.navigate('UserList');
      });
 } else {
 
  firestore().collection('userChats').doc(userDetail.userData.id.toString()).update({
              [combinedId.toString() + ".userInfo"]: {
                  uid: clubid.toString(),
                  displayName: `${item.name}`,
                  photoURL: `${item.photo}`,
                },
              [combinedId.toString() + ".date"]: new Date(),
            });
   console.log('Document data:',playerdoc);
   navigation.navigate('UserList');
 }

//club

   const clubDetail = firestore().collection('userChats').doc(clubid.toString());
 const clubdoc = await clubDetail.get();
 if (!clubdoc.exists) {
      firestore()
      .collection('userChats')
      .doc(clubid.toString())
      .set({})
      .then(() => {
          firestore().collection('userChats').doc(clubid.toString()).update({
              [combinedId.toString() + ".userInfo"]: {
                  uid: userDetail.userData.id.toString(),
                  displayName: `${userDetail?.userDetailData.name}`,
                  photoURL: `${ImageURL}${userDetail.userData[0].profile_img}`,
                },
              [combinedId.toString() + ".date"]: new Date(),
            });
      });
 } else {
  firestore().collection('userChats').doc(userDetail.userData.id.toString()).update({
              [combinedId.toString() + ".userInfo"]: {
                  uid: userDetail.userData.id.toString(),
                  displayName: `${userDetail?.userDetailData.name}`,
                  photoURL: `${ImageURL}${userDetail.userData[0].profile_img}`,
                },
              [combinedId.toString() + ".date"]: new Date(),
            });
   console.log('Document data:',clubdoc);
 }
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
              <Text style={{color:COLORS.dark,fontSize:responsiveFontSize(2.5),fontWeight:"bold"}}>Club Profile</Text>
            </View>
{userDetail?.userData.id==item.id?
            <TouchableOpacity>
              <FontAwesome5
                name="user-edit"
                size={22}
                color={COLORS.dark}
                onPress={() => navigation.navigate('ClubEditProfile')}/>
            </TouchableOpacity>:""}
          </View>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={{uri: coverimg}}
            resizeMode="cover"
            style={styles.image}>
            <View
              style={{
                backgroundColor: COLORS.headerColor,
                borderRadius: 100,
                borderWidth: 1,
                width: Dimensions.get('screen').width - 365,
                height: Dimensions.get('screen').width - 365,
                borderColor: COLORS.white,
                position: 'absolute',
                right: 15,
                top: 20,
              }}>
            {userDetail?.userData.id==item.id?  <TouchableOpacity onPress={coverImage}>
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
              </TouchableOpacity>:""}
            </View>
            <View
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
                  resizeMode: 'cover',
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: COLORS.white,
                  position: 'absolute',
                  top: 30,
                  left: 20,
                }}
                source={{uri:
                 userData.profile_img==null
                  ? `${WebURL}public/customImg/coverimg.webp`
                  :  `${ImageURL}${userData.profile_img}`
                }}
              />
            </View>
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
              <Text style={styles.name}>{item.name}</Text>
              <Text style={[styles.names, {width: responsiveWidth(50)}]}>
                {item.email}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '45%',
              }}>
             {userDetail?.userData.id_cms_privileges==2? <View>
                <TouchableOpacity
                  style={styles.btns}
                  onPress={() => handleSelect()}>
                  <Text style={styles.msg}>Message</Text>
                </TouchableOpacity>
              </View>:""}
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
                width: responsiveWidth(80),
              }}>
              <Text style={styles.info}>
                {' '}
                Football club based in Fulham, West London.{' '}
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
                width: responsiveWidth(80),
              }}>
              <Text style={styles.info}>
                {' '}
                Football club based in Fulham, West London.
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
                -Founded in 1905, they play their home games at Stamford Bridge.
              </Text>
            </View>
          )}

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              //borderColor: '#fff',
              paddingBottom: 10,
              borderWidth: 1,
              marginTop: 20,
              borderBottomColor: COLORS.lightGrey,
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
                  Club Info
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLORS.Grey,
                  }}>
                  Club Info
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
                  Gallery
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLORS.Grey,
                  }}>
                  Gallery
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
                  Open Positions
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLORS.Grey,
                  }}>
                  Open Positions
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {tab == 0 && <ClubInfo item={item} />}
          {tab == 1 && <ClubGallery item={item} />}
          {tab == 2 && <OpenPositions item={item}/>}

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{marginTop: 10}}>
                    <View style={{display: 'flex', alignSelf: 'center'}}>
                      <Ionicons
                        name="chevron-up"
                        size={25}
                        color={COLORS.dark}
                        style={styles.arrow}
                        onPress={() => setModalVisible(!modalVisible)}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '700',
                          color: COLORS.dark,
                          paddingLeft: 15,
                        }}>
                        Player Bio
                      </Text>
                      <View style={{padding: 15}}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '500',
                            color: COLORS.dark,
                          }}>
                          {' '}
                          Forward, Lionel Andrés Messi , Paris Saint-Germain
                          ,Captains the Argentina National Team.
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  maincontainer: {
    flex: 1,
    width: '100%',
    backgroundColor:COLORS.dark
  },
  image: {
    justifyContent: 'center',
    borderBottomWidth:1,
    borderColor:COLORS.white
  },
  header: {
    // marginTop: 10
    marginBottom: 10,
    flexDirection:"row"
  },
  profile: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
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
    color: COLORS.dark,
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
    color: '#000000',
    paddingLeft: 20,
  },
  // btn: {
  //   marginTop: 20,
  //   padding: 7,
  //   borderRadius: 8,
  //   display: 'flex',
  //   alignSelf: 'center',
  //   borderColor: COLORS.purple,
  //   borderWidth: 1,
  //   borderRadius: 100,
  // },
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
});
