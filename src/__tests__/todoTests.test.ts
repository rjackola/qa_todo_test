import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver,
} from "selenium-webdriver";
import { urlContains } from "selenium-webdriver/lib/until";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();


class TodoPage {
todoInput: By = By.className("new-todo");
todos: By = By.css("li.todo");
todoLabel: By =By.css("label");
todoComplete: By = By.css("input");
starBanner: By = By.className("starred");
todoStar: By = By.className("star");
todoCount: By = By.className("todo-count");
clearCompletedButton: By = By.css("button.clear-completed");
driver: WebDriver;
url: string = "https://devmountain.github.io/qa_todos/";

  constructor(driver: WebDriver){
    this.driver= driver
  }
}
  const tp = new TodoPage(driver);



describe("the todo app", () => {
  beforeEach(async () =>  {
    await driver.get(tp.url);
  })
  it("can add a todo", async() => {
  await driver.wait(until.elementLocated(tp.todoInput));
  await driver.findElement (tp.todoInput).sendKeys("Learn to code\n");
  })
  
  it("can remove a todo", async () => {
     let myTodos = await driver.findElements(tp.todos);
      await myTodos
          .filter(async (todo) => {
        (await (await todo.findElement(tp.todoLabel)).getText()) ==
          "Learn to code";
      })[0]
    .findElement(tp.todoComplete)
    .click();
    await driver.findElement(tp.clearCompletedButton)
    .click()
    });
  

  it("can mark a todo with a star", async ()  => {
    await driver.wait(until.elementLocated(tp.todoInput));
    let starButton= await(await driver.findElements(tp.starBanner)).length;
    await driver.sleep(3000)
    await driver.findElement (tp.todoInput).sendKeys("Learn to code\n");
    let myTodos=await (await driver.findElements(tp.todos))
      myTodos.filter(async (todo) => {
        (await (await driver.findElement(tp.todoLabel)).getText()) ==
          "Learn to code";
      })[0]
   .findElement(tp.todoStar)
   .click();
   await driver.sleep(3000)
  let endingStars = await (await driver.findElements(tp.starBanner)).length;
   expect(endingStars).toBeGreaterThan(starButton);
  });
  
  it("has the right number of todos listed", async () => {
await driver.wait(until.elementLocated(tp.todoInput));
let startingTodoCount = await (await driver.findElements(tp.todos)).length;

await driver.findElement(tp.todoInput).sendKeys("Test To-Do 1\n");
await driver.findElement(tp.todoInput).sendKeys("Test To-Do 2\n");
await driver.findElement(tp.todoInput).sendKeys("Test To-Do 3\n");
await driver.findElement(tp.todoInput).sendKeys("Test To-Do 4\n");
await driver.findElement(tp.todoInput).sendKeys("Test To-Do 5\n");

let endingTodoCount= await (await driver.findElements(tp.todos)).length;

let message = await (await driver.findElement(tp.todoCount)).getText();

expect(endingTodoCount - startingTodoCount).toBe(5) 
expect(message).toBe(`${endingTodoCount} items left`);
  });
});
