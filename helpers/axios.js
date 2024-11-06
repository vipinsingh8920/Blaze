import axios from 'react-native-axios';
const url = 'https://pflegeboxx24.de/blez/api/';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ApiURL = 'https://pflegeboxx24.de/blez/api/';
export const WebURL = 'https://pflegeboxx24.de/blez/';
export const ImageURL = 'https://pflegeboxx24.de/blez/public/';
export const getData = async api => {
  const resutlData = await axios.get(url + api, {
    headers: {
      secretkey: `${await AsyncStorage.getItem('secretkey')}`,
      Authorization: `Bearer ${await AsyncStorage.getItem('access_token')}`,
    },
  });
  return resutlData.data;
};

export const postData = async (api, body) => {
  
  try {
    const res = await axios.post(url + api, body, {
      headers: {
        secretkey: `${await AsyncStorage.getItem('secretkey')}`,
        Authorization: `Bearer ${await AsyncStorage.getItem('access_token')}`,
      },
    });

    return res.data;
  } catch (error) {
    return error;
  }
};

export const putData = async (api, body) => {
  axios
    .put(url + api, body, {
      headers: {
        secretkey: '511b5bf67c711d7c828d11762ad9c1fc',
        Authorization: `Bearer ${await AsyncStorage.getItem('access_token')}`,
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const deleteData = async (api, body) => {
  axios
    .put(url + api, {
      headers: {
        secretkey: `${await AsyncStorage.getItem('secretkey')}`,
        Authorization: `Bearer ${await AsyncStorage.getItem('access_token')}`,
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};



