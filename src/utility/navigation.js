import {useNavigationState} from '@react-navigation/native';

export const useMyNavigation = () => {
  const routes = useNavigationState((state) => state.routes);
  const currentRouteName = routes[routes.length - 1].name;
  const previousRouteName = routes[routes.length - 2].name;
  return {currentRouteName, previousRouteName};
};
