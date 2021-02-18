window.onscroll = function () {
  myFunction();
};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

let resData;
var vtable = document.getElementsByTagName("tbody")[0];

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

function deleteRecord() {
  delete resData[id];
  console.log[resData];
}
function updRecord() {}

function addRecord() {
  let rid = document.getElementById("rid").value;
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
  console.log(nr);
  if (
    rid === "" ||
    name === "" ||
    email === "" ||
    username === "" ||
    city === ""
  ) {
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
      //console.log('inout',resData);
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
  console.log(compdata);
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
    edcol.innerHTML = `<button type='button' class='btn btn-warning' onclick='updButtonHandler(${element["id"]})' >Edit</button>`;
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
updateButtonHandler = (recordId) => {
  document.getElementById("upmdl").style.display = "block";
  document.getElementById("upRecordId").value = recordId;
};
