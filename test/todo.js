const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TodoList", function () {
  let todoList;
  let user;
  let addr1;

  beforeEach(async () => {
    [user, addr1] = await ethers.getSigners();

    const TodoList = await ethers.getContractFactory("TodoList");
    todoList = await TodoList.deploy();

    await todoList.waitForDeployment();
  });

  it("User can create a todo", async () => {
    await todoList.createTodo("Learn Solidity");

    const todos = await todoList.getTodos(user.address);
    expect(todos.length).to.equal(1);
    expect(todos[0].text).to.equal("Learn Solidity");
    expect(todos[0].completed).to.equal(false);
  });
  it("Different users have separate todos", async () => {
    await todoList.createTodo("Owner task");
    await todoList.connect(addr1).createTodo("addr1 task");

    const ownerTodos = await todoList.getTodos(user.address);
    const adrr1Todos = await todoList.getTodos(addr1.address);

    expect(ownerTodos[0].text).to.equal("Owner task");
    expect(adrr1Todos[0].text).to.equal("addr1 task");
  });
  it("user can mark todo as completed", async () => {
    await todoList.createTodo("Call dad");

    const getTodo = await todoList.getTodo(user.address);

    console.log("the todo",getTodo);
  });
  it("", async () => {});
});
