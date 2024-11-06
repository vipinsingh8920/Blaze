import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import COLORS from '../../Components/Color';
import {Alert, Modal, Pressable} from 'react-native';
import {SignUpButton} from '../../Components/Components';
import {styles} from './Style';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import {Input, SignInGoogle} from '../../Components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Dropdown} from 'react-native-element-dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {showMessage} from 'react-native-flash-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {signupUser} from '../../reducers/authReducer';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../loader/Loader';

export default function SignUp() {
  const {loading} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisible] = useState(true);
  const [visibleC, setVisibleC] = useState(true);

  function showPassword() {
    setVisible(!visible);
  }
  function showPasswordC() {
    setVisibleC(!visibleC);
  }

  const Authenticate = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    var passwordRex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    console.log(passwordRex.test(password));
    if (value === null) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Please Select type.',
      });
    } else if (email.trim() === '') {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Email-Id is required.',
      });
    } else if (reg.test(email) === false) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Email-Id is Not Correct.',
      });
    } else if (username.trim() === '') {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Username is required.',
      });
    } else if (password.trim() === '') {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Password is required.',
      });
    } else if (password.length < 5) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Password should be 5 character.',
      });
    } else if (confirmPassword.trim() === '') {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Confirm password is required!',
      });
    } else if (confirmPassword !== password) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Confirm password and Password not match.',
      });
    } else {
      let loginData = {
        id_cms_privileges: value,
        name: username,
        email: email,
        password: password,
        c_password: confirmPassword,
      };
      dispatch(signupUser(loginData));
      if (loading == false) {
        showMessage({
          type: 'success',
          icon: 'success',
          message: 'You have successfully register.',
        });
        navigation.navigate('onboardScreen');
      }
    }
  };

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const data = [
    {label: 'Player', value: '2'},
    {label: 'Club', value: '3'},
  ];

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={{backgroundColor:COLORS.dark,flex:1}}>
      {loading == true && <Loader />}

      <View style={{marginTop: 30, marginLeft: 10}}>
        <Icon
          name="chevron-left"
          size={30}
          color={COLORS.white}
          onPress={navigation.goBack}
        />
      </View>

      <View style={styles.signupcontainer}>
        <View style={styles.inpsub}>
          <Dropdown
            style={[
              styles.dropdown,
              isFocus && {borderColor: COLORS.lightGrey},
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={{color: 'grey'}}
            data={data}
            search={false}
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
              setValue(item.value);
              setIsFocus(false);
            }}
            itemContainerStyle={{backgroundColor:COLORS.dark}}
          />
        </View>

        <View style={styles.inpsub}>
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
            placeholder="Email"
            placeholderTextColor={COLORS.white}
          />
        </View>
        <View style={styles.inpsub}>
          <TextInput
            style={styles.input}
            onChangeText={text => setUsername(text)}
            placeholder="Public username"
            placeholderTextColor={COLORS.white}
          />
          <View style={{paddingLeft: 20, paddingTop: 15}}>
            <Text style={{color: COLORS.lightGrey, fontSize: 14}}>
              Your username will be public and you will not be able to change
              it.
            </Text>
          </View>
        </View>
        <View style={styles.inpsub}>
        
            <TextInput
              style={styles.input}
              secureTextEntry={visible}
              value={password}
              onChangeText={text => setPassword(text)}
              placeholder="Password"
              placeholderTextColor={COLORS.white}
              multiline={false}
            />
        

          <TouchableOpacity
            onPress={() => showPassword()}
            style={{position: 'absolute', right: 30, top: 25}}>
          
                <Ionicons
                  name={visible?"eye-off-outline":"eye-outline"}
                  size={28}
                  color={COLORS.white}
                />
         
         
          </TouchableOpacity>
          {/* <View style={{ padding: 20 }}>
                        <Text style={{ color: COLORS.Grey, fontSize: 14 }}>Combining uppercase and lowercase letters and numbers.</Text>
                    </View> */}
        </View>
        <View style={styles.inpsub}>
       
            <TextInput
              style={styles.input}
              secureTextEntry={visibleC}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              placeholder="Confirm Password"
              placeholderTextColor={COLORS.white}
              multiline={false}
            />
        

          <TouchableOpacity
            onPress={() => showPasswordC()}
            style={{position: 'absolute', right: 30, top: 25}}>
           
              <View>
                <Ionicons
                  name={visibleC?"eye-off-outline":"eye-outline"}
                  size={28}
                  color={COLORS.white}
                />
              </View>
             
            
          </TouchableOpacity>

          {/* <View style={{ padding: 20 }}>
                        <Text style={{ color: COLORS.Grey, fontSize: 14 }}>Combining uppercase and lowercase letters and numbers.</Text>
                    </View> */}
        </View>
        <SignUpButton Authenticate={Authenticate} />
      </View>
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
              <View style={{marginTop: 30}}>
                <View style={{display: 'flex', alignSelf: 'center'}}>
                  <Icon
                    name="keyboard-arrow-up"
                    size={30}
                    color={COLORS.white}
                    style={styles.arrow}
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                </View>
                <View
                  style={{display: 'flex', alignSelf: 'center', paddingTop: 5}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: COLORS.dark,
                    }}>
                    Go Back
                  </Text>
                </View>

                <View>
                  <View style={{paddingLeft: 15, paddingTop: 30}}>
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
                      color: COLORS.dark,
                      paddingLeft: 15,
                      paddingTop: 40,
                    }}>
                    Welcome back
                  </Text>
                  <View style={{padding: 15}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '500',
                        color: COLORS.dark,
                      }}>
                      Sign in to Blazee to pick up exactly where you left off.
                    </Text>
                  </View>
                </View>

                <View style={{marginTop: 10}}>
                  <SignInGoogle />
                </View>
                <View
                  style={{marginTop: 20, display: 'flex', alignSelf: 'center'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: COLORS.dark,
                    }}>
                    or sign in with email
                  </Text>
                </View>
                <View style={styles.main}>
                  <Input />

                  <View style={styles.forpass}>
                    <TouchableOpacity>
                      <Text
                        style={styles.forgot}
                        onPress={() => navigation.navigate('ForgotPassword')}>
                        Forgot Password
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={{width: '100%', marginBottom: 10}}></View>
    </KeyboardAwareScrollView>
  );
}
