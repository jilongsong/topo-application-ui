import { MRestApiExecutorConfig } from '@topo/schema';
import { topoRequestConfig, topoResponseData, Request } from '@topo/utils';

import { ExecutorHandler } from '../../type';

const service = new Request({});

const request = <D, R>(config: topoRequestConfig<D>): Promise<topoResponseData<R>> => {
  const { method = 'GET' } = config;
  if (method === 'GET') {
    config.params = config.data;
  }
  return service.request<topoResponseData<R>>(config);
};

export const restApiHandler: ExecutorHandler<MRestApiExecutorConfig> = async (
  { config: { url, headers, data, method } },
  resolve,
  reject
) => {
  try {
    const result = await request({ url, method, data, headers });
    resolve(result);
  } catch (error) {
    reject(error as Record<string, any>);
  }
};

export default restApiHandler;
