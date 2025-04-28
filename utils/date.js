// 1. Obtener el objeto Date para el momento actual
const fechaActual = new Date()

// 2. Definir los nombres de los meses en español (0-indexados)
const nombresMeses = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
]

// 3. Extraer los componentes de la fecha y hora (usando métodos locales)
const dia = fechaActual.getDate() // Día del mes (1-31)
const mesNumero = fechaActual.getMonth() // Número del mes (0-11)
const anio = fechaActual.getFullYear() // Año completo
const horas = fechaActual.getHours() // Horas (0-23)
const minutos = fechaActual.getMinutes() // Minutos (0-59)
const segundos = fechaActual.getSeconds() // Segundos (0-59)

// 4. Obtener el nombre del mes usando el número
const nombreMes = nombresMeses[mesNumero]

// 5. Formatear horas, minutos y segundos para que tengan dos dígitos (con cero inicial si < 10)
// Usamos padStart(2, '0') para asegurar dos dígitos, rellenando con '0' si es necesario.
const horasFormateadas = String(horas).padStart(2, '0')
const minutosFormateados = String(minutos).padStart(2, '0')
const segundosFormateados = String(segundos).padStart(2, '0')

export const date = `${dia} de ${nombreMes} de ${anio} a las ${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`
