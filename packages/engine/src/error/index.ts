import { Link, Vertex } from '../core';
import { BaseCmd } from '../types';

export class BaseError extends Error {
  cause?: Error;

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = this.constructor.name;
  }
}

export class CmdNotRegisterError extends BaseError {
  constructor(command: BaseCmd | string) {
    super(`命令${command instanceof BaseCmd ? command.name : command}未注册`);
  }
}

export class CmdNotOptionsError extends BaseError {
  constructor(command: BaseCmd | string) {
    super(`命令${command instanceof BaseCmd ? command.name : command}的options不能为空`);
  }
}

export class VertexNotExistError extends BaseError {
  constructor(vertexId: string) {
    super(`Id为${vertexId}的节点不存在`);
  }
}

export class VertexAlreadyExistError extends BaseError {
  constructor(vertexId: string) {
    super(`Id为${vertexId}的节点已经存在`);
  }
}

export class PortNotExistError extends BaseError {
  constructor(vertexId: string, portId: string) {
    super(`在${vertexId}节点中不存在${portId}连接桩`);
  }
}

export class IllegalLinkError extends BaseError {
  constructor(link: Link) {
    super(`从${link.source.vertex.id}.${link.source.port}到${link.target.vertex.id}.${link.target.port}无法建立连接`);
  }
}

export class IrrelevantLinkError extends BaseError {
  constructor(vertex: Vertex, link: Link) {
    super(`${vertex.id}不在连接${link.name}中`);
  }
}
