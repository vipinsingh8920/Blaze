import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  Image,
} from 'react-native';
import COLORS from '../../Components/Color';
import {Searchbar, TextInput} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getData} from '../../helpers/axios';

export default function FilterPlayer({navigation}) {
  const [platForm, setPlatForm] = useState(Platform.OS);
  const [isVisible, setIsVisible] = useState(false);
  const [country, setCountry] = useState('');
  const [search, setSearch] = useState('');
  const [resultData, setResultData] = useState([]);
  const [resultDataFull, setResultDataFull] = useState([]);
  const ref = React.useRef(null);

  const renderCountry = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.countryChoose,
          {
            borderColor: item.name == country ? COLORS.headerColor : COLORS.white,
          },
        ]}
        onPress={() => chooseCountry(item.name)}>
        {item.name == country ? (
          <Image
            source={require('../../Assets/selected.png')}
            style={[styles.icon, {tintColor: COLORS.headerColor}]}
          />
        ) : (
          <Image
            source={require('../../Assets/non_selected.png')}
            style={styles.icon}
          />
        )}
        <Text style={{color: COLORS.white}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    (async () => {
      let country = [];
      if (search != '') {
        country = await getData(`get-country/${search}`);
      } else {
        country = await getData(`get-country`);
      }
      setResultDataFull(country.data);
      setResultData(country.data);
    })();
  }, []);

  const searchCountry = text => {
    setSearch(text);
    text = text.toLowerCase();
    if (text === '') {
      setResultData(resultData);
    } else {
      let filteredLanguages = resultDataFull.filter(language =>
        language.name.toLowerCase().startsWith(text),
      );
      setResultData(filteredLanguages);
    }
  };

  function chooseCountry(item) {
    setCountry(item);
    setIsVisible(false);
  }
  return (
    <View style={{flex: 1, backgroundColor: COLORS.dark}}>
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
              Club
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View
          style={{
            marginTop: responsiveHeight(2),
            display: 'flex',
            alignSelf: 'center',
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: COLORS.white}}>
            Filter your categories here!
          </Text>
        </View>
        <View
          style={{
            marginTop: responsiveHeight(2),
            width: '90%',
            display: 'flex',
            alignSelf: 'center',
            backgroundColor: COLORS.dark,
          }}>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Enter your salary here</Text>

            <TextInput
              placeholder="Enter Your Salary here..."
              placeholderTextColor={COLORS.white}
              style={{color: COLORS.white, backgroundColor: COLORS.darkgrey2}}
            />
          </View>
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Enter No. of Leagues</Text>

            <TextInput
              placeholder="Enter No. of Leagues..."
              placeholderTextColor={COLORS.white}
              style={{color: COLORS.white, backgroundColor: COLORS.darkgrey2}}
            />
          </View>
          <TouchableOpacity
            onPress={() => setIsVisible(!isVisible)}
            style={[styles.fieldSet, {height: responsiveHeight(6)}]}>
            <Text style={styles.legend}>Choose your country</Text>

            <Text style={{color: COLORS.white}}>
              {country == '' ? 'Choose your country' : country}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => console.log('hello')}>
            <Text style={styles.txt}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal isVisible={isVisible}>
        <View
          style={{
            backgroundColor: COLORS.dark,
            padding: responsiveFontSize(2),
            borderRadius: responsiveFontSize(1),
            alignItems: 'center',
            height: responsiveHeight(60),
            borderWidth: 1,
            borderColor: COLORS.white,
          }}>
          <TouchableOpacity
            onPress={() => setIsVisible(!isVisible)}
            style={{alignItems: 'flex-end', width: '100%'}}>
            <FontAwesome
              name="window-close"
              color={COLORS.white}
              size={responsiveFontSize(3)}
            />
          </TouchableOpacity>
          <View style={{marginTop: 20, justifyContent: 'center'}}>
            <Searchbar
              placeholder="Search country"
              placeholderTextColor={COLORS.white}
              onChangeText={text => searchCountry(text)}
              value={search}
              iconColor={COLORS.white}
              onIconPress={() => searchCountry()}
              ref={ref}
              style={{
                maxHeight: 50,
                width: responsiveWidth(75),
                marginBottom: 0,
                color: COLORS.white,
                backgroundColor: COLORS.dark,
                borderWidth: 1,
                borderColor: COLORS.white,
              }}
            />
            <View
              style={{
                height: responsiveHeight(40),
                marginHorizontal: responsiveWidth(1.5),
                marginTop: 10,
              }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={resultData}
                renderItem={renderCountry}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldSet: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    // alignItems: 'center',
    borderColor: COLORS.lightGrey,
    display: 'flex',
    backgroundColor: COLORS.dark,
  },
  search: {
    width: responsiveWidth(70),
    borderColor: COLORS.Grey,
    borderWidth: 1,
    borderRightColor: COLORS.white,
  },
  legend: {
    position: 'absolute',
    top: -10,
    left: 10,
    fontWeight: 'bold',
    backgroundColor: COLORS.headerColor,
    color: COLORS.dark,
  },
  txt: {
    fontSize: 10,
    color: COLORS.dark,
  },
  header: {
    paddingLeft: 10,
  },
  btn: {
    backgroundColor: COLORS.headerColor,
    width: '90%',
    padding: 15,
    borderRadius: 10,
    display: 'flex',
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
  },
  txt: {
    color: COLORS.black,
    fontSize: 16,
    display: 'flex',
    alignSelf: 'center',
  },
  countryChoose: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    marginTop: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
