import { AxiosResponse, Method, RequestConfig, RequestError } from './request';

export type topoResponseToast = string | { title: string; description: string };

export interface topoRequestConfig<T = any> extends RequestConfig {
  method?: Method;
  data?: T;
  successToast?: topoResponseToast;
  failToast?: topoResponseToast;
}

export interface topoResponseData<T> {
  code: string;
  message: string;
  result: T;
}

export interface topoResponse<T = any> extends AxiosResponse<topoResponseData<T>, any> {
  [key: string]: any;
}

export interface topoError extends RequestError {
  config: topoRequestConfig;
  response?: topoResponse;
}

export type topoRequestFunc = <D, R>(config: topoRequestConfig<D>) => Promise<topoResponseData<R>>;
