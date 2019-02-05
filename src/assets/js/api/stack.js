export default class Stack {
  constructor(stack) {
    if (stack) {
      this.count = stack.count;
      this.items = stack.items;
    } else {
      this.count = 0;
      this.items = new Array(10);
    }
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }

  push(item) {
    // увеличиваем стек
    if (this.count === this.items.length) {
      this.resize(this.items.length + 10);
    }

    this.items[this.count++] = item;
  }

  pop() {
    // если стек пуст
    if (this.isEmpty()) {
      return null;
    }
    let item = this.items[--this.count];
    this.items[this.count] = null; // сбрасываем ссылку

    let difference = this.count > 0 && this.count < this.items.length - 10;
    if (difference) {
      this.resize(this.items.length - 10);
    }
    return item;
  }

  peek() {
    // если стек пуст
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.count - 1];
  }

  indexOf(index) {
    if (index > this.count) {
      return null;
    }
    return this.items[index];
  }

  resize(max) {
    let tempItems = new Array(max);
    for (let i = 0; i < this.count; i++) {
      tempItems[i] = this.items[i];
    }
    this.items = tempItems;
  }
}
