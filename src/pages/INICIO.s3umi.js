$w.onReady(function () {
  // Oculta el video al cargar la página
  $w("#videoBox1").hide();

  // Escucha mensajes desde el HTML embebido
  $w("#html1").onMessage((event) => {
    if (event.data.accion === "mostrarVideo") {
      // Obtiene posición del botón
      const buttonPosition = $w("#button1").getBoundingRect();

      // Mueve el video cerca del botón y lo muestra
      $w("#videoBox1").moveTo(buttonPosition, { duration: 300 })
        .then(() => $w("#videoBox1").show());
    }
  });
});