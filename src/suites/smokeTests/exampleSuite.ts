import { Suite } from "../../classes/services/Suite.class";
import { TestCase } from "../../classes/testCaseClasses/TestCase.class";
import { GenericTestCase } from "../../classes/testCaseClasses/genericTestCase.class";
import { invalidUserEntryMessagingDisplayTest } from "test/loginPage/invalidUserEntryMessagingDisplay.test";
import { invalidUserEntryMessagingTextContentTest } from "test/loginPage/invalidUserEntryMessagingTextContent.test";
import { exampleOfTestCaseFailure } from "test/loginPage/exampleOfTestcaseFailure";

export class ExampleSuite extends Suite {
  constructor() {
    super();
  }

  caseArr: TestCase[] = [
    new GenericTestCase(
      "invalidUserEntryMessagingDisplayTest",
      invalidUserEntryMessagingDisplayTest
    ),
    new GenericTestCase(
      "invalidUserEntryMessagingTextContentTest",
      invalidUserEntryMessagingTextContentTest
    ),
    new GenericTestCase("exampleOfTestcaseFailure", exampleOfTestCaseFailure)
  ];
}
