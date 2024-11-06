import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Text,
  platForm,
  StatusBar
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../Components/Color';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AllPlayers from "../AllPlayers";
import SearchPlayer from "../../../Components/SearchPlayer";
import { getData } from "../../../helpers/axios";
import { useSelector } from "react-redux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// Default Sample Data
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "",
    subtitle:
      "",
    image:
      "https://img.freepik.com/free-vector/sports-soccer-club-green-background_1017-39245.jpg?w=2000",
  },
  {
    id: "bd7adbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "",
    subtitle:
      "",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPZA8L_jMONDpXaoNtMA-8-CHqLrR8d5oeC0E7KSrSY1kPADjFherXNY3rNXMRsyW7j3o&usqp=CAU",
  },
  {
    id: "ad7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "",
    subtitle:
      "",
    image:
      "https://www.hkfc.com/media/4iknn0lh/club-logo.png",
  },
  {
    id: "ad8acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "",
    subtitle:
      "",
    image:
      "https://m.media-amazon.com/images/I/61BloQ2E-SL._AC_SL1500_.jpg"
  }
];

const PopoulerData = [
  {
    title: 'Pr.League',
  },
  {
    title: 'ChampionShip',
    image: true,
  },
  {
    title: 'Top Players',
  },
  {
    title: 'Top Clubs',
  },
  {
    title: 'Top Matches',
  },
];

// Default Props
const defaults = {
  height: 260,//Dimensions.get("window").height,
  width: Dimensions.get("window").width,
  delay: 5000,
};

// Default Image Item
const Item = ({ title, image, height, width, onPress, subtitle }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={[styles.imageContainer, { height: height, width: width }]}
  >
    <Image source={{ uri: image }} style={[styles.image, { height: height, resizeMode: 'cover',marginTop:10}]} />
    <View style={styles.titleContainer}>
      {title && <Text style={styles.title}>{title} </Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  </TouchableOpacity>
);

// Default On Press Action
const handlePress = (item) => {
  console.log("Pressed", item.id);
};

// Carousal Component
export default function ClubCarousel({
  data = DATA,
  height = defaults.height,
  width = defaults.width,
  delay = defaults.delay,
  onPress = handlePress,
  ItemElement = Item,
}) {
  const navigation = useNavigation();
  const [selectedIndex, setselectedIndex] = useState(0);
  const scrollView = useRef();
  const [toggle,setToggle] = useState(false);
  const [status,setStatus] = useState('');

  const isFocused=useIsFocused();
  const {userData}=useSelector(state=>state.user);


  useEffect(()=>{
    GetStatus();
  },[isFocused])
  
  const GetStatus=async()=>{
    let res2=await getData(`get-notification/${userData.id}`);
    setStatus(res2.data[0].message_status);
  }

  // Script which will only executed when component initilizes
  useEffect(() => {
    const fn = setInterval(() => {
      setselectedIndex((oldCount) =>
        oldCount === data.length - 1 ? 0 : oldCount + 1
      );
    }, delay);
    return () => {
      clearInterval(fn);
    };
  }, []);

  // Script will executed every time selectedIndex updates
  useEffect(() => {
    scrollView.current.scrollTo({
      animated: true,
      x: width * selectedIndex,
      y: 0,
    });
  }, [selectedIndex]);

  const setIndex = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    setselectedIndex(Math.floor(contentOffset.x / viewSize.width));
  };

  return (
    <View style={{}}>
<StatusBar  barStyle = "dark-content" backgroundColor = {COLORS.headerColor} />

        <View style={{ marginTop: platForm=='ios'?responsiveHeight(5):0,backgroundColor:COLORS.headerColor,height:34,flexDirection: 'row',
          alignItems:'center',paddingLeft:10,width:'100%'}}>
        <Icon
          name="menu"
          size={26}
          color={COLORS.dark}
          onPress={() => navigation.openDrawer()}
        />
        {/* <Image
        source={{uri:"https://static.casino.guru/pict/203258/4303_500x250_dark.png?timestamp=1653455592000&imageDataId=236216&height=160"}}
        style={{height:70,width:100}}
        /> */}

 <Image
        source={require('../../../Assets/blazelogo2.png')}
        style={{height:25,width:70,marginLeft:10,marginTop:-2}}
        resizeMode="contain"
        />

<MaterialIcons
                  name="search"
                  size={28}
                  style={{paddingLeft: 5, color: COLORS.dark,marginLeft:responsiveWidth(49)}}
                  onPress={() => setToggle(true)}
                />

         <TouchableOpacity onPress={()=>navigation.navigate("Notification")}>
       {status==1? <Ionicons
        name="notifications-outline"
        size={22}
        style={{color:COLORS.dark,marginLeft:responsiveWidth(1.5)}}
        />
        :
        <MaterialCommunityIcons
        name="bell-badge-outline"
        size={22}
        style={{color:COLORS.dark,marginLeft:responsiveWidth(1.5)}}
        />}
        </TouchableOpacity>

      </View>


      <ScrollView
            horizontal
            contentContainerStyle={{paddingHorizontal: 20, flexGrow: 1,backgroundColor:"#232323"}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 20,marginTop:10}}>
              {PopoulerData.map((data, index) => {
                return (
                  <TouchableOpacity
                   // onPress={() => navigation.navigate('LanguageDetail')}
                    key={index}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                        
                      }}>
                      <Text style={[{fontSize: 13, color: COLORS.white,fontWeight:"bold"}]}>
                        {data.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>


      <ScrollView
        ref={scrollView}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={setIndex}
        // style={{borderRadius:16}}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.carousalContainer}>
          {data.map((item) => (
            <ItemElement
              key={item.id}
              height={height}
              width={width}
              {...item}
              onPress={() => onPress(item)}
            />
          ))}
        </View>
      </ScrollView>
  <SearchPlayer toggle={toggle} setToggle={setToggle}/>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
height:responsiveHeight(7),
width:responsiveWidth(100),
backgroundColor:COLORS.headerColor,
justifyContent:"center"
},
  carousalContainer: {
    flexDirection: "row",
    width: "100%",

  },
  item: {
    backgroundColor: "rgba(91, 91, 91, 0.3)",
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    paddingLeft: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: "bold",
  },
  subtitle: {
    color: '#fff',
  },
  image: {
    width: defaults.width,
    height: defaults.height,
  },
});