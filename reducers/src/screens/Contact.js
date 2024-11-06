import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Platform} from 'react-native';
import {Text} from 'react-native';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import COLORS from '../../Components/Color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {showMessage} from 'react-native-flash-message';
import {postData} from '../../helpers/axios';
import Loader from '../../loader/Loader';
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default function Contact() {
  const navigation = useNavigation();
  const [platForm, setPlatForm] = useState(Platform.OS);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const contactus = async () => {
    setIsLoading(true);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (
      name.trim() == '' ||
      email.trim() == '' ||
      address.trim() == '' ||
      phone.trim() == '' ||
      message.trim() == ''
    ) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'All fields are required to be filled.',
      });
      setIsLoading(false);
      return false;
    } else if (reg.test(email) === false) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Email-id is not correct!.',
      });
      setIsLoading(false);
      return false;
    }

    try {
      const result = await postData('contactus', {
        name,
        email,
        address,
        phone,
        message,
      });

      setName('');
      setEmail('');
      setAddress('');
      setPhone('');
      setMessage('');

      setIsLoading(false);
      if (result.success) {
        showMessage({
          type: 'success',
          icon: 'success',
          message: result.message,
        });
      } else {
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Some error is occurred..',
        });
      }
    } catch (error) {
      setIsLoading(false);
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Some error is occurred in server..',
      });
    }
  };
  return (
    <ScrollView style={styles.maincontainer}>
      {isLoading == true && <Loader />}
      <View style={{backgroundColor: COLORS.headerColor}}>
        <View
          style={{
            marginTop: platForm == 'ios' ? responsiveScreenHeight(5) : 0,
            flexDirection: 'row',
            width: '100%',
            paddingBottom: 10,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="chevron-left"
              size={30}
              color={COLORS.dark}
              style={{paddingLeft: 10}}
            />
          </TouchableOpacity>

          <View style={styles.discover}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                paddingLeft: 15,
                color: COLORS.dark,
              }}>
              Contact Us
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          alignSelf: 'flex-start',
          width: '100%',
          borderRadius: 10,
          marginTop: 10,
        }}>
        <TextInput
          style={styles.input}
          onChangeText={name => setName(name)}
          value={name}
          placeholder="Name"
          placeholderTextColor={COLORS.lightGrey}
        />
        <TextInput
          style={styles.input}
          onChangeText={email => setEmail(email)}
          value={email}
          placeholder="Email"
          placeholderTextColor={COLORS.lightGrey}
        />

        <TextInput
          style={styles.input}
          onChangeText={address => setAddress(address)}
          value={address}
          textAlignVertical="top"
          placeholder="Address"
          multiline={true}
          numberOfLines={3}
          placeholderTextColor={COLORS.lightGrey}
        />

        <TextInput
          style={styles.input}
          onChangeText={phone => setPhone(phone)}
          value={phone}
          keyboardType="numeric"
          placeholder="Phone Number"
          placeholderTextColor={COLORS.lightGrey}
        />
        <TextInput
          style={styles.textArea}
          textAlignVertical="top"
          onChangeText={address => setMessage(address)}
          value={message}
          placeholder="Message"
          multiline={true}
          numberOfLines={4}
          placeholderTextColor={COLORS.lightGrey}
        />

        <TouchableOpacity style={styles.btn} onPress={() => contactus()}>
          <Text style={styles.txt}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  boat: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  heading: {
    display: 'flex',
    alignSelf: 'center',
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
    fontSize: 16,
    display: 'flex',
    alignSelf: 'center',
  },
});
