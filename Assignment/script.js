
// let mybtn = document.getElementsByClassName("login-button");

// let content = document.getElementById("content");

// // function myOnClickFn(){
// //       window.open(data.html);
// // }

// function getData(){
//     url = "https://pokeapi.co/api/v2/pokemon/?limit=25"
//     fetch(url).then((response) => {
//         return response.json();
//     }).then((data) => {
//         console.log(data);
//     })
// }
// let content = document.getElementById("content");

// function myOnClickFn(){
//       window.open(data.html);
// }
let values = ["a"];
const p = document.getElementById("content")
fetch('https://pokeapi.co/api/v2/pokemon/?limit=25')
    .then((response) => {
        return response.json();

    })
    .then((data) => {
        console.log(data);
        values = data.results;
        console.log(values.length);
        for(i=0;i<values.length;i++){
            document.getElementById("first").innerHTML += values[i].name + "<br>"
            document.getElementById("second").innerHTML += values[i].url + "<br>"

        }
    });

