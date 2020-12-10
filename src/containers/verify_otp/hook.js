import {useDispatch, useSelector} from 'react-redux';
import {setCounter,onCloseErrorPopUp} from './state';
import {useNavigation} from '@react-navigation/native';
import reactotron from 'reactotron-react-native';
import {sendOtp,verifyOtp} from '../../api/index';
const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.verifyOtp);
  const stateForgetPass = useSelector((rootReducer) =>rootReducer.forgotPassword )
  
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const sentOtp = async()=>{
  //   try {
  //     const response = await sendOtp("Vonage APIs",stateForgetPass.mobile);
  //     reactotron.log("response: " + response)
  //     if(response === 'success'){
  //       navigation.navigate("CreateNewPassword")
  //     }
  //   } catch (error) {
  //     const message = error.errMsg;
  //   }
  // }

  const verify = async()=>{
    try{
      const response = await verifyOtp(stateForgetPass.mobile, state.otp);
      if(response.status === 'success'){
        if(response.data.verifyOtp ===true){
          navigation.navigate('CreateNewPassword')
        }
      }
      else{
        dispatch(onCloseErrorPopUp(false))
      }
    }catch(error){
      const message = error.errMsg;
    }
  }

  const onCloseErrorPopUpEvent = async() =>{
    dispatch(onCloseErrorPopUp(true))
  }

  return {
    state,
    stateForgetPass,
    navigation,
    dispatch,
    // sentOtp,
    verify,
    onCloseErrorPopUpEvent
  };
};

export default useTodo;
