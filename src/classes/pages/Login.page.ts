import locators from "locators/home-page.locators";
import { ThenableWebDriver } from "selenium-webdriver";
import { WebPage } from "./Webpage";

export class LoginPage extends WebPage {
  constructor(protected driver: ThenableWebDriver) {
    super(driver);
  }

  private async expandHiddenLinkSectionIfNotDisplayed() {
    const style = await this.getElementAttribute(
      locators.links.hiddenHelpLinks.container,
      "style"
    );
    if (style == "display: none;") {
      await this.clickOn.needHelpSigningInBtn();
    }
  }

  public clickOn = {
    rememberMeCheckbox: async () => {
      await this.click(locators.entryFields.rememberMeCheckbox);
    },
    signInBtn: async () => {
      await this.click(locators.buttons.loginBtn);
    },
    needHelpSigningInBtn: async () => {
      await this.click(locators.buttons.needHelpSigningInBtn);
    },
    hiddenHelpLinks: {
      forgotPasswordLink: async () => {
        await this.expandHiddenLinkSectionIfNotDisplayed();
        await this.click(locators.links.hiddenHelpLinks.forgotPasswordLink);
      },
      helpLink: async () => {
        await this.expandHiddenLinkSectionIfNotDisplayed();
        await this.click(locators.links.hiddenHelpLinks.helpLink);
      }
    }
  };

  public fill = {
    username: async (textToType: string) => {
      await this.type(locators.entryFields.usernameInput, textToType);
    },
    password: async (textToType: string) => {
      await this.type(locators.entryFields.passwordInput, textToType);
    }
  };

  public assert = {
    displayed: {
      validationErrorMessaging: async () => {
        const l = locators.validationErrorMessaging;
        await this.displayCheckMultiElement([
          l.errorsFoundSection.attentionIcon,
          l.errorsFoundSection.errorMessage,
          l.usernameNotProvidedErrorSection.attentionIcon,
          l.usernameNotProvidedErrorSection.errorMessage,
          l.passwordNotProvidedSection.attentionIcon,
          l.passwordNotProvidedSection.errorMessage
        ]);
      }
    },
    textContent: {
      validationErrorMessaging: async () => {
        const l = locators.validationErrorMessaging;
        await this.checkInnerHTMLMultiElement([
          {
            locator: l.errorsFoundSection.errorMessage,
            expectedString:
              "We found some errors. Please review the form and make corrections."
          },
          {
            locator: l.usernameNotProvidedErrorSection.errorMessage,
            expectedString:
              '<span class="icon icon-16 error-16-small"></span>Please enter a username'
          },
          {
            locator: l.passwordNotProvidedSection.errorMessage,
            expectedString:
              '<span class="icon icon-16 error-16-small"></span>Please enter a password'
          }
        ]);
      }
    },
    failureExample: {
      validationErrorMessaging: async () => {
        const l = locators.validationErrorMessaging;
        await this.checkInnerHTMLMultiElement([
          {
            locator: l.errorsFoundSection.errorMessage,
            expectedString: "This will cause an error"
          },
          {
            locator: l.usernameNotProvidedErrorSection.errorMessage,
            expectedString: "This will cause an error"
          },
          {
            locator: l.passwordNotProvidedSection.errorMessage,
            expectedString: "This will cause an error"
          }
        ]);
      }
    }
  };
}
