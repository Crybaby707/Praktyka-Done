let searching = {};
document.querySelector('.close_nav').onclick = closeNav;
document.querySelector('.show_nav').onclick = showNav;
document.querySelector('.searchBut2').onclick = searchText;

function closeNav() {
    document.querySelector('.site_nav').style.left = '-300px';
}
function showNav() {
    document.querySelector('.site_nav').style.left = '0';
}

function searchText() {
 console.log('Searching...');
let info = document.querySelector('.input2').value;
  searching[info] = 1;
  ajaxGetSearchInfo();
} 

function ajaxGetSearchInfo(){
    fetch('/get-search-info',{
      method: 'POST',
      body: JSON.stringify({key: Object.keys(searching)}),
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body);
    })
}