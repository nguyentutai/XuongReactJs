import axios from "axios";

const instance = axios.create({
	baseURL: "https://hoangnm-json.onrender.com",
	headers: {
		"Content-Type": "application/json",
	}
});
export default instance;
