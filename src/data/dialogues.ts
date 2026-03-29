export interface DialogueLine {
  speaker: 'A' | 'B';
  french: string;
  spanish: string;
}

export interface Dialogue {
  id: string;
  title: string;
  context: string;
  tags: string[];
  lines: DialogueLine[];
}

export const dialogues: Dialogue[] = [
  {
    id: 'cafe-restaurant',
    title: 'En el café',
    context: 'Estás en un café parisino y quieres pedir algo de beber y un postre.',
    tags: ['café', 'comida', 'básico'],
    lines: [
      { speaker: 'A', french: 'Bonjour, je voudrais un café crème, s\'il vous plaît.', spanish: 'Hola, quisiera un café con crema, por favor.' },
      { speaker: 'B', french: 'Bien sûr. Vous désirez autre chose ?', spanish: 'Por supuesto. ¿Desea algo más?' },
      { speaker: 'A', french: 'Oui, est-ce que vous avez des croissants ?', spanish: 'Sí, ¿tienen croissants?' },
      { speaker: 'B', french: 'Oui, il nous reste des croissants au beurre et au chocolat.', spanish: 'Sí, nos quedan croissants de mantequilla y de chocolate.' },
      { speaker: 'A', french: 'Je vais prendre un croissant au beurre.', spanish: 'Voy a tomar un croissant de mantequilla.' },
      { speaker: 'B', french: 'Très bien. Ça fait quatre euros cinquante.', spanish: 'Muy bien. Son cuatro euros con cincuenta.' },
      { speaker: 'A', french: 'Voilà. Merci beaucoup !', spanish: 'Aquí tiene. ¡Muchas gracias!' },
    ],
  },
  {
    id: 'pedir-direcciones',
    title: 'Pedir direcciones',
    context: 'Estás perdido en el centro de la ciudad y necesitas llegar al museo.',
    tags: ['direcciones', 'ciudad', 'básico'],
    lines: [
      { speaker: 'A', french: 'Excusez-moi, je cherche le musée d\'Orsay. Vous pouvez m\'aider ?', spanish: 'Disculpe, busco el museo de Orsay. ¿Puede ayudarme?' },
      { speaker: 'B', french: 'Oui, bien sûr. Continuez tout droit pendant deux cents mètres.', spanish: 'Sí, claro. Continúe recto durante doscientos metros.' },
      { speaker: 'A', french: 'D\'accord, et ensuite ?', spanish: 'De acuerdo, ¿y después?' },
      { speaker: 'B', french: 'Tournez à gauche au feu rouge. Le musée est sur votre droite.', spanish: 'Gire a la izquierda en el semáforo. El museo está a su derecha.' },
      { speaker: 'A', french: 'C\'est loin d\'ici ?', spanish: '¿Está lejos de aquí?' },
      { speaker: 'B', french: 'Non, c\'est à environ cinq minutes à pied.', spanish: 'No, está a unos cinco minutos a pie.' },
      { speaker: 'A', french: 'Merci beaucoup, vous êtes très aimable.', spanish: 'Muchas gracias, es usted muy amable.' },
    ],
  },
  {
    id: 'saludar-desconocido',
    title: 'Saludar a un desconocido',
    context: 'Estás en un parque y alguien se sienta a tu lado en un banco.',
    tags: ['saludos', 'social', 'básico'],
    lines: [
      { speaker: 'A', french: 'Bonjour ! Il fait beau aujourd\'hui, n\'est-ce pas ?', spanish: '¡Hola! Hace buen tiempo hoy, ¿verdad?' },
      { speaker: 'B', french: 'Oui, c\'est une très belle journée. Vous venez souvent ici ?', spanish: 'Sí, es un día muy bonito. ¿Viene usted a menudo aquí?' },
      { speaker: 'A', french: 'Oui, j\'habite juste à côté. Et vous ?', spanish: 'Sí, vivo justo al lado. ¿Y usted?' },
      { speaker: 'B', french: 'Non, je suis en visite. Je viens d\'Espagne.', spanish: 'No, estoy de visita. Vengo de España.' },
      { speaker: 'A', french: 'Ah, c\'est formidable ! Bienvenue à Paris.', spanish: '¡Ah, eso es estupendo! Bienvenido a París.' },
      { speaker: 'B', french: 'Merci, c\'est très gentil. Paris est vraiment magnifique.', spanish: 'Gracias, es muy amable. París es realmente magnífico.' },
    ],
  },
  {
    id: 'comprar-mercado',
    title: 'Comprar en el mercado',
    context: 'Estás en un mercado al aire libre comprando frutas y verduras.',
    tags: ['mercado', 'comida', 'compras'],
    lines: [
      { speaker: 'A', french: 'Bonjour ! Je voudrais un kilo de pommes, s\'il vous plaît.', spanish: 'Buenos días. Quisiera un kilo de manzanas, por favor.' },
      { speaker: 'B', french: 'Voilà. Elles sont très bonnes aujourd\'hui. Autre chose ?', spanish: 'Aquí tiene. Están muy buenas hoy. ¿Algo más?' },
      { speaker: 'A', french: 'Oui, combien coûtent les fraises ?', spanish: 'Sí, ¿cuánto cuestan las fresas?' },
      { speaker: 'B', french: 'Trois euros la barquette.', spanish: 'Tres euros la bandejita.' },
      { speaker: 'A', french: 'J\'en prends deux barquettes, s\'il vous plaît.', spanish: 'Me llevo dos bandejitas, por favor.' },
      { speaker: 'B', french: 'D\'accord. Ça fait neuf euros en tout.', spanish: 'De acuerdo. Son nueve euros en total.' },
      { speaker: 'A', french: 'Voici un billet de dix. Gardez la monnaie.', spanish: 'Aquí tiene un billete de diez. Quédese con el cambio.' },
      { speaker: 'B', french: 'Oh merci, c\'est gentil ! Bonne journée !', spanish: '¡Oh gracias, qué amable! ¡Buen día!' },
    ],
  },
  {
    id: 'tomar-metro',
    title: 'Tomar el metro',
    context: 'Necesitas tomar el metro por primera vez en París y pides ayuda en la taquilla.',
    tags: ['transporte', 'metro', 'ciudad'],
    lines: [
      { speaker: 'A', french: 'Bonjour, je voudrais aller à Montmartre. Quelle ligne je dois prendre ?', spanish: 'Hola, quisiera ir a Montmartre. ¿Qué línea debo tomar?' },
      { speaker: 'B', french: 'Vous devez prendre la ligne douze, direction Mairie d\'Issy.', spanish: 'Debe tomar la línea doce, dirección Mairie d\'Issy.' },
      { speaker: 'A', french: 'Est-ce qu\'il faut changer de ligne ?', spanish: '¿Hay que cambiar de línea?' },
      { speaker: 'B', french: 'Non, c\'est direct. Descendez à la station Abbesses.', spanish: 'No, es directo. Baje en la estación Abbesses.' },
      { speaker: 'A', french: 'D\'accord. Un ticket, s\'il vous plaît.', spanish: 'De acuerdo. Un billete, por favor.' },
      { speaker: 'B', french: 'Ça fait deux euros dix. Le quai est à gauche.', spanish: 'Son dos euros con diez. El andén está a la izquierda.' },
      { speaker: 'A', french: 'Merci. À quelle fréquence passent les trains ?', spanish: 'Gracias. ¿Con qué frecuencia pasan los trenes?' },
      { speaker: 'B', french: 'Toutes les trois minutes environ. Bon voyage !', spanish: 'Aproximadamente cada tres minutos. ¡Buen viaje!' },
    ],
  },
  {
    id: 'conocer-alguien',
    title: 'Conocer a alguien por primera vez',
    context: 'Estás en una fiesta y te presentan a alguien nuevo.',
    tags: ['social', 'presentaciones', 'básico'],
    lines: [
      { speaker: 'A', french: 'Bonsoir ! Je m\'appelle Marie. Et toi ?', spanish: '¡Buenas noches! Me llamo Marie. ¿Y tú?' },
      { speaker: 'B', french: 'Enchanté, Marie. Moi, c\'est Carlos. Tu es d\'ici ?', spanish: 'Encantado, Marie. Yo soy Carlos. ¿Eres de aquí?' },
      { speaker: 'A', french: 'Oui, je suis née à Lyon mais j\'habite à Paris depuis trois ans.', spanish: 'Sí, nací en Lyon pero vivo en París desde hace tres años.' },
      { speaker: 'B', french: 'Et qu\'est-ce que tu fais dans la vie ?', spanish: '¿Y a qué te dedicas?' },
      { speaker: 'A', french: 'Je suis professeure de français. Et toi ?', spanish: 'Soy profesora de francés. ¿Y tú?' },
      { speaker: 'B', french: 'Je suis ingénieur. Je suis ici pour un projet de six mois.', spanish: 'Soy ingeniero. Estoy aquí por un proyecto de seis meses.' },
      { speaker: 'A', french: 'C\'est super ! Si tu veux, je peux te montrer la ville un jour.', spanish: '¡Genial! Si quieres, puedo enseñarte la ciudad algún día.' },
      { speaker: 'B', french: 'Avec plaisir ! Ce serait vraiment sympa.', spanish: '¡Con gusto! Sería muy agradable.' },
    ],
  },
  {
    id: 'farmacia',
    title: 'En la farmacia',
    context: 'Tienes dolor de cabeza y vas a una farmacia a comprar medicamentos.',
    tags: ['salud', 'farmacia', 'necesidades'],
    lines: [
      { speaker: 'A', french: 'Bonjour, j\'ai très mal à la tête depuis ce matin.', spanish: 'Buenos días, me duele mucho la cabeza desde esta mañana.' },
      { speaker: 'B', french: 'Vous avez de la fièvre ou d\'autres symptômes ?', spanish: '¿Tiene fiebre u otros síntomas?' },
      { speaker: 'A', french: 'Non, juste un mal de tête. Je crois que c\'est la fatigue.', spanish: 'No, solo dolor de cabeza. Creo que es el cansancio.' },
      { speaker: 'B', french: 'Je vous conseille du paracétamol. Prenez un comprimé toutes les six heures.', spanish: 'Le aconsejo paracetamol. Tome una pastilla cada seis horas.' },
      { speaker: 'A', french: 'D\'accord. Est-ce que je peux aussi avoir de la crème solaire ?', spanish: 'De acuerdo. ¿Puedo también comprar crema solar?' },
      { speaker: 'B', french: 'Oui, bien sûr. Indice trente ou cinquante ?', spanish: 'Sí, claro. ¿Índice treinta o cincuenta?' },
      { speaker: 'A', french: 'Cinquante, s\'il vous plaît. Ça fait combien en tout ?', spanish: 'Cincuenta, por favor. ¿Cuánto es en total?' },
      { speaker: 'B', french: 'Ça fait douze euros quatre-vingts. Bon rétablissement !', spanish: 'Son doce euros con ochenta. ¡Que se mejore!' },
    ],
  },
  {
    id: 'hablar-clima',
    title: 'Hablar del clima',
    context: 'Estás esperando el autobús y empiezas a charlar con alguien sobre el tiempo.',
    tags: ['clima', 'social', 'conversación'],
    lines: [
      { speaker: 'A', french: 'Quelle pluie ! Vous avez un parapluie ?', spanish: '¡Qué lluvia! ¿Tiene usted un paraguas?' },
      { speaker: 'B', french: 'Non, malheureusement. Je n\'ai pas regardé la météo ce matin.', spanish: 'No, desafortunadamente. No miré el pronóstico esta mañana.' },
      { speaker: 'A', french: 'Moi non plus. Hier il faisait si beau.', spanish: 'Yo tampoco. Ayer hacía tan buen tiempo.' },
      { speaker: 'B', french: 'Oui, c\'est typique du printemps à Paris. Le temps change vite.', spanish: 'Sí, es típico de la primavera en París. El tiempo cambia rápido.' },
      { speaker: 'A', french: 'On annonce du soleil pour le week-end, au moins.', spanish: 'Anuncian sol para el fin de semana, al menos.' },
      { speaker: 'B', french: 'Tant mieux ! J\'ai prévu une promenade au bord de la Seine.', spanish: '¡Mejor! Tengo planeado un paseo a orillas del Sena.' },
      { speaker: 'A', french: 'Bonne idée. Ah, voilà le bus ! Enfin au sec.', spanish: 'Buena idea. ¡Ah, ahí viene el autobús! Por fin a cubierto.' },
    ],
  },
];
