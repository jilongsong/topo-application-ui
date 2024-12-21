import { BaseService } from '@topo/utils';

interface Options {
  namespace?: string;
  protocol?: any;
}

export enum Protocol {
  OBJECT = 'object',
  JSON = 'json',
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
}

export class StorageService extends BaseService {
  private storage: Storage = globalThis.localStorage;

  constructor() {
    super();
  }

  public get namespace() {
    return 'topo';
  }

  public async getStorage(): Promise<Storage> {
    return this.storage;
  }

  public async clear(): Promise<void> {
    const storage = await this.getStorage();
    storage.clear();
  }

  public async getItem(key: string, options: Options = {}): Promise<any> {
    const [storage, namespace] = await Promise.all([this.getStorage(), this.namespace]);
    const { protocol = options.protocol, item } = this.getValueAndProtocol(
      storage.getItem(`${options.namespace || namespace}:${key}`)
    );

    if (item === null) return null;

    switch (protocol) {
      case Protocol.OBJECT:
        // eslint-disable-next-line no-eval
        return eval(`(${item})`);
      case Protocol.JSON:
        return JSON.parse(item);
      case Protocol.NUMBER:
        return Number(item);
      case Protocol.BOOLEAN:
        return Boolean(item);
      default:
        return item;
    }
  }

  public async removeItem(key: string, options: Options = {}): Promise<void> {
    const [storage, namespace] = await Promise.all([this.getStorage(), this.namespace]);
    storage.removeItem(`${options.namespace || namespace}:${key}`);
  }

  public async setItem(key: string, value: any, options: Options = {}): Promise<void> {
    const [storage, namespace] = await Promise.all([this.getStorage(), this.namespace]);
    let item = value;
    const protocol = options.protocol ? `${options.protocol}:` : '';
    if (typeof value === Protocol.STRING || typeof value === Protocol.NUMBER) {
      item = `${protocol}${value}`;
    } else {
      item = `${protocol}${value}`;
    }
    storage.setItem(`${options.namespace || namespace}:${key}`, item);
  }

  public destroy() {
    this.clear();
    this.removeAllListeners();
  }

  private getValueAndProtocol(value: string | null) {
    let protocol = '';

    if (value === null) {
      return {
        item: value,
        protocol,
      };
    }

    const item = value.replace(new RegExp(`^(${Object.values(Protocol).join('|')})(:)(.+)`), (_$0, $1, _$2, $3) => {
      protocol = $1;
      return $3;
    });

    return {
      protocol,
      item,
    };
  }
}

export default StorageService;
