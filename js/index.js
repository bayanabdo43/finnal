let categoryData = [];
let areaData = [];
let ingredientsData = [];
let mealData =[];
let mealId =[];
let meal =[];
let cartona = ``;
let idMeal ="";
var regex ={
    nameInput :/^[a-zA-Z ]+$/,
    emailInput : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phoneInput : /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    ageInput : /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
    passwordInput : /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
}

////////// Open & close Side //////////
$(".nav-header #iconn").on("click", function () {
    if ($("aside .navv").css("left") == "0px") {
        $("aside .navv").animate({ left: `${$(".nav-menu").innerWidth()}px` }, 1000);
        $("nav-header #iconn").removeClass("fa-bars");
        $("nav-header #iconn").addClass("fa-xmark"); 
    } else {
        $("aside .navv").animate({ left: `0px` }, 1000);
        $("nav-header #iconn").removeClass("fa-xmark");
        $("nav-header #iconn").addClass("fa-bars");  
        // $("nav-header #iconn").attr("class","fa-solid fa-bars")
    }
    $(".navv ul li").slideDown(1000);
})
///////////// home ////////////
async function getMealId() {
    let resId = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood");
    let finalResId = await resId.json();
    for(var i =0;i<finalResId.meals.length ;i++){
        finalResId.meals[i].idMeal;
        mealId.push(finalResId.meals[i].idMeal)
    }
    getMealData()
}
getMealId()
async function getMealData() {
    for (let i = 0; i < mealId.length; i++) {
        let resMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId[i]}`);
        let finalResMeal = await resMeal.json();
        meal = finalResMeal.meals;
        idMeal = mealId[i]
        displayMeals()
    }
}
function displayMeals() {
    for (let i = 0; i < meal.length; i++) {
        cartona += `<div onclick="descMeal(${i})" class="cardd descMeal col-12 col-md-6 col-lg-3">
                        <div class="position-relative">
                            <div class"">
                                <img src="${meal[i].strMealThumb}" class="w-100" alt=""> 
                            </div>
                            <div class="maelName bg-white bg-opacity-75 d-flex align-items-center position-absolute text-center p-3">
                                <h2>${meal[i].strMeal}</h2>
                            </div>
                        </div>
                            
                    </div>`
    }
    document.querySelector("#myData").innerHTML = cartona;
}
function descMeal(i){
    let cartona = ``;
    cartona +=`<div class="col-12 col-md-4 text-white">
                <img src="${meal[i].strMealThumb}" class="w-100" alt="">
                <h2 class="p-2">${meal[i].strMeal}</h2>
            </div>
            <div class="col-12 col-md-8 text-white">
                <h3 class="p-2">Instructions</h3>
                <p class="p-2">${meal[i].strInstructions}</p>
                <h4 class="p-2">Area : ${meal[i].strArea}</h4>
                <h4 class="p-2">Category : ${meal[i].strMeal}</h4>
                <div>
                    <h4 class="p-2">Recipes :</h4>
                    <span class="text-dark rounded-4 p-2 bg-primary-subtle m-2">${meal[i].strMeasure1}</span>
                    <span class="text-dark rounded-4 p-2 bg-primary-subtle m-2">${meal[i].strMeasure2}</span>
                    <span class="text-dark rounded-4 p-2 bg-primary-subtle m-2">${meal[i].strMeasure3}</span>
                    <span class="text-dark rounded-4 p-2 bg-primary-subtle m-2">${meal[i].strMeasure4}</span>
                    <span class="text-dark rounded-4 p-2 bg-primary-subtle m-2">${meal[i].strMeasure5}</span>
                    <span class="text-dark rounded-4 p-2 bg-primary-subtle m-2">${meal[i].strMeasure6}</span>
                    <span class="text-dark rounded-4 p-2 bg-primary-subtle m-2">${meal[i].strMeasure7}</span>
                    <span class="text-dark rounded-4 p-2 bg-primary-subtle m-2">${meal[i].strMeasure8}</span>
                    <span class="text-dark rounded-4 p-2 bg-primary-subtle m-2">${meal[i].strMeasure9}</span>
                </div>
                <div>
                    <h5 class="p-2">Tags :</h5>
                    <a class="p-2 text-decoration-none text-white p-2 px-3 bg-success rounded-4" href="${meal[i].strSource}">Source</a>
                    <a class="p-2 text-decoration-none text-white p-2 px-3 bg-danger rounded-4" href="${meal[i].strYoutube}">Youtube</a>
                </div>
            </div>`
    document.querySelector("#myData").innerHTML = cartona
}

///////////// Search ////////////
$(".Search").on("click", async function showSearch() {
    let cartona = ``;
    cartona += `<div class="row py-4 ">
                    <div class="col-md-6 ">
                        <input class="form-control bg-transparent text-white SearchByName" type="text" placeholder="Search By Name">
                    </div>
                    <div class="col-md-6">
                        <input maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
                    </div>
                </div>`
    document.querySelector("#myData").innerHTML = cartona
})
// let val= document.querySelector("SearchByName").value
// async function search (val){
//     for (let i = 0; i < mealId.length; i++) {
//         let resM = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`);
//         let finalR = await resM.json();
//         meall = finalR.meals;
//         console.log(meall);
//     }
//     console.log("ggg");
// }
// search ()

