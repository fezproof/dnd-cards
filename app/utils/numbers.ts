const modNumberFormatter = new Intl.NumberFormat(undefined, {
  signDisplay: "always",
});

export const numberWithMod = (value: number) => {
  return modNumberFormatter.format(value);
};
