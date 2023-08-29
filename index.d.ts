import API from "./api.js";
declare const TikAPI: {
    (apiKey: any): typeof API;
    default: any;
};
export default TikAPI;
