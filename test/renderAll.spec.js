describe('render todo', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:7001/');
    });
  
    after (async function () {
      await page.close();
    });
    
    it('should render all the item', async function(){
      for(let i = 0; i < 3; i++){
        await page.click('#new-todo', {delay: 500});
        await page.type('#new-todo', 'new todo item', {delay: 50});
        await page.keyboard.press("Enter");
      }
      let todoList = await page.waitForSelector('#todo-list');
      const itemNum = await page.evaluate(todoList => todoList.childElementCount, todoList);
      expect(itemNum).to.eql(3);
    })

})