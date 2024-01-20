import axios from "axios";

const url = "https://api.softestingca.com";

axios.defaults.headers.post["Content-Type"] = "application/json";

export default {
    get: axios.get,
    post: axios.post,
    url,
};
