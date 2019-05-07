import { TestFunction } from "classes/testCaseClasses/TestCase.class";
import { ThenableWebDriver } from "selenium-webdriver";
import { Nav } from "services/Nav";
import { LoginPage } from "pages/Login.page";

export const invalidUserEntryMessagingTextContentTest: TestFunction = async (
  testName: string,
  driver: ThenableWebDriver
) => {
  console.log(`Now Running ${testName}.`);
  await Nav.getLoginPage(driver);

  const loginPage = new LoginPage(driver);
  await loginPage.clickOn.signInBtn();

  await loginPage.assert.textContent.validationErrorMessaging();
};
