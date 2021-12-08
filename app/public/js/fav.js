let fav = {};
document.querySelectorAll('.add-to-fav').forEach(function(element){
  element.onclick = addToFav;
});

if (localStorage.getItem('fav')){
    fav = JSON.parse(localStorage.getItem('fav'));
    ajaxGetContentInfo();
  }

function addToFav(){
  let contentId = this.dataset.content_id;
  fav[contentId] = 1;
  ajaxGetContentInfo();
}

function ajaxGetContentInfo(){
    updateLocalStorageFav();
    fetch('/get-content-info',{
      method: 'POST',
      body: JSON.stringify({key: Object.keys(fav)}),
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      }
    })
    .then(function(response){
      return response.text();
    })
    .then(function(body){
      console.log(body);
      showFav(JSON.parse(body));
    })
  }

  function showFav(data) {
    let out = '<table class="table table-striped table-fav"><tbody>';
    let total = 0;
    for (let key in fav){
      out +=`<tr><td colspan="4"><a href="/content?id=${key}">${data[key]['name']}</a>`;
      out += `<td><i class="far fa-minus-square fav-minus" data-content_id="${key}"></i></td>`;
      out += '</tr>';
    }
    document.querySelector('#fav-nav').innerHTML = out;
    document.querySelectorAll('.fav-minus').forEach(function(element){
      element.onclick = favMinus;
    });
}
  
function updateLocalStorageFav(){
    localStorage.setItem('fav', JSON.stringify(fav));
  }
  
  function favMinus() {
    let contentId = this.dataset.content_id;
    if (fav[contentId] -1 > 0){
      fav[contentId]--;
    }
    else {
      delete(fav[contentId]);
    }
    ajaxGetContentInfo();
  }

