import axios from "axios";

const authUser = async () => {
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

  const data = await axiosInstance.get('/auth')
 return data;
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