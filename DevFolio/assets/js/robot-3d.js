/* ==========================================================================
   Robot 3D Section — script
   Salve este arquivo em: assets/js/robot-3d.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  var card = document.getElementById('robotSpotlightCard');
  var spot = document.getElementById('robotSpotlight');

  if (card && spot) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      spot.style.left = (e.clientX - rect.left) + 'px';
      spot.style.top = (e.clientY - rect.top) + 'px';
    });
  }
});
