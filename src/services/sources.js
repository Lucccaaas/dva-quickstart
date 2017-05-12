/**
 * Created by yunge on 16/11/8.
 */
import baseApiFactory from "./baseApi";
import apiConfig from "./config";

const {entityTypeConfig} = apiConfig;
const baseApi = baseApiFactory(entityTypeConfig.sources.value);

export default {
    ...baseApi
}