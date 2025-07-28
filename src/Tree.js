// src/Tree.js

import { Node } from "./Node.js";

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    // temp - test
    return new Node(array[0]);
  }
}
