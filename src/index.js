// src/index.js

import { BST, prettyPrint } from './BST.js';

const tree = new BST([4, 2, 6, 1, 3, 5, 7]);

console.log('Pre-order (Root first):');
tree.preOrderForEach((node) => console.log(node.data));
// Expected: 4, 2, 1, 3, 6, 5, 7

console.log('In-order (Sorted order):');
tree.inOrderForEach((node) => console.log(node.data));
// Expected: 1, 2, 3, 4, 5, 6, 7

console.log('Post-order (Root last):');
tree.postOrderForEach((node) => console.log(node.data));
// Expected: 1, 3, 2, 5, 7, 6, 4
