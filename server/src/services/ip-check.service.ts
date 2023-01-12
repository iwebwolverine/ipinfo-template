import { IRequestSender } from '../utils/request-sender';

export class IpCheckService implements IIPCheckService {
    private requestSender: IRequestSender;

    constructor({ requestSender }: { requestSender: IRequestSender }) {
        this.requestSender = requestSender;
    }

    async check(ip) {
        const response = await this.requestSender.call({
            url: `/${ip}`,
            method: 'GET',
        });

        const information: IProxyInformation = response.data;

        return information;
    }
 };

export interface IIPCheckService {
    check: (ip: string) => Promise<IProxyInformation>
 }

 interface IProxyInformation {
        ip: string,
        success: boolean,
        type: string,
        continent: string,
        continent_code: string,
        country: string,
        country_code: string,
        region: string,
        region_code: string,
        city: string,
        latitude: number,
        longitude: number,
        is_eu: boolean,
        postal: string,
        calling_code: string,
        capital: string,
        borders: string,
        connection: {
          asn: number,
          org: string,
          isp: string,
          domain: string
        },
        timezone: {
          id: string,
          abbr: string,
          is_dst: boolean,
          offset: number,
          utc: string,
          current_time: string
        }
      
 }