import React, {useState, useEffect} from 'react';
import COLORS from '../../Components/Color';
import {
  Alert,
  Modal,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {Input} from '../../Components/Components';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from 'react-redux';
import {socialLogin} from '../../reducers/authReducer';
const image = {
  uri: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
};
import Loader from '../../loader/Loader';
import {Dropdown} from 'react-native-element-dropdown';
import {ApiURL, postData} from '../../helpers/axios';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default function OnboardScreen() {
  const data = [
    {label: 'Player', value: '2'},
    {label: 'Club', value: '3'},
  ];

  const getApi = () => {
    axios
      .get(`${ApiURL}getApiKey`)
      .then(async function (response) {
        const result = await postData('get-token', {
          secret: response.data.data.screetkey,
        });
        AsyncStorage.setItem('secretkey', response.data.data.screetkey);
        AsyncStorage.setItem('access_token', result.data.access_token);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getApi();
  });

  const [isFocus, setIsFocus] = useState(false);

  const {loading} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [loadingoder, setLoadingoder] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [ismodalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState(null);

  const [valueModel, setValueModel] = useState(false);

  const navigation = useNavigation();
  function showModel(type) {
    setIsModalVisible(type);
  }

  const handlenavigation = () => {
    setIsModalVisible(false);
    navigation.navigate('SignUp');
  };
  const forgetPass = () => {
    setModalVisible(false);
    navigation.navigate('ForgotPassword');
  };

  async function GoogleLogin(valueData) {
    GoogleSignin.configure({
      webClientId:
        '500717825047-9etdpl5c5r16nqujmaqpt9mt0tvs5bn7.apps.googleusercontent.com',
    });
    // Get the users ID token
    setLoadingoder(true);
    try {
      const {idToken} = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const user_sign_in = auth().signInWithCredential(googleCredential);

      user_sign_in.then(res => {
        let name =
          res.additionalUserInfo.profile.given_name +
          ' ' +
          res.additionalUserInfo.profile.family_name;
        let email = res.user.email;
        let photo = res.user.photoURL;
        let id_cms_privileges = valueData;
        dispatch(socialLogin({name, email, photo, id_cms_privileges}));
        setTimeout(() => {
          if (!loading) {
            setLoadingoder(false);
          }
        }, 2000);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.dark}}>
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={valueModel}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <View style={styles.modal}>
          <View style={styles.body}>
            <View style={styles.bodyColumn}>
              <Text
                style={{marginBottom: 10, fontSize: 20, fontWeight: 'bold'}}>
                Select Type
              </Text>
              <View
                style={[
                  styles.inpsub,
                  {
                    borderWidth: 1,
                    justifyContent: 'center',
                    height: 50,
                    borderRadius: 5,
                  },
                ]}>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && {borderColor: COLORS.lightGrey},
                  ]}
                  placeholderStyle={{
                    fontSize: 12,
                    color: COLORS.dark,
                    paddingLeft: 5,
                  }}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  containerStyle={{marginTop: 13, borderRadius: 2}}
                  data={data}
                  search={false}
                  itemTextStyle={{color: 'grey'}}
                  maxHeight={300}
                  iconStyle={styles.iconStyle}
                  placeholder={'Select type'}
                  placeholderTextColor="#000"
                  searchPlaceholder="Search..."
                  labelField="label"
                  valueField="value"
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    GoogleLogin(item.value);
                    setValueModel(!valueModel);
                    setIsFocus(false);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{flex: 1}}>
        {loadingoder == true && <Loader />}
        <View style={styles.container}>
          <ImageBackground
            // source={image}
            source={require('../../Assets/onboardback.jpg')}
            style={styles.image}></ImageBackground>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            position: 'relative',
            top: -25,
          }}>
          <View
            style={{
              marginTop: 10,
              flex: 1 / 2,
              margin: 10,
              shadowColor: '#171717',
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}>
            <View
              style={{
                backgroundColor: COLORS.dark,
                borderColor: COLORS.white,
                borderWidth: 1,
                borderRadius: 10,
                height: 120,
              }}>
              <Image
                style={{
                  width: Dimensions.get('screen').width - 202,
                  height: Dimensions.get('screen').width - 242,
                  resizeMode: 'cover',
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                source={require('../../Assets/club.jpg')}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              flex: 1 / 2,
              margin: 10,
              shadowColor: '#171717',
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}>
            <View
              style={{
                backgroundColor: COLORS.dark,
                borderColor: COLORS.white,
                borderWidth: 1,
                borderRadius: 10,
                height: 120,
              }}>
              <Image
                style={{
                  width: Dimensions.get('screen').width - 202,
                  height: Dimensions.get('screen').width - 242,
                  resizeMode: 'cover',
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                source={require('../../Assets/player.jpg')}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            position: 'relative',
            bottom: 60,
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.white,
                fontWeight: 'bold',
                display: 'flex',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showModel(!ismodalVisible)}>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.white,
                fontWeight: 'bold',
                display: 'flex',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              Sign Up{ismodalVisible}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* {modal for sign in}  */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{marginTop: 20}}>
                <View style={{display: 'flex', alignSelf: 'center'}}>
                  <Icon
                    name="chevron-up"
                    size={30}
                    color={COLORS.white}
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                </View>
                <View
                  style={{display: 'flex', alignSelf: 'center', paddingTop: 5}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: COLORS.white,
                    }}>
                    Go Back
                  </Text>
                </View>

                <View>
                  <View style={{paddingLeft: 15, paddingTop: 10}}>
                    <Image
                      style={{
                        width: Dimensions.get('screen').width - 320,
                        height: Dimensions.get('screen').width - 320,
                        resizeMode: 'contain',
                      }}
                      source={require('../../Assets/LOGO_BLAZE_FINAL.png')}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '700',
                      color: COLORS.white,
                      paddingLeft: 15,
                      paddingTop: 15,
                    }}>
                    Welcome back
                  </Text>
                  <View style={{paddingTop: 15, paddingLeft: 10}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '500',
                        color: COLORS.white,
                      }}>
                      Sign in to Blazee to pick up exactly where you left off.
                    </Text>
                  </View>
                </View>

                <View style={styles.main}>
                  <Input modal={modalVisible} />

                  <View style={styles.forpass}>
                    <TouchableOpacity>
                      <Text style={styles.forgot} onPress={forgetPass}>
                        Forgot Password
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>

      {/* {modal for sign up}  */}

      <View style={styles.centeredViews}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={ismodalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalViews}>
              <View style={{marginTop: 30, width: '100%'}}>
                <View style={{display: 'flex', alignSelf: 'center'}}>
                  <Icon
                    name="chevron-up"
                    size={30}
                    color={COLORS.white}
                    style={styles.arrow}
                    onPress={() => setIsModalVisible(!ismodalVisible)}
                  />
                </View>
                <View
                  style={{display: 'flex', alignSelf: 'center', paddingTop: 5}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: COLORS.white,
                    }}>
                    Go Back
                  </Text>
                </View>

                <View>
                  <View style={{paddingTop: 30, marginLeft: 20}}>
                    <Image
                      style={{
                        width: Dimensions.get('screen').width - 320,
                        height: Dimensions.get('screen').width - 320,
                        resizeMode: 'contain',
                      }}
                      source={require('../../Assets/LOGO_BLAZE_FINAL.png')}
                    />
                  </View>
                  <View style={{marginLeft: 20, marginTop: 20}}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '700',
                        color: COLORS.white,
                      }}>
                      Join Blazee
                    </Text>
                  </View>
                  <View style={{padding: 15}}>
                    <Text style={{fontSize: 14, color: COLORS.white}}>
                      {' '}
                      It has survived not Lorem Ipsum passages, and more
                      recently with desktop publishing software like Aldus
                      PageMaker including versions of Lorem Ipsum..
                    </Text>
                  </View>
                </View>

                <View style={{paddingTop: 20}}>
                  <View
                    style={{
                      display: 'flex',
                      alignSelf: 'center',
                      width: '90%',
                      marginTop: 15,
                    }}>
                    <TouchableOpacity
                      onPress={() => setValueModel(!valueModel)}
                      style={{
                        backgroundColor: COLORS.headerColor,
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'center',
                        borderRadius: 8,
                        borderColor: COLORS.white,
                        borderWidth: 1,
                        alignItems: 'center',
                        padding: 15,
                      }}>
                      <View style={{paddingRight: 10}}>
                        <Image
                          style={{
                            width: Dimensions.get('screen').width - 341,
                            height: Dimensions.get('screen').width - 341,
                            resizeMode: 'contain',
                          }}
                          source={require('../../Assets/goglle.png')}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '700',
                            color: COLORS.dark,
                          }}>
                          Continue with Google
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      alignSelf: 'center',
                      width: '90%',
                      marginTop: 15,
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: COLORS.headerColor,
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'center',
                        borderRadius: 8,
                        borderColor: COLORS.white,
                        borderWidth: 1,
                        alignItems: 'center',
                        padding: 15,
                      }}
                      onPress={handlenavigation}>
                      <View style={{paddingRight: 10}}>
                        <SimpleLineIcons
                          name="envelope-open"
                          size={20}
                          color={COLORS.dark}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '700',
                            color: COLORS.dark,
                          }}>
                          Sign Up With Email
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </TouchableOpacity>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      padding: 20,
                      flexDirection: 'row',
                      width: '93%',
                      marginTop: 20,
                      alignSelf: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 15,
                          color: COLORS.white,
                          marginRight: 35,
                          fontWeight: 'bold',
                        }}>
                        By Joining , you agree to our
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: COLORS.headerColor,
                          textDecorationStyle: 'solid',
                          textDecorationColor: COLORS.headerColor,
                          textDecorationLine: 'underline',
                        }}>
                        Terms of Service
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    //justifyContent:"center"
  },
  image: {
    //flex: 1,
    justifyContent: 'center',
    height: responsiveHeight(80),
    width: responsiveWidth(85),
  },
  text: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  centeredView: {
    // flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  centeredViews: {
    // flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.dark,
    // borderRadius: 20,
    // padding: 15,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViews: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.dark,
    // borderRadius: 20,
    // padding: 15,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  // mains: {
  //   marginTop: 50,
  //   display: 'flex',
  //   alignSelf: 'flex-start',
  //   paddingLeft: 10
  // },
  Content: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#000000',
  },
  blaze: {
    display: 'flex',
    alignSelf: 'flex-start',
    width: Dimensions.get('screen').width - 200,
    height: Dimensions.get('screen').width - 330,
    resizeMode: 'contain',
  },
  main: {
    borderRadius: 10,
    borderWidth: 1,
    //borderColor: COLORS.white,
    height: '50%',
    display: 'flex',
    marginTop: 10,
  },
  forpass: {
    marginTop: 10,
    width: '40%',
    display: 'flex',
    alignSelf: 'flex-end',
  },
  forgot: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  option: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  options: {
    padding: 20,
  },

  or: {
    paddingTop: 7,
  },
  txt: {
    color: '#fff',
    fontSize: 16,
  },
  create: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  account: {
    fontSize: 14,
    color: COLORS.dark,
    paddingLeft: 10,
    paddingTop: 10,
  },

  createacc: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    paddingTop: 10,
  },
  account: {
    fontSize: 14,
    color: COLORS.white,
    paddingLeft: 10,
    paddingTop: 10,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5);',
  },
  body: {
    width: '80%',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  bodyColumn: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    borderRadius: 10,

    backgroundColor: '#fff',
  },
});
