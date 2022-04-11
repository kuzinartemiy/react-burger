import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';

export const ProtectedRoute = ({ path, component }: any) => {
  const isAuth = useSelector((store) => store.isAuth);
  const location = useLocation<any>();

  if (!isAuth) {
    return (
      <Route path={path}>
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      </Route>
    );
  }

  return (
    <Route path={path} component={component} />
  );
};
