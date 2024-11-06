import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../src/screens/Style';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {signinUser, socialLogin} from '../reducers/authReducer';
import {Dropdown} from 'react-native-element-dropdown';
import COLORS from './Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Loader from '../loader/Loader';

export function Input(props) {
  const [username, setEmail] = useState('');
  const [passwordUser, setPassword] = useState('');
  const [visible, setVisible] = useState(true);
  // dropdown here
  const [value, setValue] = useState('');

  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
 
  const Authenticate = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (value === null) {
      alert('Please Select type!');
    } else if (username.trim() === '') {
      alert('Email-Id is required!');
    } else if (reg.test(username) === false) {
      alert('Email is Not Correct!');
    } else if (passwordUser.trim() === '') {
      alert('Password is required!');
    } else {
      let loginData = {
        id_cms_privileges: value,
        email: username,
        password: passwordUser,
      };
      let result = dispatch(signinUser(loginData));
      console.log(result);
    }
  };

  const data = [
    {label: 'Player', value: '2'},
    {label: 'Club', value: '3'},
  ];

  return (
    <>
      <View style={{marginTop: 10}}>
        <SignInGoogle value={value} />
      </View>
      <View style={{marginTop: 10, display: 'flex', alignSelf: 'center'}}>
        <Text style={{fontSize: 16, fontWeight: '700', color: COLORS.white}}>
          or sign in with email
        </Text>
      </View>
      <View style={styles.content}>
        <View>
          <Dropdown
            style={[
              styles.dropdown,
              isFocus && {borderColor: COLORS.lightGrey},
            
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={data}
            itemTextStyle={{color: 'grey'}}
            search={false}
            maxHeight={300}
            iconStyle={[styles.iconStyle]}
            placeholder={'Select type'}
            placeholderTextColor={COLORS.white}
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
            containerStyle={{backgroundColor:COLORS.dark}}
    
          />
        </View>

        <View style={styles.inpsub}>
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
            placeholder="Email"
            autoCapitalize="none"
            placeholderTextColor={COLORS.white}
            value={username}
          
          />
          <View style={{position: 'absolute', right: 30, top: 30}}>
         
            <View>
              <Ionicons
                name="mail-open-outline"
                size={25}
                color={COLORS.white}
              />
            </View>
          </View>
        </View>
        <View style={styles.inpsub}>
        
            <TextInput
              style={styles.passInp}
              secureTextEntry={visible}
              value={passwordUser}
              onChangeText={text => setPassword(text)}
              placeholder="Password"
              placeholderTextColor={COLORS.white}
              multiline={false}
            />

          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            style={{position: 'absolute', right: 30, top: 25}}>
           
              <View>
                <Ionicons
                  name={visible?"eye-off-outline":"eye-outline"}
                  size={28}
                  color={COLORS.white}
                />
              </View>
          
          </TouchableOpacity>
        </View>
      </View>
      <SignInButton useLogin={() => Authenticate()} />
    </>
  );
}

export function Logo() {
  return (
    <View style={{padding: 15}}>
      {/* <Image
                style={styles.logo}
                source={require('../Assets/iboat.png')}
            /> */}
    </View>
  );
}
export function SignInButton({useLogin}) {
  const navigation = useNavigation();
  return (
    <View style={styles.btndiv}>
      <TouchableOpacity onPress={() => useLogin()} style={styles.signbtn}>
        <Text style={styles.sign}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
export function SignUpButton({Authenticate}) {
  const navigation = useNavigation();
  return (
    <View style={styles.btndiv}>
      <TouchableOpacity onPress={() => Authenticate()} style={styles.signbtn}>
        <Text style={styles.sign}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
export function SignInGoogle({value}) {
  const {loading} = useSelector(state => state.user);
  const dispatch = useDispatch();
  GoogleSignin.configure({
    webClientId:
      '500717825047-9etdpl5c5r16nqujmaqpt9mt0tvs5bn7.apps.googleusercontent.com',
  });

  const signInWithgoogle = async () => {
    // Get the users ID token
    if (value === null) {
      alert('Please Select type!');
    } else {
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
          let id_cms_privileges = value;
          dispatch(socialLogin({name, email, photo, id_cms_privileges}));
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {loading == true && <Loader />}
      <View style={{display: 'flex', width: '100%', padding: 10}}>
        <TouchableOpacity
          onPress={() => signInWithgoogle()}
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
            padding: 10,
          }}>
          <View style={{paddingRight: 10}}>
            <Image
              style={{
                width: Dimensions.get('screen').width - 341,
                height: Dimensions.get('screen').width - 341,
                resizeMode: 'contain',
              }}
              source={require('../Assets/goglle.png')}
            />
          </View>
          <View>
            <Text style={{fontSize: 16, fontWeight: '700', color: COLORS.dark}}>
              Google
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
