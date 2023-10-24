import './style.css'
import Auth from './js/auth';

const auth = new Auth();

document.querySelector("#logout-button").addEventListener("click", (e) => {
  auth.logOut();
})