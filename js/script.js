window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

let resData;
var vtable=document.getElementsByTagName('tbody')[0];

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

function deleteRecord(id){
  delete resData[id];
  console.log[resData];
}
function editModal(){



}

function addRecord(){
  alert("invoked");
  let rid=document.getElementById("rid").value;
  let name=document.getElementById("name").value;
  let email=document.getElementById("inputEmail4").value;
  let username=document.getElementById("inputUsername").value;
  let city=document.getElementById("inputCity").value;

  let nr ={
    "id":rid,
    "name":name,
    "username":username,
    "email":email,
    "address":{
    "city":city,
    }
  };
  console.log(nr);
  resData.push(nr);
  //console.log(resData);
  document.getElementById("recform").reset();
  updateTable();
}

function delModal(){

  return "<div class='modal fade' id='exampleModalCenter' tabindex='-1' role='dialog' aria-labelledby='exampleModalCenterTitle' aria-hidden='true'><div class='modal-dialog modal-dialog-centered' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title' id='exampleModalLongTitle'>Modal title</h5><button type='button' class='close' data-dismiss='modal' aria-label='Cancel'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'>Confirm Delete</div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button><button type='button' class='btn btn-primary' id='${$element['name']}' onclick='deleteRecord(id)'>Confirm Delete</button></div></div></div></div>";


}
let tabBody=()=>{

}
async function getData(){
    await fetch('https://jsonplaceholder.typicode.com/users').then(response => {
      return response.json();
    }).then(data => {
      // Work with JSON data here
      resData=data;
      //console.log('inout',resData);
    }).catch(err => {
      // Do something for an error here
      console.error(err);
    });
    //console.log('exout: ',resData);
    updateTable();
}

updateTable=()=>{
  localStorage.setItem("dataIn",JSON.stringify(resData));
  let revList=localStorage.getItem("dataIn");
  let compdata=JSON.parse(revList);
  console.log(compdata);
  resData=compdata;
  vtable.innerHTML="";
  compdata.forEach(element => {
    let row=document.createElement('tr');
    let icol=document.createElement('td');
    let ncol=document.createElement('td');
    let uncol=document.createElement('td');
    let ecol=document.createElement('td');
    let mcol=document.createElement('td');
    let edcol=document.createElement('td');
    let decol=document.createElement('td');

    icol.innerHTML=element['id'];
    ncol.innerHTML=element['name'];
    uncol.innerHTML=element['username'];
    ecol.innerHTML=element['email'];
    mcol.innerHTML=element['address']['city'];
    edcol.innerHTML="<button type='button' class='btn btn-warning' onclick='editModal();' >Edit</button>";
    decol.innerHTML=`<button type='button' class='btn btn-danger' data-toggle='modal' data-target='#exampleModalCenter' id='${element['id']}' >Delete</button>` + delModal();

    row.appendChild(icol);
    row.appendChild(ncol);
    row.appendChild(uncol);
    row.appendChild(ecol);
    row.appendChild(mcol);
    row.appendChild(edcol);
    row.appendChild(decol);
    vtable.appendChild(row);
  });
}

