import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import COLORS from '../../../Components/Color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';

export default function Filter({navigation}) {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-43jknjk436c2-aed5-3ad53abb28ba',
      img: require('../../../Assets/ronaldo.webp'),
      name: 'Cristiano Ronaldo',
      Fav: require('../../../Assets/fav.png'),
    },
    {
      id: '3ac68afc-c605-348d3-a4fjkhk8-fbd91aa97f63',
      img: require('../../../Assets/lionei.jpeg'),
      name: 'Lionel Messi',
      Fav: require('../../../Assets/fav.png'),
    },
    {
      id: '58694a0f-3da341-472571f-bd96-145571e29d72',
      img: require('../../../Assets/football2.jpg'),
      name: 'Robert Lewan..',
      Fav: require('../../../Assets/fav.png'),
    },
    {
      id: 'bd7acb12ea-c1b1-46wdec2-aed5-3ad53abb28ba',
      img: require('../../../Assets/kylian.jpeg'),
      name: 'Kylian Mbappé',
      Fav: require('../../../Assets/fav.png'),
    },
    {
      id: '3ac68rafc-c605-48d3-aeff4f8-fbd91aa97f63',
      img: require('../../../Assets/mohamaad.webp'),
      name: 'Mohamed Salah',
      Fav: require('../../../Assets/fav.png'),
    },
    {
      id: '58694a30f-3da1-471f-bhhd96-145571e29d72',
      img: require('../../../Assets/kevin.webp'),
      name: 'Kevin De Bruyne',
      Fav: require('../../../Assets/fav.png'),
    },
  ];

  const [liked, setLiked] = useState([]);

  const AddFavPlayer = index => {
    console.log(liked);
    if (liked.includes(index)) {
      let unlike = liked.filter(elem => elem !== index);
      setLiked(unlike);
    } else {
      setLiked([...liked, index]);
    }
  };

  return (
    <View style={styles.Filter}>
      <View style={styles.header}>
        <View>
          <MaterialIcons
            name="chevron-left"
            size={30}
            color={COLORS.dark}
            onPress={navigation.goBack}
            style={{paddingLeft: 5, paddingTop: 5}}
          />
        </View>

        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '25%',
            justifyContent: 'space-between',
            borderColor: COLORS.white,
            borderWidth: 1,
            backgroundColor: COLORS.lightGrey,
            padding: 8,
            borderRadius: 8,
            marginTop: 4,
          }}
          onPress={() => navigation.navigate('FilterCategory')}>
          <MaterialIcons
            name="filter-list"
            size={20}
            color={COLORS.dark}
            style={{paddingLeft: 10}}
          />
          <View>
            <Text>Filter</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 20, display: 'flex', flexDirection: 'row'}}>
        <TextInput
          placeholder="Search player"
          placeholderTextColor={'#888'}
          style={styles.input}
        />
        <View style={{position: 'absolute', right: 35, top: 18}}>
          <MaterialIcons
            name="search"
            size={22}
            color={COLORS.Grey}
            onPress={navigation.goBack}
            style={{paddingLeft: 10}}
          />
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 15,
          }}>
          {DATA.map((elm, index) => {
            return (
              <View
                style={{
                  margin: 10,
                  borderColor: COLORS.lightGrey,
                  borderBottomEndRadius: 10,
                  borderBottomLeftRadius: 10,
                  shadowColor: '#171717',
                  shadowOffset: {width: -2, height: 4},
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                }}>
                <View>
                  <ImageBackground
                    source={elm?.img}
                    style={{
                      width: Dimensions.get('screen').width - 230,
                      height: Dimensions.get('screen').width - 250,
                      resizeMode: 'cover',
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}>
                    <TouchableOpacity
                      style={{display: 'flex', alignSelf: 'flex-end'}}>
                      <TouchableOpacity onPress={() => AddFavPlayer(index)}>
                        {liked.includes(index) ? (
                          <Ionicons
                            name="heart-outline"
                            size={25}
                            style={{
                              color: liked.includes(index)
                                ? COLORS.white
                                : COLORS.purple,
                              paddingRight: 10,
                              paddingTop: 10,
                            }}
                          />
                        ) : (
                          <Ionicons
                            name="heart-sharp"
                            size={25}
                            color="red"
                            style={{paddingRight: 10, paddingTop: 10}}
                          />
                        )}
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: COLORS.white,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: COLORS.lightGrey,
                    borderWidth: 1,
                    width: '100%',
                    height: '20%',
                    justifyContent: 'center',
                    shadowColor: '#171717',
                    shadowOffset: {width: -2, height: 4},
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                  }}>
                  <Text
                    style={{fontSize: 16, color: COLORS.dark, display: 'flex'}}>
                    {elm?.name}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Filter: {
    flex: 1,
    // marginTop: 60,
    paddingLeft: 15,
    backgroundColor: COLORS.dark,
  },
  Filtertext: {
    fontSize: 18,
    fontWeight: 'bold',
    display: 'flex',
    alignSelf: 'center',
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  input: {
    width: '95%',
    display: 'flex',
    alignSelf: 'center',
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
    padding: 14,
    borderRadius: 4,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: COLORS.white,
  },

  fieldSet: {
    margin: 10,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    width: '90%',
    display: 'flex',
  },
  legend: {
    position: 'absolute',
    top: -10,
    left: 10,
    fontWeight: 'bold',
    backgroundColor: '#FFF',
    color: COLORS.purple,
  },
  txt: {
    fontSize: 12,
    color: COLORS.dark,
  },
  txtt: {
    fontSize: 18,
    color: COLORS.white,
    display: 'flex',
    alignSelf: 'center',
  },
  btn: {
    backgroundColor: COLORS.purple,
    padding: 10,
    width: '30%',
    display: 'flex',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    borderColor: COLORS.white,
    borderWidth: 1,
  },

  placeholderStyle: {
    fontSize: 12,
    color: COLORS.Grey,
    paddingLeft: 5,
  },
  selectedTextStyle: {
    fontSize: 12,
    color: COLORS.Grey,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 12,
    color: COLORS.dark,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  dropdown: {
    fontSize: 8,
    borderRadius: 8,
    color: '#fff',
  },
});
