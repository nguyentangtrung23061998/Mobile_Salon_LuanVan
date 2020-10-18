import { combineReducers } from 'redux';
import verifyDomainReducerWrapper from '../containers/verify_domain/state';

const rootRecuder = combineReducers({
    verifyDomain: verifyDomainReducerWrapper,
})

const rootReducerWrapper = (state, action) => {
    if (action.type === 'app/setAuth') {
        state = undefined;
    }
    return rootRecuder(state,action);
}
export default rootReducerWrapper;