import { expect } from "chai";

describe("Todo", async function () {
  const [owner, otherAccount] = await ethers.getSigners();

  const Todo = await ethers.getContractFactory("Todo");
  const todo = await Todo.deploy();

  return { todo, owner, otherAccount };
});

describe("TodoAdding", async function () {
  it("Should return the new todo once it's added", async function () {
    expect(await todo.addTodo("New todo")).to.equal("New todo");
  });

  it("Should return the new todo once it's added", async function () {
    expect(await todo.addTodo2("New todo")).to.equal("New todo");
  });
});

describe("TodoUpdating", async function () {
  it("Should return the updated todo once it's updated", async function () {
    expect(await todo.updateTask("Updated todo")).to.equal("Updated todo");
  });

  it("Should return the updated todo once it's updated", async function () {
    expect(await todo.updateTask("Updated todo")).to.equal("Updated todo");
  });
});

describe("TodoDeleting", async function () {
  it("Should return the deleted todo once it's deleted", async function () {
    expect(await todo.deleteTask("Deleted todo")).to.equal("Deleted todo");
  });

  it("Should return the deleted todo once it's deleted", async function () {
    expect(await todo.deleteTask("Deleted todo")).to.equal("Deleted todo");
  });
});