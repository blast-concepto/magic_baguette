export interface Word {
  id: number;
  french: string;
  english: string;
  category: string;
  gender?: 'm' | 'f';
  examples: { french: string; english: string }[];
}

export const vocabulary: Word[] = [
  // === GREETINGS ===
  {
    id: 1,
    french: 'bonjour',
    english: 'hola / buenos días',
    category: 'greetings',
    examples: [
      { french: 'Bonjour, comment allez-vous ?', english: 'Hola, ¿cómo está usted?' },
      { french: 'Bonjour à tous !', english: '¡Buenos días a todos!' },
    ],
  },
  {
    id: 2,
    french: 'bonsoir',
    english: 'buenas tardes / buenas noches',
    category: 'greetings',
    examples: [
      { french: 'Bonsoir, madame.', english: 'Buenas noches, señora.' },
      { french: 'Bonsoir, bienvenue au restaurant.', english: 'Buenas noches, bienvenido al restaurante.' },
    ],
  },
  {
    id: 3,
    french: 'au revoir',
    english: 'adiós',
    category: 'greetings',
    examples: [
      { french: 'Au revoir et bonne journée !', english: '¡Adiós y que tenga un buen día!' },
      { french: 'Il a dit au revoir à ses amis.', english: 'Les dijo adiós a sus amigos.' },
    ],
  },
  {
    id: 4,
    french: 'merci',
    english: 'gracias',
    category: 'greetings',
    examples: [
      { french: 'Merci beaucoup pour votre aide.', english: 'Muchas gracias por su ayuda.' },
      { french: 'Merci, c\'est très gentil.', english: 'Gracias, es muy amable.' },
    ],
  },
  {
    id: 5,
    french: 's\'il vous plaît',
    english: 'por favor (formal)',
    category: 'greetings',
    examples: [
      { french: 'Un café, s\'il vous plaît.', english: 'Un café, por favor.' },
      { french: 'Asseyez-vous, s\'il vous plaît.', english: 'Siéntese, por favor.' },
    ],
  },
  {
    id: 6,
    french: 'excusez-moi',
    english: 'discúlpeme',
    category: 'greetings',
    examples: [
      { french: 'Excusez-moi, où est la gare ?', english: 'Discúlpeme, ¿dónde está la estación de tren?' },
      { french: 'Excusez-moi du retard.', english: 'Disculpe la demora.' },
    ],
  },
  {
    id: 7,
    french: 'pardon',
    english: 'perdón / disculpe',
    category: 'greetings',
    examples: [
      { french: 'Pardon, je ne vous ai pas vu.', english: 'Perdón, no lo vi.' },
      { french: 'Pardon ? Vous pouvez répéter ?', english: '¿Perdón? ¿Puede repetir?' },
    ],
  },
  {
    id: 8,
    french: 'salut',
    english: 'hola / chao (informal)',
    category: 'greetings',
    examples: [
      { french: 'Salut, ça va ?', english: 'Hola, ¿qué tal?' },
      { french: 'Allez, salut !', english: '¡Bueno, chao!' },
    ],
  },
  {
    id: 9,
    french: 'bienvenue',
    english: 'bienvenido',
    category: 'greetings',
    examples: [
      { french: 'Bienvenue en France !', english: '¡Bienvenido a Francia!' },
      { french: 'Bienvenue chez nous.', english: 'Bienvenido a nuestra casa.' },
    ],
  },
  {
    id: 10,
    french: 'bonne nuit',
    english: 'buenas noches',
    category: 'greetings',
    examples: [
      { french: 'Bonne nuit, dors bien.', english: 'Buenas noches, duerme bien.' },
      { french: 'Il est tard, bonne nuit à tous.', english: 'Es tarde, buenas noches a todos.' },
    ],
  },

  // === NUMBERS ===
  {
    id: 11,
    french: 'un',
    english: 'uno',
    category: 'numbers',
    examples: [
      { french: 'J\'ai un frère.', english: 'Tengo un hermano.' },
      { french: 'Il reste un gâteau.', english: 'Queda un pastel.' },
    ],
  },
  {
    id: 12,
    french: 'deux',
    english: 'dos',
    category: 'numbers',
    examples: [
      { french: 'J\'ai deux enfants.', english: 'Tengo dos hijos.' },
      { french: 'Deux cafés, s\'il vous plaît.', english: 'Dos cafés, por favor.' },
    ],
  },
  {
    id: 13,
    french: 'trois',
    english: 'tres',
    category: 'numbers',
    examples: [
      { french: 'Il y a trois chambres.', english: 'Hay tres habitaciones.' },
      { french: 'J\'attends depuis trois heures.', english: 'Llevo esperando tres horas.' },
    ],
  },
  {
    id: 14,
    french: 'dix',
    english: 'diez',
    category: 'numbers',
    examples: [
      { french: 'Ça coûte dix euros.', english: 'Cuesta diez euros.' },
      { french: 'Revenez dans dix minutes.', english: 'Vuelva en diez minutos.' },
    ],
  },
  {
    id: 15,
    french: 'cent',
    english: 'cien',
    category: 'numbers',
    examples: [
      { french: 'Il y a cent personnes ici.', english: 'Hay cien personas aquí.' },
      { french: 'Ça fait cent euros en tout.', english: 'Son cien euros en total.' },
    ],
  },

  // === TIME ===
  {
    id: 16,
    french: 'aujourd\'hui',
    english: 'hoy',
    category: 'time',
    examples: [
      { french: 'Aujourd\'hui, il fait beau.', english: 'Hoy hace buen tiempo.' },
      { french: 'Qu\'est-ce que tu fais aujourd\'hui ?', english: '¿Qué haces hoy?' },
    ],
  },
  {
    id: 17,
    french: 'demain',
    english: 'mañana',
    category: 'time',
    examples: [
      { french: 'On se voit demain.', english: 'Nos vemos mañana.' },
      { french: 'Demain, je pars en vacances.', english: 'Mañana me voy de vacaciones.' },
    ],
  },
  {
    id: 18,
    french: 'hier',
    english: 'ayer',
    category: 'time',
    examples: [
      { french: 'Hier, je suis allé au cinéma.', english: 'Ayer fui al cine.' },
      { french: 'Il a plu hier soir.', english: 'Llovió ayer por la noche.' },
    ],
  },
  {
    id: 19,
    french: 'maintenant',
    english: 'ahora',
    category: 'time',
    examples: [
      { french: 'Je veux partir maintenant.', english: 'Quiero irme ahora.' },
      { french: 'Maintenant, c\'est ton tour.', english: 'Ahora es tu turno.' },
    ],
  },
  {
    id: 20,
    french: 'toujours',
    english: 'siempre / todavía',
    category: 'time',
    examples: [
      { french: 'Elle est toujours en retard.', english: 'Ella siempre llega tarde.' },
      { french: 'Tu habites toujours à Paris ?', english: '¿Todavía vives en París?' },
    ],
  },
  {
    id: 21,
    french: 'jamais',
    english: 'nunca',
    category: 'time',
    examples: [
      { french: 'Je ne suis jamais allé en France.', english: 'Nunca he ido a Francia.' },
      { french: 'Il ne mange jamais de viande.', english: 'Nunca come carne.' },
    ],
  },
  {
    id: 22,
    french: 'souvent',
    english: 'a menudo',
    category: 'time',
    examples: [
      { french: 'Je vais souvent au marché.', english: 'Voy a menudo al mercado.' },
      { french: 'Il pleut souvent en automne.', english: 'Llueve a menudo en otoño.' },
    ],
  },
  {
    id: 23,
    french: 'le matin',
    english: 'la mañana',
    category: 'time',
    gender: 'm',
    examples: [
      { french: 'Je me lève tôt le matin.', english: 'Me levanto temprano por la mañana.' },
      { french: 'Le matin, je bois du café.', english: 'Por la mañana, tomo café.' },
    ],
  },
  {
    id: 24,
    french: 'le soir',
    english: 'la noche / la tarde',
    category: 'time',
    gender: 'm',
    examples: [
      { french: 'Le soir, je regarde la télé.', english: 'Por la noche, veo la tele.' },
      { french: 'On sort ce soir ?', english: '¿Salimos esta noche?' },
    ],
  },
  {
    id: 25,
    french: 'la semaine',
    english: 'la semana',
    category: 'time',
    gender: 'f',
    examples: [
      { french: 'La semaine prochaine, je suis en vacances.', english: 'La semana que viene estoy de vacaciones.' },
      { french: 'Je travaille cinq jours par semaine.', english: 'Trabajo cinco días a la semana.' },
    ],
  },

  // === FOOD ===
  {
    id: 26,
    french: 'le pain',
    english: 'el pan',
    category: 'food',
    gender: 'm',
    examples: [
      { french: 'Je voudrais du pain, s\'il vous plaît.', english: 'Quisiera pan, por favor.' },
      { french: 'Le pain frais est délicieux.', english: 'El pan fresco está delicioso.' },
    ],
  },
  {
    id: 27,
    french: 'l\'eau',
    english: 'el agua',
    category: 'food',
    gender: 'f',
    examples: [
      { french: 'Un verre d\'eau, s\'il vous plaît.', english: 'Un vaso de agua, por favor.' },
      { french: 'L\'eau est froide.', english: 'El agua está fría.' },
    ],
  },
  {
    id: 28,
    french: 'le vin',
    english: 'el vino',
    category: 'food',
    gender: 'm',
    examples: [
      { french: 'Un verre de vin rouge, s\'il vous plaît.', english: 'Una copa de vino tinto, por favor.' },
      { french: 'Le vin français est célèbre.', english: 'El vino francés es famoso.' },
    ],
  },
  {
    id: 29,
    french: 'le café',
    english: 'el café',
    category: 'food',
    gender: 'm',
    examples: [
      { french: 'Je prends un café le matin.', english: 'Tomo un café por la mañana.' },
      { french: 'Le café est trop chaud.', english: 'El café está demasiado caliente.' },
    ],
  },
  {
    id: 30,
    french: 'le fromage',
    english: 'el queso',
    category: 'food',
    gender: 'm',
    examples: [
      { french: 'La France a beaucoup de fromages.', english: 'Francia tiene muchos quesos.' },
      { french: 'Je voudrais du fromage.', english: 'Quisiera queso.' },
    ],
  },
  {
    id: 31,
    french: 'la viande',
    english: 'la carne',
    category: 'food',
    gender: 'f',
    examples: [
      { french: 'Je ne mange pas de viande.', english: 'No como carne.' },
      { french: 'La viande est bien cuite.', english: 'La carne está bien cocida.' },
    ],
  },
  {
    id: 32,
    french: 'le repas',
    english: 'la comida',
    category: 'food',
    gender: 'm',
    examples: [
      { french: 'Le repas était excellent.', english: 'La comida estuvo excelente.' },
      { french: 'On prépare le repas ensemble.', english: 'Preparamos la comida juntos.' },
    ],
  },
  {
    id: 33,
    french: 'le fruit',
    english: 'la fruta',
    category: 'food',
    gender: 'm',
    examples: [
      { french: 'Je mange des fruits chaque jour.', english: 'Como fruta todos los días.' },
      { french: 'Les fruits sont mûrs.', english: 'Las frutas están maduras.' },
    ],
  },
  {
    id: 34,
    french: 'le légume',
    english: 'la verdura',
    category: 'food',
    gender: 'm',
    examples: [
      { french: 'Les légumes sont bons pour la santé.', english: 'Las verduras son buenas para la salud.' },
      { french: 'J\'achète des légumes au marché.', english: 'Compro verduras en el mercado.' },
    ],
  },
  {
    id: 35,
    french: 'le poulet',
    english: 'el pollo',
    category: 'food',
    gender: 'm',
    examples: [
      { french: 'On mange du poulet ce soir.', english: 'Comemos pollo esta noche.' },
      { french: 'Le poulet rôti est mon plat préféré.', english: 'El pollo asado es mi plato favorito.' },
    ],
  },

  // === TRANSPORT ===
  {
    id: 36,
    french: 'la voiture',
    english: 'el coche / el carro',
    category: 'transport',
    gender: 'f',
    examples: [
      { french: 'Je vais au travail en voiture.', english: 'Voy al trabajo en coche.' },
      { french: 'La voiture est garée dehors.', english: 'El coche está aparcado afuera.' },
    ],
  },
  {
    id: 37,
    french: 'le train',
    english: 'el tren',
    category: 'transport',
    gender: 'm',
    examples: [
      { french: 'Le train arrive à quelle heure ?', english: '¿A qué hora llega el tren?' },
      { french: 'Je prends le train pour Lyon.', english: 'Tomo el tren a Lyon.' },
    ],
  },
  {
    id: 38,
    french: 'le bus',
    english: 'el autobús',
    category: 'transport',
    gender: 'm',
    examples: [
      { french: 'Le bus passe toutes les dix minutes.', english: 'El autobús pasa cada diez minutos.' },
      { french: 'J\'attends le bus depuis vingt minutes.', english: 'Llevo esperando el autobús veinte minutos.' },
    ],
  },
  {
    id: 39,
    french: 'le billet',
    english: 'el billete / el boleto',
    category: 'transport',
    gender: 'm',
    examples: [
      { french: 'J\'ai acheté un billet aller-retour.', english: 'Compré un billete de ida y vuelta.' },
      { french: 'Le billet coûte vingt euros.', english: 'El billete cuesta veinte euros.' },
    ],
  },
  {
    id: 40,
    french: 'la rue',
    english: 'la calle',
    category: 'transport',
    gender: 'f',
    examples: [
      { french: 'La rue est fermée aujourd\'hui.', english: 'La calle está cerrada hoy.' },
      { french: 'Tournez à droite dans cette rue.', english: 'Gire a la derecha en esta calle.' },
    ],
  },

  // === EMOTIONS ===
  {
    id: 41,
    french: 'content',
    english: 'contento / alegre',
    category: 'emotions',
    examples: [
      { french: 'Je suis content de te voir.', english: 'Estoy contento de verte.' },
      { french: 'Elle est très contente de son cadeau.', english: 'Ella está muy contenta con su regalo.' },
    ],
  },
  {
    id: 42,
    french: 'triste',
    english: 'triste',
    category: 'emotions',
    examples: [
      { french: 'Il est triste aujourd\'hui.', english: 'Él está triste hoy.' },
      { french: 'C\'est une histoire triste.', english: 'Es una historia triste.' },
    ],
  },
  {
    id: 43,
    french: 'fatigué',
    english: 'cansado',
    category: 'emotions',
    examples: [
      { french: 'Je suis fatigué après le travail.', english: 'Estoy cansado después del trabajo.' },
      { french: 'Les enfants sont fatigués.', english: 'Los niños están cansados.' },
    ],
  },
  {
    id: 44,
    french: 'en colère',
    english: 'enfadado / enojado',
    category: 'emotions',
    examples: [
      { french: 'Il est en colère contre moi.', english: 'Está enfadado conmigo.' },
      { french: 'Ne sois pas en colère.', english: 'No te enfades.' },
    ],
  },
  {
    id: 45,
    french: 'heureux',
    english: 'feliz',
    category: 'emotions',
    examples: [
      { french: 'Nous sommes très heureux.', english: 'Somos muy felices.' },
      { french: 'Il mène une vie heureuse.', english: 'Lleva una vida feliz.' },
    ],
  },
  {
    id: 46,
    french: 'inquiet',
    english: 'preocupado',
    category: 'emotions',
    examples: [
      { french: 'Je suis inquiet pour toi.', english: 'Estoy preocupado por ti.' },
      { french: 'Elle a l\'air inquiète.', english: 'Ella parece preocupada.' },
    ],
  },
  {
    id: 47,
    french: 'surpris',
    english: 'sorprendido',
    category: 'emotions',
    examples: [
      { french: 'Je suis surpris de te voir ici.', english: 'Estoy sorprendido de verte aquí.' },
      { french: 'Elle était très surprise.', english: 'Ella estaba muy sorprendida.' },
    ],
  },

  // === BODY ===
  {
    id: 48,
    french: 'la tête',
    english: 'la cabeza',
    category: 'body',
    gender: 'f',
    examples: [
      { french: 'J\'ai mal à la tête.', english: 'Me duele la cabeza.' },
      { french: 'Il a tourné la tête.', english: 'Giró la cabeza.' },
    ],
  },
  {
    id: 49,
    french: 'la main',
    english: 'la mano',
    category: 'body',
    gender: 'f',
    examples: [
      { french: 'Donnez-moi la main.', english: 'Déme la mano.' },
      { french: 'Elle a les mains froides.', english: 'Ella tiene las manos frías.' },
    ],
  },
  {
    id: 50,
    french: 'le cœur',
    english: 'el corazón',
    category: 'body',
    gender: 'm',
    examples: [
      { french: 'Mon cœur bat très vite.', english: 'Mi corazón late muy rápido.' },
      { french: 'Il a un grand cœur.', english: 'Tiene un gran corazón.' },
    ],
  },
  {
    id: 51,
    french: 'les yeux',
    english: 'los ojos',
    category: 'body',
    examples: [
      { french: 'Elle a les yeux bleus.', english: 'Ella tiene los ojos azules.' },
      { french: 'Ferme les yeux.', english: 'Cierra los ojos.' },
    ],
  },
  {
    id: 52,
    french: 'le dos',
    english: 'la espalda',
    category: 'body',
    gender: 'm',
    examples: [
      { french: 'J\'ai mal au dos.', english: 'Me duele la espalda.' },
      { french: 'Il a tourné le dos.', english: 'Dio la espalda.' },
    ],
  },

  // === CLOTHES ===
  {
    id: 53,
    french: 'la robe',
    english: 'el vestido',
    category: 'clothes',
    gender: 'f',
    examples: [
      { french: 'Elle porte une robe rouge.', english: 'Ella lleva un vestido rojo.' },
      { french: 'Cette robe te va bien.', english: 'Este vestido te queda bien.' },
    ],
  },
  {
    id: 54,
    french: 'le pantalon',
    english: 'el pantalón',
    category: 'clothes',
    gender: 'm',
    examples: [
      { french: 'Ce pantalon est trop grand.', english: 'Este pantalón es demasiado grande.' },
      { french: 'J\'ai acheté un nouveau pantalon.', english: 'Compré un pantalón nuevo.' },
    ],
  },
  {
    id: 55,
    french: 'les chaussures',
    english: 'los zapatos',
    category: 'clothes',
    examples: [
      { french: 'Mets tes chaussures.', english: 'Ponte los zapatos.' },
      { french: 'Ces chaussures sont confortables.', english: 'Estos zapatos son cómodos.' },
    ],
  },
  {
    id: 56,
    french: 'le manteau',
    english: 'el abrigo',
    category: 'clothes',
    gender: 'm',
    examples: [
      { french: 'Prends ton manteau, il fait froid.', english: 'Lleva tu abrigo, hace frío.' },
      { french: 'Le manteau est accroché dans l\'entrée.', english: 'El abrigo está colgado en la entrada.' },
    ],
  },

  // === HOUSE ===
  {
    id: 57,
    french: 'la maison',
    english: 'la casa',
    category: 'house',
    gender: 'f',
    examples: [
      { french: 'Je rentre à la maison.', english: 'Vuelvo a casa.' },
      { french: 'La maison est grande.', english: 'La casa es grande.' },
    ],
  },
  {
    id: 58,
    french: 'la chambre',
    english: 'el dormitorio / la habitación',
    category: 'house',
    gender: 'f',
    examples: [
      { french: 'La chambre est au premier étage.', english: 'El dormitorio está en el primer piso.' },
      { french: 'Range ta chambre !', english: '¡Ordena tu habitación!' },
    ],
  },
  {
    id: 59,
    french: 'la cuisine',
    english: 'la cocina',
    category: 'house',
    gender: 'f',
    examples: [
      { french: 'Je prépare le dîner dans la cuisine.', english: 'Preparo la cena en la cocina.' },
      { french: 'La cuisine est bien équipée.', english: 'La cocina está bien equipada.' },
    ],
  },
  {
    id: 60,
    french: 'la porte',
    english: 'la puerta',
    category: 'house',
    gender: 'f',
    examples: [
      { french: 'Ferme la porte, s\'il te plaît.', english: 'Cierra la puerta, por favor.' },
      { french: 'Quelqu\'un frappe à la porte.', english: 'Alguien llama a la puerta.' },
    ],
  },
  {
    id: 61,
    french: 'la fenêtre',
    english: 'la ventana',
    category: 'house',
    gender: 'f',
    examples: [
      { french: 'Ouvre la fenêtre, il fait chaud.', english: 'Abre la ventana, hace calor.' },
      { french: 'Je regarde par la fenêtre.', english: 'Miro por la ventana.' },
    ],
  },
  {
    id: 62,
    french: 'la clé',
    english: 'la llave',
    category: 'house',
    gender: 'f',
    examples: [
      { french: 'Où est la clé de la maison ?', english: '¿Dónde está la llave de la casa?' },
      { french: 'J\'ai perdu mes clés.', english: 'Perdí mis llaves.' },
    ],
  },
  {
    id: 63,
    french: 'l\'appartement',
    english: 'el apartamento',
    category: 'house',
    gender: 'm',
    examples: [
      { french: 'Mon appartement est petit mais confortable.', english: 'Mi apartamento es pequeño pero cómodo.' },
      { french: 'Je cherche un appartement à louer.', english: 'Busco un apartamento para alquilar.' },
    ],
  },

  // === WORK ===
  {
    id: 64,
    french: 'le travail',
    english: 'el trabajo',
    category: 'work',
    gender: 'm',
    examples: [
      { french: 'Je vais au travail en métro.', english: 'Voy al trabajo en metro.' },
      { french: 'Il cherche du travail.', english: 'Busca trabajo.' },
    ],
  },
  {
    id: 65,
    french: 'le bureau',
    english: 'la oficina / el escritorio',
    category: 'work',
    gender: 'm',
    examples: [
      { french: 'Je suis au bureau.', english: 'Estoy en la oficina.' },
      { french: 'Le bureau est rangé.', english: 'El escritorio está ordenado.' },
    ],
  },
  {
    id: 66,
    french: 'la réunion',
    english: 'la reunión',
    category: 'work',
    gender: 'f',
    examples: [
      { french: 'La réunion commence à dix heures.', english: 'La reunión empieza a las diez.' },
      { french: 'J\'ai une réunion importante.', english: 'Tengo una reunión importante.' },
    ],
  },
  {
    id: 67,
    french: 'l\'argent',
    english: 'el dinero',
    category: 'work',
    gender: 'm',
    examples: [
      { french: 'Je n\'ai pas assez d\'argent.', english: 'No tengo suficiente dinero.' },
      { french: 'L\'argent ne fait pas le bonheur.', english: 'El dinero no da la felicidad.' },
    ],
  },

  // === NATURE ===
  {
    id: 68,
    french: 'le soleil',
    english: 'el sol',
    category: 'nature',
    gender: 'm',
    examples: [
      { french: 'Le soleil brille aujourd\'hui.', english: 'El sol brilla hoy.' },
      { french: 'Je me suis assis au soleil.', english: 'Me senté al sol.' },
    ],
  },
  {
    id: 69,
    french: 'la mer',
    english: 'el mar',
    category: 'nature',
    gender: 'f',
    examples: [
      { french: 'La mer est calme ce matin.', english: 'El mar está tranquilo esta mañana.' },
      { french: 'On va à la mer cet été.', english: 'Vamos al mar este verano.' },
    ],
  },
  {
    id: 70,
    french: 'l\'arbre',
    english: 'el árbol',
    category: 'nature',
    gender: 'm',
    examples: [
      { french: 'L\'arbre est très grand.', english: 'El árbol es muy alto.' },
      { french: 'Les feuilles de l\'arbre tombent.', english: 'Las hojas del árbol se caen.' },
    ],
  },
  {
    id: 71,
    french: 'la fleur',
    english: 'la flor',
    category: 'nature',
    gender: 'f',
    examples: [
      { french: 'Les fleurs sont belles.', english: 'Las flores son bonitas.' },
      { french: 'Il m\'a offert des fleurs.', english: 'Me regaló flores.' },
    ],
  },
  {
    id: 72,
    french: 'la montagne',
    english: 'la montaña',
    category: 'nature',
    gender: 'f',
    examples: [
      { french: 'Nous allons à la montagne.', english: 'Vamos a la montaña.' },
      { french: 'La montagne est couverte de neige.', english: 'La montaña está cubierta de nieve.' },
    ],
  },

  // === ACTIONS (verbs) ===
  {
    id: 73,
    french: 'être',
    english: 'ser / estar',
    category: 'actions',
    examples: [
      { french: 'Je suis français.', english: 'Soy francés.' },
      { french: 'Elle est médecin.', english: 'Ella es médica.' },
    ],
  },
  {
    id: 74,
    french: 'avoir',
    english: 'tener',
    category: 'actions',
    examples: [
      { french: 'J\'ai trente ans.', english: 'Tengo treinta años.' },
      { french: 'Tu as faim ?', english: '¿Tienes hambre?' },
    ],
  },
  {
    id: 75,
    french: 'faire',
    english: 'hacer',
    category: 'actions',
    examples: [
      { french: 'Qu\'est-ce que tu fais ?', english: '¿Qué haces?' },
      { french: 'Je fais la cuisine.', english: 'Estoy cocinando.' },
    ],
  },
  {
    id: 76,
    french: 'aller',
    english: 'ir',
    category: 'actions',
    examples: [
      { french: 'Je vais au cinéma.', english: 'Voy al cine.' },
      { french: 'Comment allez-vous ?', english: '¿Cómo está usted?' },
    ],
  },
  {
    id: 77,
    french: 'venir',
    english: 'venir',
    category: 'actions',
    examples: [
      { french: 'Tu viens avec nous ?', english: '¿Vienes con nosotros?' },
      { french: 'Je viens de France.', english: 'Vengo de Francia.' },
    ],
  },
  {
    id: 78,
    french: 'dire',
    english: 'decir',
    category: 'actions',
    examples: [
      { french: 'Qu\'est-ce qu\'il a dit ?', english: '¿Qué dijo?' },
      { french: 'Dis-moi la vérité.', english: 'Dime la verdad.' },
    ],
  },
  {
    id: 79,
    french: 'pouvoir',
    english: 'poder',
    category: 'actions',
    examples: [
      { french: 'Je peux vous aider ?', english: '¿Puedo ayudarle?' },
      { french: 'On ne peut pas entrer.', english: 'No podemos entrar.' },
    ],
  },
  {
    id: 80,
    french: 'vouloir',
    english: 'querer',
    category: 'actions',
    examples: [
      { french: 'Je veux apprendre le français.', english: 'Quiero aprender francés.' },
      { french: 'Tu veux un café ?', english: '¿Quieres un café?' },
    ],
  },
  {
    id: 81,
    french: 'devoir',
    english: 'deber / tener que',
    category: 'actions',
    examples: [
      { french: 'Je dois partir maintenant.', english: 'Tengo que irme ahora.' },
      { french: 'Tu dois faire attention.', english: 'Debes tener cuidado.' },
    ],
  },
  {
    id: 82,
    french: 'savoir',
    english: 'saber (un hecho)',
    category: 'actions',
    examples: [
      { french: 'Je ne sais pas.', english: 'No lo sé.' },
      { french: 'Tu sais nager ?', english: '¿Sabes nadar?' },
    ],
  },
  {
    id: 83,
    french: 'connaître',
    english: 'conocer (una persona/lugar)',
    category: 'actions',
    examples: [
      { french: 'Tu connais Paris ?', english: '¿Conoces París?' },
      { french: 'Je ne connais personne ici.', english: 'No conozco a nadie aquí.' },
    ],
  },
  {
    id: 84,
    french: 'parler',
    english: 'hablar',
    category: 'actions',
    examples: [
      { french: 'Vous parlez français ?', english: '¿Habla usted francés?' },
      { french: 'Je voudrais parler au directeur.', english: 'Quisiera hablar con el director.' },
    ],
  },
  {
    id: 85,
    french: 'manger',
    english: 'comer',
    category: 'actions',
    examples: [
      { french: 'On mange à midi.', english: 'Comemos al mediodía.' },
      { french: 'Tu veux manger quelque chose ?', english: '¿Quieres comer algo?' },
    ],
  },
  {
    id: 86,
    french: 'boire',
    english: 'beber',
    category: 'actions',
    examples: [
      { french: 'Qu\'est-ce que tu veux boire ?', english: '¿Qué quieres beber?' },
      { french: 'Je bois de l\'eau.', english: 'Estoy bebiendo agua.' },
    ],
  },
  {
    id: 87,
    french: 'dormir',
    english: 'dormir',
    category: 'actions',
    examples: [
      { french: 'Je dors huit heures par nuit.', english: 'Duermo ocho horas por noche.' },
      { french: 'Les enfants dorment déjà.', english: 'Los niños ya están durmiendo.' },
    ],
  },
  {
    id: 88,
    french: 'travailler',
    english: 'trabajar',
    category: 'actions',
    examples: [
      { french: 'Je travaille dans un bureau.', english: 'Trabajo en una oficina.' },
      { french: 'Elle travaille beaucoup.', english: 'Ella trabaja mucho.' },
    ],
  },
  {
    id: 89,
    french: 'acheter',
    english: 'comprar',
    category: 'actions',
    examples: [
      { french: 'J\'ai acheté un nouveau livre.', english: 'Compré un libro nuevo.' },
      { french: 'Où peut-on acheter des billets ?', english: '¿Dónde se pueden comprar billetes?' },
    ],
  },
  {
    id: 90,
    french: 'regarder',
    english: 'mirar / ver',
    category: 'actions',
    examples: [
      { french: 'Regarde cette photo.', english: 'Mira esta foto.' },
      { french: 'Je regarde un film.', english: 'Estoy viendo una película.' },
    ],
  },
  {
    id: 91,
    french: 'écouter',
    english: 'escuchar',
    category: 'actions',
    examples: [
      { french: 'J\'écoute de la musique.', english: 'Escucho música.' },
      { french: 'Écoute-moi bien.', english: 'Escúchame bien.' },
    ],
  },
  {
    id: 92,
    french: 'comprendre',
    english: 'comprender / entender',
    category: 'actions',
    examples: [
      { french: 'Je ne comprends pas.', english: 'No entiendo.' },
      { french: 'Tu comprends le français ?', english: '¿Entiendes el francés?' },
    ],
  },
  {
    id: 93,
    french: 'prendre',
    english: 'tomar / coger',
    category: 'actions',
    examples: [
      { french: 'Je prends le bus.', english: 'Tomo el autobús.' },
      { french: 'Prenez votre temps.', english: 'Tómese su tiempo.' },
    ],
  },
  {
    id: 94,
    french: 'donner',
    english: 'dar',
    category: 'actions',
    examples: [
      { french: 'Donne-moi ton numéro.', english: 'Dame tu número.' },
      { french: 'Il m\'a donné un cadeau.', english: 'Me dio un regalo.' },
    ],
  },
  {
    id: 95,
    french: 'aimer',
    english: 'amar / gustar',
    category: 'actions',
    examples: [
      { french: 'J\'aime la France.', english: 'Amo Francia.' },
      { french: 'Tu aimes le chocolat ?', english: '¿Te gusta el chocolate?' },
    ],
  },
  {
    id: 96,
    french: 'penser',
    english: 'pensar',
    category: 'actions',
    examples: [
      { french: 'Je pense que c\'est une bonne idée.', english: 'Pienso que es una buena idea.' },
      { french: 'À quoi tu penses ?', english: '¿En qué piensas?' },
    ],
  },
  {
    id: 97,
    french: 'chercher',
    english: 'buscar',
    category: 'actions',
    examples: [
      { french: 'Je cherche la gare.', english: 'Busco la estación de tren.' },
      { french: 'Qu\'est-ce que tu cherches ?', english: '¿Qué buscas?' },
    ],
  },
  {
    id: 98,
    french: 'attendre',
    english: 'esperar',
    category: 'actions',
    examples: [
      { french: 'Attends-moi, s\'il te plaît.', english: 'Espérame, por favor.' },
      { french: 'J\'attends le bus.', english: 'Espero el autobús.' },
    ],
  },
  {
    id: 99,
    french: 'trouver',
    english: 'encontrar',
    category: 'actions',
    examples: [
      { french: 'Je ne trouve pas mes clés.', english: 'No encuentro mis llaves.' },
      { french: 'Tu as trouvé un appartement ?', english: '¿Encontraste un apartamento?' },
    ],
  },
  {
    id: 100,
    french: 'voir',
    english: 'ver',
    category: 'actions',
    examples: [
      { french: 'Je vois la tour Eiffel.', english: 'Veo la torre Eiffel.' },
      { french: 'On se voit demain.', english: 'Nos vemos mañana.' },
    ],
  },
  {
    id: 101,
    french: 'lire',
    english: 'leer',
    category: 'actions',
    examples: [
      { french: 'Je lis un livre chaque semaine.', english: 'Leo un libro cada semana.' },
      { french: 'Tu aimes lire ?', english: '¿Te gusta leer?' },
    ],
  },
  {
    id: 102,
    french: 'écrire',
    english: 'escribir',
    category: 'actions',
    examples: [
      { french: 'J\'écris un e-mail.', english: 'Estoy escribiendo un correo electrónico.' },
      { french: 'Écrivez votre nom ici.', english: 'Escriba su nombre aquí.' },
    ],
  },
  {
    id: 103,
    french: 'ouvrir',
    english: 'abrir',
    category: 'actions',
    examples: [
      { french: 'Ouvre la porte.', english: 'Abre la puerta.' },
      { french: 'Le magasin ouvre à neuf heures.', english: 'La tienda abre a las nueve.' },
    ],
  },
  {
    id: 104,
    french: 'fermer',
    english: 'cerrar',
    category: 'actions',
    examples: [
      { french: 'Ferme la fenêtre.', english: 'Cierra la ventana.' },
      { french: 'Le musée ferme à six heures.', english: 'El museo cierra a las seis.' },
    ],
  },
  {
    id: 105,
    french: 'commencer',
    english: 'empezar / comenzar',
    category: 'actions',
    examples: [
      { french: 'Le film commence à huit heures.', english: 'La película empieza a las ocho.' },
      { french: 'On commence demain.', english: 'Empezamos mañana.' },
    ],
  },
  {
    id: 106,
    french: 'finir',
    english: 'terminar',
    category: 'actions',
    examples: [
      { french: 'J\'ai fini mon travail.', english: 'Terminé mi trabajo.' },
      { french: 'Le cours finit à cinq heures.', english: 'La clase termina a las cinco.' },
    ],
  },
  {
    id: 107,
    french: 'aider',
    english: 'ayudar',
    category: 'actions',
    examples: [
      { french: 'Tu peux m\'aider ?', english: '¿Puedes ayudarme?' },
      { french: 'Je vais t\'aider.', english: 'Voy a ayudarte.' },
    ],
  },
  {
    id: 108,
    french: 'essayer',
    english: 'intentar / probar',
    category: 'actions',
    examples: [
      { french: 'Je vais essayer.', english: 'Voy a intentarlo.' },
      { french: 'Essaie encore une fois.', english: 'Inténtalo una vez más.' },
    ],
  },
  {
    id: 109,
    french: 'mettre',
    english: 'poner / ponerse',
    category: 'actions',
    examples: [
      { french: 'Mets ton manteau.', english: 'Ponte el abrigo.' },
      { french: 'Où as-tu mis les clés ?', english: '¿Dónde pusiste las llaves?' },
    ],
  },
  {
    id: 110,
    french: 'apprendre',
    english: 'aprender',
    category: 'actions',
    examples: [
      { french: 'J\'apprends le français.', english: 'Estoy aprendiendo francés.' },
      { french: 'Il apprend vite.', english: 'Aprende rápido.' },
    ],
  },
  {
    id: 111,
    french: 'partir',
    english: 'irse / salir',
    category: 'actions',
    examples: [
      { french: 'Je pars demain matin.', english: 'Me voy mañana por la mañana.' },
      { french: 'Le train part dans cinq minutes.', english: 'El tren sale en cinco minutos.' },
    ],
  },
  {
    id: 112,
    french: 'arriver',
    english: 'llegar',
    category: 'actions',
    examples: [
      { french: 'Le train arrive à midi.', english: 'El tren llega al mediodía.' },
      { french: 'Nous sommes arrivés en retard.', english: 'Llegamos tarde.' },
    ],
  },
  {
    id: 113,
    french: 'rester',
    english: 'quedarse',
    category: 'actions',
    examples: [
      { french: 'Je reste à la maison ce soir.', english: 'Me quedo en casa esta noche.' },
      { french: 'Reste ici, j\'arrive.', english: 'Quédate aquí, ya vengo.' },
    ],
  },
  {
    id: 114,
    french: 'demander',
    english: 'preguntar / pedir',
    category: 'actions',
    examples: [
      { french: 'Je vais demander le chemin.', english: 'Voy a preguntar el camino.' },
      { french: 'Il m\'a demandé mon nom.', english: 'Me preguntó mi nombre.' },
    ],
  },
  {
    id: 115,
    french: 'appeler',
    english: 'llamar',
    category: 'actions',
    examples: [
      { french: 'Appelle-moi ce soir.', english: 'Llámame esta noche.' },
      { french: 'Je m\'appelle Marie.', english: 'Me llamo Marie.' },
    ],
  },
  {
    id: 116,
    french: 'payer',
    english: 'pagar',
    category: 'actions',
    examples: [
      { french: 'Je peux payer par carte ?', english: '¿Puedo pagar con tarjeta?' },
      { french: 'C\'est moi qui paie.', english: 'Yo pago.' },
    ],
  },

  // === DESCRIPTIONS ===
  {
    id: 117,
    french: 'grand',
    english: 'grande / alto',
    category: 'descriptions',
    examples: [
      { french: 'La maison est très grande.', english: 'La casa es muy grande.' },
      { french: 'Il est grand pour son âge.', english: 'Es alto para su edad.' },
    ],
  },
  {
    id: 118,
    french: 'petit',
    english: 'pequeño / bajo',
    category: 'descriptions',
    examples: [
      { french: 'J\'ai un petit chien.', english: 'Tengo un perro pequeño.' },
      { french: 'La chambre est trop petite.', english: 'La habitación es demasiado pequeña.' },
    ],
  },
  {
    id: 119,
    french: 'bon',
    english: 'bueno',
    category: 'descriptions',
    examples: [
      { french: 'Le repas est très bon.', english: 'La comida está muy buena.' },
      { french: 'C\'est une bonne idée.', english: 'Es una buena idea.' },
    ],
  },
  {
    id: 120,
    french: 'mauvais',
    english: 'malo',
    category: 'descriptions',
    examples: [
      { french: 'Le temps est mauvais.', english: 'El tiempo está malo.' },
      { french: 'C\'est une mauvaise nouvelle.', english: 'Es una mala noticia.' },
    ],
  },
  {
    id: 121,
    french: 'nouveau',
    english: 'nuevo',
    category: 'descriptions',
    examples: [
      { french: 'J\'ai un nouveau travail.', english: 'Tengo un trabajo nuevo.' },
      { french: 'La nouvelle voiture est belle.', english: 'El coche nuevo es bonito.' },
    ],
  },
  {
    id: 122,
    french: 'vieux',
    english: 'viejo',
    category: 'descriptions',
    examples: [
      { french: 'C\'est un vieux bâtiment.', english: 'Es un edificio viejo.' },
      { french: 'La vieille ville est charmante.', english: 'El casco antiguo es encantador.' },
    ],
  },
  {
    id: 123,
    french: 'beau',
    english: 'hermoso / guapo',
    category: 'descriptions',
    examples: [
      { french: 'Il fait beau aujourd\'hui.', english: 'Hace buen tiempo hoy.' },
      { french: 'C\'est un beau pays.', english: 'Es un país hermoso.' },
    ],
  },
  {
    id: 124,
    french: 'chaud',
    english: 'caliente / caluroso',
    category: 'descriptions',
    examples: [
      { french: 'Il fait chaud dehors.', english: 'Hace calor afuera.' },
      { french: 'Le café est trop chaud.', english: 'El café está demasiado caliente.' },
    ],
  },
  {
    id: 125,
    french: 'froid',
    english: 'frío',
    category: 'descriptions',
    examples: [
      { french: 'Il fait froid en hiver.', english: 'Hace frío en invierno.' },
      { french: 'J\'ai les mains froides.', english: 'Tengo las manos frías.' },
    ],
  },
  {
    id: 126,
    french: 'facile',
    english: 'fácil',
    category: 'descriptions',
    examples: [
      { french: 'Cet exercice est facile.', english: 'Este ejercicio es fácil.' },
      { french: 'Le français n\'est pas facile.', english: 'El francés no es fácil.' },
    ],
  },
  {
    id: 127,
    french: 'difficile',
    english: 'difícil',
    category: 'descriptions',
    examples: [
      { french: 'La question est difficile.', english: 'La pregunta es difícil.' },
      { french: 'C\'est difficile à comprendre.', english: 'Es difícil de entender.' },
    ],
  },
  {
    id: 128,
    french: 'important',
    english: 'importante',
    category: 'descriptions',
    examples: [
      { french: 'C\'est très important.', english: 'Es muy importante.' },
      { french: 'J\'ai une réunion importante.', english: 'Tengo una reunión importante.' },
    ],
  },
  {
    id: 129,
    french: 'possible',
    english: 'posible',
    category: 'descriptions',
    examples: [
      { french: 'C\'est possible de changer ?', english: '¿Es posible cambiar?' },
      { french: 'Tout est possible.', english: 'Todo es posible.' },
    ],
  },
  {
    id: 130,
    french: 'cher',
    english: 'caro / querido',
    category: 'descriptions',
    examples: [
      { french: 'Ce restaurant est trop cher.', english: 'Este restaurante es demasiado caro.' },
      { french: 'Cher ami, comment vas-tu ?', english: 'Querido amigo, ¿cómo estás?' },
    ],
  },
  {
    id: 131,
    french: 'gratuit',
    english: 'gratis / gratuito',
    category: 'descriptions',
    examples: [
      { french: 'L\'entrée est gratuite.', english: 'La entrada es gratuita.' },
      { french: 'Ce service est gratuit.', english: 'Este servicio es gratuito.' },
    ],
  },
  {
    id: 132,
    french: 'ouvert',
    english: 'abierto',
    category: 'descriptions',
    examples: [
      { french: 'Le magasin est ouvert.', english: 'La tienda está abierta.' },
      { french: 'La fenêtre est ouverte.', english: 'La ventana está abierta.' },
    ],
  },
  {
    id: 133,
    french: 'fermé',
    english: 'cerrado',
    category: 'descriptions',
    examples: [
      { french: 'Le musée est fermé le lundi.', english: 'El museo está cerrado los lunes.' },
      { french: 'La porte est fermée à clé.', english: 'La puerta está cerrada con llave.' },
    ],
  },
  {
    id: 134,
    french: 'rapide',
    english: 'rápido',
    category: 'descriptions',
    examples: [
      { french: 'Le train est très rapide.', english: 'El tren es muy rápido.' },
      { french: 'C\'est un repas rapide.', english: 'Es una comida rápida.' },
    ],
  },
  {
    id: 135,
    french: 'lent',
    english: 'lento',
    category: 'descriptions',
    examples: [
      { french: 'Parlez plus lentement, s\'il vous plaît.', english: 'Hable más despacio, por favor.' },
      { french: 'Le service est un peu lent.', english: 'El servicio es un poco lento.' },
    ],
  },
  {
    id: 136,
    french: 'joli',
    english: 'bonito / lindo',
    category: 'descriptions',
    examples: [
      { french: 'C\'est une jolie robe.', english: 'Es un vestido bonito.' },
      { french: 'Le village est très joli.', english: 'El pueblo es muy bonito.' },
    ],
  },

  // === QUESTIONS ===
  {
    id: 137,
    french: 'qui',
    english: 'quién',
    category: 'questions',
    examples: [
      { french: 'Qui est-ce ?', english: '¿Quién es?' },
      { french: 'Qui veut du café ?', english: '¿Quién quiere café?' },
    ],
  },
  {
    id: 138,
    french: 'quoi',
    english: 'qué',
    category: 'questions',
    examples: [
      { french: 'Tu fais quoi ce soir ?', english: '¿Qué haces esta noche?' },
      { french: 'C\'est quoi, ça ?', english: '¿Qué es eso?' },
    ],
  },
  {
    id: 139,
    french: 'où',
    english: 'dónde',
    category: 'questions',
    examples: [
      { french: 'Où est la gare ?', english: '¿Dónde está la estación de tren?' },
      { french: 'Où habites-tu ?', english: '¿Dónde vives?' },
    ],
  },
  {
    id: 140,
    french: 'quand',
    english: 'cuándo',
    category: 'questions',
    examples: [
      { french: 'Quand est-ce que tu arrives ?', english: '¿Cuándo llegas?' },
      { french: 'Quand part le train ?', english: '¿Cuándo sale el tren?' },
    ],
  },
  {
    id: 141,
    french: 'comment',
    english: 'cómo',
    category: 'questions',
    examples: [
      { french: 'Comment tu t\'appelles ?', english: '¿Cómo te llamas?' },
      { french: 'Comment ça marche ?', english: '¿Cómo funciona?' },
    ],
  },
  {
    id: 142,
    french: 'pourquoi',
    english: 'por qué',
    category: 'questions',
    examples: [
      { french: 'Pourquoi tu es en retard ?', english: '¿Por qué llegas tarde?' },
      { french: 'Pourquoi pas ?', english: '¿Por qué no?' },
    ],
  },
  {
    id: 143,
    french: 'combien',
    english: 'cuánto / cuántos',
    category: 'questions',
    examples: [
      { french: 'Combien ça coûte ?', english: '¿Cuánto cuesta?' },
      { french: 'Combien de personnes ?', english: '¿Cuántas personas?' },
    ],
  },
  {
    id: 144,
    french: 'quel',
    english: 'cuál / qué',
    category: 'questions',
    examples: [
      { french: 'Quel est ton nom ?', english: '¿Cuál es tu nombre?' },
      { french: 'Quelle heure est-il ?', english: '¿Qué hora es?' },
    ],
  },
  {
    id: 145,
    french: 'est-ce que',
    english: '(partícula interrogativa)',
    category: 'questions',
    examples: [
      { french: 'Est-ce que tu parles français ?', english: '¿Hablas francés?' },
      { french: 'Est-ce que c\'est loin ?', english: '¿Está lejos?' },
    ],
  },

  // === CONNECTORS ===
  {
    id: 146,
    french: 'et',
    english: 'y',
    category: 'connectors',
    examples: [
      { french: 'Un café et un croissant.', english: 'Un café y un cruasán.' },
      { french: 'Toi et moi.', english: 'Tú y yo.' },
    ],
  },
  {
    id: 147,
    french: 'ou',
    english: 'o',
    category: 'connectors',
    examples: [
      { french: 'Thé ou café ?', english: '¿Té o café?' },
      { french: 'Tu viens ou pas ?', english: '¿Vienes o no?' },
    ],
  },
  {
    id: 148,
    french: 'mais',
    english: 'pero',
    category: 'connectors',
    examples: [
      { french: 'C\'est cher, mais c\'est bon.', english: 'Es caro, pero es bueno.' },
      { french: 'Je veux bien, mais je ne peux pas.', english: 'Me gustaría, pero no puedo.' },
    ],
  },
  {
    id: 149,
    french: 'parce que',
    english: 'porque',
    category: 'connectors',
    examples: [
      { french: 'Je reste parce que je suis fatigué.', english: 'Me quedo porque estoy cansado.' },
      { french: 'Pourquoi ? Parce que c\'est important.', english: '¿Por qué? Porque es importante.' },
    ],
  },
  {
    id: 150,
    french: 'donc',
    english: 'entonces / por lo tanto',
    category: 'connectors',
    examples: [
      { french: 'Il pleut, donc je reste ici.', english: 'Llueve, así que me quedo aquí.' },
      { french: 'Je pense, donc je suis.', english: 'Pienso, luego existo.' },
    ],
  },
  {
    id: 151,
    french: 'aussi',
    english: 'también',
    category: 'connectors',
    examples: [
      { french: 'Moi aussi, je veux venir.', english: 'Yo también quiero ir.' },
      { french: 'C\'est aussi très beau.', english: 'También es muy bonito.' },
    ],
  },
  {
    id: 152,
    french: 'alors',
    english: 'entonces / pues',
    category: 'connectors',
    examples: [
      { french: 'Alors, qu\'est-ce qu\'on fait ?', english: 'Entonces, ¿qué hacemos?' },
      { french: 'Je suis fatigué, alors je vais dormir.', english: 'Estoy cansado, así que voy a dormir.' },
    ],
  },
  {
    id: 153,
    french: 'si',
    english: 'si / tan',
    category: 'connectors',
    examples: [
      { french: 'Si tu veux, on peut y aller.', english: 'Si quieres, podemos ir.' },
      { french: 'C\'est si beau !', english: '¡Es tan bonito!' },
    ],
  },
  {
    id: 154,
    french: 'comme',
    english: 'como',
    category: 'connectors',
    examples: [
      { french: 'Fais comme chez toi.', english: 'Estás en tu casa.' },
      { french: 'Il est grand comme son père.', english: 'Es alto como su padre.' },
    ],
  },
  {
    id: 155,
    french: 'pendant',
    english: 'durante',
    category: 'connectors',
    examples: [
      { french: 'Pendant les vacances, je lis.', english: 'Durante las vacaciones, leo.' },
      { french: 'J\'ai attendu pendant une heure.', english: 'Esperé durante una hora.' },
    ],
  },
  {
    id: 156,
    french: 'avec',
    english: 'con',
    category: 'connectors',
    examples: [
      { french: 'Je suis avec mes amis.', english: 'Estoy con mis amigos.' },
      { french: 'Un café avec du lait.', english: 'Un café con leche.' },
    ],
  },
  {
    id: 157,
    french: 'sans',
    english: 'sin',
    category: 'connectors',
    examples: [
      { french: 'Un café sans sucre.', english: 'Un café sin azúcar.' },
      { french: 'Je ne peux pas vivre sans toi.', english: 'No puedo vivir sin ti.' },
    ],
  },
  {
    id: 158,
    french: 'pour',
    english: 'para',
    category: 'connectors',
    examples: [
      { french: 'C\'est pour toi.', english: 'Es para ti.' },
      { french: 'Je travaille pour gagner ma vie.', english: 'Trabajo para ganarme la vida.' },
    ],
  },
  {
    id: 159,
    french: 'encore',
    english: 'otra vez / todavía / más',
    category: 'connectors',
    examples: [
      { french: 'Encore une fois, s\'il vous plaît.', english: 'Una vez más, por favor.' },
      { french: 'Tu en veux encore ?', english: '¿Quieres más?' },
    ],
  },
  {
    id: 160,
    french: 'très',
    english: 'muy',
    category: 'connectors',
    examples: [
      { french: 'C\'est très bien.', english: 'Está muy bien.' },
      { french: 'Merci, c\'est très gentil.', english: 'Gracias, es muy amable.' },
    ],
  },
  {
    id: 161,
    french: 'trop',
    english: 'demasiado',
    category: 'connectors',
    examples: [
      { french: 'C\'est trop cher.', english: 'Es demasiado caro.' },
      { french: 'Tu travailles trop.', english: 'Trabajas demasiado.' },
    ],
  },
  {
    id: 162,
    french: 'bien',
    english: 'bien',
    category: 'connectors',
    examples: [
      { french: 'Ça va bien, merci.', english: 'Estoy bien, gracias.' },
      { french: 'C\'est bien.', english: 'Está bien.' },
    ],
  },
  {
    id: 163,
    french: 'ne...pas',
    english: 'no',
    category: 'connectors',
    examples: [
      { french: 'Je ne sais pas.', english: 'No lo sé.' },
      { french: 'Ce n\'est pas possible.', english: 'No es posible.' },
    ],
  },
  {
    id: 164,
    french: 'déjà',
    english: 'ya',
    category: 'connectors',
    examples: [
      { french: 'J\'ai déjà mangé.', english: 'Ya comí.' },
      { french: 'Tu es déjà là ?', english: '¿Ya estás aquí?' },
    ],
  },
  {
    id: 165,
    french: 'peut-être',
    english: 'quizás / tal vez',
    category: 'connectors',
    examples: [
      { french: 'Peut-être demain.', english: 'Quizás mañana.' },
      { french: 'Il viendra peut-être.', english: 'Tal vez venga.' },
    ],
  },

  // === PLACES ===
  {
    id: 166,
    french: 'la gare',
    english: 'la estación de tren',
    category: 'places',
    gender: 'f',
    examples: [
      { french: 'Je vais à la gare.', english: 'Voy a la estación de tren.' },
      { french: 'La gare est au centre-ville.', english: 'La estación está en el centro de la ciudad.' },
    ],
  },
  {
    id: 167,
    french: 'le restaurant',
    english: 'el restaurante',
    category: 'places',
    gender: 'm',
    examples: [
      { french: 'On va au restaurant ce soir.', english: 'Vamos al restaurante esta noche.' },
      { french: 'Ce restaurant est excellent.', english: 'Este restaurante es excelente.' },
    ],
  },
  {
    id: 168,
    french: 'l\'hôpital',
    english: 'el hospital',
    category: 'places',
    gender: 'm',
    examples: [
      { french: 'Il est à l\'hôpital.', english: 'Está en el hospital.' },
      { french: 'L\'hôpital est loin d\'ici.', english: 'El hospital está lejos de aquí.' },
    ],
  },
  {
    id: 169,
    french: 'l\'école',
    english: 'la escuela',
    category: 'places',
    gender: 'f',
    examples: [
      { french: 'Les enfants vont à l\'école.', english: 'Los niños van a la escuela.' },
      { french: 'L\'école commence à huit heures.', english: 'La escuela empieza a las ocho.' },
    ],
  },
  {
    id: 170,
    french: 'le magasin',
    english: 'la tienda',
    category: 'places',
    gender: 'm',
    examples: [
      { french: 'Le magasin ferme à sept heures.', english: 'La tienda cierra a las siete.' },
      { french: 'Je vais au magasin.', english: 'Voy a la tienda.' },
    ],
  },
  {
    id: 171,
    french: 'l\'aéroport',
    english: 'el aeropuerto',
    category: 'places',
    gender: 'm',
    examples: [
      { french: 'L\'aéroport est à trente kilomètres.', english: 'El aeropuerto está a treinta kilómetros.' },
      { french: 'Je vais à l\'aéroport.', english: 'Voy al aeropuerto.' },
    ],
  },
  {
    id: 172,
    french: 'la banque',
    english: 'el banco',
    category: 'places',
    gender: 'f',
    examples: [
      { french: 'La banque est fermée le dimanche.', english: 'El banco está cerrado los domingos.' },
      { french: 'Je dois aller à la banque.', english: 'Tengo que ir al banco.' },
    ],
  },

  // === FAMILY ===
  {
    id: 173,
    french: 'la famille',
    english: 'la familia',
    category: 'family',
    gender: 'f',
    examples: [
      { french: 'Ma famille habite à Lyon.', english: 'Mi familia vive en Lyon.' },
      { french: 'La famille est importante.', english: 'La familia es importante.' },
    ],
  },
  {
    id: 174,
    french: 'la mère',
    english: 'la madre',
    category: 'family',
    gender: 'f',
    examples: [
      { french: 'Ma mère est professeur.', english: 'Mi madre es profesora.' },
      { french: 'J\'appelle ma mère chaque jour.', english: 'Llamo a mi madre todos los días.' },
    ],
  },
  {
    id: 175,
    french: 'le père',
    english: 'el padre',
    category: 'family',
    gender: 'm',
    examples: [
      { french: 'Mon père travaille à Paris.', english: 'Mi padre trabaja en París.' },
      { french: 'Il ressemble à son père.', english: 'Se parece a su padre.' },
    ],
  },
  {
    id: 176,
    french: 'l\'enfant',
    english: 'el niño / la niña',
    category: 'family',
    gender: 'm',
    examples: [
      { french: 'Les enfants jouent dans le jardin.', english: 'Los niños juegan en el jardín.' },
      { french: 'J\'ai deux enfants.', english: 'Tengo dos hijos.' },
    ],
  },
  {
    id: 177,
    french: 'le fils',
    english: 'el hijo',
    category: 'family',
    gender: 'm',
    examples: [
      { french: 'Mon fils a dix ans.', english: 'Mi hijo tiene diez años.' },
      { french: 'C\'est le fils de Marie.', english: 'Es el hijo de Marie.' },
    ],
  },
  {
    id: 178,
    french: 'la fille',
    english: 'la hija / la chica',
    category: 'family',
    gender: 'f',
    examples: [
      { french: 'Ma fille étudie la médecine.', english: 'Mi hija estudia medicina.' },
      { french: 'C\'est une petite fille.', english: 'Es una niña pequeña.' },
    ],
  },
  {
    id: 179,
    french: 'le mari',
    english: 'el esposo / el marido',
    category: 'family',
    gender: 'm',
    examples: [
      { french: 'Mon mari est français.', english: 'Mi esposo es francés.' },
      { french: 'Son mari est médecin.', english: 'Su esposo es médico.' },
    ],
  },
  {
    id: 180,
    french: 'la femme',
    english: 'la esposa / la mujer',
    category: 'family',
    gender: 'f',
    examples: [
      { french: 'Ma femme est américaine.', english: 'Mi esposa es americana.' },
      { french: 'Cette femme est très gentille.', english: 'Esta mujer es muy amable.' },
    ],
  },
  {
    id: 181,
    french: 'l\'ami',
    english: 'el amigo',
    category: 'family',
    gender: 'm',
    examples: [
      { french: 'C\'est mon meilleur ami.', english: 'Es mi mejor amigo.' },
      { french: 'Je sors avec des amis.', english: 'Salgo con amigos.' },
    ],
  },
  {
    id: 182,
    french: 'l\'homme',
    english: 'el hombre',
    category: 'family',
    gender: 'm',
    examples: [
      { french: 'Cet homme est très grand.', english: 'Este hombre es muy alto.' },
      { french: 'L\'homme traverse la rue.', english: 'El hombre cruza la calle.' },
    ],
  },

  // === SHOPPING ===
  {
    id: 183,
    french: 'le prix',
    english: 'el precio',
    category: 'shopping',
    gender: 'm',
    examples: [
      { french: 'Quel est le prix ?', english: '¿Cuál es el precio?' },
      { french: 'Le prix est trop élevé.', english: 'El precio es demasiado alto.' },
    ],
  },
  {
    id: 184,
    french: 'la carte',
    english: 'la tarjeta / el mapa / el menú',
    category: 'shopping',
    gender: 'f',
    examples: [
      { french: 'Je paye par carte.', english: 'Pago con tarjeta.' },
      { french: 'La carte, s\'il vous plaît.', english: 'El menú, por favor.' },
    ],
  },
  {
    id: 185,
    french: 'la taille',
    english: 'la talla',
    category: 'shopping',
    gender: 'f',
    examples: [
      { french: 'Quelle est votre taille ?', english: '¿Cuál es su talla?' },
      { french: 'Vous avez une taille plus grande ?', english: '¿Tiene una talla más grande?' },
    ],
  },
  {
    id: 186,
    french: 'le sac',
    english: 'la bolsa / el bolso',
    category: 'shopping',
    gender: 'm',
    examples: [
      { french: 'Où est mon sac ?', english: '¿Dónde está mi bolso?' },
      { french: 'Un sac en plastique, s\'il vous plaît.', english: 'Una bolsa de plástico, por favor.' },
    ],
  },
  {
    id: 187,
    french: 'le cadeau',
    english: 'el regalo',
    category: 'shopping',
    gender: 'm',
    examples: [
      { french: 'C\'est un cadeau pour toi.', english: 'Es un regalo para ti.' },
      { french: 'Merci pour le cadeau.', english: 'Gracias por el regalo.' },
    ],
  },

  // === HEALTH ===
  {
    id: 188,
    french: 'le médecin',
    english: 'el médico',
    category: 'health',
    gender: 'm',
    examples: [
      { french: 'Je dois voir le médecin.', english: 'Tengo que ver al médico.' },
      { french: 'Le médecin arrive dans dix minutes.', english: 'El médico llega en diez minutos.' },
    ],
  },
  {
    id: 189,
    french: 'malade',
    english: 'enfermo',
    category: 'health',
    examples: [
      { french: 'Je suis malade.', english: 'Estoy enfermo.' },
      { french: 'L\'enfant est malade depuis hier.', english: 'El niño está enfermo desde ayer.' },
    ],
  },
  {
    id: 190,
    french: 'la douleur',
    english: 'el dolor',
    category: 'health',
    gender: 'f',
    examples: [
      { french: 'J\'ai une douleur au genou.', english: 'Tengo un dolor en la rodilla.' },
      { french: 'La douleur est forte.', english: 'El dolor es fuerte.' },
    ],
  },
  {
    id: 191,
    french: 'la pharmacie',
    english: 'la farmacia',
    category: 'health',
    gender: 'f',
    examples: [
      { french: 'Où est la pharmacie la plus proche ?', english: '¿Dónde está la farmacia más cercana?' },
      { french: 'J\'ai acheté des médicaments à la pharmacie.', english: 'Compré medicamentos en la farmacia.' },
    ],
  },
  {
    id: 192,
    french: 'le médicament',
    english: 'el medicamento',
    category: 'health',
    gender: 'm',
    examples: [
      { french: 'Prenez ce médicament trois fois par jour.', english: 'Tome este medicamento tres veces al día.' },
      { french: 'Je n\'ai pas de médicaments.', english: 'No tengo medicamentos.' },
    ],
  },

  // === WEATHER ===
  {
    id: 193,
    french: 'le temps',
    english: 'el tiempo / el clima',
    category: 'weather',
    gender: 'm',
    examples: [
      { french: 'Quel temps fait-il ?', english: '¿Qué tiempo hace?' },
      { french: 'Je n\'ai pas le temps.', english: 'No tengo tiempo.' },
    ],
  },
  {
    id: 194,
    french: 'la pluie',
    english: 'la lluvia',
    category: 'weather',
    gender: 'f',
    examples: [
      { french: 'La pluie tombe depuis ce matin.', english: 'Llueve desde esta mañana.' },
      { french: 'J\'aime marcher sous la pluie.', english: 'Me gusta caminar bajo la lluvia.' },
    ],
  },
  {
    id: 195,
    french: 'la neige',
    english: 'la nieve',
    category: 'weather',
    gender: 'f',
    examples: [
      { french: 'Il y a de la neige en montagne.', english: 'Hay nieve en la montaña.' },
      { french: 'Les enfants jouent dans la neige.', english: 'Los niños juegan en la nieve.' },
    ],
  },
  {
    id: 196,
    french: 'le vent',
    english: 'el viento',
    category: 'weather',
    gender: 'm',
    examples: [
      { french: 'Le vent est fort aujourd\'hui.', english: 'El viento es fuerte hoy.' },
      { french: 'Il y a du vent.', english: 'Hace viento.' },
    ],
  },
  {
    id: 197,
    french: 'le nuage',
    english: 'la nube',
    category: 'weather',
    gender: 'm',
    examples: [
      { french: 'Il y a des nuages dans le ciel.', english: 'Hay nubes en el cielo.' },
      { french: 'Le soleil est caché par les nuages.', english: 'El sol está oculto por las nubes.' },
    ],
  },
  {
    id: 198,
    french: 'le ciel',
    english: 'el cielo',
    category: 'weather',
    gender: 'm',
    examples: [
      { french: 'Le ciel est bleu.', english: 'El cielo es azul.' },
      { french: 'Regarde le ciel ce soir.', english: 'Mira el cielo esta noche.' },
    ],
  },
  {
    id: 199,
    french: 'il fait beau',
    english: 'hace buen tiempo',
    category: 'weather',
    examples: [
      { french: 'Il fait beau, on va se promener.', english: 'Hace buen tiempo, vamos a pasear.' },
      { french: 'Il fait beau en été.', english: 'Hace buen tiempo en verano.' },
    ],
  },
  {
    id: 200,
    french: 'il pleut',
    english: 'está lloviendo',
    category: 'weather',
    examples: [
      { french: 'Il pleut depuis ce matin.', english: 'Llueve desde esta mañana.' },
      { french: 'Prends un parapluie, il pleut.', english: 'Lleva un paraguas, está lloviendo.' },
    ],
  },
];

export const categories: string[] = [
  'greetings',
  'numbers',
  'time',
  'food',
  'transport',
  'emotions',
  'body',
  'clothes',
  'house',
  'work',
  'nature',
  'actions',
  'descriptions',
  'questions',
  'connectors',
  'places',
  'family',
  'shopping',
  'health',
  'weather',
];
