import { action } from 'mobx';
import { addUser } from '../Database/UserHandler';

class SignUp {

  @action addUser = (userDetails) => {
    addUser(userDetails);
  };
}
export default SignUp;