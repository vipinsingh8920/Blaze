import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../Components/Color';
import ImagePicker from 'react-native-image-crop-picker';
import {Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PlayVideo from '../../Components/PlayVideo';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
import {ApiURL, postData} from '../../helpers/axios';
import axios from 'react-native-axios';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Gallery({item,ImageData}) {
//console.log(ImageData)
const isFocused=useIsFocused();

  const navigation = useNavigation();
  const [image, setImage] = useState('https://media.istockphoto.com/id/959257646/photo/professional-soccer-player-about-to-kick-football-during-soccer-match.jpg?s=612x612&w=is&k=20&c=FebQ8O3WGH6Usg7GKGGlBCZacfCmMDt29ICWhsH1yL4=');
  const [video, setVideo] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const userDetail = useSelector(state => state.user);
  
  async function ViewData() {

    try {
      setIsLoading(true);
      const resultData = await axios.get(
        `${ApiURL}view-media/${item.item.id}/image`,
      );
      setData(resultData.data.data)
      setIsLoading(false);
    } catch (e) {
      console.log('ssss', e.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    ViewData();
    ViewVideo();
  }, [isFocused]);

  const chooseImagesFromGallery = async () => {
    ImagePicker.openPicker({
      width: 800,
      height: 800,
      cropping: true,
    }).then(async image => {
      try {
        setIsLoading(true);
        let formdata = new FormData();
        formdata.append('uid', item.item.id);
        formdata.append('type', 'image');
        formdata.append('image', {
          uri: image.path,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
         await axios.post(`${ApiURL}add-media`, formdata, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        });
        setIsLoading(false);
        ViewData();
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    });
  };

  const ChooseVideossFromGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(async video => {
      try {
        setIsLoading(true);
        let formdata = new FormData();
        formdata.append('user_id', item.item.id);
        formdata.append('video', {
          uri: video.path, 
          name: 'video.mp4',
          type: video.mime,
        });
         await axios.post(`${ApiURL}upload_videos`, formdata, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${await AsyncStorage.getItem('access_token')}`
          },
        });
        setIsLoading(false);
        ViewVideo();
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    });
  };

  const ViewVideo=async()=>{
 
    let body={
      user_id:item.item.id
    }
    const res=await postData('get_videos',body)
    setVideo(res)
  }
  


  const deleteImageData = async item => {
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
            setIsLoading(true);
            await axios.get(`${ApiURL}delete-media/${item}`);
            await ViewData();
            setIsLoading(false);
          } catch (e) {
            setIsLoading(false);
            console.log(e.message);
          }
        },
      },
    ]);
  };

  const updateImagesFromGallery = async item => {
    ImagePicker.openPicker({
      width: 800,
      height: 800,
      cropping: true,
    }).then(async image => {
      try {
        let formdata = new FormData();
        formdata.append('uid', userDetail.userData.id);
        formdata.append('imageUpdate', '1');
        formdata.append('id', item);
        formdata.append('type', 'image');
        formdata.append('image', {
          uri: image.path,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
        const data = await axios.post(`${ApiURL}edit-media`, formdata, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(data.data);
        ViewData();
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    });
  };


  const RenderItem = ({item,index}) => {
  //  console.log(item)
    return(
      <View key={index}>
      <View style={{borderColor: '#fff', padding: 8}} >
        <TouchableOpacity
          onPress={() => updateImagesFromGallery(item.id)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '50%',
            justifyContent: 'space-between',
          }}>
          <View style={{borderRadius: 10}}>
            <Image style={styles.photos} source={{uri: `${item.media}`}} />
            {item.cms_users_id==userDetail?.userData.id?  <View
              style={{
                position: 'absolute',
                justifyContent: 'space-between',
                width: '100%',
                flexDirection: 'row',
              }}>
       
             <TouchableOpacity
                onPress={() => updateImagesFromGallery(item.id)}
                style={{
                  marginLeft: 7,
                  marginVertical: 7,
                  borderRadius: 14,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 28,
                  height: 28,
                  backgroundColor: COLORS.darkgrey2,
                }}>
                <FontAwesome
                  name="pencil"
                  size={responsiveFontSize(2)}
                  style={{color: COLORS.white}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteImageData(item.id)}
                style={{
                  marginRight: 7,
                  marginVertical: 7,
                  borderRadius: 14,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 28,
                  height: 28,
                  backgroundColor: COLORS.darkgrey2,
                }}>
                <FontAwesome
                  color={COLORS.warning}
                  name="trash"
                  size={responsiveFontSize(2)}
                />
              </TouchableOpacity>
          
              
            </View>
            :""}
          </View>
        </TouchableOpacity>
      </View>
      </View>
    )
  }

  return (
    <View style={styles.maincontainer}>
     {item.item.id==userDetail?.userData.id? <TouchableOpacity style={styles.btn} onPress={chooseImagesFromGallery}>
        <Text style={styles.photoss}>Upload Photos</Text>
      </TouchableOpacity>: <View style={[styles.btn,{marginRight:10}]} >
        <Text style={styles.photoss}> Photos</Text>
      </View>}

     

      <View style={{marginTop: 20}}>
        
        <ScrollView horizontal={true}>
        {data.map((item,index)=>{
      
          return(
             <RenderItem item={item} index={index}/>
          )
        })}
        </ScrollView>
      </View>
      <View style={{marginTop: 20}}>
        {item.item.id==userDetail?.userData.id?<TouchableOpacity style={styles.btn} onPress={ChooseVideossFromGallery}>
          <Text style={styles.photoss}>Upload videos</Text>
        </TouchableOpacity>:
       <View style={[styles.btn,{marginRight:10}]} >
       <Text style={styles.photoss}> Videos</Text>
     </View> }


        <PlayVideo item={item} video={video.data}/>
      </View>

      {isloading && (
        <View
          style={{
            position: 'absolute',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    width: '100%',
    marginTop: 10,
  },

  photos: {
    width: Dimensions.get('screen').width - 240,
    height: Dimensions.get('screen').width - 200,
    resizeMode: 'cover',
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
  },
  photoss: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.dark,
    display: 'flex',
    alignSelf: 'center',
  },
  header: {
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: COLORS.lightGrey,
    // paddingBottom: 20,
    borderColor: COLORS.white,
    borderWidth: 1,
    paddingTop: 10,
  },
  btn: {
    backgroundColor: COLORS.headerColor,
    padding: 5,
    borderColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    width: '30%',
    display: 'flex',
    alignSelf: 'flex-end',
  },
});
