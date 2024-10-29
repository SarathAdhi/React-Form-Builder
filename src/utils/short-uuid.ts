import ShortUniqueId from "short-unique-id";

export const shortUuid = (length = 6) => {
  const { randomUUID } = new ShortUniqueId({ length });

  return randomUUID();
};
