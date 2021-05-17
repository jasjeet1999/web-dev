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
    $("#columns").append(`<div class="column-name">${str}</div>`);
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
    $("#columns").scrollLeft(this.scrollLeft); //this means cells ka
    //scrollLeft value bhi deta h or scroll bhi kr raha h
    $("#rows").scrollTop(this.scrollTop);
})
