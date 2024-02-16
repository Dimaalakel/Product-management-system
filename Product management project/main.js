let title = document.getElementById("title");
let price = document.getElementById("price");
let Taxes = document.getElementById("Taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let Total= document.getElementById("Total");
let count= document.getElementById("count");
let Category= document.getElementById("Category");
let submit= document.getElementById("submit");

let mood = "create";
let tmp;


//get total
function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +Taxes.value + +ads.value) - +discount.value;
        Total.innerHTML= result;
        Total.style.background = "#040"; 
    }else{
        Total.innerHTML= "";
        Total.style.background = "#c25050";
    }

}

//Creat product
let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}

submit.onclick = function(){
    let newpro ={
         title:title.value.toLowerCase(),
         price:price.value,
         ads:ads.value,
         discount:discount.value,
         Total:Total.innerHTML,
         count:count.value,
         Category:Category.value.toLowerCase()
    }

    if (mood === "create" ){
        if(newpro.count> 1){
            for(let i = 0; i<newpro.count; i++)
            datapro.push(newpro)
        }else{
            datapro.push(newpro)
        }
    }
    else{
        datapro[  tmp  ] = newpro;
        mood = "create";
        submit.innerHTML ="create";
        count.style.display= "block";
    }

    //save localstorge
    localStorage.setItem("product", JSON.stringify(datapro))
    ShowData()
    clearData()
    
}




//clear inputs
function clearData(){
title.value = "";
price.value = "";
ads.value = "";
discount.value = "";
Total.value = "";
count.value = "";
Taxes.value = "";
Category.value = "";
Total.innerHTML = "";
}

//read
function ShowData(){
getTotal()
 let table = ``;
 for(let i=0; i<datapro.length; i++){
    table += `
    <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].Taxes}</td>
    <td>${datapro[i].Total}</td>
    <td>${datapro[i].Category}</td>
    <td>
    <button onclick="updateData(${i})" id="update">update</button>
    </td>

    <td>
    <button onclick= "DeletData( ${i} )" id="Delete">Delete</button>
    </td>
</tr>`
 }
    document.getElementById("tdoby").innerHTML = table;

}
ShowData()


//delete
function DeletData(i){
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    ShowData()
}

//update
function updateData(i){
 title.value = datapro[i].title;
 price.value = datapro[i].price;
 Taxes.value = datapro[i].Taxes;
 ads.value = datapro[i].ads;
 discount.value = datapro[i].discount;
 Category.value = datapro[i].Category;
 getTotal();
 count.style.display = "none";
 submit.innerHTML= "update";
 mood = "update";
 tmp= i;
 scroll({
    top:0,
    behavior:"smooth"
 })


}

//search
let search = document.getElementById('search');
let searchMood = 'title';
function getsearchMood(id){
    if(id=='searchTaitle'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
        
    }
    search.placeholder ='search By ' +searchMood;
    search.focus()
    search.value = '';
    ShowData()
}

function searchData(value){
    let table ='';
    if(searchMood == 'title'){
        for(let i=0; i<datapro.length; i++){
            if(datapro[i].title.includes(value.toLowerCase())){
                table += `
    <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].Taxes}</td>
    <td>${datapro[i].Total}</td>
    <td>${datapro[i].Category}</td>
    <td>
    <button onclick="updateData(${i})" id="update">update</button>
    </td>

    <td>
    <button onclick= "DeletData( ${i} )" id="Delete">Delete</button>
    </td>
</tr>`
            }
        }
    }
    else{
        for(let i=0; i<datapro.length; i++){
            if(datapro[i].Category.includes(value.toLowerCase())){
                table += `
    <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].Taxes}</td>
    <td>${datapro[i].Total}</td>
    <td>${datapro[i].Category}</td>
    <td>
    <button onclick="updateData(${i})" id="update">update</button>
    </td>
    <td>
    <button onclick= "DeletData( ${i} )" id="Delete">Delete</button>
    </td>
</tr>`   
            }
        }  
    }
    document.getElementById("tdoby").innerHTML = table;
}

//clean data
