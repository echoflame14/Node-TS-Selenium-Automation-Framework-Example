import { FileSystem } from "services/FileSystem";
import { WindowManager } from "services/WindowManager";
import { DriverMaker } from "./DriverMaker.class";
import { ThenableWebDriver } from "selenium-webdriver";
import { Nav } from "services/Nav";

export type TestFunction = (
  name: string,
  driver: ThenableWebDriver,
  config: any
) => {};

type result = "Passed" | Error;

export abstract class TestCase {
  constructor(
    public name: string,
    public testMethodToExecute: TestFunction,
    public config: any
  ) {}

  private getResult = async (driver: ThenableWebDriver): Promise<result> => {
    try {
      await this.testMethodToExecute(this.name, driver, this.config);
    } catch (error) {
      const errorWithTestName: Error = new Error(
        `${this.name} failed: ${error.message}`
      );
      return errorWithTestName;
    }
    return "Passed";
  };

  public execute = async () => {
    const driver = new DriverMaker().getDriver();

    await this.beforeTest(driver);

    const result: result = await this.getResult(driver);

    if (result !== "Passed") {
      await this.afterTest(driver, result);
    } else {
      await this.afterTest(driver);
    }
  };

  private beforeTest = async (driver: ThenableWebDriver) => {
    await this.beforeHooks(driver);
  };

  private afterTest = async (driver: ThenableWebDriver, error?: Error) => {
    if (error) {
      console.log(`Error in afterTest = '${error}'`);
      await FileSystem.log(this.name, error);
    } else {
      await driver.quit();
      await FileSystem.log(this.name);
    }
  };

  /**
   * Initialized the service classes that require an instance of the webdriver created in src/index.ts
   * @param {ThenableWebDriver} driver: An instance of the webdriver created in src/index.ts
   */
  private initServices = (driver: ThenableWebDriver): void => {
    Nav.init(driver);
    WindowManager.init(driver);
  };

  private beforeHooks = async (driver: ThenableWebDriver): Promise<void> => {
    this.initServices(driver);
    FileSystem.createLogFilePath();
    await WindowManager.maximizeWindow();
  };
}
