import { observable, action, computed } from 'mobx';
import { addMovie, updateMovie } from '../Database/MovieHandler';

class AddUpdateMovie {

  @action addMovie = (movieDetails) => {
    addMovie(movieDetails);
  };

  @action updateMovie = (movieDetails) => {
    updateMovie(movieDetails);
  };
}

export default AddUpdateMovie;