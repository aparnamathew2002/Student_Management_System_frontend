import axios from "axios"

const commonAPI = async(httpMethod, url, reqBody)=>{
try{
    const reqConfig = {
        method : httpMethod,
        url,
        data : reqBody
    }

   const res = await axios(reqConfig);
    return res.data; 
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};

export default commonAPI
