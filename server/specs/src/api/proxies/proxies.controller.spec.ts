import { ProxiesController } from "../../../../src/api/proxies/proxies.controller";
import {  describe, jest, beforeEach, it, expect } from '@jest/globals'

describe("ProxiesController", () => {
  describe("- getProxyInformation", () => {
    let ipCheckService;
    let proxiesService;
    let proxiesCache;
    let next;
    let response;
    let request ;
    let proxy = {
      ip: '192.168.44.1',
    }

    beforeEach(function () {
      ipCheckService = {
        check: jest.fn(),
      }; 
      
      proxiesService = {
        findOne: jest.fn(),
        create: jest.fn(),
      };    
      
      proxiesCache = {
        get: jest.fn(),
        add: jest.fn()
      };

      request = {
        params: { ip: '192.168.44.1' }
      }

      response = {
        send:  jest.fn()
      }

      next = jest.fn()
    });

    it("- should take ip from request params", async () => {
      const proxiesController = new ProxiesController({
        ipCheckService,
        proxiesService,
        proxiesCache,
      });

      await proxiesController.getProxyInformation(request, response, next);

      expect(proxiesCache.get).toBeCalledWith('192.168.44.1')
    });


    it("- should respond with cached ip information if it exists", async () => {
        const proxiesController = new ProxiesController({
          ipCheckService,
          proxiesService,
          proxiesCache,
        });

        proxiesCache.get.mockReturnValue(proxy)
  
        await proxiesController.getProxyInformation(request, response, next);
  
        expect(response.send).toBeCalledWith(proxy)
      });

      it("- should respond with proxy from database if it's not in cache", async () => {
        const proxiesController = new ProxiesController({
          ipCheckService,
          proxiesService,
          proxiesCache,
        });

        proxy = { 
          ip: '192.168.44.2',
        }

        proxiesCache.get.mockReturnValue(null);
        proxiesService.findOne.mockImplementation(() => Promise.resolve(proxy));
  
        await proxiesController.getProxyInformation(request, response, next);
  
        expect(response.send).toBeCalledWith(proxy)
      });

      it("- should set a new cache if found proxy in database", async () => {
        const proxiesController = new ProxiesController({
          ipCheckService,
          proxiesService,
          proxiesCache,
        });

        proxiesCache.get.mockReturnValue(null);
        proxiesService.findOne.mockImplementation(() => Promise.resolve(proxy));
  
        await proxiesController.getProxyInformation(request, response, next);
  
        expect(proxiesCache.add).toBeCalledWith(proxy);
      });

      it("- should check ip in remote API if it not exists", async () => {
        const proxiesController = new ProxiesController({
          ipCheckService,
          proxiesService,
          proxiesCache,
        });

        proxiesCache.get.mockReturnValue(null);
        proxiesService.findOne.mockImplementation(() => Promise.resolve(null));
  
        await proxiesController.getProxyInformation(request, response, next);
  
        expect(ipCheckService.check).toBeCalledWith('192.168.44.1');
      });

      it("- should create a new proxy in database on ip check success", async () => {
        const proxiesController = new ProxiesController({
          ipCheckService,
          proxiesService,
          proxiesCache,
        });

        proxiesCache.get.mockReturnValue(null);
        proxiesService.findOne.mockImplementation(() => Promise.resolve(null));
        ipCheckService.check.mockImplementation(() => Promise.resolve(proxy));
  
        await proxiesController.getProxyInformation(request, response, next);
  
        expect(proxiesService.create).toBeCalledWith(proxy);
      });

      it("- should add a new proxy to cache after creating it in database", async () => {
        const proxiesController = new ProxiesController({
          ipCheckService,
          proxiesService,
          proxiesCache,
        });

        proxiesCache.get.mockReturnValue(null);
        ipCheckService.check.mockImplementation(() => Promise.resolve(proxy));
        proxiesService.findOne.mockImplementation(() => Promise.resolve(proxy));
  
        await proxiesController.getProxyInformation(request, response, next);
  
        expect(proxiesCache.add).toBeCalledWith(proxy);
      });
  });
});
