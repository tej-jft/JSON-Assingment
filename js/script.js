window.onscroll = function () {
  myFunction();
};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
let ids = 10;
let resData;
var vtable = document.getElementsByTagName("tbody")[0];
var reccount = 10;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

countREC = () => {
  document.getElementById("count").innerHTML = reccount;
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
    modalmessage("Insuficient values to update record");
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
    modalmessage("Insuficient values to add record");
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

let tabBody = () => {};
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
      modalmessage("Insuficient values to add record");
      // Do something for an error here
      console.error(err);
    });
  //console.log('exout: ',resData);
  updateTable();
}

updateTable = () => {
  localStorage.setItem("dataIn", JSON.stringify(resData));
  updateTableo();
  countREC();
};

updateTableo = () => {
  //localStorage.setItem("dataIn", JSON.stringify(resData));
  let revList = localStorage.getItem("dataIn");
  let compdata = JSON.parse(revList);
  resData = compdata;
  vtable.innerHTML = "";
  compdata.forEach((element) => {
    let row = document.createElement("tr");
    let icol = document.createElement("td");
    let ncol = document.createElement("td");
    let uncol = document.createElement("td");
    let ecol = document.createElement("td");
    let mcol = document.createElement("td");
    let edcol = document.createElement("td");
    let decol = document.createElement("td");

    icol.innerHTML = element["id"];
    ncol.innerHTML = element["name"];
    uncol.innerHTML = element["username"];
    ecol.innerHTML = element["email"];
    mcol.innerHTML = element["address"]["city"];
    edcol.innerHTML = `<button type='button' class='btn btn-warning' onclick='updateButtonHandler(${element["id"]})' id='${element["id"]}'>Edit</button>`;
    decol.innerHTML = `<button type='button' class='btn btn-danger' onclick='deleteButtonHandler(${element["id"]})' id='${element["id"]}' >Delete</button>`;

    row.appendChild(icol);
    row.appendChild(ncol);
    row.appendChild(uncol);
    row.appendChild(ecol);
    row.appendChild(mcol);
    row.appendChild(edcol);
    row.appendChild(decol);
    vtable.appendChild(row);
  });
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

//manipulations for deletions
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
document.getElementById("clo").onclick = function () {
  modalalert.style.display = "none";
};

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
