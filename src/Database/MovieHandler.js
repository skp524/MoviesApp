import { MovieSchema } from './Schema';

const Realm = require('realm');

export const addMovie = async (movieDetails) => new Promise((resolve, reject) => {
  Realm.open({ schema: [MovieSchema] })
    .then(realm => {
      realm.write(() => {
        realm.create('Movies', movieDetails);
        resolve();
      });
    })
    .catch(error => {
      reject(error);
    });;
});

export const deleteMovie = async (name) => new Promise((resolve, reject) => {
  Realm.open({ schema: [MovieSchema] })
    .then(realm => {
      realm.write(() => {
        let movie = realm.objectForPrimaryKey('Movies', name);
        realm.delete(movie);
        resolve();
      });
    })
    .catch(error => {
      reject(error);
    });;
});


export const updateMovie = async (movieDetails) => new Promise((resolve, reject) => {

  Realm.open({ schema: [MovieSchema] })
    .then(realm => {
      realm.write(() => {
        realm.create('Movies', { name: movieDetails.name, genre: movieDetails.genre, description: movieDetails.description, imageURI: movieDetails.imageURI }, 'modified');
        resolve();
      });
    })
    .catch(error => {
      reject(error);
    });;
});

export const getAllMovies = async () => new Promise((resolve, reject) => {

  Realm.open({ schema: [MovieSchema] })
    .then(realm => {
      let allMovies = realm.objects('Movies');
      resolve(allMovies);
    })
    .catch(error => {
      reject(error);
    });;
});

export const getMoviesByGenre = async (genree) => new Promise((resolve, reject) => {

  Realm.open({ schema: [MovieSchema] })
    .then(realm => {
      console.log(genre);
      let allMovies = realm.objects('Movies');
      let movieByGenre = allMovies.filtered('genre==' + genree);
      console.log(movieByGenre);
      for (let movie of movieByGenre) {
        console.log(`  ${movie.name}`);
      }
      resolve(movieByGenre);
    })
    .catch(error => {
      reject(error);
    });;
});

