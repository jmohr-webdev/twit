import { combineReducers } from 'redux';
import auth from './auth';
import toast from './toast';
import twits from './twits';

export default combineReducers({ auth, toast, twits });
