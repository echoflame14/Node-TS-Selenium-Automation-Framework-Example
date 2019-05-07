import { TestCase, TestFunction } from "classes/testCaseClasses/TestCase.class";

export class GenericTestCase extends TestCase {
  constructor(name: string, testMethodToExecute: TestFunction, config?: {}) {
    super(name, testMethodToExecute, config);
  }
}
