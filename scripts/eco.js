
/**
 * Convierte un flotante a un valor financiero
 */
function financial(x) {
  // return Number.parseFloat(x).toFixed(2);
  return x.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}

/**
 * Anualidad dada un futuro
 * @param futuro
 * @param interes tasa de interes
 * @param inicio periodo de inicio 
 */
function adf(futuro, interes, inicio) {
  return futuro * interes / (Math.pow((1 + interes), inicio) - 1);
}


/**
 * Calcular el futuro neto de un presente a 'n' periodos
 * @param presente valor del presente
 * @param interes tasa porcentual del interes (0 al 1)
 * @param periodos numero de periodos 
 */
function nfv(presente, interes, periodos) {
  let subtotal = presente * Math.pow((1 + interes), periodos);
  return subtotal;
}


/**
 * Calcular el presente neto de un futuro a 'n' periodos
 * @param futuro valor del futuro
 * @param interes tasa porcentual del interes (0 al 1)
 * @param periodos numero de periodos 
 */
function npv(futuro, interes, periodos) {
  let subtotal = futuro / Math.pow((1 + interes), periodos);
  return subtotal;
}

/**
 * Encontrar la equivalencia de los flujos en un periodo
 * @param flujo arreglo de los flujos de efectivo
 * @param nperiodos numero de periodos en el flujo
 * @param interes tasa porcentual del interes (0 al 1)
 * @param periododeinteres periodo al cual se va a calcular la equivalencia
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

/**
 * Pago recurrente perpetuo
 */
function prp(pago, tasa, frecuencia, inicio) {
  let anualidad;

  // Calcula la anualidad si la frecuencia no es anual
  if (frecuencia !== 1) {
    anualidad = adf(pago, tasa, frecuencia);
  } else {
    anualidad = pago;
  }

  // Convierte en valor presente si el per�odo de inicio no es el primero y la frecuencia es anual
  if (inicio > 1 && frecuencia === 1) {
    const futuro = npv(anualidad, tasa, inicio - 1);
    return futuro / tasainteres;
  }

  // Retorna el valor presente de la anualidad
  return anualidad / tasa;
}

