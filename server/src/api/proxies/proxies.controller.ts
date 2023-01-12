import { IpCheckService } from '../../services/ip-check.service';
import { ProxiesService } from './proxies.service';
import { ProxiesCache } from './proxies.cache';
import { off } from 'process';

export class ProxiesController {
  private ipCheckService: IpCheckService;
  private proxiesService: ProxiesService;
  private proxiesCache: ProxiesCache;
  constructor({
    ipCheckService,
    proxiesService,
    proxiesCache,
  }) {
    this.ipCheckService = ipCheckService;
    this.proxiesService = proxiesService;
    this.proxiesCache = proxiesCache;
  }

  async getProxyInformation(req, res, next) {
    const ip = req.params.ip;
    let proxy;

    try {
      const cacheProxy = this.proxiesCache.get(req.params.ip);

      if(cacheProxy) {
        proxy = cacheProxy;
      }

      if(!proxy) {
        proxy = await this.proxiesService.findOne({ ip });
        if(proxy) {
          await this.proxiesCache.add(proxy);
        }
      }

      if(!proxy) {
        const proxyInformation = await this.ipCheckService.check(req.params.ip);

        if(!proxyInformation) {
          res.send("NO_VALID_PROXY");
          return;
        }

        await this.proxiesService.create({
          ip: proxyInformation.ip,
          city: proxyInformation.city,
          type: proxyInformation.type,
          country: proxyInformation.country,
        });

        proxy = await this.proxiesService.findOne({ ip: proxyInformation.ip })

        await this.proxiesCache.add(proxy);
      }

      res.send(proxy);
    } catch (error) {
      next(error);
    }
  }
}
