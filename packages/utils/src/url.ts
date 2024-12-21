export const filterXSS = (str: string) =>
  str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const getAllUrlParams = (url?: string) => {
  const u = new URL(url ?? location.href);

  const params: Record<string, string> = {};

  // 遍历 searchParams，将所有键值对存入 params 对象
  for (const [param, value] of u.searchParams.entries()) {
    params[param] = value;
  }

  return params;
};

export const getUrlParam = (param: string, url?: string) => {
  const u = new URL(url ?? location.href);
  return u.searchParams.get(param);
};

export const setUrlParam = (paramsObj: Record<string, string>, url?: string) => {
  const u = new URL(url ?? location.href);

  // 遍历对象，将每个键值对添加到 searchParams
  for (const [param, value] of Object.entries(paramsObj)) {
    u.searchParams.set(param, value);
  }

  window.location.href = u.toString();
};

export const getHost = (targetUrl: string) => RegExp(/\/\/([^/]+)/).exec(targetUrl)?.[1];

export const isSameDomain = (targetUrl = '', source = globalThis.location.host) => {
  const isHttpUrl = /^(http[s]?:)?\/\//.test(targetUrl);

  if (!isHttpUrl) return true;

  return getHost(targetUrl) === source;
};

export const isURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};
