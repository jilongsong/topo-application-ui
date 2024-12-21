export const log = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('topo editor: ', ...args);
  }
};

export const info = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.info('topo editor: ', ...args);
  }
};

export const warn = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('topo editor: ', ...args);
  }
};

export const debug = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.debug('topo editor: ', ...args);
  }
};

export const error = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('topo editor: ', ...args);
  }
};
