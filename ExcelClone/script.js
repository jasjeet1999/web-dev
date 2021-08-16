const PS = new PerfectScrollbar("#cells",{
    // wheelSpeed: 2,
    // wheelPropagation: true,
});
function findRowCol(ele) {
    let idArray = $(ele).attr("id").split("-");// - pe split kr dia taki row,rowid,col,colid mil jae L26 se
    let rowId = parseInt(idArray[1]);//parseInt se int me convert karne ke liya nhi to as string add ho raha h L57 pe
    let colId = parseInt(idArray[3]); //row-1-col-3, So rowid 1st index pe and colid 3rd pe
    return [rowId, colId];
}
//col naming A...Z then AA,AB....
for(let i = 1; i <= 100; i++) {
    let str = "";
    let n = i; //say i = 52

    while(n > 0) {
        let rem = n % 26; //52%26 = 0 -- 1%26 = 1
        if(rem == 0) { //1!=0 so else
            str = 'Z' + str; //Z
            n = Math.floor((n/26)) - 1; //2-1 = 1 again loop
        } else { 
            str = String.fromCharCode((rem - 1) + 65) + str; //1-1 + 65 = A+Z = AZ
            n = Math.floor((n/26)); //1/26 = 0; exit loop
        }
    }
    $("#columns").append(`<div class="column-name">${str}</div>`); //div class html me banti rahe gi string append ke saath
    $("#rows").append(`<div class="row-name">${i}</div>`);
}

for(let i = 1; i <= 100; i++){
    let row = $('<div class="cell-row"></div>'); //create element
    for(let j = 1; j <= 100; j++) {
        row.append(`<div id="row-${i}-col-${j}" class="input-cell" contenteditable = "false"></div>`);
    }
    $("#cells").append(row);
} 
$("#cells").scroll(function(){
    //cells ke scroll hone pe scroll bar/columns bhi utna scroll ho
    $("#columns").scrollLeft(this.scrollLeft); //this means cells ka
    //scrollLeft value bhi deta h or scroll bhi kr raha h
    $("#rows").scrollTop(this.scrollTop);
});
$(".input-cell").dblclick(function(){
    $(this).attr("contenteditable","true");
    $(this).focus();
});
$(".input-cell").blur(function(){
    $(this).attr("contenteditable","false");
});
// $(".input-cell").click(function(){
//     $(".input-cell.selected").removeClass("selected"); //prev selected ko remove kr dia
//    $(this).addClass("selected"); //this means current ele(.input-cell) ko selected kr dia
//    //if already selected then remove selected other wise apply selected.
// });

function getTopBottomLeftRightCell(rowId, colId) { //global kr dia bcz use many times to avoid repedity
    let topCell = $(`#row-${rowId - 1}-col-${colId}`); //this is our top cell
    let bottomCell = $(`#row-${rowId + 1}-col-${colId}`);
    let leftCell = $(`#row-${rowId}-col-${colId - 1}`);
    let rightCell = $(`#row-${rowId}-col-${colId + 1}`);
    return [topCell, bottomCell, leftCell, rightCell];
}
//EX3
$(".input-cell").click(function (e) { //e for event listner
    let [rowId, colId] = findRowCol(this);
    let [topCell, bottomCell, leftCell, rightCell] = getTopBottomLeftRightCell(rowId, colId);

    if ($(this).hasClass("selected") && e.ctrlKey) { //ctrlkey key press pe hi unselect kare
        unselectCell(this, e, topCell, bottomCell, leftCell, rightCell)
    } else { //this is to select only single cell if only mouse key is pressed and remove all the prev
        selectCell(this, e, topCell, bottomCell, leftCell, rightCell);
    }
});
function unselectCell(ele, e, topCell, bottomCell, leftCell, rightCell) {
    if (e.ctrlKey && $(ele).attr("contenteditable") == "false") {
        if ($(ele).hasClass("top-selected")) {
            topCell.removeClass("bottom-selected");
        }
        if ($(ele).hasClass("left-selected")) {
            leftCell.removeClass("right-selected");
        }
        if ($(ele).hasClass("right-selected")) {
            rightCell.removeClass("left-selected");
        }
        if ($(ele).hasClass("bottom-selected")) {
            bottomCell.removeClass("top-selected");
        }
        $(ele).removeClass("selected top-selected bottom-selected right-selected left-selected");
    //if cntrl is not pressed remove all classes bcz we have to select one cell
    }
}

//EX3
                   //ele gives this at L168
function selectCell(ele, e, topCell, bottomCell, leftCell, rightCell, mouseSelection) {
    if (e.ctrlKey || mouseSelection) { 
//we use ctrl if we want to select single cell and for multiple cell we make mouseSelection true so or is used for either one fn true our loop works
        // top selected or not
        let topSelected;
        if (topCell) {
            topSelected = topCell.hasClass("selected");
        }
        // bottom selected or not
        let bottomSelected;
        if (bottomCell) {
            bottomSelected = bottomCell.hasClass("selected");
        }
        // left selected or not
        let leftSelected;
        if (leftCell) {
            leftSelected = leftCell.hasClass("selected");
        }
        // right selected or not
        let rightSelected;
        if (rightCell) {
            rightSelected = rightCell.hasClass("selected");
        }
        if (topSelected) {
            topCell.addClass("bottom-selected");
            $(ele).addClass("top-selected");
        }
        if (leftSelected) {
            leftCell.addClass("right-selected");
            $(ele).addClass("left-selected");
        }
        if (rightSelected) {
            rightCell.addClass("left-selected");
            $(ele).addClass("right-selected");
        }
        if (bottomSelected) {
            bottomCell.addClass("top-selected");
            $(ele).addClass("bottom-selected");
        }
    } else {
        $(".input-cell.selected").removeClass("selected top-selected bottom-selected right-selected left-selected");
        //remove selected class from all cell on single click
    }
    $(ele).addClass("selected"); // and select one cell
}
let mousemoved = false;
let startCellStored = false;
let startCell;
let endCell;
$(".input-cell").mousemove(function (event) {
    event.preventDefault();
    console.log(event);
    if (event.buttons == 1 && !event.ctrlKey) { //buttons == 1 means left mouse clicked
        $(".input-cell.selected").removeClass("selected top-selected bottom-selected right-selected left-selected");
        mousemoved = true;
        if(!startCellStored) {
            let [rowId, colId] = findRowCol(event.target);
            startCell = { rowId: rowId, colId: colId };
            startCellStored = true;
        } else {
            let [rowId, colId] = findRowCol(event.target);
            endCell = { rowId: rowId, colId: colId };
            selectAllBetweenTheRange(startCell, endCell);
        }
    } else if (event.buttons == 0 && mousemoved) {
        startCellStored = false;
        mousemoved = false;
    }
})

function selectAllBetweenTheRange(start, end) {
    for(let i = (start.rowId < end.rowId ? start.rowId : end.rowId); i <= (start.rowId < end.rowId ? end.rowId : start.rowId); i++) 
    { //drag karte hue start row se end row ka loop //for reverse drag BtoT
        for (let j = (start.colId < end.colId ? start.colId : end.colId); j <= (start.colId < end.colId ? end.colId : start.colId); j++)
         {// "  " for column
            let [topCell, bottomCell, leftCell, rightCell] = getTopBottomLeftRightCell(i, j);
            
            selectCell($(`#row-${i}-col-${j}`)[0], {}, topCell, bottomCell, leftCell, rightCell, true);
                        //this will fetch the elem in jquery object and to convert it to normal node we use [0]
        }
    }
}

