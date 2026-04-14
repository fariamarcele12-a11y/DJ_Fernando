document.addEventListener(
  "click",
  function () {
    const audio = document.getElementById("musica");
    audio.play();
  },
  {
    once: true,
  },
);
