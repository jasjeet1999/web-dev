let TC = document.querySelector(".ticket-container") //to get ticket container
let allFilters = document.querySelectorAll(".filter") // to get all filters

for(let i=0; i<allFilters.length; i++){
    allFilters[i].addEventListener("click", filterHandler);
}
function filterHandler(e){
    let span = e.currentTarget.children[0]; //gives the span present in div tag
    let style = getComputedStyle(span); //gives all css of span
    TC.style.backgroundColor = style.backgroundColor; //tc ka background color = span ke backcolor ke

}