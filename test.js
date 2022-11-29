// Question 4

// Sorted Array with duplicate items
const array = [1, 2, 3, 4, 6, 6, 8, 8, 8, 8, 8, 10, 23, 23, 346, 534];

function removeFromArray(array, index) {
  // return new array
  const newArray = [];
  for (let i = 0; i < index; i++) {
    newArray[i] = array[i];
  }

  for (let i = index; i < array.length - 1; i++) {
    newArray[i] = array[i + 1];
  }

  return newArray;
}

function removeDuplicate(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === array[i + 1]) {
      array = removeFromArray(array, i--);
    }
  }
  return array;
}

// console.log(removeDuplicate(array));

// Question 5

const correctString = "{abc(sdfkajl234(ewrfoi)werwer([sdfsdf]sdfa[sdfs{}]))}";
const wrongString = "{abc(sdfkajl234(ewrfo{i)we}rwer([sdfsdf]sdfa[sdfs{}]))}";

class Stack {
  items = [];

  push(item) {
    this.items.push(item);
  }
  pop() {
    return this.items.pop();
  }
  top() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}

function checkParanthesis(string) {
  const s = new Stack();

  for (let i = 0; i < string.length; i++) {
    const item = string[i];
    if (item === "(" || item === "[" || item === "{") {
      s.push(item);
    } else if (item === "}") {
      if (s.top() === "{") {
        // no problem
        s.pop();
      } else {
        return "invalid expression";
      }
    } else if (item === "]") {
      if (s.top() === "[") {
        // no problem
        s.pop();
      } else {
        return "invalid expression";
      }
    } else if (item === ")") {
      if (s.top() === "(") {
        // no problem
        s.pop();
      } else {
        return "invalid expression";
      }
    }
  }

  return true;
}
// console.log(checkParanthesis(correctString));
// console.log(checkParanthesis(wrongString));

// Question 3
// reverse doubly linked list

// Javascript program to reverse a
// doubly linked list
var head;

class Node {
  constructor(val) {
    this.data = val;
    this.prev = null;
    this.next = null;
  }
}

/* Function to reverse a Doubly Linked List */
function reverse() {
  var temp = null;
  var current = head;

  /* Swap next and prev for all nodes of
	doubly linked list */
  while (current != null) {
    temp = current.prev;
    current.prev = current.next;
    current.next = temp;
    current = current.prev;
  }

  /* Before changing head, check for the cases
	like empty list and list with only one node */
  if (temp != null) {
    head = temp.prev;
  }
}

// UTILITY FUNCTIONS
/* Function to insert a node at the beginning
of the Doubly Linked List */
function push(new_data) {
  // Allocate node
  var new_node = new Node(new_data);

  /* Since we are adding at the beginning,
	prev is always NULL */
  new_node.prev = null;

  /* Link the old list off the new node */
  new_node.next = head;

  /* Change prev of head node to new node */
  if (head != null) {
    head.prev = new_node;
  }

  /* Move the head to point to the new node */
  head = new_node;
}

/* Function to print nodes in a given doubly
linked list This function is same as
printList() of singly linked list */
function printList(node) {
  console.log("linked list: ");
  while (node != null) {
    console.log(node.data + " ");
    node = node.next;
  }
}

/* Let us create a sorted linked list to test
the functions Created linked list will be
10->8->4->2 */
push(2);
push(4);
push(8);
push(10);

printList(head);

reverse();
printList(head);
// This code is contributed by gauravrajput1

// enqueue dequeue

// JavaScript program for linked-list implementation of queue
class QNode {
  constructor(key) {
    this.key = key;
    this.next = null;
  }
}

let front = null,
  rear = null;

function enqueue(key) {
  // Create a new LL node
  let temp = new QNode(key);

  // If queue is empty, then new node is front and rear both
  if (rear == null) {
    front = rear = temp;
    return;
  }

  // Add the new node at the end of queue and change rear
  rear.next = temp;
  rear = temp;
}

function dequeue() {
  // If queue is empty, return NULL.
  if (front == null) return;

  front = front.next;

  // If front becomes NULL, then change rear also as NULL
  if (front == null) rear = null;
}

enqueue(10);
enqueue(20);
dequeue();
dequeue();
enqueue(30);
enqueue(40);
enqueue(50);
dequeue();
console.log("Queue Front : " + front.key);
console.log("Queue Rear : " + rear.key);

// This code is contributed by avanitrachhadiya2155
