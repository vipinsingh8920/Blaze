import { createDrawerNavigator, useDrawerStatus } from '@react-navigation/drawer'
import ClubHome from './ClubHome';
import { ClubDrawerContent } from './ClubDrawerContent';
import ChangePassword from '../ChangePassword';
import ClubCarousel from './ClubCarousel';
import Filter from './Filter';
import Newz from './Newz';
import DetailScreen from '../DetailScreen';
import AllPlayers from '../AllPlayers';
import WatchList from './WatchList';
import ClubEditProfile from './ClubEditProfile';
import FavouriteList from '../FavouriteList';



const ClubNavigator = () => {

    const Drawer = createDrawerNavigator()

    return (
        <Drawer.Navigator drawerContent={props => <ClubDrawerContent {...props} />}>
            <Drawer.Screen name='ClubHome' component={ClubHome} options={{ headerShown: false }} />
            <Drawer.Screen name='ChangePass' component={ChangePassword} options={{ headerShown: false }} />
            <Drawer.Screen name='Club-Carousel' component={ClubCarousel} options={{ headerShown: false }} />
            <Drawer.Screen name='filter' component={Filter} options={{ headerShown: false }} />
            <Drawer.Screen name='newz' component={Newz} options={{ headerShown: false }} />
            <Drawer.Screen name='Detail' component={DetailScreen} options={{ headerShown: false }} />
            <Drawer.Screen name='AllPlayers' component={AllPlayers} options={{ headerShown: false }} />
            <Drawer.Screen name='WatchList' component={WatchList} options={{ headerShown: false }} />
            <Drawer.Screen name='ClubEditProfile' component={ClubEditProfile} options={{ headerShown: false }} />
            <Drawer.Screen name='FavouriteList' component={FavouriteList} options={{ headerShown: false }} />
        </Drawer.Navigator>
    )
}

export default ClubNavigator