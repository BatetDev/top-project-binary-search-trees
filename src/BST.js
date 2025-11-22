// src/BST.js

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

export class BST {
  constructor(values) {
    this.root = this.buildTree(values);
  }

  buildTree(values) {
    if (!values || values.length === 0) return null;

    const cleaned = [...new Set(values)].sort((a, b) => a - b);
    const midIndex = Math.floor(cleaned.length / 2);
    const midValue = cleaned[midIndex];

    const node = new Node(midValue);

    const leftHalf = cleaned.slice(0, midIndex);
    const rightHalf = cleaned.slice(midIndex + 1);

    node.left = this.buildTree(leftHalf);
    node.right = this.buildTree(rightHalf);

    return node;
  }

  insert(value) {
    // Handle empty tree
    if (!this.root) {
      this.root = new Node(value);
      return true;
    }

    let currentNode = this.root;

    while (currentNode) {
      if (value === currentNode.data) {
        console.log(`Value ${value} already exists. Ignoring.`);
        return false;
      }

      // Choose left or right base on value comparison
      const direction = value < currentNode.data ? "left" : "right";

      // Insert if empty spot found, otherwise continue traversing
      if (!currentNode[direction]) {
        currentNode[direction] = new Node(value);
        return true;
      }
      currentNode = currentNode[direction];
    }
  }

  delete(value) {
    if (this.root === null) return;

    let currentNode = this.root;
    let parentNode = null;

    while (currentNode !== null) {
      if (value < currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else {
        break;
      }
    }

    if (currentNode === null) {
      console.log(`Value ${value} not found in the tree.`);
      return;
    }

    if (currentNode.left === null && currentNode.right === null) {
      if (parentNode === null) {
        this.root = null;
      } else {
        if (parentNode.left === currentNode) {
          parentNode.left = null;
        } else {
          parentNode.right = null;
        }
      }
    }

    return;
  }

  find(value) {
    let currentNode = this.root;
    while (currentNode) {
      if (value === currentNode.data) {
        return currentNode;
      } else if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null; // Not found
  }
}

// For visualization
export const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
