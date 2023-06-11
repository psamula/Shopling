import React from "react";

class EventClass {
  id: number;
  element: Element;
  constructor(id: number, element: Element) {
    this.id = id;
    this.element = element;
  }
  hide() {
    this.element.classList.add("hiddenEl");
  }
  show() {
    this.element.classList.remove("hiddenEl");
  }
}

class EventsClass {
  list: EventClass[];
  constructor() {
    this.list = [];
  }
  init() {
    this.list = [];
    const elements = document.querySelectorAll("[data-id]");
    elements.forEach((element) => {
      const id = element.getAttribute("data-id");
      if (id) {
        this.list.push(new EventClass(Number(id), element));
      }
    });
    this.list.forEach((event) => {
      event.hide();
    });
  }
  show(id: number) {
    const event = this.list.find((event) => event.id === id);
    if (event) {
      event.show();
    }
  }
  hide(id: number) {
    const event = this.list.find((event) => event.id === id);
    if (event) {
      event.hide();
    }
  }
}

export { EventsClass, EventClass };