///////////// Categories ////////////
$(".Categories").on("click", async function getCategoriesData() {
    let resCategories = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let finalResCategories = await resCategories.json();
    categoryData = finalResCategories.categories;
    displayCategory()
})
function displayCategory() {
    let cartona = ``;
    for (let i = 0; i < categoryData.length; i++) {
        cartona += `<div onclick="categoryType(${i})" class="cardd col-12 col-md-6 col-lg-3">
                        <div class="p-4 position-relative">
                            <div>
                                <img src="${categoryData[i].strCategoryThumb}" class="w-100" alt=""> 
                            </div>
                            <div class="maelName bg-white bg-opacity-75 position-absolute text-center p-3">
                                <h2>${categoryData[i].strCategory}</h2>
                                <p>${categoryData[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                            </div>
                        </div>
                    </div>`
    }
    document.querySelector("#myData").innerHTML = cartona
}
let categoryDataType =[]
async function categoryType(i){
        let resCategoriesType = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${categoryData[i].strCategory}`);
        let finalResCategoriesType = await resCategoriesType.json();
        categoryDataType = finalResCategoriesType.meals;
        dis()
}
function dis(){
    let cartona = ``;
        for (let i = 0; i < categoryDataType.length; i++) {
            cartona += `<div class="cardd col-12 col-md-6 col-lg-3">
                            <div class="p-4 position-relative">
                                <div>
                                    <img src="${categoryDataType[i].strCategoryThumb}" class="w-100" alt=""> 
                                </div>
                                <div class="maelName bg-white bg-opacity-75 position-absolute text-center p-3">
                                    <h2>${categoryDataType[i].strCategory}</h2>
                                    <p>${categoryDataType[i].strCategoryDescription}</p>
                                </div>
                            </div>
                        </div>`
        }
        document.querySelector("#myData").innerHTML = cartona
}
///////////// Area ////////////
$(".Area").on("click", async function getAreaData() {
    let resArea = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    let finalResArea = await resArea.json();
    areaData = finalResArea.meals;
    displayArea()
})
function displayArea() {
    let cartona = ``;
    for (let i = 0; i < areaData.length; i++) {
        cartona += `<div onclick="descArea(${areaData[i].strArea})" class="col-12 col-md-6 col-lg-3 text-center text-white">
                        <div>
                            <i class="fa-solid fa-house-laptop fs-1 p-2"></i> 
                            <h3>${areaData[i].strArea}</h3>
                        </div>
                    </div>`
    }
    document.querySelector("#myData").innerHTML = cartona
}

///////////// Ingredients ////////////
$(".Ingredients").on("click", async function getIngredientsData() {
    let resIngredients = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    let finalResIngredients = await resIngredients.json();
    ingredientsData = finalResIngredients.meals;
    displayIngredients()
})
function displayIngredients() {
    let cartona = ``;
    for (let i = 0; i < ingredientsData.length; i++) {
        cartona += `<div class="col-12 col-md-6 col-lg-3 text-center text-white">
                        <div>
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i> 
                            <h3>${ingredientsData[i].strIngredient}</h3>
                            <p>${ingredientsData[i].strDescription}</p>
                        </div>
                    </div>`
    }
    document.querySelector("#myData").innerHTML = cartona
}
///////////// Contact Us ////////////
$(".ContactUs").on("click", function displayContactUs() {
    let cartona = ``;
    cartona += `<div class="min-vh-100 d-flex justify-content-center align-items-center">
                <div class="w-75 text-center">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <input oninput="validate(this)" id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
                            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Special characters and numbers not allowed
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input oninput="validate(this)" id="emailInput" type="email" class="form-control " placeholder="Enter Your Email">
                            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Email not valid *exemple@yyy.zzz
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input oninput="validate(this)" id="phoneInput" type="text" class="form-control " placeholder="Enter Your Phone">
                            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid Phone Number
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input oninput="validate(this)" id="ageInput" type="number" class="form-control " placeholder="Enter Your Age">
                            <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid age
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input oninput="validate(this)" id="passwordInput" type="password" class="form-control " placeholder="Enter Your Password">
                            <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid password *Minimum eight characters, at least one letter and one number:*
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input oninput="validate(this)" id="repasswordInput" type="password" class="form-control " placeholder="Repassword">
                            <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid repassword 
                            </div>
                        </div>
                    </div>
                    <button id="submitBtn" class="btn btn-outline-danger px-2 mt-3">Submit</button>
                </div>
            </div>`

    document.querySelector("#myData").innerHTML = cartona
})
function validate(element){
    if(regex[element.id].test(element.value)== true){
        element.nextElementSibling.classList.add('d-none')
    }else{
        element.nextElementSibling.classList.remove('d-none')
    }
}
