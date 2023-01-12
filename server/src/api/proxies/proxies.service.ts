import { ProxyEntity } from "./proxy.entity";

interface createProxyDTO {
    city: string;
    ip: string;
    type: string;
    country: string;
}

interface findProxyDTO {
    ip: string;
}

export class ProxiesService {
    private proxiesRepository: typeof ProxyEntity;
    constructor({
        proxiesRepository,
    }) {
        this.proxiesRepository = proxiesRepository;
    }

    create(params: createProxyDTO) {
        return this.proxiesRepository.create(params);
    }

    findOne(params: findProxyDTO) {
        return this.proxiesRepository.findOne({
            where: {
                ip: params.ip,
            }
        });
    }
};