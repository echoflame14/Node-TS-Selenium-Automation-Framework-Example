import { DomService } from "./service.class";

export class Nav extends DomService {
  public static async getLoginPage(driver: any) {
    await driver.get("https://login.solutionreach.com/");
  }
}
