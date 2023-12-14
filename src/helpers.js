export function formatDate(date) {
  const created_at_str = date;
  const created_at_date = new Date(created_at_str);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const formatted_date = created_at_date.toLocaleDateString("en-US", options);

  return formatted_date;
}

export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

export const removeBaseUrlFromPath = (originalString) => {
  var modifiedString = originalString.replace(
    "https://seaarabia.jicitsolution.com/",
    ""
  );
  return modifiedString;
};

export const convertedDateAndTime = (datetimeString) => {
  const datetime = new Date(datetimeString);

  // Format full date
  const optionsDate = { year: "numeric", month: "short", day: "numeric" };
  const fullDate = datetime.toLocaleDateString("en-US", optionsDate);

  // Format time
  const optionsTime = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTime = datetime.toLocaleTimeString("en-US", optionsTime);
  return { fullDate, formattedTime };
};

export const removeFolderPath = (originalUrl) => {
  var substringToRemove =
    "https://seaarabia.jicitsolution.com/assets/media/company/miscellaneous/attachment/";

  var newUrl = originalUrl.replace(substringToRemove, "");
  return newUrl;
};
