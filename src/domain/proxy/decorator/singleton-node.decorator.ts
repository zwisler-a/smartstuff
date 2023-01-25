export interface SingletonNodeOptions {
  identifier: string;
  name: string;
  description: string;
}

export const SINGLETON_NODE_DATA_HOLDER = '_proxySingletonNodeDefinition';

export function SingletonNode(options: SingletonNodeOptions) {
  return function (constructor: { prototype: any }) {
    if (constructor.prototype[SINGLETON_NODE_DATA_HOLDER])
      throw new Error('Data holder is already defined!');

    constructor.prototype[SINGLETON_NODE_DATA_HOLDER] = Object.assign(
      {},
      options,
    );
  };
}