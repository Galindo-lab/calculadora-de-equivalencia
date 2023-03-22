
function copyValue(a,b) {
    let foo = document.getElementById(a).value;
    document.getElementById(b).value = foo;
}

/**
 * Generar los campos para ingresar el flujo de efectivo
 */
function generarEntradas() {
    const min = parseInt(document.getElementById("minimo").value);
    const max = parseInt(document.getElementById("maximo").value);
    const entradas = document.getElementById("entradas");

    // Limpiar las entradas existentes
    entradas.innerHTML = "";

    // Generar las nuevas entradas
    for (let i = min; i <= max; i++) {
        const nuevaEntrada = `
          <label for="entrada${i}">
            ${i < 0 ? '-' : '&nbsp;'}${Math.abs(i).toString().padStart(2, '0')}:
         </label>
         <input type="text" id="entrada${i}" name="entrada${i}">
         <button onclick="copyValue('entrada${i}','entrada${i+1}')"> &darr; </button>
         </br>
       `;
        
        entradas.insertAdjacentHTML("beforeend", nuevaEntrada);
    }
}

/**
 * Obtener los valores del arreglo
 * @return array
 */
function obtenerValores() {
    var entradas = Array.from(document.querySelectorAll("#entradas input"));
    return entradas.map(entrada => parseFloat(eval(entrada.value)) || 0);
}

/**
 * vacia el formulario y borras las entradas
 */
function limpiarFormulario() {
    var minimo = document.getElementById("minimo");
    var maximo = document.getElementById("maximo");
    var periodo = document.getElementById("periodo");
    var interes = document.getElementById("interes");
    var resultado = document.getElementById("resultado");

    // Limpiar las entradas existentes
    entradas.innerHTML = "";

    // Vaciar los campos de rango mínimo y máximo
    minimo.value = "";
    maximo.value = "";
    periodo.value = "";
    interes.value = "";
    resultado.value = "";
}


/**
 * Convierte un flotante a un valor financieto
 */
function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

/**
 * Calcula la quivalencia en el periodo
 */
function calculadoradeequivalencia() {
    const periodoinicio = parseInt(document.getElementById("minimo").value);
    const periodofinal = parseInt(document.getElementById("maximo").value);
    const periododeinteres = document.getElementById("periodo").value == "" ? periodoinicio : parseInt(document.getElementById("periodo").value);
    const interes = parseFloat(document.getElementById("interes").value);
    
    const flujo = obtenerValores();
    const nflujos = Math.abs(periodoinicio - periodofinal);
    const porcentual = interes / 100;
    const pinteres = Math.abs(periodoinicio - periododeinteres);
    
    document.getElementById("resultado").value = financial(flujonv(flujo, nflujos, porcentual, pinteres));
}


