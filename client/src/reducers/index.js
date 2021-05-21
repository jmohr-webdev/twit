import { combineReducers } from 'redux';
import auth from './auth';
import modal from './modal';
import toast from './toast';
import twits from './twits';

export default combineReducers({ auth, modal, toast, twits });
