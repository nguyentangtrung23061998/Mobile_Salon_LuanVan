import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {getAllServices, getStylesByService} from '../../api/index';
import {
  getAllServicesFaild,
  getAllServicesLoading,
  getAllServicesSuccess,
  getStylesByServiceFaild,
  getStylesByServiceSuccess,
  resetState,
  selectStyle,
  setIsServiceExpanded,
  setisStyleChecked,
} from './state';
import {setDataEditOrder2} from '../order_management/edit_order/state';
import reactotron from 'reactotron-react-native';
const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.selectStyle0);
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onNavigateEvent = (name) => navigation.navigate(name);
  const onGoBackEvent = () => navigation.goBack();

  const onGetAllServicesEvent = async () => {
    dispatch(getAllServicesLoading());
    try {
      const response = await getAllServices();
      if (response.status === 'success') {
        const {data} = response;
        dispatch(getAllServicesSuccess({data}));
      } else {
        const {message} = response;
        dispatch(getAllServicesFaild({message}));
      }
    } catch (error) {
      const message = error.errMsg;
      dispatch(getAllServicesFaild({message}));
    }
  };

  const onGetStylesByServiceEvent = async (id) => {
    try {
      const response = await getStylesByService(id);
      if (response.status === 'success') {
        const {data} = response;

        dispatch(getStylesByServiceSuccess({serviceId: id, data}));
      } else {
        dispatch(getStylesByServiceFaild());
      }
    } catch (error) {
      dispatch(getStylesByServiceFaild());
    }
  };

  const onSetIsStyleCheckedEvent = (serviceId, styleId) => {
    dispatch(setisStyleChecked({serviceId, styleId}));
  };

  const onGetSelectedStylesEvent = (serviceIndex) => {};
  const onResetStateEvent = () => dispatch(resetState());

  const onConfirmEvent = () => {
    let data = state.data.filter((el) => el.styles);
    let services = [];

    data.map((el0) => {
      el0.styles.map((el1) => {
        if (el1.isChecked) {
          services.push({
            name: el0.name,
            imageName: el0.imageName,
            style: {
              name: el1.name,
              price: el1.price,
            },
          });
        }
      });
    });

    services = Object.values(
      services.reduce((acc, {name, style, imageName}) => {
        acc[name] = acc[name] || {name, imageName, styles: []};
        acc[name].styles.push(style);
        return acc;
      }, {}),
    );
    dispatch(setDataEditOrder2({value: services}));
    onResetStateEvent();

    onGoBackEvent();
  };

  const onResetStateSelectStateEvent0 = () => dispatch(resetState());

  const onSetIsServiceExpandedEvent = (serviceIndex, serviceId) => {
    dispatch(setIsServiceExpanded({serviceIndex, serviceId}));
  };

  const onSelectStyleEvent = (serviceIndex, styleIndex, imageName) => {
    dispatch(selectStyle({serviceIndex, styleIndex, imageName}));
  };
  return {
    state,
    dispatch,
    t,
    onGoBackEvent,
    onNavigateEvent,
    onGetAllServicesEvent,
    onGetStylesByServiceEvent,
    onSetIsStyleCheckedEvent,
    onConfirmEvent,
    onResetStateEvent,
    onGetSelectedStylesEvent,
    onSetIsServiceExpandedEvent,
    onSelectStyleEvent,
    onResetStateSelectStateEvent0,
  };
};

export default useTodo;
