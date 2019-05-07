import { Builder, ThenableWebDriver } from "selenium-webdriver";
import chrome = require("selenium-webdriver/chrome");

export class DriverMaker {
  constructor() {}

  private builder = new Builder();

  public getDriver(): ThenableWebDriver {
    const optionConfig = new chrome.Options();

    optionConfig.setChromeBinaryPath(
      "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
    );

    this.builder.setChromeOptions(optionConfig);

    const driver: ThenableWebDriver = this.builder.forBrowser("chrome").build();
    return driver;
  }
}
