export function formatDate(date) {
  const created_at_str = date;
  const created_at_date = new Date(created_at_str);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const formatted_date = created_at_date.toLocaleDateString("en-US", options);

  return formatted_date;
}
export function PassingformatDate(date) {
  const created_at_str = date;
  const created_at_date = new Date(created_at_str);
  const formatted_date = `${created_at_date.getFullYear()}-${created_at_date.getMonth()+1}-${created_at_date.getDate()}`

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

export function getFileType(filePath) {
  // Extract the file extension using a regular expression
  const extension = filePath.split(".").pop().toLowerCase();

  // You can add more file types and their corresponding descriptions as needed
  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
      return "Image";
    case "pdf":
      return "PDF";
    case "doc":
    case "docx":
      return "Word Document";
    case "txt":
      return "Text File";
    case "csv":
      return "Excel File";
    case "xlsx":
      return "Excel File";
    // Add more cases for other file types as needed
    default:
      return "Unknown Type";
  }
}

export function convertHttpToHttps(url) {
  // Check if the URL starts with "http://"
  if (url.startsWith("http://")) {
    // Replace "http://" with "https://"
    return url.replace("http://", "https://");
  } else {
    // If it's already HTTPS or doesn't start with "http://", return it as is
    return url;
  }
}

export const formatDateIncludeMonth = (originalDate) => {
  // Convert the string to a Date object
  const dateObject = new Date(originalDate);

  // Define the options for formatting the date
  const options = { month: "short", day: "numeric", year: "numeric" };

  // Format the date using the options
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const formatTimeWith12Hour = (time) => {
  const inputTime = new Date(`2000-01-01 ${time}`);

  // Format the time as '05:49 PM'
  const formattedTime = inputTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return formattedTime
};
