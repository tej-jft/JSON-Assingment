window.onscroll = function () {
  myFunction();
};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
let ids = 11;
let resData;
var vtable = document.getElementById("addRow");
var reccount = 0;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

countREC = () => {
  document.getElementById("rcount").innerHTML = reccount;
};

let deleteRecord = () => {
  try {
    let deleteId = document.getElementById("recordId").value;
    let dataIn = JSON.parse(localStorage.getItem("dataIn"));
    const filteredRecord = dataIn.filter((data) => data.id == deleteId);
    const indexOfItemToDelete = dataIn.indexOf(filteredRecord[0]);
    dataIn.splice(indexOfItemToDelete, 1);
    localStorage.setItem("dataIn", JSON.stringify(dataIn));
  } catch (error) {
    console.log(error);
  }
  reccount--;
  updateTableo();
  document.getElementById("id01").style.display = "none";
  countREC();
};

let updRecord = () => {
  let updateId = document.getElementById("upRecordId").value;
  let dataIn = JSON.parse(localStorage.getItem("dataIn"));
  const filteredRecord = dataIn.filter((data) => data.id == updateId);
  const indexOfItemToUpdate = dataIn.indexOf(filteredRecord[0]);

  let name = document.getElementById("updatename").value;
  let email = document.getElementById("updateEmail").value;
  let username = document.getElementById("updateUsername").value;
  let city = document.getElementById("updateCity").value;
  if (name === "" || email === "" || username === "" || city === "") {
    document.getElementById("alertselector").value = "upmdl";
    modalmessage("Insufficient values to update record");
  } else if (!emailvalidation(email)) {
    modalmessage("Invalid email Retry");
  } else {
    dataIn[indexOfItemToUpdate].name = document.getElementById(
      "updatename"
    ).value;
    dataIn[indexOfItemToUpdate].email = document.getElementById(
      "updateEmail"
    ).value;
    dataIn[indexOfItemToUpdate].username = document.getElementById(
      "updateUsername"
    ).value;
    dataIn[indexOfItemToUpdate].address.city = document.getElementById(
      "updateCity"
    ).value;
    localStorage.setItem("dataIn", JSON.stringify(dataIn));

    updateTableo();
    document.getElementById("upmdl").style.display = "none";
  }
};

function addRecord() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let username = document.getElementById("username").value;
  let city = document.getElementById("city").value;

  let nr = {
    id: ids,
    name: name,
    username: username,
    email: email,
    address: {
      city: city,
    },
  };
  if (name === "" || email === "" || username === "" || city === "") {
    document.getElementById("alertselector").value = "addmdl";
    modalmessage("Insufficient values to add record");
    return;
  } else if (!emailvalidation(email)) {
    modalmessage("Invalid email Retry");
    return;
  } else {
    resData.push(nr);
    document.getElementById("recform").reset();
    reccount++;
    ids++;
    updateTable();
  }
  document.getElementById("addmdl").style.display = "none";
  countREC();
}

async function getData() {
  await fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      resData = data;
    })
    .catch((err) => {
      document.getElementById("alertselector").value = "addmdl";
      modalmessage("Insufficient values to add record");
      // Do something for an error here
      console.error(err);
    });
  //console.log('exout: ',resData);
  updateTable();
}

updateTable = () => {
  localStorage.setItem("dataIn", JSON.stringify(resData));
  updateTableo();
  //countREC();
};

