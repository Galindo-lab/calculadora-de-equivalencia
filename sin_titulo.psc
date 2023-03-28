Proceso sin_titulo
	parcial <- 0;
	Si periodoFinal <> 1 Entonces
		parcial <- ADF(captura, interesPorcentual, periodoFinal);
	SiNo
		parcial <- captura;
	FinSi
	
	Si periodoInicio > 1 y periodoFinal == 1 Entonces
		totalEquivalencia <- totalEquivalencia + parcial*(NPV(1,interesPorcentual,periodoInicio-1)*valorNetoPerpetuo(1, interesPorcentual));
	sino 
		totalEquivalencia <- totalEquivalencia + valorNetoPerpetuo(parcial, interesPorcentual);
	FinSi
FinProceso
