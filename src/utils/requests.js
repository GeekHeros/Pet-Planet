import axios from "axios";

const pet_planet = axios.create();

pet_planet.interceptors.request.use((request) => {
  return request;
}, () => {

});

pet_planet.interceptors.response.use((response) => {
  console.log(response);
}, (error) => {
  console.log(error);
});

export default pet_planet;


