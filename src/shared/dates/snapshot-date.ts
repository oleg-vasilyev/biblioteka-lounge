export const formatSnapshotDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("-");

  if (year === undefined || month === undefined || day === undefined) {
    throw new Error(`A snapshot date must be ISO yyyy-mm-dd, got: ${isoDate}`);
  }

  return [day, month, year].join(".");
};
