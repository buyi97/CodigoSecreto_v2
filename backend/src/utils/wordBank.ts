export const DEFAULT_WORD_BANK: string[] = [
  // Animales
  'perro', 'gato', 'elefante', 'león', 'tigre', 'oso', 'conejo', 'ratón', 'caballo', 'vaca',
  'oveja', 'cerdo', 'gallina', 'pato', 'pavo', 'pez', 'tiburón', 'delfín', 'ballena', 'pulpo',
  'araña', 'mosca', 'abeja', 'hormiga', 'mariposa', 'pájaro', 'águila', 'búho', 'loro', 'canario',
  'serpiente', 'lagarto', 'tortuga', 'rana', 'sapo', 'cocodrilo', 'hipopótamo', 'jirafa', 'cebra', 'mono',
  'chimpancé', 'gorila', 'orangután', 'koala', 'canguro', 'panda', 'oso polar', 'lobo', 'zorro', 'mapache',
  // Objetos
  'mesa', 'silla', 'cama', 'puerta', 'ventana', 'televisor', 'computadora', 'teléfono', 'libro', 'bolígrafo',
  'lápiz', 'papel', 'cuchillo', 'tenedor', 'cuchara', 'plato', 'taza', 'vaso', 'botella', 'caja',
  'bolsa', 'maleta', 'reloj', 'anillo', 'collar', 'sombrero', 'zapatos', 'camisa', 'pantalón', 'falda',
  'abrigo', 'guantes', 'bufanda', 'paraguas', 'llaves', 'moneda', 'billete', 'tarjeta', 'pasaporte', 'mapa',
  'globo', 'pelota', 'raqueta', 'bicicleta', 'coche', 'avión', 'tren', 'barco', 'camión', 'moto',
  // Lugares
  'casa', 'apartamento', 'edificio', 'calle', 'plaza', 'parque', 'jardín', 'bosque', 'montaña', 'río',
  'lago', 'mar', 'océano', 'isla', 'desierto', 'ciudad', 'pueblo', 'país', 'continente', 'planeta',
  'universo', 'galaxia', 'estrella', 'sol', 'luna', 'tierra', 'aire', 'fuego', 'agua', 'piedra',
  'arena', 'nieve', 'hielo', 'fuego', 'viento', 'trueno', 'relámpago', 'lluvia', 'nube', 'arco iris',
  // Acciones
  'correr', 'saltar', 'nadar', 'volar', 'bailar', 'cantar', 'hablar', 'escuchar', 'ver', 'tocar',
  'oler', 'saborear', 'dormir', 'despertar', 'comer', 'beber', 'escribir', 'leer', 'dibujar', 'pintar',
  'construir', 'destruir', 'crear', 'inventar', 'descubrir', 'explorar', 'viajar', 'regresar', 'esperar', 'buscar',
  'encontrar', 'perder', 'ganar', 'perder', 'ayudar', 'dañar', 'amar', 'odiar', 'reír', 'llorar',
  // Conceptos
  'amor', 'odio', 'felicidad', 'tristeza', 'miedo', 'valentía', 'esperanza', 'desesperación', 'paz', 'guerra',
  'vida', 'muerte', 'tiempo', 'espacio', 'realidad', 'sueño', 'verdad', 'mentira', 'justicia', 'injusticia',
  'libertad', 'esclavitud', 'riqueza', 'pobreza', 'salud', 'enfermedad', 'conocimiento', 'ignorancia', 'sabiduría', 'locura',
  'belleza', 'fealdad', 'fuerza', 'debilidad', 'poder', 'impotencia', 'éxito', 'fracaso', 'amistad', 'enemistad',
  // Más para llegar a 250
  'árbol', 'flor', 'hoja', 'raíz', 'fruto', 'semilla', 'sol', 'luna', 'estrella', 'planeta',
  'galaxia', 'universo', 'átomo', 'molécula', 'célula', 'órgano', 'cuerpo', 'mente', 'alma', 'espíritu',
  'dios', 'ángel', 'demonio', 'fantasma', 'bruja', 'mago', 'príncipe', 'princesa', 'rey', 'reina',
  'caballero', 'dragón', 'castillo', 'torre', 'puente', 'río', 'lago', 'mar', 'isla', 'montaña',
  'valle', 'desierto', 'jungla', 'sabana', 'tundra', 'glaciar', 'volcán', 'terremoto', 'tsunami', 'huracán',
  'tornado', 'lluvia', 'nieve', 'granizo', 'niebla', 'viento', 'trueno', 'relámpago', 'arco iris', 'aurora',
  'cometa', 'asteroide', 'meteorito', 'cráter', 'cueva', 'mina', 'cantera', 'fábrica', 'taller', 'oficina',
  'escuela', 'universidad', 'hospital', 'iglesia', 'templo', 'mezquita', 'sinagoga', 'monasterio', 'cementerio', 'parque',
  'estadio', 'teatro', 'cine', 'museo', 'biblioteca', 'zoo', 'acuario', 'plaza', 'mercado', 'tienda',
  'restaurante', 'hotel', 'aeropuerto', 'estación', 'puerto', 'carretera', 'autopista', 'túnel', 'puente', 'ferrocarril',
  'metro', 'tranvía', 'autobús', 'taxi', 'bicicleta', 'patineta', 'monopatín', 'esquí', 'snowboard', 'surf',
  'buceo', 'pesca', 'caza', 'jardinería', 'cocina', 'limpieza', 'lavandería', 'reparación', 'construcción', 'demolición',
  'pintura', 'escultura', 'música', 'danza', 'teatro', 'cine', 'literatura', 'poesía', 'novela', 'cuento',
  'mito', 'leyenda', 'historia', 'geografía', 'matemáticas', 'ciencia', 'física', 'química', 'biología', 'geología',
  'astronomía', 'psicología', 'sociología', 'economía', 'política', 'derecho', 'medicina', 'ingeniería', 'arquitectura', 'arte',
  'deporte', 'fútbol', 'baloncesto', 'tenis', 'golf', 'natación', 'atletismo', 'gimnasia', 'boxeo', 'karate',
  'judo', 'esgrima', 'tiro', 'ciclismo', 'motociclismo', 'automovilismo', 'vela', 'remo', 'piragüismo', 'esquí acuático',
  'windsurf', 'paracaidismo', 'ala delta', 'globo aerostático', 'helicóptero', 'avión', 'cohete', 'satélite', 'estación espacial', 'astronauta',
  'científico', 'inventor', 'explorador', 'aventurero', 'turista', 'viajero', 'migrante', 'refugiado', 'inmigrante', 'emigrante',
  'ciudadano', 'extranjero', 'amigo', 'familia', 'padre', 'madre', 'hijo', 'hija', 'hermano', 'hermana',
  'abuelo', 'abuela', 'tío', 'tía', 'primo', 'prima', 'sobrino', 'sobrina', 'esposo', 'esposa',
  'novio', 'novia', 'amante', 'compañero', 'colega', 'jefe', 'empleado', 'estudiante', 'profesor', 'alumno',
  'doctor', 'paciente', 'enfermero', 'policía', 'bombero', 'soldado', 'piloto', 'conductor', 'mecánico', 'electricista',
  'plomero', 'carpintero', 'pintor', 'jardinero', 'cocinero', 'camarero', 'dependiente', 'vendedor', 'comprador', 'cliente',
  'proveedor', 'fabricante', 'distribuidor', 'importador', 'exportador', 'banquero', 'contador', 'abogado', 'juez', 'fiscal',
  'periodista', 'escritor', 'poeta', 'músico', 'cantante', 'actor', 'director', 'productor', 'guionista', 'fotógrafo',
  'cineasta', 'artista', 'pintor', 'escultor', 'diseñador', 'arquitecto', 'ingeniero', 'científico', 'investigador', 'profesor',
  'estudiante', 'alumno', 'niño', 'niña', 'adolescente', 'adulto', 'anciano', 'persona', 'hombre', 'mujer',
  'animal', 'planta', 'mineral', 'elemento', 'compuesto', 'mezcla', 'solución', 'suspensión', 'emulsión', 'coloides',
  'ácido', 'base', 'sal', 'óxido', 'hidróxido', 'carbonato', 'sulfato', 'nitrato', 'fosfato', 'silicato',
  'metal', 'no metal', 'gas', 'líquido', 'sólido', 'plasma', 'energía', 'calor', 'luz', 'sonido',
  'electricidad', 'magnetismo', 'gravedad', 'fuerza', 'movimiento', 'velocidad', 'aceleración', 'masa', 'peso', 'densidad',
  'volumen', 'área', 'longitud', 'tiempo', 'temperatura', 'presión', 'frecuencia', 'amplitud', 'onda', 'partícula',
  'átomo', 'molécula', 'célula', 'tejido', 'órgano', 'sistema', 'organismo', 'población', 'comunidad', 'ecosistema',
  'biosfera', 'atmósfera', 'hidrosfera', 'litosfera', 'criosfera', 'pedosfera', 'antropósfera', 'noosfera', 'tecnósfera', 'sociósfera'
];

// Asegurarse de que tenga al menos 250
if (DEFAULT_WORD_BANK.length < 250) {
  throw new Error('Word bank must have at least 250 words');
}