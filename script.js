let plsbtn = document.querySelector("#addBtn");
let crdsec = document.querySelector("#cardsSection");
let formsec = document.querySelector("#formSection");
let closeBtn = document.querySelector("#closeFormBtn");

// 1. Select the main form element
const form = document.querySelector("form");

// 2. Select text inputs by ID
const imgUrlInput = document.querySelector("#imgUrl");
const fullNameInput = document.querySelector("#fullName");
const homeTownInput = document.querySelector("#homeTown");
const purposeInput = document.querySelector("#purpose");

// 3. Select radio buttons
// Select all radio buttons in the category group (returns a NodeList)
const categoryRadios = document.querySelectorAll('input[name="category"]');

// Select only the checked radio button (useful inside the submit event)
const selectedCategory = document.querySelector('input[name="category"]:checked');

// 4. Select buttons
const submitBtn = document.querySelector('button[type="submit"]');


// code starts from below 

function savetoLocalStorage(obj){

    if(localStorage.getItem("Tasks")===null){
 // 
        let oldTasks=[];
        oldTasks.push(obj);
        localStorage.setItem("Tasks",JSON.stringify(oldTasks));
    }
    else{
   let oldTasks=localStorage.getItem("Tasks");
   oldTasks=JSON.parse(oldTasks);
   oldTasks.push(obj);
   localStorage.setItem("Tasks",JSON.stringify(oldTasks));

    }

}


plsbtn.addEventListener("click", function () {
    crdsec.classList.add("Hide");
    formsec.classList.remove("Hide");
});


closeBtn.addEventListener("click", function () {
    formsec.classList.add("Hide");
    crdsec.classList.remove("Hide");
});

form.addEventListener("submit",function(dets){

    dets.preventDefault();

// below line is to check whwther the cetagory is empty or not 

    let selected_cat=false;
    categoryRadios.forEach(function(cetagory){

        if(cetagory.checked){
            selected_cat=cetagory.value;
        }

    });

    if (imgUrlInput.value.trim() === "") {
        alert("Please enter an Image URL.");
        imgUrlInput.focus();
        return ;
    }

    if (fullNameInput.value.trim() === "") {
        alert("Please enter the Full Name.");
        fullNameInput.focus();
        return ;
    }

    if (homeTownInput.value.trim() === "") {
        alert("Please enter the Home Town.");
        homeTownInput.focus();
        return ;
    }

    if (purposeInput.value.trim() === "") {
        alert("Please enter the Purpose.");
        purposeInput.focus();
        return ;
    }

    if(!selected_cat){
        alert("plzz select  one cetagory .");
        return;
    }


   savetoLocalStorage({
    imgUrl: imgUrlInput.value.trim(),
    fullName: fullNameInput.value.trim(),
    homeTown: homeTownInput.value.trim(),
    purpose: purposeInput.value.trim(),
    category: selected_cat
});
   
form.reset();
 formsec.classList.add("Hide");
crdsec.classList.remove("Hide");
showcards();

});




function showcards(){

   let alltasks = JSON.parse(localStorage.getItem("Tasks")) || [];
   let cardsStackContainer = document.querySelector(".cards-stack");
cardsStackContainer.innerHTML = "";

    // alltasks.forEach(function(task){

        

    // 1. Root Container

    let topcard=alltasks[0];

    const cardsStack = document.createElement("div");
    cardsStack.classList.add("cards-stack");

    // 2. Main Visible Card (Top)
    const cardTop = document.createElement("div");
    cardTop.classList.add("card", "card-top");

    // Avatar
    const avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.src = topcard.imgUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200";
    avatar.alt = "Avatar";

    // User Name
    const userName = document.createElement("h2");
    userName.classList.add("user-name");
    userName.textContent = topcard.fullName;

    // Info Row: Home town
    const homeTownRow = document.createElement("div");
    homeTownRow.classList.add("info-row");

    const homeTownLabel = document.createElement("span");
    homeTownLabel.classList.add("label");
    homeTownLabel.textContent = "Home town";

    const homeTownValue = document.createElement("span");
    homeTownValue.classList.add("value");
    homeTownValue.textContent = topcard.homeTown;

    homeTownRow.appendChild(homeTownLabel);
    homeTownRow.appendChild(homeTownValue);

    // Info Row: Purpose / Bookings
    const purposeRow = document.createElement("div");
    purposeRow.classList.add("info-row");

    const purposeLabel = document.createElement("span");
    purposeLabel.classList.add("label");
    purposeLabel.textContent = "Purpose";

    const purposeValue = document.createElement("span");
    purposeValue.classList.add("value");
    purposeValue.textContent = topcard.purpose;

    purposeRow.appendChild(purposeLabel);
    purposeRow.appendChild(purposeValue);

    // Action Button Group
    const btnGroup = document.createElement("div");
    btnGroup.classList.add("action-btn-group");

    const callBtn = document.createElement("button");
    callBtn.classList.add("btn", "btn-dark");
    callBtn.innerHTML = "&#128222; Call";

    const msgBtn = document.createElement("button");
    msgBtn.classList.add("btn", "btn-light");
    msgBtn.textContent = "Message";

    btnGroup.appendChild(callBtn);
    btnGroup.appendChild(msgBtn);

    // Append all elements into cardTop
    cardTop.appendChild(avatar);
    cardTop.appendChild(userName);
    cardTop.appendChild(homeTownRow);
    cardTop.appendChild(purposeRow);
    cardTop.appendChild(btnGroup);

    // 3. Stack Shadow Cards
    const layer1 = document.createElement("div");
    layer1.classList.add("card-shadow", "layer-1");

    const layer2 = document.createElement("div");
    layer2.classList.add("card-shadow", "layer-2");

    const layer3 = document.createElement("div");
    layer3.classList.add("card-shadow", "layer-3");

    // 4. Assemble Full Stack
    cardsStack.appendChild(cardTop);
    cardsStack.appendChild(layer1);
    cardsStack.appendChild(layer2);
    cardsStack.appendChild(layer3);

    cardsStackContainer.appendChild(cardsStack);

    // });

}
showcards();

//up and down buttons logic 

const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");

upBtn.addEventListener("click",function(){

    let alltasks = JSON.parse(localStorage.getItem("Tasks")) || [];

   if(alltasks.length === 0 || alltasks.length === 1 ) return;
   else{

    let tasktogobehind=alltasks[0];
    alltasks.shift();
    alltasks.push(tasktogobehind);
    localStorage.setItem("Tasks",JSON.stringify(alltasks));

    showcards();

    
   }

});

downBtn.addEventListener("click",function(){

    
    let alltasks = JSON.parse(localStorage.getItem("Tasks")) || [];

   if(alltasks.length === 0 || alltasks.length === 1 ) return;
   else{

    

    let tasktoahead=alltasks[alltasks.length-1];
    alltasks.pop();
    alltasks.unshift(tasktoahead);
    
    localStorage.setItem("Tasks",JSON.stringify(alltasks));

    showcards();
   }


});





// console.log(JSON.parse(localStorage.getItem("Tasks")));