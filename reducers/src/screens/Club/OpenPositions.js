//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import COLORS from '../../../Components/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {ApiURL, getData, postData} from '../../../helpers/axios';
import axios from 'react-native-axios';
import {useSelector} from 'react-redux';

// create a component
const OpenPositions = ({item}) => {
  const res = item;

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [toggle, setToggle] = useState(false);
  const [jobToggle, setJobToggle] = useState(false);
  const [locationToggle, setLocationToggle] = useState(false);
  const [JobType, setJobType] = useState('Select');
  const [location, setLocation] = useState('Select');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [toggle2, setToggle2] = useState(false);

  const userDetail = useSelector(state => state.user);

  const PostJob = async () => {
    let body = {
      uiid: item.id,
      title,
      description: desc,
      job_type: JobType,
      location_type: location,
    };
    let res = await postData('add-jobs', body);
    if (res?.success == true) {
      setToggle(false);
      alert('Job Post Successfully...');
    } else {
      alert('Error');
    }
  };

  const GetJobData = async () => {
    let res = await getData(`jobs/${item.id}`);
    setData(res?.data);
  };

  useEffect(() => {
    GetJobData();
  }, [isFocused]);

  const DeleteJob = async item => {
    Alert.alert('Delete', 'Do you want to delete this?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          try {
            await axios.get(`${ApiURL}delete-jobs/${item}`);
            await GetJobData();
          } catch (e) {
            console.log(e.message);
          }
        },
      },
    ]);
  };

  const EditJobs = async () => {
    let body = {
      id: id,
      title,
      description: desc,
      job_type: JobType,
      location_type: location,
    };
    let res = await postData(`update-jobs`, body);
    console.log(res);
    GetJobData();
  };

  const SelectJobType = () => {
    return (
      <View
        style={{
          height: responsiveHeight(16),
          width: responsiveWidth(40),
          backgroundColor: COLORS.dark,
          position: 'absolute',
          marginTop: responsiveHeight(13.5),
          zIndex: 20000,
          borderRadius: responsiveWidth(2),
          borderWidth:1,
          borderColor:COLORS.white
        }}>
        <View
          style={{
            height: responsiveHeight(7),
            borderBottomWidth: responsiveWidth(0.2),
            justifyContent: 'center',
            alignItems: 'center',
            borderColor:COLORS.white
          }}>
          <TouchableOpacity
            onPress={() => {
              setJobType('Full Time'), setJobToggle(false);
            }}>
            <Text style={{color: COLORS.lightGrey}}>Full Time</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: responsiveHeight(7),
            borderBottomWidth: responsiveWidth(0.2),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setJobType('Part Time'), setJobToggle(false);
            }}>
            <Text style={{color: COLORS.lightGrey}}>Part Time</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const SelectLocation = () => {
    return (
      <View
        style={{
          height: responsiveHeight(16),
          width: responsiveWidth(40),
          backgroundColor: COLORS.dark,
          position: 'absolute',
          marginTop: responsiveHeight(24.5),
          zIndex: 20000,
          borderRadius: responsiveWidth(2),
          borderWidth:1,borderColor:COLORS.white,elevation:1
        }}>
        <View
          style={{
            height: responsiveHeight(5),
            borderBottomWidth: responsiveWidth(0.2),
            justifyContent: 'center',
            alignItems: 'center',
            borderColor:COLORS.lightGrey
          }}>
          <TouchableOpacity
            onPress={() => {
              setLocation('Remote'), setLocationToggle(false);
            }}>
            <Text style={{color: COLORS.lightGrey}}>Remote</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: responsiveHeight(5),
            borderBottomWidth: responsiveWidth(0.2),
            justifyContent: 'center',
            alignItems: 'center',
            borderColor:COLORS.lightGrey
          }}>

          <TouchableOpacity
            onPress={() => {
              setLocation('Hybrid'), setLocationToggle(false);
            }}>
            <Text style={{color: COLORS.lightGrey}}>Hybrid</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: responsiveHeight(5),
           
            justifyContent: 'center',
            alignItems: 'center',
           
          }}>
          <TouchableOpacity
            onPress={() => {
              setLocation('On Site'), setLocationToggle(false);
            }}>
            <Text style={{color: COLORS.lightGrey}}>On Site</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            borderColor: COLORS.darkgrey,
            borderBottomColor: COLORS.darkgrey,
            borderWidth: 1.5,
            paddingBottom: 10,
            marginLeft: -0.8,
            borderRadius: responsiveWidth(2),
          }}>
          <View style={{backgroundColor: COLORS.dark, padding: 10}}>
            <Image
              style={{
                width: Dimensions.get('screen').width - 320,
                height: Dimensions.get('screen').width - 320,
                resizeMode: 'cover',
              }}
              source={require('../../../Assets/chelsa.png')}
            />
          </View>
          <View
            style={{
              backgroundColor: COLORS.dark,
              paddingLeft: 10,
              width: '66%',
              paddingTop: 15,
              paddingBottom: 10,
            }}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: COLORS.white}}>
              {item.title}
            </Text>
            <Text
              style={{fontSize: 16, paddingTop: 3, color: COLORS.lightGrey}}>
              Chelsa Football Club
            </Text>
            <Text
              style={{fontSize: 16, paddingTop: 3, color: COLORS.lightGrey}}>
              {item.description}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{fontSize: 16, paddingTop: 3, color: COLORS.lightGrey}}>
                ({item.location_type})
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  paddingTop: 3,
                  color: COLORS.lightGrey,
                  marginLeft: responsiveWidth(7),
                }}>
                ({item.job_type})
              </Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    paddingTop: 3,
                    color: COLORS.lightGrey,
                  }}>
                  3 weeks ago .
                </Text>
              </View>
            </View>
          </View>
          <View style={{width: '40%', marginTop: 10, flexDirection: 'row'}}>
            {userDetail.userData.id == res.id ? (
              <>
                <AntDesign
                  name="delete"
                  size={22}
                  color={COLORS.white}
                  style={{marginLeft: responsiveWidth(-2)}}
                  onPress={() => DeleteJob(item.id)}
                />
                <AntDesign
                  name="edit"
                  size={22}
                  color={COLORS.white}
                  style={{marginLeft: responsiveWidth(2)}}
                  onPress={() => {
                    setId(item.id), setToggle2(true);
                  }}
                />
              </>
            ) : (
              ''
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          paddingLeft: 10,
          paddingTop: 15,
          backgroundColor: COLORS.dark,
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: responsiveWidth(88),
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: COLORS.white,
              paddingBottom: 10,
            }}>
            Current Openings
          </Text>

          {userDetail?.userData.id == item.id ? (
            <Entypo
              name="plus"
              size={30}
              style={{
                color: COLORS.dark,
                backgroundColor: COLORS.headerColor,
                borderRadius: responsiveWidth(10),
                alignSelf: 'center',
              }}
              onPress={() => setToggle(true)}
            />
          ) : (
            ''
          )}
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
        />
      </View>
      <Modal transparent={true} visible={toggle} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.dark,
          }}>
          <View
            style={{
              height: responsiveHeight(62.2),
              width: responsiveWidth(90),
              borderRadius: responsiveWidth(2),
              backgroundColor: COLORS.dark,
              elevation: 5,
              position: 'absolute',
              borderWidth:1,
              borderColor:COLORS.white
            }}>
            <View style={styles.boxview}>
              <Text style={styles.title}>Title</Text>
              <TextInput
                placeholder="Enter title..."
                placeholderTextColor={COLORS.lightGrey}
                style={styles.box1}
                value={title}
                onChangeText={val => setTitle(val)}
              />

              <Text style={[styles.title, {marginTop: responsiveHeight(2)}]}>
                Job Type
              </Text>
              <View
                style={[
                  styles.box1,
                  {alignItems: 'center', flexDirection: 'row'},
                ]}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: responsiveHeight(6),
                  }}
                  onPress={() => setJobToggle(true)}>
                  <Text
                    style={{
                      color: COLORS.lightGrey,
                      marginLeft: responsiveWidth(1),
                    }}>
                    {JobType}
                  </Text>
                  <Entypo
                    name="chevron-small-down"
                    size={30}
                    style={{
                      color: COLORS.Grey,
                    }}
                  />
                </TouchableOpacity>
              </View>
              {jobToggle && <SelectJobType />}

              <Text style={[styles.title, {marginTop: responsiveHeight(2)}]}>
                Location Type
              </Text>
              <View style={[styles.box1]}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: responsiveHeight(6),
                  }}
                  onPress={() => setLocationToggle(true)}>
                  <Text
                    style={{
                      color: COLORS.lightGrey,
                      marginLeft: responsiveWidth(1),
                    }}>
                    {location}
                  </Text>
                  <Entypo
                    name="chevron-small-down"
                    size={30}
                    style={{
                      color: COLORS.Grey,
                    }}
                  />
                </TouchableOpacity>
              </View>
              {locationToggle && <SelectLocation />}

              <Text style={[styles.title, {marginTop: responsiveHeight(2)}]}>
                Description
              </Text>
              <TextInput
                placeholder="Enter title..."
                placeholderTextColor={COLORS.lightGrey}
                style={{
                  height: responsiveHeight(15),
                  width: responsiveWidth(86),
                  borderWidth: responsiveWidth(0.2),
                  borderRadius: responsiveWidth(2),
                  borderColor: COLORS.lightGrey,
                  color: COLORS.lightGrey,
                }}
                value={desc}
                onChangeText={val => setDesc(val)}
              />
            </View>

            <View
              style={{marginTop: responsiveHeight(3.1), flexDirection: 'row'}}>
              <View
                style={[
                  styles.btn,
                  {
                    borderBottomLeftRadius: responsiveWidth(2),
                    borderRightWidth: responsiveWidth(0.2),
                  },
                ]}>
                <TouchableOpacity onPress={() => PostJob()}>
                  <Text style={{color: COLORS.dark, fontWeight: 'bold'}}>
                    Post Job
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.btn,
                  {
                    borderBottomRightRadius: responsiveWidth(2),
                    borderLeftWidth: responsiveWidth(0.2),
                  },
                ]}>
                <TouchableOpacity onPress={() => setToggle(false)}>
                  <Text style={{color: COLORS.dark, fontWeight: 'bold'}}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent={true} visible={toggle2} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.dark,
          }}>
          <View
            style={{
              height: responsiveHeight(62.2),
              width: responsiveWidth(90),
              borderRadius: responsiveWidth(2),
              backgroundColor: COLORS.dark,
              elevation: 5,
              position: 'absolute',
              borderWidth: 1,
              borderColor: COLORS.white,
            }}>
            <View style={styles.boxview}>
              <Text style={styles.title}>Title</Text>
              <TextInput
                placeholder="Enter title..."
                placeholderTextColor={COLORS.lightGrey}
                style={styles.box1}
                value={title}
                onChangeText={val => setTitle(val)}
              />

              <Text style={[styles.title, {marginTop: responsiveHeight(2)}]}>
                Job Type
              </Text>
              <View
                style={[
                  styles.box1,
                  {alignItems: 'center', flexDirection: 'row'},
                ]}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: responsiveHeight(6),
                  }}
                  onPress={() => setJobToggle(true)}>
                  <Text
                    style={{
                      color: COLORS.lightGrey,
                      marginLeft: responsiveWidth(1),
                    }}>
                    {JobType}
                  </Text>
                  <Entypo
                    name="chevron-small-down"
                    size={30}
                    style={{
                      color: COLORS.Grey,
                    }}
                  />
                </TouchableOpacity>
              </View>
              {jobToggle && <SelectJobType />}

              <Text style={[styles.title, {marginTop: responsiveHeight(2)}]}>
                Location Type
              </Text>
              <View style={[styles.box1]}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: responsiveHeight(6),
                  }}
                  onPress={() => setLocationToggle(true)}>
                  <Text
                    style={{
                      color: COLORS.lightGrey,
                      marginLeft: responsiveWidth(1),
                    }}>
                    {location}
                  </Text>
                  <Entypo
                    name="chevron-small-down"
                    size={30}
                    style={{
                      color: COLORS.Grey,
                    }}
                  />
                </TouchableOpacity>
              </View>
              {locationToggle && <SelectLocation />}

              <Text style={[styles.title, {marginTop: responsiveHeight(2)}]}>
                Description
              </Text>
              <TextInput
                placeholder="Enter title..."
                placeholderTextColor={COLORS.lightGrey}
                style={{
                  height: responsiveHeight(15),
                  width: responsiveWidth(86),
                  borderWidth: responsiveWidth(0.2),
                  borderRadius: responsiveWidth(2),
                  borderColor: COLORS.lightGrey,
                  color: COLORS.lightGrey,
                }}
                value={desc}
                onChangeText={val => setDesc(val)}
              />
            </View>

            <View
              style={{marginTop: responsiveHeight(3.1), flexDirection: 'row'}}>
              <View
                style={[
                  styles.btn,
                  {
                    borderBottomLeftRadius: responsiveWidth(2),
                    borderRightWidth: responsiveWidth(0.2),
                  },
                ]}>
                <TouchableOpacity onPress={() => EditJobs()}>
                  <Text style={{color: COLORS.dark, fontWeight: 'bold'}}>
                    Update Job
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.btn,
                  {
                    borderBottomRightRadius: responsiveWidth(2),
                    borderLeftWidth: responsiveWidth(0.2),
                  },
                ]}>
                <TouchableOpacity onPress={() => setToggle2(false)}>
                  <Text style={{color: COLORS.dark, fontWeight: 'bold'}}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box1: {
    height: responsiveHeight(6),
    width: responsiveWidth(86),
    borderWidth: responsiveWidth(0.2),
    borderRadius: responsiveWidth(2),
    borderColor: COLORS.lightGrey,
    color: COLORS.lightGrey,
  },
  title: {
    color: COLORS.white,
    fontSize: responsiveFontSize(2),
  },
  boxview: {
    marginLeft: responsiveWidth(2),
    marginTop: responsiveHeight(3),
    backgroundColor: COLORS.dark,
  },
  btn: {
    height: responsiveHeight(5.6),
    width: responsiveWidth(44.7),
    backgroundColor: COLORS.headerColor,
    borderColor: COLORS.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default OpenPositions;
