import {
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from './Color';

export default function PlayVideo({item, video}) {
  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    
    return (
      <View key={index}>
        <TouchableOpacity
          onPress={() => navigation.navigate('VideoPlayer', {item: item})}>
          <View
            style={{
              height: 130,
              width: 200,
              marginRight: 10,
              backgroundColor: COLORS.lightGrey,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: responsiveWidth(2),
            }}>
            <Image
              source={require('../Assets/thumbnail.jpg')}
              style={{
                height: 130,
                width: 200,
                position: 'absolute',
                borderRadius: responsiveWidth(2),
              }}
            />
            <AntDesign
              name="playcircleo"
              size={25}
              style={{color: COLORS.white}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={{marginBottom: 20, marginLeft: 10, marginTop: 20}}>
        <FlatList
          horizontal={true}
          data={video}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  photos: {
    width: Dimensions.get('screen').width - 170,
    height: Dimensions.get('screen').width - 230,
    resizeMode: 'cover',
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignSelf: 'center',
  },
  modalStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
  centeredView: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});
