let sort = document.querySelector(".sort");
let sortIcon = document.querySelector(".sort-icon");
let input = document.querySelector(".input");
let clearInput = document.querySelector(".clear-input");
let btns = document.querySelector(".btns");
let content = document.querySelector(".content");
let plus = document.querySelector(".plus");
let add = document.querySelector(".add");
let list = document.querySelector("ul");
let siyahi = document.querySelector(".siyahi");
let trashBtn = document.querySelector("#trash");
let trashBox = document.querySelector(".trash-box");
let trashList = document.querySelector(".trash-list");
let defaultSortSrc = "./icons/artan.svg";
let sortDirection = 1;

add.addEventListener("click", addToList);
function addToList() {
  if (input.value.length > 0) {
    siyahi.style.display = "block";
    let listItem = document.createElement("li");
    list.append(listItem);
    let check = document.createElement("input");
    check.type = "checkbox";
    listItem.append(check);
    let text = document.createElement("p");
    text.innerText = input.value;
    listItem.append(text);
    let clearItemBtn = document.createElement("button");
    clearItemBtn.classList.add("clear-item-btn");
    listItem.append(clearItemBtn);
    let clearItemImg = document.createElement("img");
    clearItemImg.classList.add("clear-item-img");
    clearItemImg.src = "./icons/delete-list-item.svg";
    clearItemBtn.append(clearItemImg);
    text.innerText = input.value;
    input.style.display = "none";
    clearInput.style.display = "none";
    input.value = "";

    check.addEventListener("change", () => {
      text.classList.toggle("checked");
    });

    clearItemBtn.addEventListener("click", () => {
      listItem.remove();
      if (list.innerText == "") {
        siyahi.style.display = "none";
      }
      let trashItem = document.createElement("li");
      trashItem.classList.add("trash-item");
      trashItem.innerText = text.innerText;
      trashList.append(trashItem);
    });
  } else {
    input.focus();
  }
}

input.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    addToList();
  }
});

//sehife yenilendikde Enter e basanda inputa fokuslansin deye:
document.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    input.focus();
  }
});

plus.addEventListener("click", () => {
  input.style.display = "block";
  clearInput.style.display = "block";
  input.focus();
});

clearInput.addEventListener("click", () => {
  input.value = "";
});

let flag = true;
trashBtn.addEventListener("click", () => {
  trashBtn.classList.toggle("clicked");
  if (flag) {
    trash.classList.remove("trash");
    trash.classList.add("clicked");
    trashBox.style.display = "block";
  } else {
    trashBox.style.display = "none";
    trash.classList.remove("clicked");
    trash.classList.add("trash");
  }
  flag = !flag;
});

//SIRALAMA
function sortList() {
  const items = Array.from(list.children);
  items.sort((a, b) => {
    if (sortDirection == 1) {
      sortIcon.src = "./icons/artan.svg";
      sortIcon.addEventListener("mousemove", () => {//butona hover
        sortIcon.src = "./icons/artan-hover.svg";
      });
      sortIcon.addEventListener("mouseout", () => {
        sortIcon.src = "./icons/artan.svg";
      });
    } else {
      sortIcon.src = "./icons/azalan.svg";
      sortIcon.addEventListener("mousemove", () => {
        sortIcon.src = "./icons/azalan-hover.svg";
      });
      sortIcon.addEventListener("mouseout", () => {
        sortIcon.src = "./icons/azalan.svg";
      });
    }
    const textA = a.querySelector("p").innerText.toLowerCase();
    const textB = b.querySelector("p").innerText.toLowerCase();
    return textA.localeCompare(textB) * sortDirection;
  });

  console.log(sortDirection)

  items.forEach((item) => list.appendChild(item));
}
sort.addEventListener("click", () => {
  sortDirection *= -1;
  sortList(); 
});
