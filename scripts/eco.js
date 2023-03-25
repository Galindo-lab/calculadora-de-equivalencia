
/**
 * Calcular el futuro neto de un presente a 'n' periodos
 * @param presente valor del presente
 * @param interes tasa porcentual del interes (0 al 1)
 * @param periodos numero de periodos 
 */
function nfv(presente, interes, periodos) {
	let subtotal = presente*Math.pow((1+interes),periodos);
	return subtotal;
}


/**
 * Calcular el presente neto de un futuro a 'n' periodos
 * @param futuro valor del futuro
 * @param interes tasa porcentual del interes (0 al 1)
 * @param periodos numero de periodos 
 */
function npv(futuro, interes, periodos) {
	let subtotal = futuro/Math.pow((1+interes),periodos);
	return subtotal;
}

/**
 * Encontrar la equivalencia de los flujos en un periodo
 * @param flujo arreglo de los flujos de efectivo
 * @param nperiodos numero de periodos en el flujo
 * @param interes tasa porcentual del interes (0 al 1)
 * @param periododeinteres periodo respecto al cual queremos calcular la equivalencia
 */
function flujonv(flujo, nperiodos, interes, periododeinteres) {
    let total = flujo[periododeinteres];

    for (let i = 0; i <= nperiodos; i++) {
        if (i < periododeinteres) {
            total += nfv(flujo[i], interes, periododeinteres - i);
        } else if (i > periododeinteres) {
            total += npv(flujo[i], interes, i - periododeinteres);
        }
    }

    return total;
}


