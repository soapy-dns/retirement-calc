class ValidationError extends Error {
  public type: string

  constructor(message: string) {
    super(message)
    this.type = "ValidationError"
  }
}
