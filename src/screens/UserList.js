import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import COLORS from '../../Components/Color';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';

const AllUser = () => {
  const [listData, setListData] = useState([]);
  const [search, setsearch] = useState('');
  const [chatuser, setChatUser] = useState([]);
  const {userData} = useSelector(state => state.user);
  const navigation = useNavigation();

  function searchUser(text) {
    if (text) {
      const newData = listData.filter(function (item) {
        const itemData = item[1].userInfo.displayName
          ? item[1].userInfo.displayName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setChatUser(newData);
      setsearch(text);
    } else {
      setChatUser(listData);
      setsearch(text);
    }
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection('userChats')
      .doc(userData.id.toString())
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot != null) {
          setListData(
            Object.entries(documentSnapshot.data())?.sort(
              (a, b) => b[1].date - a[1].date,
            ),
          );
          setChatUser(
            Object.entries(documentSnapshot.data())?.sort(
              (a, b) => b[1].date - a[1].date,
            ),
          );
        }
      });
    return () => subscriber();
  }, [userData.id]);

  const startChat = async item => {
    const combinedId =
      userData.id > item[1].userInfo.uid
        ? userData.id + '-' + item[1].userInfo.uid
        : item[1].userInfo.uid + '-' + userData.id;

    const chatrooms = firestore()
      .collection('chatrooms')
      .doc(combinedId.toString());
    const chatCheck = await chatrooms.get();

    if (!chatCheck.exists) {
      console.log('not exists');
      firestore()
        .collection('chatrooms')
        .doc(combinedId.toString())
        .set({})
        .then(() => {
          navigation.navigate('Message', {
            item: item,
            combinedId: combinedId,
            myId: userData.id,
          });
        });
    } else {
      navigation.navigate('Message', {
        item: item,
        combinedId: combinedId,
        myId: userData.id,
      });
    }
  };

  const renderItem = ({item}) => {

    return (

      <ListItem
        onPress={() => startChat(item)}
        bottomDivider
        containerStyle={{paddingVertical: 7, marginVertical: 2,backgroundColor:COLORS.dark}}>
        <Avatar
          source={{uri: item[1]?.userInfo?.photoURL}}
          rounded
          title={item[1]?.userInfo?.displayName}
          size="medium"
          style={{height:responsiveHeight(7),width:responsiveWidth(14),borderWidth:1,borderColor:COLORS.white,borderRadius:responsiveWidth(10)}}
        />
        <ListItem.Content>
          <ListItem.Title style={{fontSize: 14,color:COLORS.white}}>
            {item[1]?.userInfo?.displayName}
          </ListItem.Title>
          <ListItem.Subtitle style={{fontSize: 12,color:COLORS.lightGrey}} numberOfLines={1}>
            {item[1]?.lastMessage?.textmsg}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.dark}}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.headerColor} />
      <View
        style={{
          backgroundColor: COLORS.headerColor,
          height: 44,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
          width: '100%',
        }}>
        <Icon
          name="arrow-back-ios"
          size={24}
          color={COLORS.dark}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            color: COLORS.dark,
            fontSize: responsiveFontSize(2.5),
            fontWeight: 'bold',
          }}>
          User List
        </Text>
      </View>
      <View
        style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <SearchBar
          placeholder="Search by name..."
          onChangeText={val => searchUser(val)}
          value={search}
          containerStyle={styles.searchContainer}
          inputStyle={styles.searchInput}
          placeholderTextColor={COLORS.lightGrey}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={chatuser}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default AllUser;

const styles = StyleSheet.create({
  searchContainer: {
    elevation: 2,
    backgroundColor: COLORS.dark,
    borderColor: COLORS.white,
    borderWidth: 1,
    height: 50,
    borderRadius: 10,
    width: '98%',
    marginTop: 7,
  },
  searchInput: {fontSize: 15, color: COLORS.lightGrey, opacity: 0.7},
});
