import axios from "axios";

const commonAPI = async (httpMethod, url, reqBody = null) => {
  try {
    const reqConfig = {
      method: httpMethod,
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Only include data for POST and PUT requests
    if (reqBody && (httpMethod === "POST" || httpMethod === "PUT")) {
      reqConfig.data = reqBody;
    }

    const res = await axios(reqConfig);

    // Return data if available
    return res.data || {};
  } catch (err) {
    // Extract a friendly error message if possible
    const message =
      err.response?.data?.message ||
      err.response?.statusText ||
      err.message ||
      "Unknown API error";
    console.error(`API Error [${httpMethod} ${url}]:`, message);
    throw new Error(message);
  }
};

export default commonAPI;

