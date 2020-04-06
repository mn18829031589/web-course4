describe('update todo', function () {
    let page;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:7001/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should change the status of item to \'completed\'', async function(){
      let todoItem = await page.waitForSelector('#todo-list li:last-child');
      let checkBtn = await todoItem.$('input');
      await checkBtn.click();
      await delay(1000);
      const status = await page.evaluate(todoItem => todoItem.className, todoItem);
      expect(status).to.eql('completed');
    })

})