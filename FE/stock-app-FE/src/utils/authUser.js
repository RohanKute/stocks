import axios from "axios";

const authUser = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return false; // No token available, user is not authenticated
  }

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}` // Include JWT token from localStorage directly
    }
  });

  return axiosInstance.get('/auth')
    .then(response => {
      return true; // Return the response data (true or false based on authentication status)
    })
    .catch(error => {
      console.error('Error occurred during authentication:', error);
      return false; // Return false in case of any error
    });
};

export default authUser;

/**
 * 
 * import axios from "axios"
export default function authUser(){
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}` // Include JWT token from localStorage
        }
      });
    async function auth() {
        const isValid = await axiosInstance.get('/auth');
        console.log(isValid);
        if (isValid.data) {
            return true
        }
        else {
            return false
        }
      }
    auth();
}
 * 
 */