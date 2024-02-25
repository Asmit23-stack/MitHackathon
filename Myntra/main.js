// const trigger = document.getElementsByClassName('hover-trigger');
// const list = document.getElementsByClassName('hover-list');
// const rotate =document.getElementsByClassName('rot');
// trigger.addEventListener('mouseenter', function() {
//   list.style.display = 'block';
//   rotate.style.transform='rotate(180deg)'
  
// });

// trigger.addEventListener('mouseleave', function() {
//   list.style.display = 'none';
//   rotate.style.transform='rotate(0deg)'
// });
const triggers = document.getElementsByClassName('hover-trigger');
const lists = document.getElementsByClassName('hover-list');
const rotates = document.getElementsByClassName('rot');

// Iterate over each trigger element
for (let i = 0; i < triggers.length; i++) {
  // Add event listener to each trigger
  triggers[i].addEventListener('mouseenter', function() {
    // Display the corresponding list
    lists[i].style.display = 'flex';
    // Rotate the corresponding element
    rotates[i].style.transform = 'rotate(180deg)';
  });

  // Add event listener to each trigger
  triggers[i].addEventListener('mouseleave', function() {
    // Hide the corresponding list
    lists[i].style.display = 'none';
    // Rotate the corresponding element back to original
    rotates[i].style.transform = 'rotate(0deg)';
  });
}
