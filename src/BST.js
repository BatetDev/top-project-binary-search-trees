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

/* 
1. If root is null → return (empty tree)
2. Start traversal:
   - currentNode = root
   - parentNode = null
3. While currentNode is not null:
   a. If value < currentNode.data → go left
   b. If value > currentNode.data → go right
   c. If value === currentNode.data → BREAK (found it)
4. If currentNode is null → not found → return
5. Now handle deletion:
   CASE 1: No children → leaf
      - If root → set this.root = null
      - Else → set parent's link to null
*/
