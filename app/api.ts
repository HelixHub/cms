import config from "./config";
import axios from "axios";

export default new (class ApiService {
    private readonly host: string;

    constructor() {
        this.host = config.api.host;
    }

    getHost(): string {
        return this.host;
    }

    get(path: string, config?: any) {
        return axios.get<any>(this.getHost() + path, config ? config : {});
    }

    put(path: string, body?: any, config?: any) {
        return axios.put<any>(this.getHost() + path, body ? body : {}, config ? config : {});
    }
    patch(path: string, body?: any, config?: any) {
        return axios.patch<any>(this.getHost() + path, body ? body : {}, config ? config : {});
    }

    post(path: string, body?: any, config?: any) {
        return axios.post<any>(this.getHost() + path, body ? body : {}, config ? config : {});
    }

    delete(path: string, config?: any) {
        return axios.delete<any>(this.getHost() + path, config ? config : {});
    }
})();