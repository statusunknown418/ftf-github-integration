/*
 * Helper to know if a certain object is type of a generic
 */
const isTypeOf = <T extends Record<string, unknown> | unknown[]>(
  obj: Record<string, unknown> | unknown[]
): obj is T => {
  if (Object.keys(obj).every((key) => key in obj)) {
    return true
  }

  return false
}

export default isTypeOf
