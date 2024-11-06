import { Dimensions, StyleSheet } from 'react-native';
import COLORS from '../../Components/Color';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const styles = StyleSheet.create({

  logo: {
    display: 'flex',
    alignSelf: 'center',
    width: Dimensions.get('screen').width - 60,
    height: Dimensions.get("screen").width - 230,
    resizeMode: 'contain',
  },
  blaze: {
    display: 'flex',
    alignSelf: 'center',
    width: Dimensions.get('screen').width - 200,
    height: Dimensions.get("screen").width - 330,
    resizeMode: 'contain',
  },

  gogleimage: {
    width: Dimensions.get('screen').width - 300,
    height: Dimensions.get("screen").width - 420,
    resizeMode: 'contain',

  },
  header: {
    marginTop: 20
  },

  log: {
    paddingLeft: 20,
    fontSize: 16,
    fontWeight: 'bold',
    display: 'flex',
    alignSelf: 'flex-start',
    paddingBottom: 10,
    color: '#fff'
  },

  main: {

    backgroundColor: COLORS.purple,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderColor: COLORS.white,
    height: '79%',
    margin: 10,
    display: 'flex',
    marginTop: 'auto',
    paddingTop: 20
  },
  mains: {
    marginTop: 50,
    display: 'flex',
    alignSelf: 'flex-start',
    paddingLeft: 10
  },
  signmain: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 60,
    paddingLeft: 10,
  },
  Content: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#000000'
  },
  Contents: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000'
  },
  Challenge: {
    paddingTop: 30,
    fontSize: 20,
    fontWeight: '500',
    color: '#888888',
    display: 'flex',
    alignSelf: 'center',

  },
  content: {
    width: '100%',
    display: 'flex',
    paddingTop: 10,
    justifyContent: 'flex-start',

  },
  signn: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    paddingTop: 25
  },

  subcontent: {
    fontSize: 16,
    paddingTop: 5
  },
  input: {
    display: 'flex',
    alignSelf: 'center',
    borderColor: '#D7D7D7',
    borderBottomColor: '#DFDFDF',
    borderWidth: 0.5,
    width: '90%',
    height:responsiveHeight(7),
    fontSize: 12,
    padding: 15,
    // backgroundColor: "#fff",
    borderRadius: 8,
    color: COLORS.white
  },
  passCon: {
    paddingLeft: 20,

  },
  emaill: {
    marginTop: 20,
    marginBottom: 20,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 20
  },
  passInp: {
    display: 'flex',
    alignSelf: 'center',
    borderColor: '#D7D7D7',
    borderBottomColor: '#DFDFDF',
    borderWidth: 0.5,
    width: '90%',
    fontSize: 12,
    padding: 15,
    // backgroundColor: "#000000",
    borderRadius: 8,
    color: COLORS.white
  },
  email: {
    width: 20,
    height: 20,
    tintColor: '#000000'
  },

  eye: {
    width: 20,
    height: 20,
    tintColor: '#000000',
    resizeMode: 'contain'
  },

  inpsub: {
    paddingTop: 15,
    paddingBottom: 15
  },
  passwInp: {
    // paddingTop: 15,
    paddingBottom: 15,
    marginTop: 20,
    
  },
  signbtn: {
    backgroundColor: COLORS.headerColor,
    width: '80%',
    height: 40,
    borderRadius: 8,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',

  },

  sign: {
    fontSize: 16,
    color: '#FFF',
    display: 'flex',
    alignSelf: 'center',
    fontWeight: 'bold',
    color:COLORS.dark

  },

  txt: {
    color: '#fff',
    fontSize: 16,
  },

  
  div: {
    paddingTop: 10,
  },
  forpass: {

    width: '40%',
    display: 'flex',
    alignSelf: 'flex-end'
  },


  forgot: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',

  },

  option: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

  },

  options: {
    padding: 20
  },

  or: {
    paddingTop: 7
  },

  logs: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    display: 'flex',
    alignSelf: 'center',
    paddingBottom: 10,
    color: '#fff'
  },


  signgooglebtn: {
    backgroundColor: COLORS.lightGrey,
    width: '100%',
    height: 40,
    borderRadius: 8,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',

  },

  signgoogle: {
    fontSize: 14,
    border: '1px solid #ffffff',
    color: '#000000',
    fontWeight: 'bold'

  },
  google: {
    width: 20,
    height: 20,
    display: 'flex',


  },
  create: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row'
  },
  account: {
    fontSize: 14,
    color: COLORS.dark,
    paddingLeft: 10,
    paddingTop: 10
  },

  createacc: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    paddingTop: 10
  },
  signupcontainer: {
    paddingTop: 20
  },
  forgotpass: {
    // marginTop: 40
  },
  requestbtn: {
    backgroundColor: COLORS.headerColor,
    width: '80%',
    height: 40,
    borderRadius: 8,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  request: {
    //fontSize: 16,
    color: COLORS.dark,
    display: 'flex',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  discover: {
    width: '70%'

  },
  sport: {
    width: Dimensions.get('screen').width - 300,
    height: Dimensions.get('screen').width - 320,
    resizeMode: 'cover',
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1
  },
  sportt: {
    width: Dimensions.get('screen').width - 260,
    height: Dimensions.get('screen').width - 300,
    resizeMode: 'cover',
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1
  },
  awardimg: {
    width: Dimensions.get('screen').width - 230,
    height: Dimensions.get('screen').width - 300,
    resizeMode: 'cover',
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1
  },

  players: {
    width: Dimensions.get('screen').width - 250,
    height: Dimensions.get('screen').width - 250,
    resizeMode: 'cover',
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    borderRadius: 10,
    borderWidth: 1
  },
  photos: {
    width: Dimensions.get('screen').width - 280,
    height: Dimensions.get('screen').width - 300,
    resizeMode: 'cover',
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1
  },
  date: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.white
  },
  name: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.white
  },
  aboutClub: {
    marginTop: 20,
    paddingLeft: 15
  },
  namee: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000'
  },
  itemm: {
    marginTop: 20
  },

  dropdown: {
    display: 'flex',
    alignSelf: 'center',
    borderColor: '#D7D7D7',
    borderBottomColor: '#DFDFDF',
    borderWidth: 0.5,
    width: '90%',
    fontSize: 12,
    padding: 5.8,
    borderRadius: 8,
    color: '#fff',
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 12,
    color: COLORS.white,
    paddingLeft: 5,
    
  
  },
  selectedTextStyle: {
    fontSize: 12,
    color: COLORS.white,
  },
  inputSearchStyle: {
    height: 30,
    fontSize: 12,
    color: COLORS.white,
  
  },
  iconStyle: {
    width: 30,
    height: 30,
    color:COLORS.white
  },
  short_desc:{
    width:responsiveWidth(50),
    color:COLORS.lightGrey,
    fontSize:responsiveFontSize(1.7)
  }
});


export { styles }