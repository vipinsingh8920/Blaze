import LoginScreen from './LoginScreen';
import ClubHome from './Club/ClubHome';
import { createDrawerNavigator, useDrawerStatus } from '@react-navigation/drawer'
import SignUp from './SignUp';
import { ClubDrawerContent } from './Club/ClubDrawerContent';
import Profile from './Profile';
import Gallery from './Gallery';
import EditProfile from './EditProfile';
//import Filter from './Club/Filter';
//import FilterCategory from './Club/FilterCategory';
import FilterPlayer from './FilterPlayer';

const ClubDrawerNavigator = () => {

const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator drawerContent={props => <ClubDrawerContent {...props} />}>
        <Drawer.Screen name='ClubHome' component={ClubHome} options={{headerShown: false}} />
        <Drawer.Screen name='LoginScreen' component={LoginScreen} options={{headerShown: false}} />
        <Drawer.Screen name='SignUp' component={SignUp} options={{headerShown: false}} />
        <Drawer.Screen name='profile' component={Profile} options={{headerShown: false}} />
        <Drawer.Screen name='EditProfile' component={EditProfile} options={{headerShown: false}} />
        <Drawer.Screen name='gallery' component={Gallery} options={{headerShown: false}} />
        <Drawer.Screen name='FilterPlayer' component={FilterPlayer} options={{headerShown: false}} />
    </Drawer.Navigator>
  )
}

export default ClubDrawerNavigator