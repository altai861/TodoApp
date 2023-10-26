import './style.css'
import Auth from './js/auth';
import axios from 'axios';

const auth = new Auth();

document.querySelector("#logout-button").addEventListener("click", (e) => {
  auth.logOut();
})

const user = JSON.parse(localStorage.getItem("auth"))
const userId = user.userId
const accessToken = user.accessToken


