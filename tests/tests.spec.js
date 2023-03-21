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

  // Create one expense item.
  await expenseCategory.fill(newBudgetList[0].category);
  await expenseAmount.fill(newBudgetList[0].amount.toString());
  await expenseDate.fill(newBudgetList[0].date)
  await page.getByRole('button', {name: /Submit/i }).click();

  let expenseList = await page.$('.expenseList');

  let expenseListItem = await expenseList.$('>:nth-child(1)');

  let expenseListItemCategory = await expenseListItem.$('>:nth-child(1)');
  let expenseListItemAmount = await expenseListItem.$('>:nth-child(2)');
  let expenseListItemDate = await expenseListItem.$('>:nth-child(3)');

  await expect(expenseListItemCategory.textContent()).resolves.toMatch('Cookies');
  await expect(expenseListItemAmount.textContent()).resolves.toMatch('2000kr');
  await expect(expenseListItemDate.textContent()).resolves.toMatch('2022-02-15'); 
});

test('write two new expenses', async ({ page }) => {
  // create a new expense locator
  const expenseCategory = page.getByPlaceholder('Enter category here');
  const expenseAmount = page.getByPlaceholder('Enter amount here');
  const expenseDate = page.getByPlaceholder('Enter date here (y-m-d)');

  // Create one expense item.
  await expenseCategory.fill(newBudgetList[0].category);
  await expenseAmount.fill(newBudgetList[0].amount.toString());
  await expenseDate.fill(newBudgetList[0].date)
  await page.getByRole('button', {name: /Submit/i }).click();

  let expenseList = await page.$('.expenseList');

  let expenseListItem = await expenseList.$('>:nth-child(1)');

  let expenseListItemCategory = await expenseListItem.$('>:nth-child(1)');
  let expenseListItemAmount = await expenseListItem.$('>:nth-child(2)');
  let expenseListItemDate = await expenseListItem.$('>:nth-child(3)');

  await expect(expenseListItemCategory.textContent()).resolves.toMatch('Cookies');
  await expect(expenseListItemAmount.textContent()).resolves.toMatch('2000kr');
  await expect(expenseListItemDate.textContent()).resolves.toMatch('2022-02-15'); 

  await expenseCategory.fill(newBudgetList[1].category);
  await expenseAmount.fill(newBudgetList[1].amount.toString());
  await expenseDate.fill(newBudgetList[1].date)
  await page.getByRole('button', {name: /Submit/i }).click();

  expenseList = await page.$('.expenseList');

  expenseListItem = await expenseList.$('>:nth-child(2)');

  expenseListItemCategory = await expenseListItem.$('>:nth-child(1)');
  expenseListItemAmount = await expenseListItem.$('>:nth-child(2)');
  expenseListItemDate = await expenseListItem.$('>:nth-child(3)');

  await expect(expenseListItemCategory.textContent()).resolves.toMatch('Jar Jar');
  await expect(expenseListItemAmount.textContent()).resolves.toMatch('5000kr');
  await expect(expenseListItemDate.textContent()).resolves.toMatch('2021-06-20'); 
});