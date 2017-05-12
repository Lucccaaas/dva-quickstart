/**
 * Created by yunge on 16/11/1.
 */

import request from "../utils/request";
import qs from "qs";
import * as api from "./config";

class BaseApi {

    constructor (entityType) {
        this.baseUrl = api.requestPath(entityType);
        this.query = this.query.bind(this);
        this.create= this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
    }

    async query (params) {
        return request(`${this.baseUrl}?${qs.stringify(params)}`);
    }

    async create (params) {
        return request(this.baseUrl, {
            method: 'post',
            body: JSON.stringify(params),
        });
    }

    async remove (params) {
        const {id} = params;
        return request(`${this.baseUrl}/${id}`, {
            method: 'delete'
        });
    }

    async update (params) {
        const {id} = params;
        return request(`${this.baseUrl}/${id}`, {
            method: 'put',
            body: JSON.stringify(params),
        });
    }
}

export default (entityType) => {
    return new BaseApi(entityType);
}