export class EH {
  public static combineErrArr = (errArr: Error[]): Error => {
    let message: string = "";
    for (let i = 0; i < errArr.length; i++) {
      message += `\n Error #${i}: ${errArr[i].message} \n`;
    }
    return new Error(`Grouped errors: ${message}`);
  };
}
