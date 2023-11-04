const url = 'https://clipboard-app-backend-16c2583d149e.herokuapp.com/api'
import axios from 'axios'

const getAxiosInstance = () => {
    const defaultOptions = {
        baseURL: url,
        method: 'get',
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json',
        },
      };
    
      // Create instance
      let instance = axios.create(defaultOptions);
    
      return instance;
}

export default getAxiosInstance;

