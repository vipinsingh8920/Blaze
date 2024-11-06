
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import COLORS from './Color';

const WatchListPlayer = () => {
 
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Cristiano Ronaldo',
      img: require('../Assets/ronaldo.webp'),
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Lionel Messi.......',
      img: require('../Assets/lionei.jpeg'),
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Robert Lewando..',
      img: require('../Assets/robert.jpeg'),
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Kylian Mbappe ',
      img: require('../Assets/kylian.jpeg'),
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Kevin de Bruyne',
      img: require('../Assets/kevin.webp'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={{marginTop: 10}}>
        {data.map((curelm, index) => {
          return (
            <TouchableOpacity
              key={index.toString()}
              style={{
                padding: 10,
                borderColor: '#fff',
                borderWidth: 1,
                borderBottomColor: '#DFDFDF',
                backgroundColor: COLORS.white,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '80%',
                  justifyContent: 'space-around',
                }}>
                <View style={{marginRight: 5}}>
                  <Image style={styles.sport} source={curelm.img} />
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 5,
                  }}>
                  <View style={{marginTop: 10}}>
                    <Text style={styles.name}>{curelm.name}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sport: {
    width: Dimensions.get('screen').width - 300,
    height: Dimensions.get('screen').width - 320,
    resizeMode: 'cover',
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
});
export default WatchListPlayer;
