import { TestCase } from "classes/testCaseClasses/TestCase.class";

export abstract class Suite {
  constructor() {}

  abstract caseArr: TestCase[];

  public getCaseArr = async (): Promise<TestCase[]> => {
    return this.caseArr;
  };
}
