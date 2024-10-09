export const DateToISo = (date: string) => {
  if (date) {
    const split_string = date.split("-");
    const ISOString = new Date(
      `${split_string[1]}-${split_string[2]}-${split_string[0]}`,
    ).toISOString();

    return ISOString;
  }

  return new Date().toISOString();
};
