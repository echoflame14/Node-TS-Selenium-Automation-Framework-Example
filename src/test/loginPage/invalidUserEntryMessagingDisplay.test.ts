import { TestFunction } from "classes/testCaseClasses/TestCase.class";
import { ThenableWebDriver } from "selenium-webdriver";
import { LoginPage } from "pages/Login.page";

import { Nav } from "services/Nav";

export const invalidUserEntryMessagingDisplayTest: TestFunction = async (
  testName: string,
  driver: ThenableWebDriver
) => {
  console.log(`Now Running ${testName}.`);
  await Nav.getLoginPage(driver);

  const loginPage = new LoginPage(driver);
  await loginPage.clickOn.signInBtn();

  await loginPage.assert.displayed.validationErrorMessaging();
};
