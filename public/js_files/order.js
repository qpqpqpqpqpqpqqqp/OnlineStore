let orderBtn = document.querySelector(".btn");
let orderingBtn = document.querySelector(".ordering");
let orderWindow = document.querySelector(".orderWindow");
let closeWindow = document.querySelector(".windowClose");
let successW = document.querySelector(".successWindow");
let closeSuccess = document.querySelector(".successClose");

document.querySelectorAll(".btn").forEach(link => link.addEventListener('click', function() {
    orderWindow.classList.add('shown')}));

  closeWindow.addEventListener('click', function(){
      orderWindow.classList.remove('shown');
  })



// orderingBtn.addEventListener('click', function(){
//       if(document.querySelector('.name').value.trim().length >= 2 &&
//       document.querySelector('.phone').value.trim().length == 11 &&
//       document.querySelector('.mail').value.trim().length >= 2 &&
//       document.querySelector('.city').value.trim().length >= 2 &&
//       document.querySelector('.index').value.trim().length == 6){
//           successW.classList.add('isShown');
//           document.querySelector('.name').value = '';
//           document.querySelector('.phone').value = '';
//           document.querySelector('.mail').value = '';
//           document.querySelector('.city').value = '';
//           document.querySelector('.index').value = '';
//       }
//   })

closeSuccess.addEventListener('click', function(){
    successW.classList.remove('isShown');
    orderWindow.classList.remove('shown');
})
