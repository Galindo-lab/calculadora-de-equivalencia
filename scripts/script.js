
// salidas
const salida = document.getElementById("resultado")

// inputs
const minimo = document.getElementById("minimo")
const maximo = document.getElementById("maximo")
const periodo = document.getElementById("periodo")
const interes = document.getElementById("interes");

// divs
const flujosEfectivo = document.getElementById("entradas")





/**
 * Copiar un valor de una entrada a otra
 */
function copyValue(a,b) {
    let foo = document.getElementById(a).value;
    document.getElementById(b).value = foo;
}





/**
 * Generar los campos para ingresar el flujo de efectivo
 */
function generarEntradas() {
    const min = parseInt(minimo.value);
    const max = parseInt(maximo.value);
    const entradas = flujosEfectivo;

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
    const entradas = Array.from(document.querySelectorAll("#entradas input"));
    return entradas.map(entrada => parseFloat(eval(entrada.value)) || 0);
}


/**
 * vacia el formulario y borras las entradas
 */
function limpiarFormulario() {
    // Limpiar las entradas existentes
    flujosEfectivo.innerHTML = "";

    // Vaciar los campos de rango mínimo y máximo
    minimo.value = "";
    maximo.value = "";
    periodo.value = "";
    interes.value = "";
    salida.value = "";
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
    const periodoinicio = parseInt(minimo.value);
    const periodofinal = parseInt(maximo.value);
    const periododeinteres = periodo.value == "" ? periodoinicio : parseInt(periodo.value);
    const interesPorcentual = parseFloat(interes.value);
    
    const flujo = obtenerValores();
    const nflujos = Math.abs(periodoinicio - periodofinal);
    const porcentual = interesPorcentual / 100;
    const pinteres = Math.abs(periodoinicio - periododeinteres);
    
    document.getElementById("resultado").value = financial(flujonv(flujo, nflujos, porcentual, pinteres));
}


