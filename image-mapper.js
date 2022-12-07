let display_box = document.getElementById("img-box");
let display_pro = document.getElementById("img-pro");
let display_image = document.createElement("img");

// funtion for upload image
function loadFile(event) {
  // load image in html
  display_image.src = URL.createObjectURL(event.target.files[0]);
  display_image.setAttribute("id", "img-added");
  display_box.appendChild(display_image);

  // add properties for image
  const n_width = display_image.clientWidth;
  const n_height = display_image.clientHeight;
  const mime_type = event.target.files[0].type;
  const name = event.target.files[0].name;
  const para = document.createElement("p");
  para.innerText = `Image Name: ${name} \n 
                    Dimensions: ${n_width} X ${n_height} \n
                    MIME Type: ${mime_type}`;
  display_pro.appendChild(para);
}

// function for add description on click image
display_image.addEventListener("click", function (event) {
  let xpos = event.offsetX;
  let ypos = event.offsetY;

  // popup for enter description
  const popup = document.getElementById("popup");
  popup.style.display = "flex";
  popup.style.left = xpos + "px";
  popup.style.top = ypos + "px";

  // event for get input value
  let desc = "";
  const input = document.getElementById("description_text");
  input.addEventListener("change", function (event) {
    desc = event.target.value;
  });

  // save description or input text
  const btn_save = document.getElementById("btn-save");
  btn_save.addEventListener("click", function () {
    if (desc?.length > 0) {
      saveData(xpos, ypos, desc); // call function for save data

      // close popup after save value and empty input value
      desc = "";
      xpos = "";
      ypos = "";
      input.value = "";
      popup.style.display = "none";
    } else {
      alert("please enter descripion");
    }
  });

  // cancel / close popup
  const btn_cancel = document.getElementById("btn-cancel");
  btn_cancel.addEventListener("click", function () {
    desc = "";
    xpos = "";
    ypos = "";
    input.value = "";
    popup.style.display = "none";
  });
});

function saveData(xpos, ypos, desc) {
  const obj = {
    xpx: xpos,
    ypx: ypos,
    dval: desc,
  };
  addTableData(obj); // call function for display table data
}

// declare function for display table data
function addTableData(obj) {
  let mData = [];
  mData.push(obj);
  const newData = mData.filter((v) => v.xpx != "");
  var columns = "<tbody>";
  for (var i = 0; i < newData.length; i++) {
    columns += "<tr>";
    columns += "<td>" + (newData[i].xpx + " px") + "</td>";
    columns += "<td>" + (newData[i].ypx + " px") + "</td>";
    columns += "<td>" + newData[i].dval + "</td>";
    columns += "</tr>";
  }
  columns += "</tbody>";
  var dTable = document.createElement("table");
  dTable.innerHTML = columns;
  const dsTable = document.getElementById("dsTable");
  if (dTable.rows.length) {
    dsTable.appendChild(dTable);
  }

  // Display a red dot on the image
  if (obj.xpx != "") {
    const red_circle = document.createElement("span");
    red_circle.setAttribute("class", "red_circle");
    red_circle.style.position = "absolute";
    red_circle.style.left = obj.xpx + "px";
    red_circle.style.top = obj.ypx + "px";
    const hover_text = document.createElement("span");
    hover_text.setAttribute("class", "hov-text");
    hover_text.innerText = obj.dval;
    red_circle.appendChild(hover_text);
    display_box.appendChild(red_circle);
  }
}
