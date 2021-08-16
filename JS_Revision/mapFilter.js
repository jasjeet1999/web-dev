let arr = [2,5,10,18,20];

//Map: If we want to perform a particular logic
// let square = arr.map((data,index) => {
//     return data*data;
// });

// console.log(arr);
// console.log(square);

let odd = arr.filter(function(data) {
    console.log(data);
    return data % 2 != 0;
});

let even = arr.filter(function(data) { //internally uses 'for' loop
    console.log(data);
    return data % 2 == 0;
});

console.log(odd.concat(even)); //merge two arrays
console.log(arr);
console.log(odd);