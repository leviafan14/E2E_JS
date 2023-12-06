const { test, expect } = require('@playwright/test');
const {chromium} = require('playwright')
import {valid_phone_number, valid_sms_code, invalid_phone_number, invalid_sms_code} from "./auth_data";


// Открывается страница авторизации - если не авторизован или профиля - если авторизван
// В данном кейсе - страница авторизации
test('test_open_auth_page', async () => {
    const browser = await chromium.launch({headless:false, slowMo:50});
    const page = await browser.newPage();
    await page.goto('https://dev.domka.shop/');
    await page.getByLabel('Профиль').click();
    await expect(page).toHaveURL('https://dev.domka.shop/profile');
    page.close();
});


// При вооде валидного номера телефона кнопка ПОЛУЧИТЬ КОД - активна
test('test_input_valid_phone', async () =>{
    const browser = await chromium.launch({headless:false, slowMo:50});
    const page = await browser.newPage();
    await page.goto('https://dev.domka.shop/');
    await page.getByLabel('Профиль').click();
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill(valid_phone_number);
    await expect(page.getByRole('button', { name: 'ПОЛУЧИТЬ КОД' })).toBeEnabled();
    await page.close()
});


// Ввод валидного СМС кода. Кнопка ОТПРАВИТЬ КОД активна
test('test_input_valid_sms_code', async () => {
    const browser = await chromium.launch({headless: false, slowMo: 50});
    const page = await browser.newPage();
    await page.goto('https://dev.domka.shop/');
    await page.getByLabel('Профиль').click();
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill(valid_phone_number);
    await page.getByRole('button', {name: 'ПОЛУЧИТЬ КОД'}).click();
    await page.getByRole('textbox').fill(valid_sms_code);
    await expect(page.getByRole('button', {name: 'ОТПРАВИТЬ КОД'})).toBeEnabled();
    await page.close();
});


// При вводе невалидного номера телефона кнопка ПОЛУЧИТЬ КОД неактивна. Номер без 1 цифры
test('test_input_invalid_phone', async () =>{
    const browser = await chromium.launch({headless:false, slowMo:50});
    const page = await browser.newPage();
    await page.goto('https://dev.domka.shop/');
    await page.getByLabel('Профиль').click();
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill(invalid_phone_number);
    await expect(page.getByRole('button', { name: 'ПОЛУЧИТЬ КОД' })).toBeDisabled();
    await page.close();
});


// Ввод невалидного СМС кода. Кнопка ОТПРАВИТЬ КОД неактивна. Код без 1 цифры.
test('test_input_invalid_sms_code', async () => {
    const browser = await chromium.launch({headless: false, slowMo: 50});
    const page = await browser.newPage();
    await page.goto('https://dev.domka.shop/');
    await page.getByLabel('Профиль').click();
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill(valid_phone_number);
    await page.getByRole('button', {name: 'ПОЛУЧИТЬ КОД'}).click();
    await page.getByRole('textbox').fill(invalid_sms_code);
    await expect(page.getByRole('button', {name: 'ОТПРАВИТЬ КОД'})).toBeDisabled();
    await page.close();
});

