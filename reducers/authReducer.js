import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {postData} from '../helpers/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

const initialState = {
  token: null,
  loading: true,
  error: false,
  message: '',
  userData: '',
 
};

export const setNextMatchTime = createAsyncThunk(
  'setNextMatchTime',
  async body => {
    const result = await postData(`next-match-update`, body);
    return result;
  },
);

export const signupUser = createAsyncThunk('signupuser', async body => {
  const result = await postData('register', body);
  return result;
});

export const signinUser = createAsyncThunk('signinuser', async body => {
  const result = await postData('login', body);
  return result;
});

export const updateUser = createAsyncThunk('updateUser', async body => {
  const result = await postData('profile-update', body);
  return result;
});

export const addToken = createAsyncThunk('addtoken', async () => {
  const result = await AsyncStorage.getItem('userDetail');
  return result;
});
export const forgotPassword = createAsyncThunk('forgotPassword', async body => {
  const result = await postData('forgot-password', body);
  return result;
});

export const socialLogin = createAsyncThunk('socialLogin', async body => {
  const result = await postData('socialLogin', body);
  return result;
});


// Then, handle actions in your reducers:
const authReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.token = null;
      AsyncStorage.removeItem('userDetail');
    },
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(setNextMatchTime.fulfilled, (state, action) => {
      console.log(action);
      // Add user to the state array
      console.log(action.payload.data);
      state.token = action.payload.data?.token;
      state.userData = action.payload.data?.detail;
      state.userDetailData = action.payload.data?.userDetail;
      AsyncStorage.setItem('userDetail', JSON.stringify(action.payload));
    }),
      builder.addCase(setNextMatchTime.pending, (state, action) => {
        // Add user to the state array
        state.loading = true;
      }),
      builder.addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
      }),
      builder.addCase(signupUser.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(addToken.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload !== null) {
          state.token = JSON.parse(action.payload)?.data.token;
          state.userData = JSON.parse(action.payload)?.data.detail;
          state.userDetailData = JSON.parse(action.payload)?.data.userDetail;
        }
      }),
      builder.addCase(addToken.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data?.message == 'wrong-cms-api-key') {
          alert('Wrong cms-api-key');
        } else if (action.payload.data?.error == 'Wrong-detail') {
          alert('Wrong email-id or password');
        } else {
          console.log(action.payload.data);
          state.token = action.payload.data?.token;
          state.userData = action.payload.data?.detail;
          state.userDetailData = action.payload.data?.userDetail;
          AsyncStorage.setItem('userDetail', JSON.stringify(action.payload));
        }
      }),
      builder.addCase(signinUser.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(socialLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data.token;
        state.userData = action.payload.data.detail;
        AsyncStorage.setItem('userDetail', JSON.stringify(action.payload));
      }),
      builder.addCase(socialLogin.pending, (state, action) => {
        state.loading = true;
      }),

      builder.addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data?.message == 'wrong-cms-api-key') {
          alert('Wrong cms-api-key');
        } else if (action.payload.data?.error == 'Wrong-detail') {
          alert('Wrong email-id or password');
        } else {   
          state.token = action.payload.data?.token;
          state.userData = action.payload.data?.detail;
          state.userDetailData = action.payload.data?.userDetail;
          AsyncStorage.setItem('userDetail', JSON.stringify(action.payload));
        }
      }),
      builder.addCase(updateUser.pending, (state, action) => {
        state.loading = true;
      }),

      builder.addCase(forgotPassword.fulfilled, (state, action) => {
        console.log(action);

        state.loading = false;
      }),
      builder.addCase(forgotPassword.pending, (state, action) => {
        state.loading = true;
      });

     

      
  },
});

export const {logout} = authReducer.actions;
export default authReducer.reducer;
