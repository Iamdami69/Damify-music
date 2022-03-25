import { useNavigate } from 'react-router-dom';
export function UseRouteGuard(validator, redirectTo) {
  const Navigate = useNavigate();

  const RouteGuard = () => {
    if (validator) {
      Navigate(redirectTo);
    }
  };
  return {
    RouteGuard,
  };
}