updateTableo = () => {
  //localStorage.setItem("dataIn", JSON.stringify(resData));
  let revList = localStorage.getItem("dataIn");
  let compdata = JSON.parse(revList);
  resData = compdata;
  vtable.innerHTML = "";
  let i = 1;
  reccount = 0;
  compdata.forEach((element) => {
    reccount++;
    let row = document.createElement("div");
    row.classList.add("row", "center", "bottomrow");

    let sncol = document.createElement("div");
    sncol.classList.add("col-md-1", "no-gutter", "emcol", "align-text-center");
    let snColProp = document.createElement("p");
    let snColText = document.createTextNode(i++);
    snColProp.appendChild(snColText);
    sncol.appendChild(snColProp);

    let ncol = document.createElement("div");
    ncol.classList.add("col-md-2", "no-gutter", "emcol", "align-text-center");
    let nColProp = document.createElement("p");
    let nColText = document.createTextNode(element["name"]);
    nColProp.appendChild(nColText);
    ncol.appendChild(nColProp);

    let uncol = document.createElement("div");
    uncol.classList.add("col-md-2", "no-gutter", "emcol", "align-text-center");
    let unColProp = document.createElement("p");
    let unColText = document.createTextNode(element["username"]);
    unColProp.appendChild(unColText);
    uncol.appendChild(unColProp);

    let ecol = document.createElement("div");
    ecol.classList.add("col-md-3", "no-gutter", "emcol", "align-text-center");
    let eColProp = document.createElement("p");
    let eColText = document.createTextNode(element["email"]);
    eColProp.appendChild(eColText);
    ecol.appendChild(eColProp);

    let adcol = document.createElement("div");
    adcol.classList.add("col-md-2", "no-gutter", "emcol", "align-text-center");
    let adColProp = document.createElement("p");
    let adColText = document.createTextNode(element["address"]["city"]);
    adColProp.appendChild(adColText);
    adcol.appendChild(adColProp);

    let edcol = document.createElement("div");
    edcol.classList.add("col-md-1", "no-gutter", "emcol", "align-text-center");
    let edb = document.createElement("button");
    edb.style.background = "none";
    edb.classList.add("edb");
    edb.setAttribute("id", element["id"]);
    let a = element["id"];
    edb.setAttribute("onclick", `updateButtonHandler(${a})`);
    let edProp = document.createElement("i");
    edProp.classList.add("fas", "fa-pencil-alt");
    edb.appendChild(edProp);
    edcol.appendChild(edb);

    let decol = document.createElement("div");
    decol.classList.add(
      "col-md-1",
      "no-gutter",
      "emcol",
      "align-text-center",
      "f786"
    );
    let delB = document.createElement("button");
    delB.style.background = "none";
    delB.classList.add("edb");
    delB.setAttribute("id", a);
    delB.setAttribute("onclick", `deleteButtonHandler(${a})`);
    let deColProp = document.createElement("i");
    deColProp.classList.add("far", "fa-trash-alt");
    delB.appendChild(deColProp);
    decol.appendChild(delB);

    row.appendChild(sncol);
    row.appendChild(ncol);
    row.appendChild(uncol);
    row.appendChild(ecol);
    row.appendChild(adcol);
    row.appendChild(edcol);
    row.appendChild(decol);
    vtable.appendChild(row);
  });
  countREC();
};

//For Delete Modal
// Get the modal
var modal = document.getElementById("id01");
// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//manipulations for deletions
deleteButtonHandler = (recordId) => {
  document.getElementById("id01").style.display = "block";
  document.getElementById("recordId").value = recordId;
};

//For update model
var updmodal = document.getElementById("updmdl");
// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == updmodal) {
    updmodal.style.display = "none";
  }
};

//manipulations for updation
updateButtonHandler = (uprecordId) => {
  document.getElementById("upmdl").style.display = "block";
  document.getElementById("upRecordId").value = uprecordId;
  let updateId = uprecordId;
  let dataIn = JSON.parse(localStorage.getItem("dataIn"));
  const filteredRecord = dataIn.filter((data) => data.id == updateId);
  const indexOfItemToDelete = dataIn.indexOf(filteredRecord[0]);
  document.getElementById("updatename").value =
    dataIn[indexOfItemToDelete].name;
  document.getElementById("updateEmail").value =
    dataIn[indexOfItemToDelete].email;
  document.getElementById("updateUsername").value =
    dataIn[indexOfItemToDelete].username;
  document.getElementById("updateCity").value =
    dataIn[indexOfItemToDelete].address.city;
};

var cumodal = document.getElementById("customalert");
// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == cumodal) {
    modal.style.display = "none";
  }
};

//For Add Modal
//For update model
var addmodal = document.getElementById("addmdl");
// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == addmodal) {
    addmodal.style.display = "none";
  }
};

//Alert Modal
// Get the modalalert
var modalalert = document.getElementById("modalalert");

// Get the button that opens the modalalert
var btn = document.getElementById("modalBtn");

// When the user clicks on <span> (x), close the modalalert
//document.getElementById("clo").onclick = function () {
//modalalert.style.display = "none";
//};

// When the user clicks anywhere outside of the modalalert, close it
window.onclick = function (event) {
  if (event.target == modalalert) {
    modalalert.style.display = "none";
  }
};
//Set message
function modalmessage(txtmessage) {
  document.getElementById("message").innerHTML = txtmessage;
  modalalert.style.display = "block";
}
function back() {
  modalalert.style.display = "none";
  document.getElementById(
    document.getElementById("alertselector").value
  ).style.display = "block";
}
//End of Alert Modal

// email validation
let emailvalidation = (email) => {
  let exp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+/;
  if (email.match(exp)) return true;
  else return false;
};
//end of email validation
