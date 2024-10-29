export type OmitKeys<T, K extends keyof T> = Omit<T, K>;

export function filterObjectKeys<T extends object, K extends keyof T>(
  obj: T,
  ignoredKeys: K[]
): OmitKeys<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !ignoredKeys.includes(key as K))
  ) as OmitKeys<T, K>;
}
