//import liraries
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../Components/Color';
import {useNavigation} from '@react-navigation/native';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {Avatar} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {ApiURL, getData, ImageURL, postData} from '../../helpers/axios';
import axios from 'react-native-axios';

// create a component
const Message = props => {
  const {route} = props;

 const userDetail=useSelector(state=>state.user);
 

  const [imageOpen, setImageOpen] = useState(false);
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [lastSeen, setlastSeen] = useState('Online');
  const [imagePath, setImagePath] = useState('');
  const [customText, setCustomText] = useState('');

  const ImageUpload = async props => {
    let formdata = new FormData();
    formdata.append('file', {
      uri: props,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
    let res = await axios.post(`${ApiURL}image-upload`, formdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    setImagePath(`${ImageURL}${res?.data?.data?.image_path}`);
    
  };

  function bytesToSize(bytes) {
    let i = Math.floor(Math.log(bytes) / Math.log(1000));
    let fileSize = (bytes / Math.pow(1000, i)).toFixed(2) * 1;

    if (fileSize > 10 && i > 2) {
      return false;
    } else {
      return true;
    }
  }

  const DocumentPickerData = async () => {
    try {
      const doc = await DocumentPicker.pick();
      const sizeValid = bytesToSize(doc[0].size);
      if (sizeValid) {
        console.log('done');
      } else {
        console.log('error');
      }
      ImageUpload(doc[0].uri);
      console.log(doc[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload', err);
      else console.log(err);
    }
  };

  const Gallery = () => {
    setImageOpen(false);
    ImagePicker.openPicker({})
      .then(coverimg => {
        const sizeValid = bytesToSize(coverimg.size);
        if (sizeValid) {
          console.log('done');
        } else {
          console.log('error');
        }
        console.log(coverimg);
        ImageUpload(coverimg.path);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const OpenCamera = useCallback(async () => {
    console.log(Platform.OS);
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: `Skala App Camera Permission`,
            message: `Skala app needs access to your camera for document and profile photo upload.`,
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
          OpenCameraApp();
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      const newCameraPermission = await Camera.getCameraPermissionStatus();
      console.log(newCameraPermission);
    }
  }, []);

  const OpenCameraApp = async () => {
    setImageOpen(false);
    ImagePicker.openCamera({})
      .then(image => {
        const sizeValid = bytesToSize(image.size);
        if (sizeValid) {
          console.log('done');
        } else {
          console.log('error');
        }
        console.log(image);
        ImageUpload(image.path);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const messageRef = firestore()
      .collection('chatrooms')
      .doc(route.params.combinedId)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    const unSubscribe = messageRef.onSnapshot(querySnap => {
      const allmsg = querySnap.docs.map(docSanp => {
        const data = docSanp.data();
        if (data.createdAt) {
          return {
            ...docSanp.data(),
            createdAt: docSanp.data().createdAt.toDate(),
          };
        } else {
          return {
            ...docSanp.data(),
            createdAt: new Date(),
          };
        }
      });
      setMessages(allmsg);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const onSend = (messageArray, imagename) => {
    let textmsg = messageArray.text;
    firestore()
      .collection('userChats')
      .doc(`${route?.params?.myId}`)
      .update({
        [route?.params.combinedId + '.lastMessage']: {
          textmsg,
        },
        [route.params.combinedId + '.date']: new Date(),
      });
    firestore()
      .collection('userChats')
      .doc(`${route?.params?.item[1]?.userInfo.uid}`)
      .update({
        [route.params.combinedId + '.lastMessage']: {
          textmsg,
        },
        [route.params.combinedId + '.date']: new Date(),
      });

    const mymsg = {
      _id: `${Date.now()}${route?.params.myId}`,
      text: textmsg,
      user: {
        _id: `${route.params.myId}`,
        name: 'name',
        avatar: ``,
      },
      image: `${imagename}`,
      sentBy: `${route?.params.myId}`,
      sentTo: route?.params.item[1]?.userInfo.uid,
      createdAt: new Date(),
      sent: true,
    };

    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
    firestore()
      .collection('chatrooms')
      .doc(route?.params.combinedId)
      .collection('messages')
      .add({...mymsg, createdAt: firestore.FieldValue.serverTimestamp()});
    setCustomText('');
    setImagePath('');
    StatusUpdate(textmsg);

  };


  const StatusUpdate=async(textmsg)=>{
    let body={
  uid:`${route?.params.myId}`,
  reciver_id:route?.params.item[1]?.userInfo.uid,
    }
    let res=await postData(`send-notification`,body);
    console.log(res);
  }


  const HeaderChat = useCallback(() => {
    return (
      <View
        style={{
          height: 60,
          backgroundColor: COLORS.headerColor,
          elevation: 5,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
        }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.headerColor}
        />
        <Icon
          name="arrow-back-ios"
          size={24}
          color={COLORS.dark}
          onPress={() => navigation.navigate('UserList')}
        />

        <Avatar
          source={{uri: route?.params.item[1]?.userInfo.photoURL}}
          rounded
          iconStyle={{
            borderColor: 'white',
            borderTopLeftRadius: 1,
            borderStyle: 'solid',
          }}
          title={route.params.item[1].userInfo.displayName}
          size="medium"
          containerStyle={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          }}
        />

        <View style={{flex: 1, marginLeft: 10}}>
          <Text
            numberOfLines={1}
            style={{
              color: COLORS.dark,
              fontSize: 17,
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}>
            {route?.params.item[1]?.userInfo.displayName}
          </Text>

          <Text style={{color: COLORS.dark, fontSize: 11, fontWeight: 'bold'}}>
            {lastSeen}
          </Text>
        </View>
      </View>
    );
  }, []);

  const onSendEmptyMessage = useCallback(
    async (messages = []) => {
     
      onSend(messages, imagePath);
    },
    [imagePath],
  );

  async function removePath(type) {
    if (type == 'image') {
      try {
        await postData('removeImage', {fileUrl: imagePath});
        setImagePath('');
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setImagePath('');
    }
  }

  const renderChatFooter = useCallback(() => {
    if (imagePath) {
      return (
        <View style={styles.chatFooter}>
          <Image
            source={{uri: `${imagePath}`}}
            style={{height: 75, width: 75, marginTop: 6, borderRadius: 10}}
          />
          <TouchableOpacity
            onPress={() => removePath('image')}
            style={styles.buttonFooterChatImg}>
            <Text style={styles.textFooterChat}>X</Text>
          </TouchableOpacity>
        </View>
      );
    }
    // if (filePath) {
    // return (
    // <View style={styles.chatFooter}>
    // <InChatFileTransfer
    //   filePath={filePath}
    //   type="send"
    // />
    // <TouchableOpacity
    //   onPress={() => removePath('pdf')}
    //   style={styles.buttonFooterChat}
    // >
    //   <Text style={styles.textFooterChat}>X</Text>
    // </TouchableOpacity>

    // </View>
    // );
    // }
    return null;
  }, [imagePath]);

  return (
    <View style={styles.maincontainer}>
      <Modal
        style={{
          width: '100%',
          marginLeft: 0,
          marginBottom: 0,
        }}
        isVisible={imageOpen}
        onRequestClose={() => {
          setImageOpen(false);
        }}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            height: '23%',
            backgroundColor: COLORS.dark,
            width: '100%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderWidth: 1,
            borderColor: COLORS.Grey,
          }}>
          <TouchableOpacity
            onPress={() => setImageOpen(false)}
            style={{
              marginTop: 7,
              height: 30,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo name="circle-with-cross" size={32} color={COLORS.white} />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              padding: 20,
            }}>
            <TouchableOpacity
              style={{width: '100%', height: 40, flexDirection: 'row'}}
              onPress={() => OpenCamera()}>
              <Entypo name="camera" size={20} color={COLORS.green} />
              <Text style={styles.bottomSliderFont}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '100%', height: 40, flexDirection: 'row'}}
              onPress={() => Gallery()}>
              <Entypo name="image" size={20} color={COLORS.orange} />
              <Text style={styles.bottomSliderFont}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '100%', height: 40, flexDirection: 'row'}}
              onPress={() => DocumentPickerData()}>
              <Entypo name="attachment" size={20} color={COLORS.purple} />
              <Text style={styles.bottomSliderFont}>File</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <HeaderChat />
      <GiftedChat
        alwaysShowSend
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              containerStyle={{
                borderWidth: 1,
                marginBottom: 1,
                borderTopWidth: 1,
                borderTopColor: '#000',
                borderColor: COLORS.white,
                borderRadius: 20,
                backgroundColor:COLORS.dark,
            
              }}
              textInputStyle={{color:COLORS.white}}
            />
          );
        }}
        text={customText}
        onInputTextChanged={text => setCustomText(text)}
        renderChatFooter={renderChatFooter}
        renderSend={props => {
          const {text, onSend} = props;
          return (
            <View
              style={{flexDirection: 'row', alignItems: 'center', height: 50}}>
              <View>
                <TouchableOpacity
                  style={{paddingLeft: 4, marginRight: responsiveWidth(2)}}
                  onPress={() => setImageOpen(!imageOpen)}>
                  <MaterialIcons
                    name="attach-file"
                    size={responsiveFontSize(3)}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => {
                  if (text && onSend) {
                    onSendEmptyMessage({text: text.trim()}, true);
                  }
                }}>
                <FontAwesome
                  style={{marginRight: responsiveWidth(2.4)}}
                  name="send"
                  size={responsiveFontSize(3)}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>
          );
        }}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: `${route.params.myId}`,
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: '#128C7E',
                },
                left: {
                  backgroundColor: '#25D366',
                },
              }}
              textStyle={{
                left: {
                  color: '#fff',
                },
                right: {
                  color: '#fff',
                },
              }}
              timeTextStyle={{
                left: {
                  color: '#fff',
                },
                right: {
                  color: '#fff',
                },
              }}
            />
          );
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.dark,
  },
  header: {
    marginBottom: 10,
  },
  bottomSliderFont: {
    marginLeft: 15,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  chatFooter: {
    backgroundColor: COLORS.lightGrey,
    borderColor: COLORS.headerColor,
    borderWidth: 2,
    height: responsiveHeight(12),
    borderRadius: 10,
  },
  buttonFooterChatImg: {
    position: 'absolute',
    backgroundColor: COLORS.headerColor,
    borderRadius: 12.5,
    left: 60,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Message;
