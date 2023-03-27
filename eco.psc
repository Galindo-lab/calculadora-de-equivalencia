
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




Proceso CalculadoraDeEquivalencia
	// valor porcentual 
	definir interesPorcentual como real;
	
	definir nFlujos, interes, periodoDeInteres, periodoInicio, periodoFinal,posicionRelativa como entero;
	
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
	
	definir i Como Entero;
	Para i <- 0 Hasta nFlujos Con Paso 1 Hacer
		// capturar elementos del arreglos
		Escribir "Periodo ", periodoInicio + i, ":";
		Leer flujo[i];
	FinPara
	
	
	Escribir "Equivalencia:", equivalencia(flujo, nFlujos, interesPorcentual, posicionRelativa);
	
	
FinProceso
