import "chromedriver";

import { TestCase } from "classes/testCaseClasses/TestCase.class";
import { ExampleSuite } from "./suites/smokeTests/exampleSuite";

(async function main() {
  const runSuite = async function(suite: TestCase[]) {
    let arr: TestCase[] = suite;

    for (let i = 0; i < arr.length; i++) {
      await arr[i].execute();
    }
  };

  const exampleSuite: TestCase[] = await new ExampleSuite().getCaseArr();
  await runSuite(exampleSuite);

  process.exit(0);
})();
