// Module imports
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Reducer imports
import authReducer from './authReducer.js';
import userReducer from './userReducer.js';
import productReducer from './productReducer.js';
import storeReducer from './storeReducer.js';
import testimonialReducer from './testimonialReducer.js';
import subscriptionReducer from './subscriptionReducer.js';
import deliveryCompanyReducer from './deliveryCompanyReducer.js';
import deliveryPackageReducer from './deliveryPackageReducer.js';
import loadingReducer from './loadingReducer.js';

export default combineReducers({
  auth: authReducer,
  deliveryCompany: deliveryCompanyReducer,
  deliveryPackage: deliveryPackageReducer,
  form: formReducer,
  loading: loadingReducer,
  product: productReducer,
  store: storeReducer,
  subscription: subscriptionReducer,
  testimonial: testimonialReducer,
  user: userReducer
});
