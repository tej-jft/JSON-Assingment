window.onscroll = function () {
  myFunction();
};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
var ids = 11;
let resData;
var vtable = document.getElementsByTagName("tbody")[0];

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

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
  updateTableo();
  document.getElementById("id01").style.display = "none";
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
    document.getElementById("customalert").innerHTML =
      "Insuficient values to update record";
    document.getElementById("customalert").style.display = "block";
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
  let rid = ids + 1;
  let name = document.getElementById("name").value;
  let email = document.getElementById("inputEmail4").value;
  let username = document.getElementById("inputUsername").value;
  let city = document.getElementById("inputCity").value;

  let nr = {
    id: rid,
    name: name,
    username: username,
    email: email,
    address: {
      city: city,
    },
  };
  if (name === "" || email === "" || username === "" || city === "") {
    alert("Insuficient values to add record");
  } else {
    resData.push(nr);
    document.getElementById("recform").reset();
    updateTable();
  }
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
      // Do something for an error here
      console.error(err);
    });
  //console.log('exout: ',resData);
  updateTable();
}

updateTable = () => {
  localStorage.setItem("dataIn", JSON.stringify(resData));
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
    edcol.innerHTML = `<button type='button' class='btn btn-warning' onclick='updateButtonHandler(${element["id"]})' >Edit</button>`;
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
