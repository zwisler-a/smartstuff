import { Edge } from './edge';
import { Identifiable } from './identifiable';
import { NodeInstance } from './instance/node-instance';
import { Subscription } from '../observable';

export class Network extends Identifiable {
  private isActive = false;
  private subscriptions: Subscription<any>[] = [];

  constructor(public nodes: NodeInstance[], public edges: Edge[]) {
    super();
  }

  start() {
    if (this.isActive) return;
    this.edges.forEach((edge) => {
      const subscription = edge.output.subscribe((data) =>
        edge.input.node.handleInput(edge.input.definition, data),
      );
      this.subscriptions.push(subscription);
    });
  }

  stop() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];
  }

  toString() {
    return `Network {
      identifier: ${this.identifier},
      name: ${this.name},
      description: ${this.description},
      nodes: ${this.nodes?.map((n) => n.identifier)},
      edges: ${this.edges?.map((e) => e.identifier)} }`;
  }
}