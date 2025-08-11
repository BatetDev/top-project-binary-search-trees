// src/BST.js

/*
  TODO: Complete the delete(value) method
  --------------------------------------
  Currently supports:
  ✓ Deleting leaf nodes (no children)

  Still need to implement:
  ◻ Case 2: Node with one child
    - If node has only a left child: bypass to parent
    - If node has only a right child: bypass to parent
    - Handle root deletion (update this.root)

  ◻ Case 3: Node with two children
    - Find the in-order successor (smallest in right subtree)
    - Copy successor's value into the node to delete
    - Delete the original successor node (it has 0 or 1 child → Case 1 or 2)

  Notes:
  - Use object reference comparison (parentNode.left === currentNode) to update links
  - Avoid rebuilding the tree — work directly with node pointers
  - Preserve BST property: left < node < right
*/

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

    return;
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
