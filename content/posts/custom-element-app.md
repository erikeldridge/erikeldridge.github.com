---
title: Web Custom Element App
date: 2026-11-16
tags:
  - web
  - custom element
categories:
  - technical-tools
---

# Custom Element App

I want to build an app that uses [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) for efficient encapsulation, but also provides some of React's intuitive rendering patterns.

I like the pattern of bubbling events up and state down. I use an `App` class to act as an orchestrator, catching events, resolving state changes, and then updating child elements.

Declaratively incorporating custom elements is straightforward. I can create a class:
```ts
class App extends HTMLElement {
  render(){
    this.innerHTML = `
    hi
    `
  }
  connectedCallback(){
    this.render()
  }
}
```

Bind that class to markup in my Vite app's `main.ts`:
```ts
customElements.define('my-app', App)
```

And then reference that markup in my `index.html`:

```html
...
<body>
  <app></app>
  <script type="module" src="/src/main.ts"></script>
</body>
```

That's all good. I like the native element features like `connectedCallback`, but it gets awkward in a couple cases: injecting dependencies and referencing child elements.

## Dependency Injection

Dexie is my app's main dependency. I wrap it in a model class. I'll use todos as a simple, but realistic example:
```ts
type TodoDbSchema = Dexie & {
  todos: EntityTable<TodoSchema, 'id'>;
}
 
const db = new Dexie('Todo') as TodoDbSchema;
 
class TodoStore {
  constructor(private db: TodoDbSchema){
  }
  async get(id: string): Promise<Todo> {
    const row = await this.db.todos.get(id)
    ...
  }
  ...
}
```

This is straightforward, but `db.todos` is undefined until `db.version(1).stores({ todos: ... })` is called, raising the question of where to call that.

Building on my hello world example, the most immediate programmatic hook I have is the `App` constructor. I don't know how expensive DB initialization is, but operations with side effects in a constructor have always felt like a bad idea.

I could put it in `connectedCallback`, which can be async, but that also feels off. It seems like it should primarily concern element behavior.

What I'm looking for is dependency injection, so I can treat the DB and `TodoStore` as dependencies, initialize them in the way that makes sense for them, and then inject them into `App` in a very direct way.

My `main.ts` gives me space to do this. I can go full-imperative and simply instantiate `App` directly:

```ts
const db = new Dexie('Todos')
db.version(1).stores({...})
const store = new TodoStore(db)
const app = new App(store)
document.body.appendChild(app)
```

That's very easy to follow, and a Vite `index.html` is minimal to begin with, so moving from a declarative `<app>` to an imperative `new App()` reference seems ok.

It does raise the question of why `App` is an element to begin with. Its UI is entirely composed of child elements:
```ts
class App {
  ...
  render(){
    this.innerHTML = `
    <todo-composer></todo-composer>
    <todo-list></todo-list>
    `
  }
}
```

These child elements have their own render methods, so I could plausibly just add them directly and skip the indirection of an `App` class:
```ts
...
const composer = new TodoComposer(...)
const list = new TodoList(...)
document.body.append(composer, list)
```

That works, but intuitively I look for an `App` encapsulation, and having one also makes it easier to unit test.

Ok, so my work-in-progress "style guide" for web apps has a new entry: do encapsulate application logic in an `App` class; don't inline everything in `main.ts`.

While on the topic of dependency injection, I recently learned about [TSyringe](https://tsyringe.com), which hase a nice, tiny API and appears to operate at compile-time. Custom elements + TS + TSyringe might be the trifecta, but for now, I'm wary of incorporating another layer of indirection, especially since an imperative reference for a child element is advantageous for the reasons described below.

## Child Elements

This brings me to the second case of awkwardness: referencing child elements.

I see three general approaches:
1. imperative
2. declarative
3. a bit of both

### Imperative

The cleanest approach I've seen declares them unambiguously and imperatively at the top of the class:

```ts
class App extends HTMLElement {
  composer: TodoComposer = document.createElement('todo-composer')
  ...
}
```

That's beautiful. Given that, I can freely reference `this.composer` anywhere in the class.

I can even do basic dependency injection:

```ts
class App extends HTMLElement {
  composer: TodoComposer;
  constructor(private store: TodoStore){
    this.composer = new TodoComposer(this.store)
  }
  ...
}
```

A downside is the render method becomes imperative, which I find harder to read than markup:

```ts
render(){
  this.replaceChildren(this.composer)
}
```

Another downside is my desire for consistency leads to all elements being referred to imperatively:

```ts
render(){
  const list = document.createElement('todo-list')
  this.replaceChildren(this.composer, list)
}
```

A mitigation might be to declare elements imperatively if there are only a few.

### Declarative

An alternative approach would be to declare a deferred reference, render the element using markup, and then use the DOM to obtain a reference after rendering:

```js
class App extends HTMLElement {
  composer!: TodoComposer;
  ...
  render(){
    this.innerHTML = `
    <todo-composer></todo-composer>
    `
    this.composer = this.querySelector('todo-composer')!
  }
}
```

I find the markup easier to read, but referencing the element via the DOM feels awkward, and the bang (`!`) reference makes me nervous.

### Bit Of Both

For completeness, a middle-ground might be to use declarative markup for most and then swap in any imperative references:

```ts
render(){
  this.innerHTML = `
  <todo-header></todo-header>
  <todo-composer></todo-composer>
  <todo-list></todo-list>
  `
  this.querySelector('todo-composer').replaceWith(this.composer)
}
```

This seems to come down to the number of elements being referred to and whether a constructor would be helpful for dependency injection.

## Summary

I think the overarching issue is it's awkward to reference things using the DOM in the context of a class. Typically, I'd just inject the dependencies I need via the constructor, but in the case of an element referenced declaratively, I don't have access to the constructor. 

Imperatively constructing an `App` instance in `main.ts` and injected dependencies directly works well.

I'm ambivalent about the unambiguous quality of an imperative declaration at the top of the class versus the intuitive feel of declarative markup for child elements, but I prefer the latter for my simple app. For now, trying to keep complex dependencies out of child elements to avoid nested dependency injection seems worthwhile. The point to revisit this might be when I need to inject a dependency into a child element.

The `App` class really does seem like an odd duck 🦆 It's an `HTMLElement` that has no UI and is constructed imperatively, but benefits from native means to interact with the DOM, such as `connectedCallback`.




