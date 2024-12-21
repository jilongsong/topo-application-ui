import { InstallOptions } from '../type';

let $topo_EDITOR: InstallOptions = {} as any;

const setConfig = (option: InstallOptions): void => {
  $topo_EDITOR = option;
};

const getConfig = (key: keyof InstallOptions): unknown => $topo_EDITOR[key];

export { getConfig, setConfig };
