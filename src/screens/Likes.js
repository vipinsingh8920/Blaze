import react from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import COLORS from '../../Components/Color';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { ScrollView } from 'react-native-gesture-handler';

export default function Likes() {
    return (
        <>
            <ScrollView>
                <View style={{ width: '100%', flex: 1 }}>
                    <View style={{ display: "flex", flexDirection: "row", padding: 15, borderBottomColor: COLORS.Grey, borderColor: COLORS.white, borderWidth: 1 }}>
                        <View>
                            <Image
                                style={{ width: Dimensions.get('screen').width - 320, height: Dimensions.get('screen').width - 320, resizeMode: 'cover', borderRadius: 100, borderColor: COLORS.white, borderWidth: 1 }}
                                source={require('../../Assets/ronaldo.jpg')}
                            />
                        </View>
                        <View style={{ display: "flex", flexDirection: "column" }}>
                            <View style={{ display: "flex", flexDirection: "row", paddingTop: 10, paddingLeft: 10 }}>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '700' }}>Guru</Text>
                                </View>
                                <View>
                                    <Image
                                        style={{ width: Dimensions.get('screen').width - 370, height: Dimensions.get('screen').width - 370, resizeMode: 'contain' }}
                                        source={require('../../Assets/blue.png')}
                                    />
                                </View>
                                <View style={{ paddingRight: 5 }}>
                                    <Text style={{ fontSize: 14, fontWeight: '500' }}>@QuotGuru</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 14, fontWeight: '500' }}>. 3d</Text>
                                </View>
                            </View>
                            <View style={{ paddingLeft: 10, width: '90%' }}>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <View>
                                        <Text style={{ fontSize: 14, fontWeight: '500' }}>Replying to </Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.blue }}>@leomessi </Text>
                                    </View>

                                </View>
                                <View style={{ marginTop: 5 }}>
                                    <Text style={{ fontSize: 14 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 10, width: '70%', justifyContent: 'space-around' }}>
                                <View>
                                    <EvilIcons
                                        name="comment"
                                        color={COLORS.dark}
                                        size={30}

                                    />
                                </View>
                                <Text style={{ fontSize: 14, fontWeight: '500', paddingTop: 3 }}>10</Text>
                                <View>
                                    <EvilIcons
                                        name="heart"
                                        color={COLORS.dark}
                                        size={30}

                                    />
                                </View>
                                <Text style={{ fontSize: 14, fontWeight: '500', paddingTop: 3 }}>30</Text>
                                <View>
                                    <EvilIcons
                                        name="share-google"
                                        color={COLORS.dark}
                                        size={30}

                                    />
                                </View>
                                <Text style={{ fontSize: 14, fontWeight: '500', paddingTop: 3 }}>2</Text>
                            </View>
                        </View>

                    </View>

                    <View style={{ display: "flex", flexDirection: "row", padding: 15, borderBottomColor: COLORS.Grey, borderColor: COLORS.white, borderWidth: 1 }}>
                        <View>
                            <Image
                                style={{ width: Dimensions.get('screen').width - 320, height: Dimensions.get('screen').width - 320, resizeMode: 'cover', borderRadius: 100, borderColor: COLORS.white, borderWidth: 1 }}
                                source={require('../../Assets/ronaldo.jpg')}
                            />
                        </View>
                        <View style={{ display: "flex", flexDirection: "column" }}>
                            <View style={{ display: "flex", flexDirection: "row", paddingTop: 10, paddingLeft: 10 }}>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '700' }}>Guru</Text>
                                </View>
                                <View>
                                    <Image
                                        style={{ width: Dimensions.get('screen').width - 370, height: Dimensions.get('screen').width - 370, resizeMode: 'contain' }}
                                        source={require('../../Assets/blue.png')}
                                    />
                                </View>
                                <View style={{ paddingRight: 5 }}>
                                    <Text style={{ fontSize: 14, fontWeight: '500' }}>@QuotGuru</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 14, fontWeight: '500' }}>. 3d</Text>
                                </View>
                            </View>
                            <View style={{ paddingLeft: 10, width: '90%' }}>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <View>
                                        <Text style={{ fontSize: 14, fontWeight: '500' }}>Replying to </Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.blue }}>@leomessi </Text>
                                    </View>

                                </View>
                                <View style={{ marginTop: 5 }}>
                                    <Text style={{ fontSize: 14 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 10, width: '70%', justifyContent: 'space-around' }}>
                                <View>
                                    <EvilIcons
                                        name="comment"
                                        color={COLORS.dark}
                                        size={30}

                                    />
                                </View>
                                <Text style={{ fontSize: 14, fontWeight: '500', paddingTop: 3 }}>10</Text>
                                <View>
                                    <EvilIcons
                                        name="heart"
                                        color={COLORS.dark}
                                        size={30}

                                    />
                                </View>
                                <Text style={{ fontSize: 14, fontWeight: '500', paddingTop: 3 }}>30</Text>
                                <View>
                                    <EvilIcons
                                        name="share-google"
                                        color={COLORS.dark}
                                        size={30}

                                    />
                                </View>
                                <Text style={{ fontSize: 14, fontWeight: '500', paddingTop: 3 }}>2</Text>
                            </View>
                        </View>

                    </View>

                </View>
            </ScrollView>
        </>
    );
}