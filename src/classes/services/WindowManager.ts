import { promise } from "selenium-webdriver";
import { DomService } from "./service.class";

export class WindowManager extends DomService {
  /**
   * Maximizes the browser window preforming the test.
   */
  public static maximizeWindow(): promise.Promise<void> {
    return this.driver
      .manage()
      .window()
      .maximize();
  }
}
