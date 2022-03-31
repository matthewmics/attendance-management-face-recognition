import moment from "moment";

const tokenName = "facerecog2_sanctum_token";

const getToken = () => window.localStorage.getItem(tokenName);

const setToken = (token) => window.localStorage.setItem(tokenName, token);

const clearToken = () => window.localStorage.removeItem(tokenName);

const dateStringToLocal = (date, format = "LLL") => {
  var stillUtc = moment.utc(date).toDate();
  // return moment(stillUtc).local().format("YYYY-MM-DD hh:mm:ss");
  return moment(stillUtc).local().format(format);
};

const dateStringToLocalDate = (date, format = "LLL") => {
  var stillUtc = moment.utc(date).toDate();
  // return moment(stillUtc).local().format("YYYY-MM-DD hh:mm:ss");
  return moment(stillUtc).local().format("YYYY-MM-DD");
};

const utcTimeToLocal = (time) => {
  let timeArray = time.split(":");

  var stillUtc = moment.utc().set({ hour: timeArray[0], minute: timeArray[1] });
  // return moment(stillUtc).local().format("YYYY-MM-DD hh:mm:ss");
  // console.log(stillUtc.toString());
  return moment(stillUtc).local().format("HH:mm");
};

const localTimeToUTC = (time) => {
  let timeArray = time.split(":");

  var stillLocal = moment().set({
    hour: timeArray[0],
    minute: timeArray[1],
    second: 0,
  });
  // return moment(stillUtc).local().format("YYYY-MM-DD hh:mm:ss");
  // console.log(stillUtc.toString());
  return moment(stillLocal).utc().format("HH:mm:ss");
};

const toMoney = (price) => {
  return "₱" + price.toFixed(2);
};

const titleCase = (str) => {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
};

export {
  getToken,
  setToken,
  clearToken,
  dateStringToLocal,
  toMoney,
  titleCase,
  utcTimeToLocal,
  dateStringToLocalDate,
  localTimeToUTC,
};
