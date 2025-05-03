$w.onReady(function () {
  // Oculta el video al inicio
  $w("#videoBox1").hide();

  // Escucha el mensaje del bloque HTML
  $w("#html1").onMessage((event) => {
    if (event.data.accion === "mostrarVideo") {
      $w("#videoBox1").show();
    }
  });
});
