export function getErrorTranslationData(path: string, isEach = false): any {
  return ({ property, constraints }) =>
    JSON.stringify({
      path,
      data: {
        property,
        constraints,
      },
      isEach,
    });
}
