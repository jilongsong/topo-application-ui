import { ExecutorHandler } from '../type';

import restApiHandler from './handler/restApi';

export const handler: ExecutorHandler = async ({ config: executor, props }, resolve, reject) => {
  if (executor.type === 'restApi') {
    await restApiHandler({ config: executor, props }, resolve, reject);
  } else {
    // Handle other cases if necessary
  }
};

export default handler;
