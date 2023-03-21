# Calculadora de equivalencia 
para la materia de ingeniería económica, se puede usar la calculadora 
para calcular el valor neto en cualquier punto del tiempo.


# Ingresando un diagrama de flujo

```
                                     tasa = 7%

   500 100                 200
    ^   ^                   ^
    |   |                   |
 ---+---+---+---+---+---+---+-- Años
  -2  -1   0|  1   2   3   4
            |
            v
           100
```


Primero tenemos que identificar el 'Periodo de inicio', el este caso 
el periodo de inicio es -2.

Despues identificamos el 'Periodo final', en este caso el periodo final
corresponde al periodo 4.

Ahora tenemos que precionar el boton [Generar entradas], en la parte 
inferior se generara una tabla para que ingresemos los flujos de 
efectivo, en el caso de nuestro ejemplo los flujos se verian así 

```
-02 : 500
-01 : 100
 00 : -100
 01 :
 02 :
 03 :
 04 : 200
```

*NOTA:* Si no hay ningun flujo en el periodo podemos dejar la entrada 
vacia, se asumira automaticamente como 0.

Identificamos el periodo respecto al cual queremos obtener la 
equivalencia si por ejemplo queremos saber cuanto equivalen los flujos
en el presente colocamos un '0' en 'Periodo de interes' (el resultado es
$732.03) por otro lado si queremos saber a cuanto equivalen en el futuro
colocamos un '4' en 'Periodo de interes'. 

Por ultimo presionamos el boton [Calcular], en la parte superior del 
programa aparecera el valor correspondiente a la equivalencia.


