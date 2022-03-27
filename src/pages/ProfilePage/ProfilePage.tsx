import { Route } from 'react-router-dom';
import { EditProfileForm } from '../../components/EditProfileForm/EditProfileForm';
import { ProfileNavbar } from '../../components/ProfileNavbar/ProfileNavbar';
import styles from './ProfilePage.module.css';

export const ProfilePage = () => (
  <div className={styles.profilePage}>
    <ProfileNavbar />
    <Route exact path="/profile" component={EditProfileForm} />
    <Route exact path="/profile/orders">
      <h1 className="text text_type_main-large">AT WORK</h1>
    </Route>
  </div>
);
