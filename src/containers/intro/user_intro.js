import React from 'react';
import {IntroAccountContext} from './with_intro';
import {useNavigation} from '@react-navigation/native';
// import {useTranslation} from 'react-i18next';

const useTodo = () => {
  // const {t} = useTranslation();

  const context = React.useContext(IntroAccountContext);
  if (context === undefined) {
    throw new Error('No provider ListTodoContext');
  }

  const navigation = useNavigation();
  const navigate = (name) => {
    navigation.navigate(name);
  };
  const {state, dispatch} = context;

  return {navigate};
};

export default useTodo;
