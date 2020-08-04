import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Button, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react';

@inject('adminDashboard')
@observer
class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    componentDidMount() {
        this.props.adminDashboard.getAllMovies();
    }
    flatListItemSeparator = () => {
        return (
            <View
                style={styles.itemSeparator}
            />
        );
    }
    render() {
        const { Data, deleteMovie, getAllMovies } = this.props.adminDashboard;
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>  Dashboard</Text>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigate('AddUpdateMovie', {
                        operation: 'Add'
                    })
                    }
                >
                    <Text style={styles.btnTxt}>Add Movies</Text>
                </TouchableOpacity>
                <FlatList
                    keyExtractor={(item, index) => item.name}
                    data={Data}
                    ItemSeparatorComponent={this.flatListItemSeparator}
                    onTouchStart={() => getAllMovies()}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.flatListContainer}>
                                <Image source={{ uri: item.imageURI }} style={styles.imageView} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.textView}>{item.name}</Text>
                                    <Text style={styles.textView}>{item.genre}</Text>
                                    <Text style={styles.textView}>{item.description}</Text>
                                    <Text style={styles.textView}>{item.imageURI}</Text>
                                    <Button title='edit'
                                        style={styles.btn}
                                        onPress={() => this.props.navigation.navigate('AddUpdateMovie', {
                                            name: item.name,
                                            genre: item.genre,
                                            description: item.description,
                                            imageURI: item.imageURI,
                                            operation: 'Update'
                                        })} />
                                    <Button title='delete' onPress={() => {
                                        deleteMovie(item.name);
                                        getAllMovies();
                                    }}
                                    />
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    picker: {
        height: 50,
        width: 250
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
        marginLeft: '60%',
        width: '40%',
        backgroundColor: 'black',
        padding: 10,
        justifyContent: 'flex-end'
    },
    btnTxt: {
        fontSize: 20,
        color: "#ffffff"
    },
});
export default AdminDashboard;