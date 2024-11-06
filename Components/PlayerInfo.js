import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import COLORS from './Color';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CheckBox} from 'react-native-elements';
import {postData} from '../helpers/axios';
import {showMessage} from 'react-native-flash-message';
import { color } from 'react-native-elements/dist/helpers';

const PlayerInfo = ({item, userData,user}) => {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  var date1 = new Date().getDate();
  let month1 = new Date().getMonth() + 1;
  month1 = month1 > 9 ? month1 : `0${month1}`;
  var year1 = new Date().getFullYear();

  const [dob, setDob] = useState(userData.dob);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    let month = date.getMonth() + 1;
    month = month > 9 ? month : `0${month}`;
    let year = date.getFullYear();
    setDob(`${year}-${month}-${day}`);
    console.log('sssss', `${year}-${month}-${day}`);
    hideDatePicker();
  };

  const userDetail = useSelector(state => state.user);


  const [age, setAge] = useState('0');

  function AgeCalculate(item) {
    //console.log(item.dob);
    var dob1 = new Date(dob);
    
    //calculate month difference from current date in time
    var month_diff = Date.now() - dob1.getTime();
    //convert the calculated difference in date format
    var age_dt = new Date(month_diff);

    //extract year from date
    var year = age_dt.getUTCFullYear();
    //now calculate the age of the user
    var age = Math.abs(year - 1970);
    //display the calculated age
   
    setAge(age + ' years');
   
    return (
      <TextInput
      editable={item.id==userDetail?.userData.id?true:false}
        style={styles.input}
        placeholder={age + ' years'}
        defaultValue={age + ' years'}
        placeholderTextColor={'#000'}
      />
    );
  }
  //console.log(userDetail.userData)
  const [firstName, setFirstName] = useState(user.f_name);
  const [lastName, setLastName] = useState(user.l_name);
  const [position, setPosition] = useState(userData.position);
  const [nationality, setNationality] = useState(userData.nationality);
  const [height, setHeight] = useState(userData.height);
  const [weight, setWeight] = useState(userData.weight);
  const [current_team, setCurrent_team] = useState(userData.current_team);
  const [gender, setGender] = useState(userData.gender);

  const [male, setMale] = useState(false);
  const [female, setFmale] = useState(false);
  const [other, setOther] = useState(false);

  async function UpdateProfile() {
    let data = {
      uid: userDetail.userData.id,
      f_name: firstName,
      l_name: lastName,
      name: `${firstName} ${lastName}`,
      nationality: nationality,
      position: position,
      height: height,
      weight: weight,
      current_team: current_team,
      gender: gender,
      dob: dob,
      age: age,
    };
    try {
      const dataReturn = await postData('player-info-update', data);
      console.log(dataReturn.data);
      showMessage({
        type: 'success',
        icon: 'success',
        message: 'Data update successfully update.',
      });
    } catch (error) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: `${error.message}`,
      });
    }
  }
  function Gender(item) {
    if (item == 'Male') {
      setMale(!male);
      setFmale(false);
      setOther(false);
    }
    if (item == 'Female') {
      setFmale(!female);
      setMale(false);
      setOther(false);
    }
    if (item == 'Other') {
      setOther(!other);
      setFmale(false);
      setMale(false);
    }
    setGender(item);
  }

  //console.log(userDetail.userDetailData)
  return (
    <View
      style={{flex: 1, backgroundColor: COLORS.dark, alignItems: 'center'}}>
      <View
        style={{
          marginHorizontal: responsiveWidth(4),
          marginVertical: responsiveHeight(1),
        }}>
        <View style={styles.fieldSet}>
          <Text style={styles.legend}>First Name</Text>
          <TextInput
          editable={item.item.id==userDetail?.userData.id?true:false}
            style={styles.input}
            placeholder={user.f_name}
            defaultValue={user.f_name}
            placeholderTextColor={COLORS.white}
            onChangeText={f_name => setFirstName(f_name)}
          />
        </View>
        <View style={styles.fieldSet}>
          <Text style={styles.legend}>Last Name</Text>
          <TextInput
          editable={item.item.id==userDetail?.userData.id?true:false}
            style={styles.input}
            placeholder={user.l_name}
            defaultValue={user.l_name}
            placeholderTextColor={COLORS.white}
            onChangeText={l_name => setLastName(l_name)}
          />
        </View>
        <View style={styles.fieldSet}>
          <Text style={styles.legend}>Position</Text>
          <TextInput
          editable={item.item.id==userDetail?.userData.id?true:false}
            style={styles.input}
            placeholder={userData.position}
            defaultValue={userData.position}
            placeholderTextColor={COLORS.white}
            onChangeText={position => setPosition(position)}
          />
        </View>
        <View style={styles.fieldSet}>
          <Text style={styles.legend}>Nationality</Text>
          <TextInput
          editable={item.item.id==userDetail?.userData.id?true:false}
            style={styles.input}
            placeholder={userData.nationality}
            defaultValue={userData.nationality}
            placeholderTextColor={COLORS.white}
            onChangeText={nationality => setNationality(nationality)}
          />
        </View>
        <View style={styles.fieldSet}>
          <Text style={styles.legend}>Height</Text>
          <TextInput
          editable={item.item.id==userDetail?.userData.id?true:false}
            style={styles.input}
            placeholder={userData.height}
            defaultValue={userData.height}
            placeholderTextColor={COLORS.white}
            onChangeText={height => setHeight(height)}
          />
        </View>
        <View style={styles.fieldSet}>
          <Text style={styles.legend}>Weight</Text>
          <TextInput
          editable={item.item.id==userDetail?.userData.id?true:false}
            style={styles.input}
            placeholder={userData.weight}
            defaultValue={userData.weight}
            placeholderTextColor={COLORS.white}
            onChangeText={weight => setWeight(weight)}
          />
        </View>
        <View style={styles.fieldSet}>
          <Text style={styles.legend}>Current Team</Text>
          <TextInput
          editable={item.item.id==userDetail?.userData.id?true:false}
            style={styles.input}
            placeholder={userData.current_team}
            defaultValue={userData.current_team}
            placeholderTextColor={COLORS.white}
            onChangeText={current_team => setCurrent_team(current_team)}
          />
        </View>
        <View style={[styles.fieldSet, {height: responsiveHeight(18)}]}>
          <Text style={styles.legend}>Gender</Text>
          <View
            style={{
              width: responsiveWidth(80),
              flexDirection: 'row',
              marginTop: 5,
              height: responsiveHeight(9),
              backgroundColor:COLORS.dark
            }}>

            <CheckBox
              title="Male"
              checked={male}
              textStyle={{color:COLORS.white}}
              onPress={() => Gender('Male')}
              containerStyle={{backgroundColor:COLORS.dark}}
            />
            <CheckBox
              title="Female"
              checked={female}
              textStyle={{color:COLORS.white}}
              onPress={() => Gender('Female')}
              containerStyle={{backgroundColor:COLORS.dark}}
            />
          </View>
          <View>
            <CheckBox
              title="Other"
              checked={other}
              textStyle={{color:COLORS.white}}
              onPress={() => Gender('Other')}
              containerStyle={{backgroundColor:COLORS.dark}}
            />
          </View>
        </View>
        <View style={styles.fieldSet}>
          <Text style={styles.legend}>Date Of Birth</Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5}}>
            <TouchableOpacity onPress={() => showDatePicker()}>
              <FontAwesome
                name="calendar"
                size={responsiveFontSize(3)}
                style={{color: COLORS.white}}
              />
            </TouchableOpacity>
            <TextInput
            editable={item.item.id==userDetail?.userData.id?true:false}
              style={[
                styles.input,
                {marginLeft: 4, width: responsiveWidth(75)},
              ]}
              placeholder={userData.dob}
              value={dob}
              placeholderTextColor={COLORS.white}
              onChangeText={date => setDob(date)}
            />
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={
              new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate(),
              )
            }
          />
        </View>
        <View style={styles.fieldSet}>
          <Text style={styles.legend}>Age</Text>
          <AgeCalculate dob={dob} />
        </View>
      {item.item.id==userDetail.userData.id? <TouchableOpacity style={styles.btn} onPress={() => UpdateProfile()}>
          <Text style={styles.txt}>Update</Text>
        </TouchableOpacity>:""}
      </View>
    </View>
  );
};

export default PlayerInfo;

const styles = StyleSheet.create({
  fieldSet: {
    margin: 10,
    // padding: 0,
    height: responsiveHeight(5),
    borderRadius: 5,
    borderWidth: 1,
    // alignItems: 'center',
    borderColor: COLORS.lightGrey,
    width: responsiveWidth(90),
    display: 'flex',
    marginTop: 20,
   
  },
  legend: {
    position: 'absolute',
    marginTop: -22,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  input: {
    marginTop: -3,
    width: '98%',
    color: COLORS.lightGrey,
    fontSize: responsiveFontSize(1.8),
    alignSelf: 'center',
    paddingLeft: 5,
    height: responsiveHeight(5.5),
    placeholderTextColor: COLORS.black,
  },
  btn: {
    backgroundColor: COLORS.headerColor,
    width: responsiveWidth(90),
    padding: 15,
    borderRadius: 10,
    display: 'flex',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
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
