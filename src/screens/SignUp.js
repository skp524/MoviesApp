import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { inject, observer } from 'mobx-react';

@inject('signUp')
@observer
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            name: '',
            emailId: '',
            password: '',
            isNameValid: true,
            isEmailValid: true,
            isPasswordValid: true,
        }
    }
    validateName = () => {
        const nameFormat = /^[a-zA-Z]+$/;
        (nameFormat.test(this.state.name)) ? this.setState({ isNameValid: true }) : this.setState({ isNameValid: false });
    }
    validateEmail = () => {
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        (emailFormat.test(this.state.emailId)) ? this.setState({ isEmailValid: true }) : this.setState({ isEmailValid: false });
    }
    validatePassword = () => {
        const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        passwordFormat.test(this.state.password) ? this.setState({ isPasswordValid: true }) : this.setState({ isPasswordValid: false });
    }

    registerUser = (role) => {
        userDetails = {
            name: this.state.name,
            emailId: this.state.emailId,
            password: this.state.password,
            role: role,
            status: 1,
        }
        if ((this.state.name == '') && (this.state.emailId == '' && this.state.password == '')) {
            Alert.alert('Can Not Be Empty')
        }
        else if ((this.state.isNameValid && this.state.isEmailValid) && this.state.isPasswordValid) {
            this.props.signUp.addUser(userDetails);
            Alert.alert("SignUp Sucessfull")
        }
        else {
            Alert.alert('Enter Valid Details')
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>  Sign Up</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder='Enter Your Name'
                    value={this.state.name}
                    onChangeText={(name) => {
                        this.validateName()
                        this.setState({ name: name })
                    }}
                />

                {(!this.state.isNameValid) && <Text style={styles.title}>Enter Valid Name</Text>}
                <TextInput
                    style={styles.inputField}
                    placeholder='Enter Your Email Id'
                    value={this.state.emailId}
                    onChangeText={(emailId) => {
                        this.setState({ emailId: emailId })
                        this.validateEmail();
                    }}
                />

                {(!this.state.isEmailValid) && <Text style={styles.title}>Enter Valid Email</Text>}
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
                        onPress={() =>
                            this.registerUser(0)
                        }
                    >
                        <Text style={styles.btnTxt}>SignUp Admin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() =>
                            this.registerUser(1)
                        }
                    >
                        <Text style={styles.btnTxt}>SignUp User</Text>
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
export default SignUp;