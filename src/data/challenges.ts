export interface ChallengeBlank {
  answer: string;
  hint: string;
}

export interface Challenge {
  id: number;
  title: string;
  titleFr: string;
  situation: string;
  dialogue: {
    speaker: string;
    text: string;
  }[];
  blanks: ChallengeBlank[];
  difficulty: 1 | 2 | 3;
}

export const challenges: Challenge[] = [
  // ============================================================
  // FÁCIL (difficulty 1) — Challenges 1-10
  // ============================================================
  {
    id: 1,
    title: "En la panadería",
    titleFr: "À la boulangerie",
    situation:
      "Entras en una panadería francesa para comprar una baguette y dos cruasanes para el desayuno.",
    dialogue: [
      { speaker: "Boulanger", text: "Bonjour ! Qu'est-ce que vous ___1___ ?" },
      {
        speaker: "Vous",
        text: "Bonjour, je ___2___ une baguette et deux croissants, s'il vous plaît.",
      },
      { speaker: "Boulanger", text: "Très bien. Ce sera tout ?" },
      { speaker: "Vous", text: "Oui, c'est ___3___. Combien ça ___4___ ?" },
      { speaker: "Boulanger", text: "Ça fait trois euros cinquante." },
      { speaker: "Vous", text: "Voilà. ___5___, au revoir !" },
    ],
    blanks: [
      { answer: "désirez", hint: "desear / querer (formal)" },
      { answer: "voudrais", hint: "me gustaría" },
      { answer: "tout", hint: "todo" },
      { answer: "coûte", hint: "cuesta" },
      { answer: "Merci", hint: "Gracias" },
    ],
    difficulty: 1,
  },
  {
    id: 2,
    title: "Presentarse",
    titleFr: "Se présenter",
    situation:
      "Conoces a un nuevo compañero en el trabajo y te presentas por primera vez.",
    dialogue: [
      { speaker: "Collègue", text: "Bonjour, je ___1___ Marie. Et vous ?" },
      {
        speaker: "Vous",
        text: "Enchanté, je m'appelle Thomas. Je ___2___ le nouveau stagiaire.",
      },
      {
        speaker: "Collègue",
        text: "Bienvenue ! Vous ___3___ d'où ?",
      },
      { speaker: "Vous", text: "Je viens ___4___ États-Unis." },
      {
        speaker: "Collègue",
        text: "Ah, c'est bien ! Vous ___5___ français très bien.",
      },
      { speaker: "Vous", text: "Merci beaucoup, c'est gentil !" },
    ],
    blanks: [
      { answer: "m'appelle", hint: "me llamo (reflexivo)" },
      { answer: "suis", hint: "soy" },
      { answer: "venez", hint: "viene (usted)" },
      { answer: "des", hint: "de los (contracción de + les)" },
      { answer: "parlez", hint: "habla (usted)" },
    ],
    difficulty: 1,
  },
  {
    id: 3,
    title: "En el café",
    titleFr: "Au café",
    situation:
      "Te sientas en la terraza de un café parisino y pides una bebida y un aperitivo.",
    dialogue: [
      {
        speaker: "Serveur",
        text: "Bonjour, qu'est-ce que je vous ___1___ ?",
      },
      {
        speaker: "Vous",
        text: "Je voudrais un ___2___ , s'il vous plaît.",
      },
      { speaker: "Serveur", text: "Un grand ou un petit ?" },
      { speaker: "Vous", text: "Un ___3___, s'il vous plaît." },
      {
        speaker: "Serveur",
        text: "Avec quelque chose à ___4___ ?",
      },
      {
        speaker: "Vous",
        text: "Oui, un croissant au ___5___, s'il vous plaît.",
      },
    ],
    blanks: [
      { answer: "sers", hint: "servir" },
      { answer: "café", hint: "café" },
      { answer: "grand", hint: "grande" },
      { answer: "manger", hint: "comer" },
      { answer: "beurre", hint: "mantequilla" },
    ],
    difficulty: 1,
  },
  {
    id: 4,
    title: "Pedir indicaciones",
    titleFr: "Demander son chemin",
    situation:
      "Estás perdido en una ciudad francesa y le preguntas a un desconocido cómo llegar a la estación de tren.",
    dialogue: [
      {
        speaker: "Vous",
        text: "Excusez-moi, je ___1___ la gare, s'il vous plaît ?",
      },
      {
        speaker: "Passant",
        text: "Bien sûr ! Vous allez tout ___2___, puis vous tournez à ___3___.",
      },
      { speaker: "Vous", text: "C'est ___4___ d'ici ?" },
      {
        speaker: "Passant",
        text: "Non, c'est à cinq ___5___ à pied.",
      },
      { speaker: "Vous", text: "Merci beaucoup, monsieur !" },
    ],
    blanks: [
      { answer: "cherche", hint: "estoy buscando" },
      { answer: "droit", hint: "recto" },
      { answer: "gauche", hint: "izquierda" },
      { answer: "loin", hint: "lejos" },
      { answer: "minutes", hint: "minutos" },
    ],
    difficulty: 1,
  },
  {
    id: 5,
    title: "En el supermercado",
    titleFr: "Au supermarché",
    situation:
      "Estás haciendo la compra y necesitas ayuda para encontrar el pasillo de la leche.",
    dialogue: [
      {
        speaker: "Vous",
        text: "Pardon, où se ___1___ le rayon des produits laitiers ?",
      },
      {
        speaker: "Employé",
        text: "C'est au fond du ___2___, à droite.",
      },
      { speaker: "Vous", text: "Merci. Vous avez du lait ___3___ ?" },
      {
        speaker: "Employé",
        text: "Oui, il est sur l'___4___ du bas.",
      },
      {
        speaker: "Vous",
        text: "Parfait. Je ___5___ aussi du fromage, merci.",
      },
    ],
    blanks: [
      { answer: "trouve", hint: "se encuentra (reflexivo)" },
      { answer: "magasin", hint: "tienda" },
      { answer: "demi-écrémé", hint: "semidesnatada" },
      { answer: "étagère", hint: "estante" },
      { answer: "prends", hint: "tomo / llevaré" },
    ],
    difficulty: 1,
  },
  {
    id: 6,
    title: "El tiempo",
    titleFr: "La météo",
    situation:
      "Charlas con tu vecino sobre el tiempo en una mañana lluviosa.",
    dialogue: [
      {
        speaker: "Voisin",
        text: "Bonjour ! Quel mauvais ___1___ aujourd'hui !",
      },
      {
        speaker: "Vous",
        text: "Oui, il ___2___ depuis ce matin.",
      },
      {
        speaker: "Voisin",
        text: "La météo dit qu'il va faire ___3___ demain.",
      },
      {
        speaker: "Vous",
        text: "Tant mieux ! J'espère qu'il y aura du ___4___.",
      },
      {
        speaker: "Voisin",
        text: "Oui, on pourra se ___5___ au parc.",
      },
    ],
    blanks: [
      { answer: "temps", hint: "tiempo / clima" },
      { answer: "pleut", hint: "está lloviendo" },
      { answer: "beau", hint: "bonito / buen tiempo" },
      { answer: "soleil", hint: "sol" },
      { answer: "promener", hint: "pasear (reflexivo)" },
    ],
    difficulty: 1,
  },
  {
    id: 7,
    title: "Comprar un billete de tren",
    titleFr: "Acheter un billet de train",
    situation:
      "Estás en la taquilla comprando un billete de tren de ida a Lyon.",
    dialogue: [
      {
        speaker: "Agent",
        text: "Bonjour, je peux vous ___1___ ?",
      },
      {
        speaker: "Vous",
        text: "Bonjour, je voudrais un ___2___ pour Lyon, s'il vous plaît.",
      },
      { speaker: "Agent", text: "Aller simple ou aller-___3___ ?" },
      { speaker: "Vous", text: "Aller ___4___, s'il vous plaît." },
      {
        speaker: "Agent",
        text: "Le prochain train ___5___ à quatorze heures. Voie numéro trois.",
      },
      { speaker: "Vous", text: "Merci beaucoup !" },
    ],
    blanks: [
      { answer: "aider", hint: "ayudar" },
      { answer: "billet", hint: "billete" },
      { answer: "retour", hint: "vuelta" },
      { answer: "simple", hint: "sencillo / solo ida" },
      { answer: "part", hint: "sale / parte" },
    ],
    difficulty: 1,
  },
  {
    id: 8,
    title: "En la farmacia",
    titleFr: "À la pharmacie",
    situation:
      "Tienes dolor de cabeza y vas a una farmacia francesa a comprar medicamentos.",
    dialogue: [
      { speaker: "Pharmacien", text: "Bonjour, que puis-je faire pour vous ?" },
      {
        speaker: "Vous",
        text: "J'ai mal à la ___1___. Vous avez quelque chose ?",
      },
      {
        speaker: "Pharmacien",
        text: "Oui, je vous conseille ce ___2___. Prenez un comprimé toutes les six ___3___.",
      },
      {
        speaker: "Vous",
        text: "D'accord. Je dois le ___4___ avec de l'eau ?",
      },
      {
        speaker: "Pharmacien",
        text: "Oui, pendant les ___5___. Bonne guérison !",
      },
    ],
    blanks: [
      { answer: "tête", hint: "cabeza" },
      { answer: "médicament", hint: "medicamento" },
      { answer: "heures", hint: "horas" },
      { answer: "prendre", hint: "tomar" },
      { answer: "repas", hint: "comidas" },
    ],
    difficulty: 1,
  },
  {
    id: 9,
    title: "Hablar de la familia",
    titleFr: "Parler de sa famille",
    situation:
      "Un amigo francés te pregunta sobre tu familia durante la cena.",
    dialogue: [
      {
        speaker: "Ami",
        text: "Tu as des ___1___ et sœurs ?",
      },
      {
        speaker: "Vous",
        text: "Oui, j'ai un ___2___ aîné et une petite sœur.",
      },
      {
        speaker: "Ami",
        text: "Et tes ___3___, ils font quoi ?",
      },
      {
        speaker: "Vous",
        text: "Mon père est ___4___ et ma mère est professeure.",
      },
      {
        speaker: "Ami",
        text: "C'est super ! Vous êtes une grande ___5___ alors !",
      },
    ],
    blanks: [
      { answer: "frères", hint: "hermanos" },
      { answer: "frère", hint: "hermano" },
      { answer: "parents", hint: "padres" },
      { answer: "médecin", hint: "médico" },
      { answer: "famille", hint: "familia" },
    ],
    difficulty: 1,
  },
  {
    id: 10,
    title: "Registrarse en un hotel",
    titleFr: "À la réception de l'hôtel",
    situation:
      "Llegas a un hotel en Niza y te registras en la recepción.",
    dialogue: [
      { speaker: "Réceptionniste", text: "Bonsoir, bienvenue ! Vous avez une ___1___ ?" },
      {
        speaker: "Vous",
        text: "Oui, j'ai réservé une ___2___ pour deux nuits au nom de Martin.",
      },
      {
        speaker: "Réceptionniste",
        text: "Très bien. Votre chambre est au troisième ___3___.",
      },
      {
        speaker: "Vous",
        text: "Le petit ___4___ est à quelle heure ?",
      },
      {
        speaker: "Réceptionniste",
        text: "De sept heures à dix heures. Voici votre ___5___. Bonne soirée !",
      },
    ],
    blanks: [
      { answer: "réservation", hint: "reserva" },
      { answer: "chambre", hint: "habitación" },
      { answer: "étage", hint: "piso / planta" },
      { answer: "déjeuner", hint: "desayuno (petit ...)" },
      { answer: "clé", hint: "llave" },
    ],
    difficulty: 1,
  },

  // ============================================================
  // INTERMEDIO (difficulty 2) — Challenges 11-20
  // ============================================================
  {
    id: 11,
    title: "En el restaurante",
    titleFr: "Au restaurant",
    situation:
      "Estás cenando en un restaurante en Burdeos y pides una comida completa con vino.",
    dialogue: [
      {
        speaker: "Serveur",
        text: "Bonsoir, avez-vous ___1___ la carte ?",
      },
      {
        speaker: "Vous",
        text: "Oui, en entrée je ___2___ la soupe à l'oignon.",
      },
      {
        speaker: "Serveur",
        text: "Et comme plat ___3___ ?",
      },
      {
        speaker: "Vous",
        text: "Le canard confit avec des ___4___ sautées, s'il vous plaît.",
      },
      {
        speaker: "Serveur",
        text: "Excellent choix. Souhaitez-vous un verre de vin pour ___5___ ?",
      },
      {
        speaker: "Vous",
        text: "Oui, qu'est-ce que vous me ___6___ avec le canard ?",
      },
      {
        speaker: "Serveur",
        text: "Je vous recommande un Bordeaux rouge.",
      },
    ],
    blanks: [
      { answer: "consulté", hint: "consultado / revisado (participio pasado)" },
      { answer: "prendrai", hint: "tomaré (futuro)" },
      { answer: "principal", hint: "principal (plato)" },
      { answer: "pommes de terre", hint: "patatas" },
      { answer: "accompagner", hint: "acompañar" },
      { answer: "conseillez", hint: "recomienda (usted)" },
    ],
    difficulty: 2,
  },
  {
    id: 12,
    title: "Una llamada al dentista",
    titleFr: "Un appel chez le dentiste",
    situation:
      "Llamas a la consulta de un dentista para pedir una cita porque tienes dolor de muelas.",
    dialogue: [
      {
        speaker: "Secrétaire",
        text: "Cabinet dentaire du docteur Morel, bonjour.",
      },
      {
        speaker: "Vous",
        text: "Bonjour, je voudrais ___1___ un rendez-vous. J'ai mal aux ___2___.",
      },
      {
        speaker: "Secrétaire",
        text: "Depuis ___3___ avez-vous mal ?",
      },
      {
        speaker: "Vous",
        text: "Depuis ___4___ jours. La douleur est de plus en plus ___5___.",
      },
      {
        speaker: "Secrétaire",
        text: "Je peux vous proposer demain à neuf heures. Ça vous ___6___ ?",
      },
      { speaker: "Vous", text: "Oui, c'est parfait. Merci beaucoup." },
    ],
    blanks: [
      { answer: "prendre", hint: "pedir / tomar" },
      { answer: "dents", hint: "dientes" },
      { answer: "quand", hint: "cuándo" },
      { answer: "trois", hint: "tres" },
      { answer: "forte", hint: "fuerte (femenino)" },
      { answer: "convient", hint: "conviene / le va bien" },
    ],
    difficulty: 2,
  },
  {
    id: 13,
    title: "Alquilar un apartamento",
    titleFr: "Louer un appartement",
    situation:
      "Visitas un piso en París y le preguntas al propietario sobre las condiciones del alquiler.",
    dialogue: [
      {
        speaker: "Propriétaire",
        text: "Voici l'appartement. Il fait soixante ___1___ carrés.",
      },
      {
        speaker: "Vous",
        text: "Il est très ___2___. Le loyer est de combien ?",
      },
      {
        speaker: "Propriétaire",
        text: "Neuf cents euros par ___3___, charges comprises.",
      },
      {
        speaker: "Vous",
        text: "Est-ce que les ___4___ sont autorisés ?",
      },
      {
        speaker: "Propriétaire",
        text: "Oui, les chats et les petits chiens. Il faut verser une ___5___ de garantie d'un mois.",
      },
      {
        speaker: "Vous",
        text: "Très bien. Quand est-ce que je pourrais ___6___ ?",
      },
      {
        speaker: "Propriétaire",
        text: "À partir du premier du mois prochain.",
      },
    ],
    blanks: [
      { answer: "mètres", hint: "metros" },
      { answer: "lumineux", hint: "luminoso / lleno de luz" },
      { answer: "mois", hint: "mes" },
      { answer: "animaux", hint: "animales / mascotas" },
      { answer: "caution", hint: "fianza / depósito de garantía" },
      { answer: "emménager", hint: "mudarse" },
    ],
    difficulty: 2,
  },
  {
    id: 14,
    title: "En la oficina de correos",
    titleFr: "À la poste",
    situation:
      "Necesitas enviar un paquete a Canadá y comprar sellos en la oficina de correos.",
    dialogue: [
      {
        speaker: "Guichetier",
        text: "Bonjour, qu'est-ce qu'il vous ___1___ ?",
      },
      {
        speaker: "Vous",
        text: "Je voudrais ___2___ ce colis au Canada.",
      },
      {
        speaker: "Guichetier",
        text: "Posez-le sur la ___3___, s'il vous plaît. Il pèse un kilo deux cents.",
      },
      {
        speaker: "Vous",
        text: "Combien de ___4___ pour la livraison ?",
      },
      {
        speaker: "Guichetier",
        text: "En envoi standard, comptez sept à dix jours ___5___.",
      },
      {
        speaker: "Vous",
        text: "D'accord. J'aurais aussi besoin de cinq ___6___ pour la France.",
      },
    ],
    blanks: [
      { answer: "faut", hint: "necesita (impersonal: il ...)" },
      { answer: "envoyer", hint: "enviar" },
      { answer: "balance", hint: "balanza" },
      { answer: "temps", hint: "tiempo" },
      { answer: "ouvrables", hint: "laborables (días)" },
      { answer: "timbres", hint: "sellos" },
    ],
    difficulty: 2,
  },
  {
    id: 15,
    title: "Una entrevista de trabajo",
    titleFr: "Un entretien d'embauche",
    situation:
      "Estás en una entrevista de trabajo para un puesto de marketing y necesitas hablar de tu experiencia.",
    dialogue: [
      {
        speaker: "Recruteur",
        text: "Parlez-moi de votre ___1___ professionnelle.",
      },
      {
        speaker: "Vous",
        text: "J'ai ___2___ pendant trois ans dans une agence de publicité.",
      },
      {
        speaker: "Recruteur",
        text: "Quelles sont vos principales ___3___ ?",
      },
      {
        speaker: "Vous",
        text: "Je suis créatif, organisé, et je ___4___ bien en équipe.",
      },
      {
        speaker: "Recruteur",
        text: "Pourquoi voulez-vous ___5___ d'entreprise ?",
      },
      {
        speaker: "Vous",
        text: "Je cherche de nouveaux ___6___ et votre entreprise m'inspire beaucoup.",
      },
    ],
    blanks: [
      { answer: "expérience", hint: "experiencia" },
      { answer: "travaillé", hint: "trabajado (participio pasado)" },
      { answer: "qualités", hint: "cualidades / fortalezas" },
      { answer: "travaille", hint: "trabajo (presente)" },
      { answer: "changer", hint: "cambiar" },
      { answer: "défis", hint: "desafíos / retos" },
    ],
    difficulty: 2,
  },
  {
    id: 16,
    title: "En el médico",
    titleFr: "Chez le médecin",
    situation:
      "Visitas a un médico de cabecera porque llevas varios días con síntomas de gripe.",
    dialogue: [
      {
        speaker: "Médecin",
        text: "Bonjour, qu'est-ce qui vous ___1___ ?",
      },
      {
        speaker: "Vous",
        text: "J'ai de la ___2___ depuis trois jours et je tousse beaucoup.",
      },
      {
        speaker: "Médecin",
        text: "Avez-vous d'autres ___3___ ? Mal à la gorge ?",
      },
      {
        speaker: "Vous",
        text: "Oui, et je me sens très ___4___.",
      },
      {
        speaker: "Médecin",
        text: "Je vais vous ___5___. Ouvrez la bouche, s'il vous plaît.",
      },
      {
        speaker: "Vous",
        text: "Est-ce que j'ai besoin d'une ___6___ ?",
      },
      {
        speaker: "Médecin",
        text: "Oui, je vais vous prescrire un antibiotique et du sirop contre la toux.",
      },
    ],
    blanks: [
      { answer: "amène", hint: "trae (a usted aquí)" },
      { answer: "fièvre", hint: "fiebre" },
      { answer: "symptômes", hint: "síntomas" },
      { answer: "fatigué", hint: "cansado" },
      { answer: "examiner", hint: "examinar" },
      { answer: "ordonnance", hint: "receta médica" },
    ],
    difficulty: 2,
  },
  {
    id: 17,
    title: "En la tienda de ropa",
    titleFr: "Dans un magasin de vêtements",
    situation:
      "Estás comprando ropa y quieres probarte una chaqueta en otra talla.",
    dialogue: [
      {
        speaker: "Vendeuse",
        text: "Bonjour, je peux vous renseigner ?",
      },
      {
        speaker: "Vous",
        text: "Oui, je cherche cette ___1___ en taille moyenne.",
      },
      {
        speaker: "Vendeuse",
        text: "Je vais vérifier. Vous ___2___ l'essayer si vous voulez.",
      },
      {
        speaker: "Vous",
        text: "Oui, où sont les ___3___ d'essayage ?",
      },
      {
        speaker: "Vendeuse",
        text: "Au fond à gauche. Alors, ça vous ___4___ ?",
      },
      {
        speaker: "Vous",
        text: "C'est un peu trop ___5___. Vous avez la taille au-dessus ?",
      },
      {
        speaker: "Vendeuse",
        text: "Bien sûr, je vous l'___6___ tout de suite.",
      },
    ],
    blanks: [
      { answer: "veste", hint: "chaqueta" },
      { answer: "pouvez", hint: "puede (usted)" },
      { answer: "cabines", hint: "probadores" },
      { answer: "va", hint: "queda / sienta" },
      { answer: "serré", hint: "ajustado / apretado" },
      { answer: "apporte", hint: "traer" },
    ],
    difficulty: 2,
  },
  {
    id: 18,
    title: "Tomar el autobús",
    titleFr: "Prendre le bus",
    situation:
      "Estás esperando en una parada de autobús y le preguntas a otro pasajero sobre la ruta.",
    dialogue: [
      {
        speaker: "Vous",
        text: "Excusez-moi, est-ce que le bus numéro douze ___1___ bien ici ?",
      },
      {
        speaker: "Passager",
        text: "Oui, mais il a du ___2___. Il devrait arriver dans dix minutes.",
      },
      {
        speaker: "Vous",
        text: "Savez-vous s'il va ___3___ la place de la République ?",
      },
      {
        speaker: "Passager",
        text: "Oui, c'est le cinquième ___4___ après celui-ci.",
      },
      {
        speaker: "Vous",
        text: "Est-ce qu'on peut ___5___ le ticket dans le bus ?",
      },
      {
        speaker: "Passager",
        text: "Oui, mais c'est moins ___6___ qu'au distributeur. Ça coûte deux euros.",
      },
    ],
    blanks: [
      { answer: "s'arrête", hint: "para (reflexivo)" },
      { answer: "retard", hint: "retraso" },
      { answer: "jusqu'à", hint: "hasta" },
      { answer: "arrêt", hint: "parada (sustantivo)" },
      { answer: "acheter", hint: "comprar" },
      { answer: "cher", hint: "caro" },
    ],
    difficulty: 2,
  },
  {
    id: 19,
    title: "Planes para el fin de semana",
    titleFr: "Les projets du week-end",
    situation:
      "Tu amigo francés te invita a hacer algo este fin de semana y discutís las opciones.",
    dialogue: [
      {
        speaker: "Ami",
        text: "Qu'est-ce que tu ___1___ faire ce week-end ?",
      },
      {
        speaker: "Vous",
        text: "Je n'ai rien de ___2___. Tu as une idée ?",
      },
      {
        speaker: "Ami",
        text: "On ___3___ aller au marché samedi matin, puis visiter le musée l'après-midi.",
      },
      {
        speaker: "Vous",
        text: "Bonne idée ! Il ___4___ réserver les billets à l'avance ?",
      },
      {
        speaker: "Ami",
        text: "Non, ce n'est pas ___5___. On se retrouve à quelle heure ?",
      },
      {
        speaker: "Vous",
        text: "Disons vers dix heures, ça te ___6___ ?",
      },
    ],
    blanks: [
      { answer: "veux", hint: "quieres (informal)" },
      { answer: "prévu", hint: "planeado" },
      { answer: "pourrait", hint: "podríamos" },
      { answer: "faut", hint: "es necesario (il ...)" },
      { answer: "nécessaire", hint: "necesario" },
      { answer: "convient", hint: "conviene / te va bien" },
    ],
    difficulty: 2,
  },
  {
    id: 20,
    title: "Avería del coche",
    titleFr: "Une panne de voiture",
    situation:
      "Tu coche se ha averiado en la carretera y llamas a la asistencia en carretera.",
    dialogue: [
      {
        speaker: "Opérateur",
        text: "Assistance routière, bonjour. Quelle est votre ___1___ ?",
      },
      {
        speaker: "Vous",
        text: "Ma voiture est ___2___ en panne sur l'autoroute A6, au kilomètre 120.",
      },
      {
        speaker: "Opérateur",
        text: "Quel est le ___3___ exactement ?",
      },
      {
        speaker: "Vous",
        text: "Le ___4___ ne démarre plus et il y a de la fumée.",
      },
      {
        speaker: "Opérateur",
        text: "Êtes-vous en ___5___ ? Restez bien derrière la glissière.",
      },
      {
        speaker: "Vous",
        text: "Oui, je suis en sécurité. Dans combien de temps arrivera le ___6___ ?",
      },
      {
        speaker: "Opérateur",
        text: "Environ trente minutes. Ne bougez pas.",
      },
    ],
    blanks: [
      { answer: "situation", hint: "situación" },
      { answer: "tombée", hint: "caído / averiado (participio pasado femenino)" },
      { answer: "problème", hint: "problema" },
      { answer: "moteur", hint: "motor" },
      { answer: "sécurité", hint: "seguridad" },
      { answer: "dépanneur", hint: "grúa / mecánico" },
    ],
    difficulty: 2,
  },

  // ============================================================
  // DIFÍCIL (difficulty 3) — Challenges 21-30
  // ============================================================
  {
    id: 21,
    title: "Negociar en el mercadillo",
    titleFr: "Négocier aux puces",
    situation:
      "Encuentras una lámpara antigua en un mercadillo e intentas negociar el precio con el vendedor.",
    dialogue: [
      {
        speaker: "Vous",
        text: "Cette lampe est magnifique. Elle ___1___ de quelle époque ?",
      },
      {
        speaker: "Vendeur",
        text: "C'est de l'Art déco, années 1930. Elle est en parfait ___2___.",
      },
      {
        speaker: "Vous",
        text: "Quel est votre dernier ___3___ ?",
      },
      {
        speaker: "Vendeur",
        text: "Je la vends cent cinquante euros. Elle les ___4___ largement.",
      },
      {
        speaker: "Vous",
        text: "Seriez-vous prêt à ___5___ un peu ? Je vous en propose cent vingt.",
      },
      {
        speaker: "Vendeur",
        text: "Allez, je vous la ___6___ à cent trente, mais c'est vraiment mon dernier mot.",
      },
      {
        speaker: "Vous",
        text: "Marché ___7___ ! Je la prends.",
      },
    ],
    blanks: [
      { answer: "date", hint: "data de" },
      { answer: "état", hint: "estado / condición" },
      { answer: "prix", hint: "precio" },
      { answer: "vaut", hint: "vale" },
      { answer: "baisser", hint: "bajar" },
      { answer: "laisse", hint: "dejar / ceder" },
      { answer: "conclu", hint: "cerrado / hecho (trato)" },
    ],
    difficulty: 3,
  },
  {
    id: 22,
    title: "Quejarse en un hotel",
    titleFr: "Se plaindre à l'hôtel",
    situation:
      "Tu habitación de hotel tiene varios problemas y vas a la recepción a quejarte.",
    dialogue: [
      {
        speaker: "Vous",
        text: "Excusez-moi, je voudrais ___1___ un problème avec ma chambre.",
      },
      {
        speaker: "Réceptionniste",
        text: "Je suis désolé. De quoi s'___2___-il ?",
      },
      {
        speaker: "Vous",
        text: "La climatisation ne ___3___ pas, et le robinet de la salle de bains ___4___.",
      },
      {
        speaker: "Réceptionniste",
        text: "Je vais envoyer quelqu'un pour ___5___ ça immédiatement.",
      },
      {
        speaker: "Vous",
        text: "De plus, j'avais demandé une chambre avec ___6___ sur la mer, pas sur le parking.",
      },
      {
        speaker: "Réceptionniste",
        text: "Toutes mes ___7___. Je vais voir si une autre chambre est disponible.",
      },
      {
        speaker: "Vous",
        text: "J'apprécierais aussi un geste ___8___ vu les désagréments.",
      },
    ],
    blanks: [
      { answer: "signaler", hint: "reportar / señalar" },
      { answer: "agit", hint: "trata (reflexivo: s'agir)" },
      { answer: "fonctionne", hint: "funciona" },
      { answer: "fuit", hint: "gotea" },
      { answer: "réparer", hint: "reparar" },
      { answer: "vue", hint: "vista" },
      { answer: "excuses", hint: "disculpas" },
      { answer: "commercial", hint: "comercial (gesto de buena voluntad)" },
    ],
    difficulty: 3,
  },
  {
    id: 23,
    title: "En la comisaría",
    titleFr: "Au commissariat",
    situation:
      "Te robaron la cartera en el metro y presentas una denuncia en la comisaría.",
    dialogue: [
      {
        speaker: "Policier",
        text: "Bonjour, qu'est-ce qui vous est ___1___ ?",
      },
      {
        speaker: "Vous",
        text: "On m'a ___2___ mon portefeuille dans le métro ce matin.",
      },
      {
        speaker: "Policier",
        text: "Pouvez-vous ___3___ les circonstances exactes ?",
      },
      {
        speaker: "Vous",
        text: "J'étais sur la ligne 4 quand quelqu'un m'a ___4___ pendant que les portes se fermaient.",
      },
      {
        speaker: "Policier",
        text: "Qu'est-ce que le portefeuille ___5___ ?",
      },
      {
        speaker: "Vous",
        text: "Ma carte d'___6___, mes cartes bancaires, et environ cinquante euros en espèces.",
      },
      {
        speaker: "Policier",
        text: "Je vais ___7___ votre plainte. Vous recevrez un récépissé par courriel.",
      },
    ],
    blanks: [
      { answer: "arrivé", hint: "sucedido (participio pasado)" },
      { answer: "volé", hint: "robado (participio pasado)" },
      { answer: "décrire", hint: "describir" },
      { answer: "bousculé", hint: "empujado" },
      { answer: "contenait", hint: "contenía (imperfecto)" },
      { answer: "identité", hint: "identidad" },
      { answer: "enregistrer", hint: "registrar" },
    ],
    difficulty: 3,
  },
  {
    id: 24,
    title: "Cata de vinos en Borgoña",
    titleFr: "Dégustation de vin en Bourgogne",
    situation:
      "Estás en una cata de vinos y hablas sobre las características de un Pinot Noir con el sumiller.",
    dialogue: [
      {
        speaker: "Sommelier",
        text: "Ce Pinot Noir provient d'un ___1___ classé premier cru.",
      },
      {
        speaker: "Vous",
        text: "Il a une ___2___ très belle, d'un rouge rubis profond.",
      },
      {
        speaker: "Sommelier",
        text: "Au nez, vous ___3___ des arômes de cerise noire et d'épices.",
      },
      {
        speaker: "Vous",
        text: "En bouche, je trouve qu'il est très ___4___ avec des tanins bien fondus.",
      },
      {
        speaker: "Sommelier",
        text: "Exactement. Ce millésime a ___5___ dix ans en cave.",
      },
      {
        speaker: "Vous",
        text: "Il se ___6___ bien avec quel type de plat ?",
      },
      {
        speaker: "Sommelier",
        text: "Je le ___7___ avec un bœuf bourguignon ou un fromage affiné.",
      },
    ],
    blanks: [
      { answer: "vignoble", hint: "viñedo" },
      { answer: "robe", hint: "color / apariencia (del vino)" },
      { answer: "sentirez", hint: "olerá (futuro)" },
      { answer: "équilibré", hint: "equilibrado" },
      { answer: "vieilli", hint: "envejecido (participio pasado)" },
      { answer: "marie", hint: "marida / combina (reflexivo)" },
      { answer: "recommanderais", hint: "recomendaría (condicional)" },
    ],
    difficulty: 3,
  },
  {
    id: 25,
    title: "Un debate acalorado",
    titleFr: "Un débat animé",
    situation:
      "Participas en una discusión sobre el teletrabajo durante una cena, expresando opiniones matizadas.",
    dialogue: [
      {
        speaker: "Hôte",
        text: "Alors, que ___1___-vous du télétravail ?",
      },
      {
        speaker: "Vous",
        text: "Je pense que c'est une avancée ___2___, mais il faut nuancer.",
      },
      {
        speaker: "Invité",
        text: "Moi, je trouve que ça ___3___ le lien social entre collègues.",
      },
      {
        speaker: "Vous",
        text: "C'est vrai, ___4___ il permet aussi une meilleure conciliation vie pro et vie perso.",
      },
      {
        speaker: "Invité",
        text: "Encore faudrait-il que les entreprises ___5___ les bons outils.",
      },
      {
        speaker: "Vous",
        text: "Tout à fait. Il ne s'agit pas de ___6___ le bureau, mais de repenser notre façon de travailler.",
      },
      {
        speaker: "Hôte",
        text: "Bien dit ! L'essentiel est de trouver un juste ___7___.",
      },
    ],
    blanks: [
      { answer: "pensez", hint: "piensa (usted)" },
      { answer: "majeure", hint: "mayor (femenino)" },
      { answer: "détruit", hint: "destruye" },
      { answer: "cependant", hint: "sin embargo" },
      { answer: "fournissent", hint: "proporcionen (subjuntivo)" },
      { answer: "supprimer", hint: "eliminar" },
      { answer: "milieu", hint: "medio / equilibrio" },
    ],
    difficulty: 3,
  },
  {
    id: 26,
    title: "En el banco",
    titleFr: "À la banque",
    situation:
      "Vas a un banco francés para abrir una cuenta y preguntas sobre los servicios y las comisiones.",
    dialogue: [
      {
        speaker: "Conseiller",
        text: "Bonjour, comment puis-je vous être ___1___ ?",
      },
      {
        speaker: "Vous",
        text: "Je souhaiterais ___2___ un compte courant. Quelles pièces justificatives sont nécessaires ?",
      },
      {
        speaker: "Conseiller",
        text: "Il vous faudra une pièce d'identité, un ___3___ de domicile, et un relevé d'identité bancaire si vous transférez des fonds.",
      },
      {
        speaker: "Vous",
        text: "Y a-t-il des ___4___ mensuels ?",
      },
      {
        speaker: "Conseiller",
        text: "L'offre de base est ___5___, mais la carte premium coûte douze euros par mois.",
      },
      {
        speaker: "Vous",
        text: "Est-ce que les ___6___ à l'étranger sont gratuits avec cette carte ?",
      },
      {
        speaker: "Conseiller",
        text: "Oui, sans ___7___ de frais dans toute la zone euro.",
      },
    ],
    blanks: [
      { answer: "utile", hint: "útil / de servicio" },
      { answer: "ouvrir", hint: "abrir" },
      { answer: "justificatif", hint: "justificante (documento)" },
      { answer: "frais", hint: "comisiones / gastos" },
      { answer: "gratuite", hint: "gratuita (femenino)" },
      { answer: "retraits", hint: "retiros de efectivo" },
      { answer: "supplément", hint: "recargo / cargo adicional" },
    ],
    difficulty: 3,
  },
  {
    id: 27,
    title: "Un curso de cocina",
    titleFr: "Un cours de cuisine",
    situation:
      "Asistes a un curso de cocina francesa y el chef te guía para preparar un suflé.",
    dialogue: [
      {
        speaker: "Chef",
        text: "Aujourd'hui, on va préparer un soufflé au fromage. D'abord, ___1___ le four à 180 degrés.",
      },
      {
        speaker: "Vous",
        text: "Je dois ___2___ les blancs en neige maintenant ?",
      },
      {
        speaker: "Chef",
        text: "Pas encore. D'abord, faites ___3___ le beurre dans une casserole.",
      },
      {
        speaker: "Vous",
        text: "Ensuite, j'___4___ la farine, c'est ça ?",
      },
      {
        speaker: "Chef",
        text: "Exactement, en ___5___ bien pour éviter les grumeaux. Puis versez le lait petit à petit.",
      },
      {
        speaker: "Vous",
        text: "À quel moment est-ce que j'___6___ les blancs à la préparation ?",
      },
      {
        speaker: "Chef",
        text: "Quand la béchamel aura ___7___. Et surtout, incorporez-les délicatement pour ne pas les casser.",
      },
    ],
    blanks: [
      { answer: "préchauffez", hint: "precaliente (imperativo)" },
      { answer: "monter", hint: "batir / montar (claras)" },
      { answer: "fondre", hint: "derretir" },
      { answer: "ajoute", hint: "añadir" },
      { answer: "remuant", hint: "removiendo (participio presente)" },
      { answer: "incorpore", hint: "incorporar" },
      { answer: "refroidi", hint: "enfriado (participio pasado)" },
    ],
    difficulty: 3,
  },
  {
    id: 28,
    title: "Una visita guiada al museo",
    titleFr: "Une visite guidée au musée",
    situation:
      "Estás en una visita guiada en el Louvre y le haces preguntas detalladas al guía sobre un cuadro.",
    dialogue: [
      {
        speaker: "Guide",
        text: "Ce tableau a été ___1___ par Delacroix en 1830. Il représente la Liberté guidant le peuple.",
      },
      {
        speaker: "Vous",
        text: "Quel ___2___ historique a inspiré cette œuvre ?",
      },
      {
        speaker: "Guide",
        text: "La Révolution de Juillet, aussi ___3___ les Trois Glorieuses.",
      },
      {
        speaker: "Vous",
        text: "La ___4___ des couleurs est frappante. Le drapeau tricolore attire le regard.",
      },
      {
        speaker: "Guide",
        text: "Tout à fait. Delacroix a ___5___ utiliser le contraste entre l'ombre et la lumière pour créer du mouvement.",
      },
      {
        speaker: "Vous",
        text: "Est-ce que ce tableau a ___6___ d'autres artistes par la suite ?",
      },
      {
        speaker: "Guide",
        text: "Absolument, il est ___7___ une icône de l'art romantique français.",
      },
    ],
    blanks: [
      { answer: "peint", hint: "pintado (participio pasado)" },
      { answer: "événement", hint: "acontecimiento" },
      { answer: "appelée", hint: "llamada (participio pasado femenino)" },
      { answer: "composition", hint: "composición / disposición" },
      { answer: "su", hint: "sabido (participio pasado de savoir)" },
      { answer: "influencé", hint: "influenciado (participio pasado)" },
      { answer: "devenu", hint: "convertido en (participio pasado)" },
    ],
    difficulty: 3,
  },
  {
    id: 29,
    title: "Resolver una disputa de facturación",
    titleFr: "Contester une facture",
    situation:
      "Llamas a tu operador de telefonía móvil para disputar un cargo inesperado en tu factura.",
    dialogue: [
      {
        speaker: "Opérateur",
        text: "Service client, bonjour. En quoi puis-je vous ___1___ ?",
      },
      {
        speaker: "Vous",
        text: "J'ai ___2___ un montant inhabituel sur ma dernière facture. Il y a un prélèvement de quarante euros que je ne ___3___ pas.",
      },
      {
        speaker: "Opérateur",
        text: "Pouvez-vous me communiquer votre numéro de ___4___ ?",
      },
      {
        speaker: "Vous",
        text: "Bien sûr. Je n'ai jamais ___5___ à ce service premium qui apparaît sur le relevé.",
      },
      {
        speaker: "Opérateur",
        text: "Effectivement, il semble qu'il y ait eu une erreur de ___6___. Je procède au remboursement.",
      },
      {
        speaker: "Vous",
        text: "Merci. Sous quel ___7___ serai-je remboursé ?",
      },
      {
        speaker: "Opérateur",
        text: "Le remboursement sera ___8___ sur votre prochaine facture.",
      },
    ],
    blanks: [
      { answer: "aider", hint: "ayudar" },
      { answer: "constaté", hint: "notado (participio pasado)" },
      { answer: "reconnais", hint: "reconozco" },
      { answer: "client", hint: "cliente (número de cuenta)" },
      { answer: "souscrit", hint: "suscrito (participio pasado)" },
      { answer: "facturation", hint: "facturación" },
      { answer: "délai", hint: "plazo" },
      { answer: "crédité", hint: "acreditado (participio pasado)" },
    ],
    difficulty: 3,
  },
  {
    id: 30,
    title: "Comentar una película en una cena",
    titleFr: "Discuter d'un film lors d'un dîner",
    situation:
      "En una cena, la conversación gira hacia el cine. Compartes tu opinión sobre una película reciente.",
    dialogue: [
      {
        speaker: "Ami",
        text: "Vous avez vu le dernier film de ce ___1___ français ?",
      },
      {
        speaker: "Vous",
        text: "Oui, je l'ai trouvé ___2___. Le scénario m'a vraiment surpris.",
      },
      {
        speaker: "Ami",
        text: "Moi aussi ! L'___3___ principale était incroyable.",
      },
      {
        speaker: "Vous",
        text: "Ce qui m'a le plus ___4___, c'est la façon dont le réalisateur aborde le thème de la solitude.",
      },
      {
        speaker: "Ami",
        text: "La ___5___ originale est magnifique aussi, non ?",
      },
      {
        speaker: "Vous",
        text: "Absolument. Elle ___6___ parfaitement l'atmosphère mélancolique du film.",
      },
      {
        speaker: "Ami",
        text: "Tu penses qu'il ___7___ le César du meilleur film ?",
      },
      {
        speaker: "Vous",
        text: "Il le ___8___ sans aucun doute. C'est le meilleur film que j'aie vu cette année.",
      },
    ],
    blanks: [
      { answer: "réalisateur", hint: "director" },
      { answer: "bouleversant", hint: "profundamente conmovedor" },
      { answer: "actrice", hint: "actriz" },
      { answer: "touché", hint: "conmovido (participio pasado)" },
      { answer: "bande", hint: "banda sonora (bande originale)" },
      { answer: "retranscrit", hint: "transmite / transcribe" },
      { answer: "remportera", hint: "ganará (futuro)" },
      { answer: "mériterait", hint: "merecería (condicional)" },
    ],
    difficulty: 3,
  },
];
