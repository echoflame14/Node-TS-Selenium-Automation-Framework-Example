import { Locator, promise, ThenableWebDriver, WebElement } from "selenium-webdriver";

export abstract class DomService {
	protected static driver: ThenableWebDriver;

	/**
	 * Assigns the designated webdriver to a local property for use in static methods.
	 * @param driver The instance ThenableWebDriver being used for testing
	 */
	public static init(driver: ThenableWebDriver): void {
		this.driver = driver;
	}

	/**
	 * Sends text to the a text field in the DOM
	 * @param {Locator} locator The text fields locator credentials
	 * @param {string | number} text The text to be sent to the DOM.
	 */
	protected static async type(locator: Locator, text: string | number): Promise<void> {
		return this.driver.findElement(locator).then(async (element: WebElement) => {
			try {
				await element.clear();
				await element.sendKeys(text);
			} catch {
				await this.scrollAndRetry(element, text);
			}
		});
	}

	/**
	 * Selects an options from a dropdown menu on the DOM
	 * @param {Locator} locator The dropdown menu's locator credentials
	 * @param {string} text The text of the desired option
	 */
	protected static async select(locator: Locator, text: string): Promise<void> {
		return this.driver.findElement(locator).then(async (element: WebElement) => {
			try {
				await element.sendKeys(text);
			} catch {
				await this.scrollAndRetry(element, text);
			}
		});
	}

	/**
	 * Click any element on the DOM
	 * @param {Locator} locator The element's locator credentials.
	 */
	protected static async click(locator: Locator): Promise<void> {
		return this.driver.findElement(locator).then(async (element: WebElement) => {
			try {
				await element.click();
			} catch {
				await this.scrollAndRetry(element);
			}
		});
	}

	/**
	 * Attempt to scroll to an elements location and preform an action.
	 * Called if an initial action fails.
	 * @param {WebElement} element The WebElement to be acted against.
	 * @param {string | number | undefined} text The text to be send to the DOM if the element is a text field
	 */
	private static async scrollAndRetry(element: WebElement, text?: string | number): Promise<void> {
		try {
			await this.scrollToElement(element);
			return text ? element.sendKeys(text) : element.click();
		} catch (error) {
			// FileSystem.logError(error);
			return error;
		}
	}

	/**
	 * Calls the JavaScript DOM method 'scrollIntoView()'
	 * See MDN Docs for more info: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
	 * @param {WebElement} element The WebElement that will be scrolled to.
	 */
	private static scrollToElement(element: WebElement): promise.Promise<void> {
		return this.driver.executeScript((htmlElement: HTMLElement): void => {
			htmlElement.scrollIntoView();
		}, element);
	}
}
