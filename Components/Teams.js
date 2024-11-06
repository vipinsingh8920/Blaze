import { useNavigation } from "@react-navigation/native";
import { ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Text, View, ScrollView } from "react-native";
import COLORS from "./Color";


const { width } = Dimensions.get('screen');

export default function Teams() {


    const teams = [
        {
            id: '1',
            image: require('../Assets/footballbelgium.png'),
            details: `Our power of choice is untrammelled when you and family nothing some prevents our being able to we like best when our all power of choice is yours untrammelled and when nothing prevents`,
        },
        {
            id: '2',
            image: require('../Assets/chelsa.png'),
            details: `Our power of choice is untrammelled when you and family nothing some prevents our being able to we like best when our all power of choice is yours untrammelled and when nothing prevents.`,
        },
        {
            id: '3',
            image: require('../Assets/lakers.png'),
            details: `Our power of choice is untrammelled when you and family nothing some prevents our being able to we like best when our all power of choice is yours untrammelled and when nothing prevents.`,
        },
        {
            id: '4',
            image: require('../Assets/manchester.jpeg'),
            details: `Our power of choice is untrammelled when you and family nothing some prevents our being able to we like best when our all power of choice is yours untrammelled and when nothing prevents.`,
        },
        {
            id: '5',
            image: require('../Assets/bucks.png'),
            details: `Our power of choice is untrammelled when you and family nothing some prevents our being able to we like best when our all power of choice is yours untrammelled and when nothing prevents.`,
        },
        {
            id: '6',
            image: require('../Assets/footballClub.jpeg'),
            details: `Our power of choice is untrammelled when you and family nothing some prevents our being able to we like best when our all power of choice is yours untrammelled and when nothing prevents.`,
        },
        {
            id: '6',
            image: require('../Assets/knics.png'),
            details: `Our power of choice is untrammelled when you and family nothing some prevents our being able to we like best when our all power of choice is yours untrammelled and when nothing prevents.`,
        },
    ];

    return (
        <>
            <ScrollView horizontal>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                    {teams.map((item) => (
                        <TouchableOpacity
                            activeOpacity={0.8} style={{ borderRadius: 10, borderColor: '#fff', borderWidth: 1 }}
                        >
                            <ImageBackground style={style.cardImage} source={item.image}>

                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </>
    );
};

const style = StyleSheet.create({
    cardImage: {
        height: 80,
        width: width / 5,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1,
        resizeMode: 'contain',
        // backgroundColor:COLORS.purple
    },
});



