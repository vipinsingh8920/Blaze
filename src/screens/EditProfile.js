import {View, Text, StyleSheet, Dimensions, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../Components/Color';
import {ScrollView, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {ApiURL, ImageURL, WebURL, postData} from '../../helpers/axios';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { updateUser } from '../../reducers/authReducer';

export default function EditProfile() {
  const navigation = useNavigation();
  const [image, setImage] = useState(`${WebURL}public/uploads/2023-04/b480cd35828a8db31e2ed4248f08c199.png`);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [nationality, setNationality] = useState('');
  const [position, setPosition] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [team, setTeam] = useState('');
  const [birthday, setBirthday] = useState('');
  const [bio, setBio] = useState('10-6-1970');
  const [sendDob, setSendDob] = useState('2004-07-16');
  const [loading,setLoading] = useState(false)

  const dispatch=useDispatch();
  const userDetail = useSelector(state => state.user);


  useEffect(()=>{
  setFirstName(userDetail?.userData.f_name);
  setLastName(userDetail?.userData.l_name);
  setEmail(userDetail?.userData.email);
  setNationality(userDetail?.userDetailData[0].nationality);
  setPosition(userDetail?.userDetailData[0].position);
  setHeight(userDetail?.userDetailData[0].height);
  setWeight(userDetail?.userDetailData[0].weight);
  setTeam(userDetail?.userDetailData[0].current_team);
  setBirthday(userDetail?.userDetailData[0].dob);
  setImage(`${ImageURL}${userDetail?.userDetailData[0].profile_img}`);
  },[])

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setBirthday(moment(date).format('Do MMM YY'));
    setSendDob(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  async function imageUpload(type, path) {
    console.log(type)
    setLoading(true);
    let formdata = new FormData();
    formdata.append('uid', userDetail.userData.id);
    formdata.append('type', type);
    formdata.append('file', {uri: path, name: 'image.jpg', type: 'image/jpeg'});
    fetch(`${ApiURL}profile-update`, {
      method: 'post',
      body: formdata,
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }

  const chooseVideossFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
      imageUpload('profile', image.path);
    });
  };

  async function profileUpdate() {
    
    let data = {
      uid: userDetail?.userData?.id,
      type: 'profileupdate',
      fullName: firstName + ' ' + lastName,
      f_name: firstName,
      l_name: lastName,
      email: email,
      nationality: nationality,
      position: position,
      height: height,
      weight: weight,
      team: team,
      birthday: sendDob,
      bio: bio,
    };
    if (
      firstName.trim() == '' ||
      email.trim() == '' ||
      nationality.trim() == '' ||
      position.trim() == '' ||
      height.trim() == '' ||
      weight.trim() == '' ||
      team.trim() == '' ||
      birthday.trim() == '' ||
      bio.trim() == ''
    ) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'All field is required.',
      });
    } else {
      const result = await dispatch(updateUser(data));
      console.log(result);
    }
  }

  return (
    <View style={styles.maincontainer}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
          backgroundColor:COLORS.headerColor,
          height:responsiveHeight(5)
        }}>
        <View style={styles.header}>
          <Icon
            name="arrow-back-ios"
            size={24}
            color={COLORS.dark}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '45%',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={styles.profile}>Profile</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderRadius: 100,
          borderColor: '#fff',
          borderWidth: 1,
          height: 100,
          width: 100,
          display: 'flex',
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Image
          style={{
            width: Dimensions.get('screen').width - 261.5,
            height: Dimensions.get('screen').width - 261.5,
            resizeMode: 'cover',
            borderRadius: 100,
            borderWidth: 1,
            borderColor: COLORS.white,
          }}
          source={{
            uri: image,
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 100,
            borderColor: COLORS.white,
            borderWidth: 1,
            width: 28,
            height: 28,
            position: 'absolute',
            justifyContent: 'center',
            left: 75,
            bottom: 10,
          }}
          onPress={() => chooseVideossFromGallery()}>
          <Ionicons
            name="camera-outline"
            color={COLORS.dark}
            size={18}
            style={{display: 'flex', alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View>
          <View style={styles.inpsub}>
            <TextInput
              style={styles.input}
              value={firstName}
              placeholder="First Name"
              placeholderTextColor={COLORS.white}
              onChangeText={firstName => setFirstName(firstName)}
            />
          </View>
          <View style={styles.inpsub}>
            <TextInput
              style={styles.input}
              value={lastName}
              placeholder="Last Name"
              placeholderTextColor={COLORS.white}
              onChangeText={lastName => setLastName(lastName)}
            />
          </View>
          <View style={styles.inpsub}>
            <TextInput
              style={styles.input}
              value={email}
              placeholder="Email"
              placeholderTextColor={COLORS.white}
              onChangeText={email => setEmail(email)}
              editable={false}
            />
          </View>
          <View style={styles.inpsub}>
            <TextInput
              style={styles.input}
              value={nationality}
              placeholder="Nationality"
              placeholderTextColor={COLORS.white}
              onChangeText={nationality => setNationality(nationality)}
            />
          </View>
          <View style={styles.inpsub}>
            <TextInput
              style={styles.input}
              value={position}
              placeholder="Position"
              placeholderTextColor={COLORS.white}
              onChangeText={position => setPosition(position)}
            />
          </View>
          <View style={styles.inpsub}>
            <TextInput
              style={styles.input}
              value={height}
              placeholder="Height"
              placeholderTextColor={COLORS.white}
              onChangeText={height => setHeight(height)}
            />
          </View>
          <View style={styles.inpsub}>
            <TextInput
              style={styles.input}
              value={weight}
              placeholder="weight"
              placeholderTextColor={COLORS.white}
              onChangeText={weight => setWeight(weight)}
            />
          </View>
          <View style={styles.inpsub}>
            <TextInput
              style={styles.input}
              value={team}
              placeholder="Current Team"
              placeholderTextColor={COLORS.white}
              onChangeText={team => setTeam(team)}
            />
          </View>
          <View
            style={[
              styles.inpsub,
              {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              maximumDate={new Date()}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              color={COLORS.white}
              
            />
            <TextInput
              style={[styles.input, {width: '80%', marginLeft: 10}]}
              value={birthday}
              placeholder="Date of birth"
              placeholderTextColor={COLORS.white}
              inlineImageLeft="username"
            />
            <Entypo
              onPress={() => setDatePickerVisibility(!isDatePickerVisible)}
              style={styles.searchIcon}
              name="calendar"
              size={27}
              color={COLORS.white}
            />
          </View>

          <View style={styles.inpsub}>
            <TextInput
              style={[styles.input, {textAlignVertical: 'top'}]}
              placeholder="Bio"
              placeholderTextColor={COLORS.white}
              onChangeText={bio => setBio(bio)}
              multiline={true}
              value={bio}
              numberOfLines={7}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => profileUpdate()}>
          <Text style={styles.txt}>Update</Text>
        </TouchableOpacity>
        <View style={{height:10}}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    width: '100%',
    backgroundColor:COLORS.dark
  },
  header: {
    marginLeft: -30,
  },
  profile: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
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
  done: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  change: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  inpsub: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  input: {
    display: 'flex',
    alignSelf: 'center',
    borderColor: COLORS.Grey,
    borderBottomColor: '#DFDFDF',
    borderWidth: 1,
    width: '90%',
    fontSize: 12,
    padding: 15,
    backgroundColor: COLORS.dark,
    borderRadius: 8,
    color: COLORS.white,
  },
  photos: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    paddingLeft: 20,
    paddingTop: 10,
  },
  btn: {
    backgroundColor: COLORS.headerColor,
    width: '40%',
    padding: 12,
    borderRadius: 10,
    display: 'flex',
    alignSelf: 'flex-start',
    display: 'flex',
    alignSelf: 'center',
  },
  txt: {
    color: COLORS.dark,
    fontSize: 16,
    display: 'flex',
    alignSelf: 'center',
    fontWeight:"bold"
  },
  searchIcon: {
    padding: 10,
  },
});