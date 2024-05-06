import { useNavigation, useRoute } from '@react-navigation/native';

export default function useChangeRoute() {
  const navigation = useNavigation();
  const route = useRoute();

  const changeRoute = (newParams) => {
    navigation.setParams({ ...route.params, ...newParams });
  };

  return changeRoute;
}
