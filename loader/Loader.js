import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import COLORS from '../Components/Color';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Loader = ({visible}) => {
   
    return (
        <View style={{position:"absolute",flex:1}}>
   {visible==true? <View style={styles.container}>
        <ActivityIndicator
        size={"large"}
        color={COLORS.headerColor}
        />
    </View>:""}
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      height:responsiveHeight(100),
      width:responsiveWidth(100),
      justifyContent:"center",
      alignItems:"center",
    }
});

//make this component available to the app
export default Loader;
