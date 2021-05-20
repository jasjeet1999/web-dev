const PS = new PerfectScrollbar("#cells",{
    // wheelSpeed: 2,
    // wheelPropagation: true,
});
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
        row.append(`<div id="row-${i}-col-${j}" class="input-cell"></div>`);
    }
    $("#cells").append(row);
} 
$("#cells").scroll(function(){
    //cells ke scroll hone pe scroll bar bhi utna scroll ho
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
$(".input-cell").click(function(){
    $(".input-cell.selected").removeClass("selected"); //prev selected ko remove kr dia
   $(this).addClass("selected");
});
$(".input-cell").click(function(e){ //e for event listner
    let idArray = $(this).attr("id").split("-"); // - pe split kr dia taki row rowid col colid mil jae L26 se
    let rowId = parseInt(idArray[1]); //parseInt se int me convert karne ke liya nhi to as string add ho raha h L57 pe
    let colId = parseInt(idArray[3]);
    let topCell = $(`#row-${rowId - 1}-col-${colId}`); //this is our top cell
    let bottomCell = $(`#row-${rowId + 1}-col-${colId}`);
    let leftCell = $(`#row-${rowId}-col-${colId - 1}`);
    let rightCell = $(`#row-${rowId}-col-${colId + 1}`);
    if ($(this).hasClass("selected")) {
        unselectCell(this, e, topCell, bottomCell, leftCell, rightCell)
    } else {
        selectCell(this, e, topCell, bottomCell, leftCell, rightCell);
    }

});
function unselectCell(ele, e, topCell, bottomCell, leftCell, rightCell) {
    if (e.ctrlKey) {
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
    }
}

function selectCell(ele, e, topCell, bottomCell, leftCell, rightCell) {
    if (e.ctrlKey) {
        let idArray = $(ele).attr("id").split("-");
        let rowId = parseInt(idArray[1]);
        let colId = parseInt(idArray[3]);

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
    }

    $(ele).addClass("selected");
}
