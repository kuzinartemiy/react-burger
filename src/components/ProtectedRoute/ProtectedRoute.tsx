import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';

export const ProtectedRoute = ({ exact, path, component }: any) => {
  const isAuth = useSelector((store) => store.isAuth);
  const location = useLocation<any>();

  if (!isAuth) {
    return (
      <Route exact={exact} path={path}>
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      </Route>
    );
  }

  return (
    <Route exact={exact} path={path} component={component} />
  );
};
