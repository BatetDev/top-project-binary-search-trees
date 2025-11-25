// src/index.js

import { BST, prettyPrint } from "./BST.js";

const tree = new BST([
  12, 73, 41, 23, 85, 91, 48, 37, 56, 78, 99, 67, 34, 24, 84,
]);

// Test all deletion cases
console.log("=== COMPREHENSIVE DELETE TESTING ===");

// Test 1: Case 1 - Leaf node deletion
console.log("\n1. Testing CASE 1 (Leaf node):");
console.log("Before deleting leaf 12:");
prettyPrint(tree.root);
tree.deleteItem(12);
console.log("After deleting leaf 12:");
prettyPrint(tree.root);

// Test 2: Case 2 - Node with one child
console.log("\n2. Testing CASE 2 (One child):");
// First, let's find a node with one child to test
// Add a test node to create a one-child scenario
tree.insert(95); // This should become a leaf under 99
console.log("Before deleting node 99 (has one child 95):");
prettyPrint(tree.root);
tree.deleteItem(99);
console.log("After deleting node 99:");
prettyPrint(tree.root);

// Test 3: Case 3 - Node with two children (non-root)
console.log("\n3. Testing CASE 3 (Two children - non-root):");
console.log("Before deleting node 84 (has two children):");
prettyPrint(tree.root);
tree.deleteItem(84);
console.log("After deleting node 84:");
prettyPrint(tree.root);

// Test 4: Case 3 - Root with two children (you already tested this!)
console.log("\n4. Testing CASE 3 (Root with two children):");
// Reset tree for this test
const testTree = new BST([
  12, 73, 41, 23, 85, 91, 48, 37, 56, 78, 99, 67, 34, 24, 84,
]);
console.log("New tree - Before deleting root 56:");
prettyPrint(testTree.root);
testTree.deleteItem(56);
console.log("After deleting root 56:");
prettyPrint(testTree.root);

// Test 5: Edge cases
console.log("\n5. Testing EDGE CASES:");
// Try deleting non-existent value
testTree.deleteItem(999);
// Try deleting from empty tree
const emptyTree = new BST([]);
emptyTree.deleteItem(5);

// Test 6: Delete until empty
console.log("\n6. Testing sequential deletion until empty:");
const smallTree = new BST([10, 5, 15, 3, 7]);
console.log("Initial small tree:");
prettyPrint(smallTree.root);

["3", "7", "5", "15", "10"].forEach((val) => {
  console.log(`Deleting ${val}:`);
  smallTree.deleteItem(parseInt(val));
  prettyPrint(smallTree.root);
});
