import axios from "axios";

export const baseURL = 'http://www.api-capstone.com:888'
// export const baseURL = 'https://www.test-api-capstone.com:666'

export const axiosInstance = axios.create(
  {
    baseURL: baseURL,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json' // Có thể thay đổi tùy theo API yêu cầu
    }
  });

// export const axiosInstanceCookie = axios.create(
//   {
//     baseURL: baseURL,
//     "maxBodyLength": Infinity,
//     headers: {
//       'Cookies': `${document.cookie}`
//     }
//   })