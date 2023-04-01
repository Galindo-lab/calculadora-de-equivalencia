
// Anualidad dada un futuro
SubProceso subtotal <- ADF ( futuro, interes, periodos )
	definir subtotal como real;
	subtotal <- futuro * interes/((1+interes)^periodos-1);
FinSubProceso

// Valor Futuro Neto
// @param presente valor del dinero en el presente 
// @param interes valor del interes porcentual 
// @param numero de periodos
SubProceso subtotal <- NFV ( presente, interes, periodos )
	definir subtotal como real;
	subtotal <- presente * (1+interes)^periodos;
FinSubProceso

// Valor presente neto
// @param valor de un futuro
// @param interes valor del interes porcentual
// @param numero de periodos
SubProceso subtotal <- NPV (futuro, interes, periodos)
	// presente dado un futuro
	definir subtotal como real;
	subtotal <- futuro / (1+interes)^periodos;
FinSubProceso



// Calcular la equivalencia del valor en el periodo de interes
// @param flujo flujos de efectivo
// @param numeroElementos numero de elementos en el flujo
// @param tasaInteres tasa de interes en rango [0, 1]
// @param periodoDeInteres periodo respecto al cual queremos calcular
SubProceso total <- equivalencia (flujo, numeroElementos, tasaInteres, periodoInteres)
	Definir i Como Entero;
	Definir total, valorEquivalente como real;
	
	total <- flujo[periodoInteres];
	
	Para i <- 0 Hasta numeroElementos Con Paso 1 Hacer
		
		Si i < periodoInteres Entonces
			total <- total + NFV(flujo[i], tasaInteres, periodoInteres - i);
		FinSi
		
		Si i > periodoInteres Entonces
			total <- total + NPV(flujo[i], tasaInteres, i - periodoInteres);
		FinSi
		
	FinPara
FinSubProceso

// Pago recurrente perpetuo
// @param pago valor del pago recurrente
// @param tasaInteres valor [0,1] para representar el interes 
// @param frecuencia numero de periodo entre pagos
// @param periodoInicio periodo de inicio del flujo
SubProceso total <- PRP ( pago, tasaInteres, frecuencia, periodoInicio )
	definir total como real;
	Definir anualidad como real;
	
	Si frecuencia <> 1 Entonces
		// si no es una anualidad se utiliza la formula de
		// 'anualidad dado futuro' para convertirla en una
		anualidad <- ADF(pago, tasaInteres, frecuencia);
		Escribir anualidad;
	SiNo
		// si es una anualidad se deja tal cual
		anualidad <- pago;
	FinSi
	
	Si periodoInicio > 1 y frecuencia == 1  Entonces
		// si es una anualidad y el periodo de inicio no 
		// es el primero entonces se convierte en un futuro
		// y se manda al presente 
		
		total <- NPV(anualidad ,tasaInteres,periodoInicio-1) / tasaInteres;
	SiNo
		total <- anualidad /tasaInteres;
	FinSi
	
FinSubProceso

Proceso CalculadoraDeEquivalencia
	// valor porcentual 
	// definir interesPorcentual, totalEquivalencia, parcial, captura como real;
	//definir nFlujos,posicionRelativa como entero;
	//Definir  op, interes, periodoDeInteres, periooInicio, periodoFinal como entero;
	
	// capturas
	Definir periodoInicio, periodoFinal, periodoDeInteres, op como entero;
	Definir interes,captura como real;
	
	//variables locales
	Definir posicionRelativa como entero; // posicion real en el arreglo
	Definir nFlujos como entero; // numero de flujos 
	
	definir interesPorcentual como real; // interes en rango [0,1]
	Definir totalEquivalencia como real; // total de la equivalencia
	
	// definir la lista de arreglos 
	definir flujo como real;
	Dimension flujo[100];
	
	Escribir "---[ Periodos ]---";
	// captura los periodos 
	Escribir  "inicio:";
	leer periodoInicio;
	
	Escribir "final:";
	leer periodoFinal;
	
	Escribir "---[ Parametros ]---";
	// parametros del analisis
	Escribir "periodo de estudio:";
	leer periodoDeInteres;
	
	Escribir "interes:";
	leer interes;
	
	// obtener la posicion relativa, el arreglo siempre empieza en 0
	posicionRelativa <- abs(periodoInicio - periodoDeInteres);
	
	// numero de flujos
	nFlujos <- abs(periodoInicio - periodoFinal);
	
	// convertir el valor de [0, 100] a [0, 1]
	interesPorcentual <- interes/100;
	
	Escribir  "---[ Flujos de efectivo ]---";
	definir i Como Entero;
	Para i <- 0 Hasta nFlujos Con Paso 1 Hacer
		// capturar elementos del arreglos
		Escribir "Periodo ", periodoInicio + i, ":";
		Leer flujo[i];
	FinPara
	
	totalEquivalencia <- equivalencia(flujo, nFlujos, interesPorcentual, posicionRelativa);
	// Escribir "Equivalencia:", totalEquivalencia;
	
	Escribir "---[ Pagos Recurrentes ]---";
	Repetir
		Escribir "capturar? (0: no, 1:si)";
		Leer op;
		
		Si op <> 0 Entonces
			Escribir "Cantidad Anualidad";
			Leer captura;
			
			Escribir "Periodo de inicio:";
			Leer periodoInicio;
			
			Escribir "Frecuencia (1-Anual):";
			Leer periodoFinal;
			
			totalEquivalencia <- totalEquivalencia + PRP(captura, interesPorcentual, periodoFinal, periodoInicio);
			
		FinSi
		
	Hasta Que op == 0;
	
	Escribir "total: ", totalEquivalencia;
FinProceso
