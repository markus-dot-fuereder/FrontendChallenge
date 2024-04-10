export default class EmployeeIdParser {
  public static parse(value: string): number | undefined {
    try {
      return parseInt(value);
    } catch {
      return undefined;
    }
  }
}
