import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Input, SignInButton, SignInGoogle } from '../../Components/Components'
import { styles } from "./Style"
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

export default function LoginScreen() {
    const navigation = useNavigation();
    const handleNavigation = () => {
     navigation.navigate('ForgotPassword')
    }

    return (
        <View style={{ flex: 1, width: '100%', backgroundColor: '#fff' }}>
            <View>
                <View style={styles.mains}>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '75%', justifyContent: 'space-around', paddingLeft: 40 }}>
                        <Text style={styles.Content}>
                            BLAZEE
                        </Text>
                        <View style={{ marginTop: -5 }}>
                            <Image
                                style={styles.blaze}
                                source={require('../../Assets/LOGO_BLAZE_FINAL.png')}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.main}>
                    <Input />

                    <View style={styles.forpass}>
                        <TouchableOpacity>
                            <Text style={styles.forgot} onPress={handleNavigation}>Forgot Password</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.option}>
                        <View style={styles.options}>
                            <View style={{ width: 100, height: 0.4, backgroundColor: '#ffffff' }} />
                        </View>
                        <View style={styles.or}>
                            <Text style={styles.txt}>Or</Text>
                        </View>
                        <View style={styles.options}>
                            <View style={{ width: 100, height: 0.4, backgroundColor: '#fff' }} />
                        </View>
                    </View>

                    <SignInGoogle />

                </View>
            </View>
        </View>

    )
}