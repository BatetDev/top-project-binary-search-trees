// src/index.js

import { BST, prettyPrint } from "./BST.js";

const tree = new BST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(tree.root);
