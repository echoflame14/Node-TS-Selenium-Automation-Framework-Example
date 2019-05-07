import {
  LOG_FILE_PATH,
  LOGS_DIRECTORY_PATH
} from "config/general/constants.config";
import * as fs from "fs";

export class FileSystem {
  /**
   * Determines whether or not a path exist for the log files.
   * If the path does not exist, a path is created.
   */
  public static createLogFilePath(): void {
    if (!fs.existsSync(LOGS_DIRECTORY_PATH)) {
      fs.mkdirSync(LOGS_DIRECTORY_PATH);
    }

    if (!fs.existsSync(LOG_FILE_PATH)) {
      fs.writeFileSync(LOG_FILE_PATH, "");
    }
  }

  public static log(testName: string, error?: Error): void {
    let messageToLog: string;
    if (error) {
      messageToLog = `\n${testName} failed:\n Error.name = '${
        error.name
      }' \n Error.message: '${error.message}'\n error.stack: '${
        error.stack
      }'\n`;
      console.log(messageToLog);
    } else {
      messageToLog = `\n${testName} -- PASSED\n`;
    }
    fs.appendFileSync(LOG_FILE_PATH, messageToLog);
  }
}
