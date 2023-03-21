const { test, expect } = require('@playwright/test');

//https://nikell97.github.io/frontend-assignment-budget/

test.beforeEach(async ({ page }) => {
  await page.goto('https://nikell97.github.io/frontend-assignment-budget/');
});

let newBudgetList = [
    { category: "Cookies", amount: 2000, date: "2022-02-15" },
    { category: "Jar Jar", amount: 5000, date: "2021-06-20" }
];

test('write one new expense', async ({ page }) => {
  // create a new expense locator
  const expenseCategory = page.getByPlaceholder('Enter category here');
  const expenseAmount = page.getByPlaceholder('Enter amount here');
  const expenseDate = page.getByPlaceholder('Enter date here (y-m-d)');

  // Create one todo item.
  await expenseCategory.fill(newBudgetList[0].category);
  await expenseAmount.fill(newBudgetList[0].amount);
  await expenseDate.fill(newBudgetList[0].date)
  await page.get('button', {name: /submit/i }).click();

  let noteList = await page.$('.note-list');

  let noteListItem = await noteList.$('li');

  let noteListItemText = await noteListItem.$('>:nth-child(2)');

  await expect(noteListItemText.textContent()).resolves.toMatch('a');
});