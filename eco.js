// Este codigo ha sido generado por el modulo psexport 20180802-w32 de PSeInt.
// Es posible que el codigo generado no sea completamente correcto. Si encuentra
// errores por favor reportelos en el foro (http://pseint.sourceforge.net).

// Anualidad dada un futuro
function adf(futuro, interes, periodos) {
	var subtotal = new Number();
	subtotal = futuro*interes/(Math.pow((1+interes),periodos)-1);
	return subtotal;
}

// Valor Futuro Neto
// @param presente valor del dinero en el presente 
// @param interes valor del interes porcentual 
// @param numero de periodos
function nfv(presente, interes, periodos) {
	var subtotal = new Number();
	subtotal = presente*Math.pow((1+interes),periodos);
	return subtotal;
}

// Valor presente neto
// @param valor de un futuro
// @param interes valor del interes porcentual
// @param numero de periodos
function npv(futuro, interes, periodos) {
	// presente dado un futuro
	var subtotal = new Number();
	subtotal = futuro/Math.pow((1+interes),periodos);
	return subtotal;
}

// Calcular la equivalencia del valor en el periodo de interes
// @param flujo flujos de efectivo
// @param numeroElementos numero de elementos en el flujo
// @param tasaInteres tasa de interes en rango [0, 1]
// @param periodoDeInteres periodo respecto al cual queremos calcular
function equivalencia(flujo, numeroelementos, tasainteres, periodointeres) {
	var i = new Number();
	var total = new Number();
	var valorequivalente = new Number();
	total = flujo[periodointeres];
	for (i=0;i<=numeroelementos;i++) {
		if (i<periodointeres) {
			total = total+nfv(flujo[i],tasainteres,periodointeres-i);
		}
		if (i>periodointeres) {
			total = total+npv(flujo[i],tasainteres,i-periodointeres);
		}
	}
	return total;
}

// Pago recurrente perpetuo
// @param pago valor del pago recurrente
// @param tasaInteres valor [0,1] para representar el interes 
// @param frecuencia numero de periodo entre pagos
// @param periodoInicio periodo de inicio del flujo
function prp(pago, tasainteres, frecuencia, periodoinicio) {
	var total = new Number();
	var anualidad = new Number();
	if (frecuencia!=1) {
		// si no es una anualidad se utiliza la formula de
		// 'anualidad dado futuro' para convertirla en una
		anualidad = adf(pago,tasainteres,frecuencia);
		document.write(anualidad,'<BR/>');
	} else {
		// si es una anualidad se deja tal cual
		anualidad = pago;
	}
	if (periodoinicio>1 && frecuencia==1) {
		// si es una anualidad y el periodo de inicio no 
		// es el primero entonces se convierte en un futuro
		// y se manda al presente 
		total = npv(anualidad,tasainteres,periodoinicio-1)/tasainteres;
	} else {
		total = anualidad/tasainteres;
	}
	return total;
}

function calculadoradeequivalencia() {
	// valor porcentual 
	// definir interesPorcentual, totalEquivalencia, parcial, captura como real;
	// definir nFlujos,posicionRelativa como entero;
	// Definir  op, interes, periodoDeInteres, periooInicio, periodoFinal como entero;
	// capturas
	var periodoinicio = new Number();
	var periodofinal = new Number();
	var periododeinteres = new Number();
	var op = new Number();
	var interes = new Number();
	var captura = new Number();
	// variables locales
	// posicion real en el arreglo
	var posicionrelativa = new Number();
	// numero de flujos 
	var nflujos = new Number();
	// interes en rango [0,1]
	var interesporcentual = new Number();
	// total de la equivalencia
	var totalequivalencia = new Number();
	// definir la lista de arreglos 
	var flujo = new Number();
	var flujo = new Array(100);
	document.write("---[ Periodos ]---",'<BR/>');
	// captura los periodos 
	document.write("inicio:",'<BR/>');
	periodoinicio = Number(prompt());
	document.write("final:",'<BR/>');
	periodofinal = Number(prompt());
	document.write("---[ Parametros ]---",'<BR/>');
	// parametros del analisis
	document.write("periodo de estudio:",'<BR/>');
	periododeinteres = Number(prompt());
	document.write("interes:",'<BR/>');
	interes = Number(prompt());
	// obtener la posicion relativa, el arreglo siempre empieza en 0
	posicionrelativa = Math.abs(periodoinicio-periododeinteres);
	// numero de flujos
	nflujos = Math.abs(periodoinicio-periodofinal);
	// convertir el valor de [0, 100] a [0, 1]
	interesporcentual = interes/100;
	document.write("---[ Flujos de efectivo ]---",'<BR/>');
	var i = new Number();
	for (i=0;i<=nflujos;i++) {
		// capturar elementos del arreglos
		document.write("Periodo ",periodoinicio+i,":",'<BR/>');
		flujo[i] = Number(prompt());
	}
	totalequivalencia = equivalencia(flujo,nflujos,interesporcentual,posicionrelativa);
	// Escribir "Equivalencia:", totalEquivalencia;
	document.write("---[ Pagos Recurrentes ]---",'<BR/>');
	do {
		document.write("capturar? (0: no, 1:si)",'<BR/>');
		op = Number(prompt());
		if (op!=0) {
			document.write("Cantidad Anualidad",'<BR/>');
			captura = Number(prompt());
			document.write("Periodo de inicio:",'<BR/>');
			periodoinicio = Number(prompt());
			document.write("Frecuencia (1-Anual):",'<BR/>');
			periodofinal = Number(prompt());
			totalequivalencia = totalequivalencia+prp(captura,interesporcentual,periodofinal,periodoinicio);
		}
	} while (op!==0);
	document.write("total: ",totalequivalencia,'<BR/>');
}

