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
      const direction = value < currentNode.data ? 'left' : 'right';

      // Insert if empty spot found, otherwise continue traversing
      if (!currentNode[direction]) {
        currentNode[direction] = new Node(value);
        return true;
      }
      currentNode = currentNode[direction];
    }
  }

  deleteItem(value) {
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

    // CASE 1: Node has no children
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
      return;
    }

    // CASE 2: Node has exactly ONE child
    if (currentNode.left === null || currentNode.right === null) {
      // Get the non-null child
      const child =
        currentNode.left !== null ? currentNode.left : currentNode.right;

      if (parentNode === null) {
        // Case 2a: Deleting root with one child
        this.root = child;
      } else {
        // Case 2b: Deleting non-root with one child
        if (parentNode.left === currentNode) {
          parentNode.left = child; // Bypass the deleted node
        } else {
          parentNode.right = child;
        }
      }
      return;
    }

    // CASE 3: Node with TWO Children
    if (currentNode.left !== null && currentNode.right !== null) {
      // Find in-order successor (leftmost node in right subtree)
      let successorParent = currentNode;
      let successor = currentNode.right;

      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }

      // Copy successor's data to current node
      currentNode.data = successor.data;

      // Check if successor is left or right child
      if (successorParent.left === successor) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }
    }

    return;
  }

  find(value) {
    if (!this.root) {
      console.log('Tree is empty.');
      return null;
    }

    let currentNode = this.root;

    while (currentNode) {
      if (value === currentNode.data) {
        console.log(`Value ${value} found.`);
        return currentNode;
      }

      const direction = value < currentNode.data ? 'left' : 'right';
      if (!currentNode[direction]) {
        console.log(`Value ${value} not found.`);
        return null;
      }
      currentNode = currentNode[direction];
    }
  }

  levelOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required');
    }

    if (this.root === null) return;

    let queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift(); // Dequeue the first node

      callback(currentNode); // Process the current node

      // Enqueue children (left to right)
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }

  preOrderForEach(callback, node = this.root) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required');
    }

    if (node === null) return;
    callback(node);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  inOrderForEach(callback, node = this.root) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required');
    }

    if (node == null) return;
    this.inOrderForEach(callback, node.left);
    callback(node);
    this.inOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required');
    }

    if (node === null) return;
    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node);
  }

  height(value) {
    const targetNode = this.find(value);
    if (targetNode === null) {
      return null;
    }

    const calculateHeight = (node) =>
      node === null
        ? -1
        : 1 + Math.max(calculateHeight(node.left), calculateHeight(node.right));

    const result = calculateHeight(targetNode);
    console.log(`Node ${value} | Height: ${result}`);
    return result;
  }

  depth(value) {
    if (!this.root) {
      console.log('Tree is empty');
      return null;
    }

    let currentNode = this.root;
    let depthCount = 0;

    while (currentNode) {
      if (value === currentNode.data) {
        console.log(`Node: ${currentNode.data} | Depth: ${depthCount}`);
        return depthCount;
      }

      const direction = value < currentNode.data ? 'left' : 'right';
      if (!currentNode[direction]) {
        console.log(`Value ${value} not found.`);
        return null;
      }

      currentNode = currentNode[direction];
      depthCount++;
    }
  }

  isBalanced(node = this.root) {
    if (node === null) return true; // Base case - empty = balanced

    // If node.left exists → proceed to the first option
    const leftHeight = node.left ? this.height(node.left.data) : -1;
    const rightHeight = node.right ? this.height(node.right.data) : -1;

    const heightBalanced = Math.abs(leftHeight - rightHeight) <= 1;
    const childrenBalanced =
      this.isBalanced(node.left) && this.isBalanced(node.right);

    return heightBalanced && childrenBalanced;
  }

  rebalance() {
    // Collect values using in-order traversal
    const values = [];
    this.inOrderForEach((node) => values.push(node.data));

    // Rebuild balanced tree
    this.root = this.buildTree(values);
  }
}

// For visualization
export const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
