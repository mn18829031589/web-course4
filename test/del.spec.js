describe('del todo', function () {
    let page;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:7001/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should delete the item', async function(){

      let todoList = await page.waitForSelector('#todo-list');
      let todoItem = await todoList.$('li:last-child');
      let deleteBtn = await todoItem.$('button');
      let react_id = await page.evaluate(todoItem => todoItem.getAttribute('data-reactid'), todoItem);
      await todoItem.hover();
      await deleteBtn.click();
      await delay(2000);
      let todoItemDeleted = await page.$('#todo-list li[data-reactid=\'' + react_id + '\']');
      expect(todoItemDeleted).to.eql(null);
    });
})