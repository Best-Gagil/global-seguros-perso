import { obtenerDatosUsuario } from "backend/usuario.jsw";
import { obtenerRecomendaciones } from "backend/recomendaciones.jsw";
import wixLocation from "wix-location";

$w.onReady(async function () {
  try {
    const usuario = await obtenerDatosUsuario();
    $w("#button3").hide();
    $w("#videoBox1").show();
    $w("#videoBox2").hide();
    $w("#videoBox1").play();
    $w("#html5").postMessage({
      saludo: `Hola ${usuario.nombre}, ¿cómo estás? ¿Quieres que accedamos a tus datos para recomendarte el mejor plan de seguro para ti?`,
    });
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
  }
});

$w("#html5").onMessage(async (event) => {
  if (event.data.confirmacion === "sí") {
    try {
      const usuario = await obtenerDatosUsuario();
      const recomendaciones = await obtenerRecomendaciones(usuario.email);
      $w("#html5").postMessage({
        recomendaciones: recomendaciones,
      });
    } catch (error) {
      console.error("Error al obtener recomendaciones:", error);
    }
  } else if (event.data.redireccionar === "seguros") {
    $w("#videoBox1").hide();
    $w("#videoBox2").show();
    $w("#videoBox2").play();
    $w("#button3").show();
    //wixLocation.to("https://www.globalseguroscolombia.com");
  }
});
