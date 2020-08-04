import { observable, action, computed } from 'mobx';
import { getMoviesByGenre, getAllMovies } from '../Database/MovieHandler';

class UserDashboard {

  @observable allMovies = [];

  @action getMoviesByGenre = (genre) => {
    getMoviesByGenre(genre).then((res) => {
      this.allMovies = res;
    }).catch((error) => {
      console.log(error);
    });
  };
  @action getAllMovies = () => {
    getAllMovies().then((res) => {
      this.allMovies = res;
    }).catch((error) => {
      console.log(error);
    });
  };
  @computed get _allMovies() {
    return this.getAllMovies;
  }
}
export default UserDashboard;