import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../src/screens/Style"

export default function Awards() {

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            date: '2019',
            img: require('../Assets/germansports.png'),
            name: 'GERMANY FOOTBALL ASS...'


        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            name: 'GERMANY FOOTBALL ASS...',
            img: require('../Assets/germansports.png'),
            date: '2020',

        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            date: '2022',
            img: require('../Assets/germansports.png'),
            name: 'GERMANY FOOTBALL ASS...',

        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            date: '2022',
            img: require('../Assets/germansports.png'),
            name: 'GERMANY FOOTBALL ASS...',


        },

    ];


    const Item = ({ name, img, date }) => (
        
        <>
            <TouchableOpacity style={{ borderColor: '#fff', padding: 15 }}>
                <TouchableOpacity>
                    <View style={{ borderRadius: 10 }}>
                        <Image
                            style={styles.awardimg}
                            source={img}
                        />
                        <View style={styles.itemm}>
                            <Text style={styles.namee}>{name}</Text>
                        </View>
                        <View>
                            <Text style={styles.date}>{date}</Text>
                        </View>
                    </View>



                </TouchableOpacity>
            </TouchableOpacity>
        </>
    );

    const renderItem = ({ item }) => (
        <Item name={item.name} img={item.img} date={item.date} pdt={item.pdt} />
    );

    return (
        <View>
            <View style={{paddingTop:15,backgroundColor:'#D3D3D3'}}>
                <FlatList horizontal
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => String(index)}
                />
            </View>
        </View>
    );
}