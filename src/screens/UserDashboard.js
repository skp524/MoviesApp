import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Button, FlatList } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { inject, observer } from 'mobx-react';
import { getAllMovies } from '../Database/MovieHandler';

@inject('userDashboard')
@observer
class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      genre: 'select',
    }
  }
  componentDidMount() {
    this.props.userDashboard.getAllMovies();
  }
  flatListItemSeparator = () => {
    return (
      <View
        style={styles.itemSeparator}
      />
    );
  }
  render() {
    const { allMovies, getMoviesByGenre } = this.props.userDashboard;
    return (
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={this.state.genre}
          onValueChange={(genre) => {
            this.setState({ genre: genre });
            getMoviesByGenre(genre);
          }
          }>
          <Picker.Item label='Select' value='select' />
          <Picker.Item label='Horror' value='horror' />
          <Picker.Item label='History' value='history' />
          <Picker.Item label='Romance' value='romance' />
          <Picker.Item label='Action' value='action' />
        </Picker>
        <FlatList
          keyExtractor={(item, index) => item.name}
          data={allMovies}
          onTouchStart={() => getAllMovies()}
          ItemSeparatorComponent={this.flatListItemSeparator}
          renderItem={({ item }) => {
            return (
              <View style={styles.flatListContainer}>
                <Image source={{ uri: 'https://c.ndtvimg.com/2019-07/d5pfitg8_kabir-singh-instagram_295x200_17_July_19.jpg' }} style={styles.imageView} />
                <View style={styles.textContainer}>
                  <Text style={styles.textView}>{item.name}</Text>
                  <Text style={styles.textView}>{item.genre}</Text>
                  <Text style={styles.textView}>{item.description}</Text>
                  <Text style={styles.textView}>{item.imageURI}</Text>
                </View>
              </View>
            )
          }}
        />
      </View >
    );
  }
}
const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: 150,
    padding: 10,
    margin: 5,
    color: 'white',
    backgroundColor: 'black'
  },
  image: {
    width: '35%',
    height: '35%',
    resizeMode: 'cover'
  },
  container: {
    height: '100%',
    backgroundColor: '#53b3c3'
  },
  flatListContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#53b3c3'

  },
  heading: {
    fontSize: 35,
    marginTop: 10,
    color: '#ffffff',
    marginBottom: 10,
    marginLeft: 50,
  },
  userName: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'column',
    width: '70%'
  },
  itemSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  imageView: {
    width: '30%',
    height: 150,
    margin: 7,
    borderRadius: 50
  },
  textView: {
    fontSize: 18,
    padding: 5,
    color: '#fff'
  },
  btn: {
    marginLeft: '75%',
    width: '25%',
    backgroundColor: 'black',
    padding: 10,
    justifyContent: 'flex-end'
  },
  btnTxt: {
    fontSize: 20,
    color: "#ffffff"
  },

});
export default UserDashboard;