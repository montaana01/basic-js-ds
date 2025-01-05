const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.searchRoot = null;
  }

  root() {
    return this.searchRoot;
  }

  add(data) {
    this.searchRoot = addInside(this.searchRoot, data);

    function addInside(node, data) {
      if (!node){
        return new Node(data);
      }

      if (data === node.data){
        return node;
      }

      if (data < node.data){
        node.left = addInside(node.left, data);
      } else {
        node.right = addInside(node.right, data);
      }

      return node;
    }

  }

  has(data) {
    return searchInside(this.searchRoot, data);

    function searchInside(node, data) {
      if (!node){
        // if not find - false
        return false;
      }

      if (node.data === data){
        // if we get it - return true
        return true;
      }

      if (data < node.data){
        // go to lover - left
        return searchInside(node.left, data);
      } else {
        // go to higher - right
        return searchInside(node.right, data);
      }
    }
  }

  find(data) {
    return searchInside(this.searchRoot, data);

    function searchInside(node, data) {
      if (!node) {
        // if not find - return null
        return null;
      }

      if (data === node.data) {
        // if we get it - return node
        return node;
      }

      if (data < node.data){
        // go to lover - left
        return searchInside(node.left, data);
      } else {
        // go to higher - right
        return searchInside(node.right, data);
      }
    }
  }

  remove(data) {
    this.searchRoot = removeItem(this.searchRoot, data);

    function removeItem(node, data) {
      if (!node) {
        //if we don't have item to remove - return null
        return null;
      }

      if (data < node.data) {
        // go to lover - left
        node.left = removeItem(node.left, data);
        return node;
      } else if (data > node.data) {
        // go to higher - right
        node.right = removeItem(node.right, data);
        return node;
      } else {

        if (!node.left && !node.right) {
          // we found leaf
          return null;
        }

        if (!node.left) {
          // we have only right child
          return node.right;
        }

        if (!node.right) {
          // we have only left child
          return node.left;
        }

        // if we have two children
        let minFromRight = findMin(node.right);
        node.data = minFromRight.data;
        node.right = removeItem(node.right, minFromRight.data);
        return node;
      }
    }

    function findMin(node) {
      while (node.left) {
        node = node.left;
      }
      return node;
    }
  }

  min() {
    //left walk
    if (!this.searchRoot) {
      return null;
    }

    let node = this.searchRoot;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    //right walk
    if (!this.searchRoot) {
      return null;
    }

    let node = this.searchRoot;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};
