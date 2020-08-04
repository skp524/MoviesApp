import React from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';


const Splash = ({ navigation }) => {
    setTimeout(() => navigation.navigate('Login'), 300);
    return (
        <View>
            <ImageBackground
                source={require('../assets/splash.png')}
                style={styles.backgroundImg}
            >
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
});

export default Splash;