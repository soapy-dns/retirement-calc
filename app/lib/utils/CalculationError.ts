export class CalculationError extends Error {
  public type: string

  constructor(message: string) {
    super(message)
    this.type = "CalculationError"
  }
}
