import {
  Locator,
  promise,
  ThenableWebDriver,
  WebElement
} from "selenium-webdriver";

import { EH } from "services/errorHandler";

export abstract class WebPage {
  /**
   * The base class that all page classes extend
   * @param {ThenableWebDriver} driver
   */
  constructor(protected driver: ThenableWebDriver) {}

  /**
   * @async
   * @param {Locator} locator
   * @returns {boolean} -- Returns a boolean promise
   */
  protected async checkIfElementIsPresent(locator: Locator): Promise<boolean> {
    try {
      let displayed;
      const element = await this.driver.findElement(locator);
      displayed = await element.isDisplayed();

      if (displayed === true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  /**
   * @async
   * @param {Locator[]} elementsToCheck
   * @desc Loops over the passed elementsToCheck array and checks if each is displayed. If the element is not displayed it will add that error to a grouped error and throw that grouped error.
   */
  public async displayCheckMultiElement(elementsToCheck: Locator[]) {
    let errorArr: Error[] = [];
    for (let i = 0; i < elementsToCheck.length; i++) {
      try {
        await this.checkIfElementIsPresent(elementsToCheck[i]);
      } catch (error) {
        errorArr.push(error);
      }
    }
    if (errorArr.length > 0) {
      let groupedError: Error = EH.combineErrArr(errorArr);
      throw groupedError;
    }
  }

  /**
   * @async
   * @param {number} timeToWait -- The amount of time for the driver to wait.
   * @desc -- Causes the driver to wait for a set period of time.
   */
  public async wait(timeToWait: number) {
    await this.driver.sleep(timeToWait);
  }

  /**
   * @desc -- Sends text to the a text field in the DOM
   * @async
   * @param {Locator} locator The text fields locator credentials
   * @param {Promise<string | number>} text The text to be sent to the DOM.
   */
  protected async type(locator: Locator, text: string | number) {
    return this.driver
      .findElement(locator)
      .then(async (element: WebElement) => {
        try {
          await element.isEnabled();
          try {
            await element.clear();
          } catch (error) {
            if (error.name !== "InvalidElementStateError") {
              throw error;
            }
          }
          await element.sendKeys(text);
        } catch (error) {
          error.message = "\n" + JSON.stringify(locator) + " " + error.message;
          if (error.name == "ElementNotVisibleError") {
            try {
              await this.scrollAndRetry(element);
              await element.sendKeys(text);
            } catch (error) {
              error.message =
                "\n" +
                JSON.stringify(locator) +
                " tryed scrolling and retrying but it didn't work: " +
                error.message;
              throw error;
            }
          } else {
            throw error;
          }
        }
      });
  }

  /**
   * @async
   * @param {Locator} locator
   * @param {Promise<string>} expectedvalue A string value that will be compared against the inner html of the element found using the passed locator.
   * @desc Throws an error if the element is either not found or does not match the expected value
   */
  public async checkInnerHTML(
    locator: Locator,
    expectedValue: string
  ): Promise<boolean> {
    return this.driver
      .findElement(locator)
      .then(async (element: WebElement) => {
        const innerHTML: string = await element.getAttribute("innerHTML");
        // console.log("innerHTML =", innerHTML);

        if (innerHTML === expectedValue) {
          console.log("checkInnerHtml method");
          return true;
        } else {
          console.log("checkInnerHtml method2");

          throw new Error(
            ` Inner HTML Not valid for element located at: '${JSON.stringify(
              locator
            )}'. Expected the Inner HTML value to be: '${expectedValue}' but got: '${innerHTML}'`
          );
        }
      });
  }

  /**
   * @desc Takes an array of locators and expected strings > loops over them > checks if the exected value of the element's inner html matches the actual value of the element's inner html and pushes an error to an array if it does not. Throws a combined error if there were any cases where the values did not line up.
   * @async
   * @param {Array<{ locator: Locator; expectedString: string }} elementsAndValuesToCheckArr An object that contains a locator value and an expectedString value.
   */
  public async checkInnerHTMLMultiElement(
    elementsAndValuesToCheckArr: Array<{
      locator: Locator;
      expectedString: string;
    }>
  ) {
    let errArr: Error[] = [];
    for (let i = 0; i < elementsAndValuesToCheckArr.length; i++) {
      console.log("loop #" + i);
      try {
        await this.checkInnerHTML(
          elementsAndValuesToCheckArr[i].locator,
          elementsAndValuesToCheckArr[i].expectedString
        );
      } catch (error) {
        errArr.push(error);
      }
    }
    if (errArr.length > 0) {
      console.log("errorArr is greater than one");
      throw EH.combineErrArr(errArr);
    }
  }

  /**
   * @async
   * @param {Locator} locator
   * @returns {Promise<string>} -- Either a string value that contains the inner html value of the found element or an error if no element is found using the passed locator.
   */
  protected async getInnerHTML(locator: Locator): Promise<string> {
    const element: WebElement = await this.driver.findElement(locator);
    const innerHTML: string = await element.getAttribute("innerHTML");
    return innerHTML;
  }

  /**
   * @async
   * @param {Locator} locator
   * @returns {Promise<string>} -- Either a string value which contains the value attribute of the element found using the passed locator or an error object if the element could not be found using the passed locator.
   */
  protected async getElementValue(locator: Locator): Promise<string> {
    const element = await this.driver.findElement(locator);
    const elementValue = await element.getAttribute("value");
    return elementValue;
  }

  /**
   * @async
   * @param locator -- The location address of the element which will have it's attribute checked.
   * @param attribute -- A string value of the particular attribute type that you want to return.
   * @returns {Promise<string>} -- A string value which it gets from the element found using the passed locator.
   */
  protected async getElementAttribute(
    locator: Locator,
    attribute: string
  ): Promise<string> {
    const element = await this.driver.findElement(locator);
    const elementValue = await element.getAttribute(attribute);
    return elementValue;
  }

  /**
   * @async
   * @param {Locator} locator -- The locator of the element to click
   * @desc -- Takes a locator and locates the element it points to, then clicks the element.
   */
  protected async click(locator: Locator): Promise<void> {
    return this.driver
      .findElement(locator)
      .then(async (element: WebElement) => {
        try {
          await element.click();
        } catch (error) {
          await this.scrollAndRetry(element);
          await element.click();
        }
      });
  }

  /**
   * @async
   * @desc -- Attempts to scroll to an element's location and preform an action. Called if an initial action fails.
   * @param {WebElement} element The WebElement to be acted against.
   * @param {string | number | undefined} text The text to be send to the DOM if the element is a text field
   */
  private async scrollAndRetry(element: WebElement): Promise<void> {
    try {
      await this.scrollToElement(element);
    } catch (error) {
      return error;
    }
  }

  /**
   * @async
   * @desc Calls the JavaScript DOM method 'scrollIntoView()'. See MDN Docs for more info: https://developer.mozilla.org/en-US/docs/Web/API/Element scrollIntoView
   * @param {WebElement} element The WebElement that will be scrolled to.
   */
  private scrollToElement(element: WebElement): promise.Promise<void> {
    return this.driver.executeScript((htmlElement: HTMLElement): void => {
      htmlElement.scrollIntoView();
    }, element);
  }

  /**
   * @async
   * @returns {Promise<string>} -- The value of the current url.
   */
  public async getCurrentUrl(): Promise<string> {
    const url: string = await this.driver.getCurrentUrl();
    return url;
  }
}
