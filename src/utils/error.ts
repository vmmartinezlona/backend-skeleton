export function prepareErrorMessage(error: Error): string {
  const errPrefix = "Error: ";

  if (error.message.startsWith(errPrefix)) {
    return error.message.slice(error.message.indexOf(errPrefix));
  }

  return error.message;
}
