import { observable, action, computed } from 'mobx';
import { getAllMovies, deleteMovie } from '../Database/MovieHandler';


class AdminDashboard {
  @observable Data = [];

  @action getAllMovies = () => {
    getAllMovies().then((res) => {
      this.Data = res;
    }).catch((error) => {
      console.log(error);
    });
  };

  @action deleteMovie = (name) => {
    deleteMovie(name);
  };

  @computed get _Data() {
    return this.Data;
  }
}
export default AdminDashboard;