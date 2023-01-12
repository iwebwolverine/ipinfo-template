import axios from 'axios';

export class RequestSender implements IRequestSender {
    private api: string;
    private request: typeof axios;

    constructor(apiUrl: string, request: typeof axios) {
        this.api = apiUrl;
        this.request = request;
    }

    async call({ url, method = 'GET'}) {
        try {
            const response = await this.request(url, {
                responseType: 'json',
                method,
                baseURL: this.api
            })

            return response;
        } catch(error) {
            if (error.response) {
                console.error('Can\'t send request', {
                    message: error.response.statusMessage,
                    requestUrl: error.request.requestUrl,
                    code: error.response.statusCode,
                    headers: error.response.headers,
                    method: error.request.method,
                    body: error.response.body,
                    error: error.response.body && error.response.body.error,
                })
            } else {
                console.error('Can\'t send request...', error)
            }

            throw error;
        }
    }
}

export interface IRequestSender {
    call: (params: { url: string, method: 'GET'}) => Promise<{
        data: any,
      }>
  }