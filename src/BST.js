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
    if (!this.root) {
      this.root = new Node(value);
      return;
    }

    let currentNode = this.root;

    while (currentNode) {
      if (value < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = new Node(value);
          return;
        }
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        if (!currentNode.right) {
          currentNode.right = new Node(value);
          return;
        }
        currentNode = currentNode.right;
      } else {
        console.log(`Value ${value} already exists. Ignoring.`);
        return;
      }
    }
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
