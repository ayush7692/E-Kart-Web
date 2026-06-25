import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});


export default api


// console.log("ayush")


// const getInc = async()=>{

//   try {
//     let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMzNlY2MxMTMwM2Y5NzhjNTk2MmFmMiIsImlhdCI6MTc4MTkwODM4MSwiZXhwIjoxNzgyNzcyMzgxfQ.-pd8Zo4fCEYcGjieQcI2Fu3SwxGrqLLBUhKfzjEJtHs"
   
//     const res = await axios.put('http://localhost:5000/api/cart/increase/6a2feb1febb4bc04951f9336',{
//       headers:{
//         authorization:`Bearer${token}`
//       }
//     })
//      console.log("this is DATA",res.data)
//   } catch (error) {
//       console.log(error.response.data)
//   }

// }

// console.log("that is function",getInc())