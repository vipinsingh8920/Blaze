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
  StatusBar
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../Components/Color';
import { Platform} from "react-native"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SearchPlayer from "../../Components/SearchPlayer";
import { getData } from "../../helpers/axios";
import { useSelector } from "react-redux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


// Default Props
const defaults = {
  height: 300,//Dimensions.get("window").height,
  width: Dimensions.get("window").width,
  delay: 5000,
};

// Default Image Item
const Item = ({ title, image, height, width, onPress, subtitle }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={[styles.imageContainer, { height: height, width: width }]}>
    <Image source={{ uri: image }} style={[styles.image, { height: height, resizeMode: 'cover', marginTop: 10 }]} />
    <View style={styles.titleContainer}>
      {title && <Text style={[styles.title,{backgroundColor:"red"}]}>{title} </Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  </TouchableOpacity>
);


// Default On Press Action
const handlePress = (item) => {
  console.log("Pressed", item.id);
};

// Carousal Component

export default function Carousal({
  playerSlider,
  height = defaults.height,
  width = defaults.width,
  delay = defaults.delay,
  onPress = handlePress,
  ItemElement = Item,
}) {
  
  const navigation = useNavigation();
  const [selectedIndex, setselectedIndex] = useState(0);
  const [platForm, setPlatForm] = useState(Platform.OS);
  const [toggle,setToggle] = useState(false);
  const [status,setStatus] = useState();

  const isFocused=useIsFocused();

useEffect(()=>{
  GetStatus();
},[isFocused])

const GetStatus=async()=>{
  let res2=await getData(`get-notification/${userData.id}`);
  setStatus(res2.data[0].message_status);
}

  const {userData}=useSelector(state=>state.user);
 
  const scrollView = useRef();

  // Script which will only executed when component initilizes
  useEffect(() => {
    const fn = setInterval(() => {
      setselectedIndex((oldCount) =>
        oldCount === playerSlider.length - 1 ? 0 : oldCount + 1
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


  return (
    <View style={{}}>
       {/* <StatusBar barStyle="light-content" backgroundColor={COLORS.headerColor} color={COLORS.Grey} translucent={false} />  */}
       <StatusBar  barStyle = "dark-content" backgroundColor = {COLORS.headerColor} />
      <View style={{ marginTop: platForm=='ios'?responsiveHeight(5):0,backgroundColor:COLORS.headerColor,height:34,flexDirection: 'row',
          alignItems:'center',paddingLeft:10,width:'100%'}}>
        <Icon
          name="menu"
          size={26}
          color={COLORS.dark}
          onPress={() => navigation.openDrawer()}
        />
        <Image
        source={require('../../Assets/blazelogo2.png')}
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
            contentContainerStyle={{paddingHorizontal: 20, flexGrow: 1}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 20,marginTop:10}}>
              {PopoulerData.map((data,index) => {
                return(
                  <TouchableOpacity
                   //onPress={() => navigation.navigate('LanguageDetail')}
                    key={index}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                        marginLeft:index==0?-5
                        :0
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
        style={{}}
        ref={scrollView}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={setIndex}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.carousalContainer}>
          {playerSlider.map((item) => (
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