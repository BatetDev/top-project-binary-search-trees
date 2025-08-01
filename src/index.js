// src/index.js

import { BST, prettyPrint } from "./BST.js";

const tree = new BST([
  12, 73, 41, 23, 85, 91, 48, 37, 56, 78, 99, 67, 34, 24, 84,
]);

prettyPrint(tree.root);

tree.insert(5);
tree.insert(5);
tree.insert(98);
tree.delete(5);
tree.delete(48);
tree.delete(78);

prettyPrint(tree.root);
