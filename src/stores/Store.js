import AddUpdateMovie from './AddUpdateMovie';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import SignUp from './SignUp';
import Login from './Login';

class Store {

  login: Login;
  adminDashboard: AdminDashboard;
  addUpdateMovie: AddUpdateMovie;
  userDashboard: UserDashboard;
  signUp: SignUp;

  constructor() {
    this.login = new Login(this);
    this.addUpdateMovie = new AddUpdateMovie(this);
    this.adminDashboard = new AdminDashboard(this);
    this.userDashboard = new UserDashboard(this);
    this.signUp = new SignUp(this);
  }
}
export default new Store();