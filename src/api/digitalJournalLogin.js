import axios from 'axios'

export default axios.create({
  baseURL: "https://digital-journal-notes-api.herokuapp.com/auth",
});
