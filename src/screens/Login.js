import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';


@inject('login')
@observer
class Login extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            emailId: '',
            password: '',
            isEmailValid: true,
            isPasswordValid: true,
            allUsers: [],
        }
    }
    componentDidMount() {
        this.props.login.getAllUsers();
    }
    validateEmail = () => {
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        (emailFormat.test(this.state.emailId)) ? this.setState({ isEmailValid: true }) : this.setState({ isEmailValid: false });
    }
    validatePassword = () => {
        const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        passwordFormat.test(this.state.password) ? this.setState({ isPasswordValid: true }) : this.setState({ isPasswordValid: false });
    }
    validateUser() {
        const { navigate } = this.props.navigation;
        userDetails = {
            emailId: this.state.emailId,
            password: this.state.password,
        }
        if ((this.state.emailId == '' && this.state.password == '')) {
            Alert.alert('Can Not Be Empty')
        }
        else if (this.state.isEmailValid && this.state.isPasswordValid) {
            let allUsers = this.state.allUsers;
            for (let user of allUsers) {
                if ((user.emailId == this.state.emailId) && (user.password == this.state.password)) {
                    (user.role == 0) ? navigate('AdminDashboard') : navigate('UserDashboard');
                }
            }
        }
        else {
            Alert.alert('Enter Valid Details')
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        const { userDetails } = this.props.login;
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>  Login</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder='Enter Your Email Id'
                    keyboardType='email-address'
                    value={this.state.emailId}
                    onChangeText={(emailId) => {
                        this.setState({ emailId: emailId })
                        this.validateEmail()
                    }}
                />
                {(!this.state.isEmailValid) && <Text>Enter Valid Email Id</Text>}
                <TextInput
                    style={styles.inputField}
                    placeholder='Enter Your Password'
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={(password) => {
                        this.validatePassword()
                        this.setState({ password: password })
                    }
                    }
                />
                {(!this.state.isPasswordValid) && <Text style={styles.title}>Enter Valid Password</Text>}
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            this.setState({ allUsers: userDetails });
                            this.validateUser();
                        }}
                    >
                        <Text style={styles.btnTxt}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigate('SignUp')}
                    >
                        <Text style={styles.btnTxt}>SignUp</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#53b3c3',
        height: '100%',
        padding: 40
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    heading: {
        fontSize: 35,
        marginTop: 30,
        color: '#ffffff',
        marginBottom: 10
    },
    title: {
        fontSize: 16,
        color: '#ffffff',
        padding: 5,
        marginLeft: 15,
    },
    inputField: {
        fontSize: 20,
        margin: 13,
        borderWidth: 1,
        color: 'black',
        backgroundColor: '#ffffff'

    },
    btn: {
        backgroundColor: 'black',
        padding: 10,
        marginTop: 30,
        marginHorizontal: 100,
        flexDirection: 'row',
        justifyContent: 'space-around'

    },
    btnTxt: {
        fontSize: 20,
        color: "#ffffff"
    },
});
export default Login;