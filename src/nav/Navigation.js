import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import AdminDashboard from '../screens/AdminDashboard';
import AddUpdateMovie from '../screens/AddUpdateMovie';
import UserDashboard from '../screens/UserDashboard';

const AdminStack = createStackNavigator({
    AdminDashboard: {
        screen: AdminDashboard
    },
    AddUpdateMovie: {
        screen: AddUpdateMovie
    },
});
const UserStack = createStackNavigator({
    UserDashboard: {
        screen: UserDashboard
    },
});

const AuthStack = createStackNavigator({
    Login: {
        screen: Login
    },
    SignUp: {
        screen: SignUp
    },

});

const AppRouter = createSwitchNavigator({
    Splash: {
        screen: Splash,
    },
    Login: {
        screen: AuthStack
    },
    SignUp: {
        screen: SignUp
    },
    UserDashboard: {
        screen: UserStack
    },
    AdminDashboard: {
        screen: AdminStack
    }
});

export default createAppContainer(AppRouter);

