import baseApiFactory from "./baseApi";
import apiConfig from "./config";

const {entityTypeConfig} = apiConfig;
const baseApi = baseApiFactory(entityTypeConfig.channels.value);

export default {
    ...baseApi
}