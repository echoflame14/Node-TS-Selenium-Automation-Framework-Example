import { Status } from "config/general/types.config";

export type TestResult = {
	status: Status;
	name: string;
	testrailID: string;
	elapsed: string;
	error?: Error;
};

export class TestResultMaker {
	constructor(
		private name: string,
		private testrailID: string,
		private timeElapsed: number,
		private error?: Error,
	) {}
	public getTestResult(): TestResult {
		// console.log("\n from TestResultMaker > getting test result");
		let result: TestResult = {
			status: "passed",
			name: this.name,
			testrailID: this.testrailID,
			elapsed: this.timeElapsed + "s",
		};
		if (this.error) {
			result.status = "failed";
			result.error = this.error;
			// console.log(`\n result = ${JSON.stringify(result)}\n`);
		}
		return result;
	}
}
