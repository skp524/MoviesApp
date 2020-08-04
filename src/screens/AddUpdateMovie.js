import React, { Component } from 'react';
import { Text, View, TextInput, Image, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { inject, observer } from 'mobx-react';

@inject('addUpdateMovie')
@observer
class AddUpdateMovie extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      name: '',
      genre: 'Select',
      description: '',
      imageURI: '',
      operation: 'Add',
      editable: true,
    }
  }
  componentDidMount() {

    const { getParam } = this.props.navigation;
    let operation = getParam('operation');
    if (operation.includes("Update")) {
      this.setState({ operation: "Update", editable: false, name: getParam('name'), genre: getParam('genre'), description: getParam('description'), imageURI: getParam('imageURI') });
    }
  }
  render() {
    const { addMovie, updateMovie } = this.props.addUpdateMovie;
    const { getParam } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>  {this.state.operation} Movies</Text>
        <TextInput
          style={styles.inputField}
          placeholder='Enter Movie Name'
          editable={this.state.editable}
          value={this.state.name}
          onChangeText={(name) =>
            this.setState({ name: name })
          }
        />
        <Picker
          style={styles.picker}
          selectedValue={this.state.genre}
          onValueChange={(genre) =>
            this.setState({ genre: genre })
          }>
          <Picker.Item label='Select' value='select' />
          <Picker.Item label='Horror' value='horror' />
          <Picker.Item label='History' value='history' />
          <Picker.Item label='Romance' value='romance' />
          <Picker.Item label='Action' value='action' />
        </Picker>
        <TextInput
          style={styles.inputField}
          placeholder='Enter Movie Description'
          value={this.state.description}
          onChangeText={(description) =>
            this.setState({ description: description })}
        />
        {(this.state.imageURI != '') && <Image
          style={styles.image}
          source={{ uri: this.state.imageURI }}
        />
        }
        <TextInput
          style={styles.inputField}
          placeholder='Enter Image Url'
          value={this.state.imageURI}
          onChangeText={(uri) =>
            this.setState({ imageURI: uri })
          }
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            const movieDetails = {
              name: this.state.name,
              genre: this.state.genre,
              description: this.state.description,
              imageURI: this.state.imageURI
            }
            let operation = getParam('operation');
            (operation.includes("Add")) ? addMovie(movieDetails) : updateMovie(movieDetails);
            Alert.alert(this.state.operation + "Movie Sucessfull")
          }}
        >
          <Text style={styles.btnTxt}>
            {this.state.operation}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
} const styles = StyleSheet.create({
  picker: {
    fontSize: 20,
    margin: 15,
    fontSize: 20,
    marginHorizontal: 50,
    borderWidth: 1,

  },
  image: {
    width: '35%',
    height: '35%',
    resizeMode: 'cover'
  },
  container: {
    backgroundColor: '#53b3c3',
    height: '100%',
    padding: 10
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  heading: {
    fontSize: 20,
    marginTop: 5,
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
    marginTop: 10,
    marginHorizontal: 50,
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
export default AddUpdateMovie;