import LoginScreen from './LoginScreen';
import Home from './Home';
import { createDrawerNavigator, useDrawerStatus } from '@react-navigation/drawer'
import SignUp from './SignUp';
import { DrawerContent } from './DrawerContent';
import Profile from './Profile';
import Gallery from './Gallery';
import EditProfile from './EditProfile';


const DrawerNavigator = () => {

const Drawer = createDrawerNavigator()

  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name='HomeScreenDrawer' component={Home} options={{headerShown: false}} />
        <Drawer.Screen name='LoginScreen' component={LoginScreen} options={{headerShown: false}} />
        <Drawer.Screen name='SignUp' component={SignUp} options={{headerShown: false}} />
        <Drawer.Screen name='profile' component={Profile} options={{headerShown: false}} />
        <Drawer.Screen name='EditProfile' component={EditProfile} options={{headerShown: false}} />
        <Drawer.Screen name='gallery' component={Gallery} options={{headerShown: false}}/>
    </Drawer.Navigator>
  )
}

export default DrawerNavigator