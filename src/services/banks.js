import baseApiFactory from "./baseApi";
import apiConfig from "./config";

const {entityTypeConfig} = apiConfig;
const baseApi = baseApiFactory(entityTypeConfig.banks.value);

export default {
    ...baseApi
}