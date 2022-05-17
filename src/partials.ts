const partialNames = [
  'header', //
  'footer',
];

export const partials: { [x: string]: string } = partialNames.reduce(
  (prev, curr) => ({ ...prev, [curr]: `/partials/${curr}.hbs` }),
  {},
);
