$w.onReady(function () {
  // Espera a que el componente esté cargado
  $w("#html2").onMessage((event) => {
    console.log("Mensaje recibido desde el HTML:", event.data);
  });

  // Envía un mensaje al HTML embebido
  $w("#html2").postMessage({ saludo: "¡Hola desde Velo!" });
});
