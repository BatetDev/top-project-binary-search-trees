// src/driver.js

import { BST, prettyPrint } from './BST.js';

export function runBSTDemo() {}

// Helper function to generate random array
function generateRandomArray(length = 10, max = 100) {
  return Array.from({ length }, () => Math.floor(Math.random() * max));
}

// Step 1: Create BST from random numbers
const randomNumbers = generateRandomArray(15); // 15 random numbers < 100
console.log('Random numbers:', randomNumbers);

const tree = new BST(randomNumbers);
console.log('Initial tree structure:');
prettyPrint(tree.root);

// Step 2: Confirm initial tree is balanced
console.log(`Tree Balance: ${tree.isBalanced()}`);

// Step 3: Print all traversals
console.log('\n--- Tree Traversals ---');

console.log('Level-order:');
tree.levelOrderForEach((node) => process.stdout.write(node.data + ' '));
console.log(); // New line

console.log('Pre-order:');
tree.preOrderForEach((node) => process.stdout.write(node.data + ' '));
console.log();

console.log('Post-order:');
tree.postOrderForEach((node) => process.stdout.write(node.data + ' '));
console.log();

console.log('In-order:');
tree.inOrderForEach((node) => process.stdout.write(node.data + ' '));
console.log();

// Step 4: Unbalance the tree
console.log('\n--- Unbalancing the Tree ---');
const largeNumbers = [150, 200, 175, 250, 300]; // Numbers > 100
largeNumbers.forEach((num) => {
  tree.insert(num);
  console.log(`Inserted ${num}`);
});

console.log('\nTree after adding large numbers:');
prettyPrint(tree.root);

// Step 5: Confirm unbalanced
console.log(`\nTree balanced after adding large numbers: ${tree.isBalanced()}`);

// Step 6: Rebalance the tree
console.log('\n--- Rebalancing the Tree ---');
tree.rebalance();
console.log('Tree after rebalancing:');
prettyPrint(tree.root);

// Step 7: Confirm balanced again
console.log(`\nTree balanced after rebalance: ${tree.isBalanced()}`);

// Step 8: Print all traversals again
console.log('\n--- Tree Traversals After Rebalance ---');

console.log('Level-order:');
tree.levelOrderForEach((node) => process.stdout.write(node.data + ' '));
console.log();

console.log('Pre-order:');
tree.preOrderForEach((node) => process.stdout.write(node.data + ' '));
console.log();

console.log('Post-order:');
tree.postOrderForEach((node) => process.stdout.write(node.data + ' '));
console.log();

console.log('In-order:');
tree.inOrderForEach((node) => process.stdout.write(node.data + ' '));
console.log();
