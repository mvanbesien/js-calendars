// mvanbesien - v1.1 - 24 Mar 2016

var pataphysiqueCalendarValues = function(date) {

	var base = new Date(date.getFullYear(), 8, 8, 0, 0, 0, 0);
	if (date.getTime() < base.getTime()) {
		base.setFullYear(base.getFullYear() - 1);
	}

	var dayInYear = dayCounter(base, date);
	var isLeap = isLeapYear(date.getFullYear());

	var dayIndex = dayInYear % 28 + 1;
	var monthIndex = parseInt(dayInYear / 28);
	var yearIndex = base.getFullYear() - 1872;

	if (isLeap && monthIndex > 5) {
		dayIndex--;
		if (dayIndex == 0) {
			monthIndex--;
			dayIndex = monthIndex == 5 ? 29 : 28;
		}
	}
	if (monthIndex > 10) {
		dayIndex--;
		if (dayIndex == 0) {
			monthIndex--;
			dayIndex = monthIndex == 10 ? 29 : 28;
		}
	}

	var weekDayIndex = dayIndex == 29 ? 7 : (dayIndex + 5) % 7;
	return [ weekDayIndex, dayIndex, monthIndex, yearIndex ];
}

var pataphysiqueCalendarText = function(date) {
	var DAYS = [ "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche", "Hunyadi" ];
	var MONTHS = [ "Absolu", "Haha", "As", "Sable", "Décervelage", "Gueules", "Pédale", "Clinamen", "Palotin", "Merdre", "Gidouille", "Tatane",
			"Phalle" ];
	var values = pataphysiqueCalendarValues(date);
	return DAYS[values[0]] + " " + values[1] + " " + MONTHS[values[2]] + " " + values[3] + " E.P. ("+pataphysiqueDayName(values)+")";
}

var pataphysiqueDayName = function(values) {
	var daysNames = {
		415 : "Conscience d'Ubu",
		408 : "Saint Bordue, Capitaine",
		423 : "Saint Tank, animal",
		416 : "Saint Mauvais, sujet",
		407 : "Sainte Forçats, pollorcètes",
		422 : "Ostension du Baton à physique",
		409 : "Dormition de Jacques Vaché, Interprète",
		421 : "Chaire du Dr Faustroll",
		406 : "Sainte Polonais, prolétaires",
		401 : "Saint Alaodine, virtuose",
		429 : "hunyadi - Lit de Procruste",
		414 : "Sainte 4 Sans-Cou, enchanteurs",
		424 : "Saint Weidman, patriarche",
		404 : "Décervelage",
		419 : "Saint et Sainte Cartouche, vétérinaires",
		426 : "Escrime",
		411 : "Saint Eustache, libérateur",
		418 : "Saints Pirates et Flibustiers, thaumathurges",
		403 : "Astu",
		412 : "Saint Landru, gynécologue",
		427 : "Saints Chemins de fer, assassins",
		417 : "Saint Mandrin, poète et philosophe",
		402 : "Saints Hassassins, praticiens",
		413 : "Saint Guillotin, médecin",
		428 : "Repopulation",
		420 : "Saint Outlaw, aristocrate",
		425 : "Saint Petiot, expert",
		410 : "Drapaud (érection du)",
		405 : "Sainte Giron, Pile et Cotice, palotins",
		815 : "Capture du Fourneau",
		808 : "Saint Bougrelas, prince",
		823 : "Saints Quatrezoneilles, Herdanpo, Mousched-Gogh, palotins",
		816 : "Déploration de Saint Achras, éleveur de Polèdres",
		807 : "Saint Fénéon ès Liens",
		822 : "Saints Palotins des Phynances",
		809 : "Saints Boleslas et Ladislas, polonais",
		821 : "Occultation de Saint Mce le Dr Sandomir",
		806 : "Sainte Oneille, gourgandine",
		801 : "Saints Crocodiles, crocodiles",
		829 : "hunyadi - Erratum",
		814 : "Equivoque, sans-culotte",
		824 : "Sainte Lumelle, écuyère",
		804 : "Sainte Susan Calvin, docteur",
		819 : "Occultation de Saint Gauguin, océanique",
		826 : "Sainte Prétentaine, rosière",
		811 : "Explosion du Palotin",
		818 : "Canotage",
		803 : "Saints Trolls, pantins",
		812 : "Réprobation du Travail",
		827 : "Saint Foin, coryphée",
		817 : "Saint Macrotatoure, caudataire",
		802 : "Fête des Ecluses",
		813 : "Esquive de Saint Léonard da V, illusioniste",
		828 : "Nativité de Saint Satie, Grand Parcier de l'Église d'Art",
		820 : "Saint Ti Belot, séide",
		825 : "Saints Potassons, acolythes",
		810 : "Saint Forficule, Barnabite",
		805 : "Sainte Poignée, veuve et SainteJutte, recluse",
		1115 : "Procession aux Phynances",
		1108 : "Susception du Croc à Merdre",
		1123 : "Saint Pissembock, oncle",
		1116 : "Transfig. de Saint Vincent van Gogh, transmutateur",
		1107 : "Saint Biribi, taulier",
		1122 : "Ubu ès Liens",
		1109 : "Saints Ecrase-Merdre, sectateurs",
		1121 : "Saints Catoblepas, lord et Anoblepas, amirals",
		1106 : "Saints Robot et Cornard, citoyens",
		1101 : "Fête du Père Ubu (Ubu d'été)",
		1129 : "hunyadi - Le soleil solide ",
		1114 : "Sainte Anne, Pèlerine, énergumène",
		1124 : "Saint Pissedoux, caporal des hommes libres",
		1104 : "Ascension du Mouchard, statisticien, psychiatre et policier",
		1119 : "Sainte Taloche, matrone",
		1126 : "Saint Glé, neurologue-aliéniste",
		1111 : "Saintes Canicule et Canule, jouvencelles",
		1118 : "Saint Trou, chauffeur",
		1103 : "Sainte Crapule, puriste et Saint Fantomas, archange",
		1112 : "Saints Cannibales, philanthropes",
		1127 : "Saint Pistolet à Merdre, jubilaire",
		1117 : "Sainte Flamberge, voyante",
		1102 : "Commémoration du Père Ebé",
		1113 : "Saint Dada, prophète",
		1128 : "Nativité de Saint Bruggie",
		1120 : "Saint Tiberge, frère quêteur",
		1125 : "Saint Panurge, moraliste",
		1110 : "Saints Pieds Nickelés, trinité",
		1105 : "Saint Arsouille, patricien",
		315 : "Khurmookum du Dr Faustroll",
		308 : "Conception du Père Ubu (AJ)",
		323 : "Sainte Viole, vierge et martyre",
		316 : "Saint Nui, exempt",
		307 : "Saint Birbe, juge",
		322 : "César-Antechrist",
		309 : "Saint Sagouin, homme d'Etat",
		321 : "Sainte Tape, pompette",
		306 : "Saint Navet et Perruque, humanistes",
		301 : "Noces de Balkis et de Salomon",
		329 : "hunyadi - Aleph",
		314 : "Don Quichotte, champion du monde",
		324 : "Sainte Pochetée, gouvernante",
		304 : "Sainte Barbe (femme à), femme-canon",
		319 : "Gravidité de Mère Ubu",
		326 : "Monsieur Sisyphe",
		311 : "Nativité de Saint Grabbe, scherziste",
		318 : "Sainte Lurette, joconde",
		303 : "Saint Phlegmon, doctrinaire",
		312 : "Sainte Choupe, mère de famille",
		327 : "Saint Tic, conjoint",
		317 : "Saint Moyen, francais",
		302 : "Saint Doublemain, Idéologue",
		313 : "Saint Flaive, concierge",
		328 : "Saint Cervelas, penSainteur",
		320 : "Saint Sabre, allopathe",
		325 : "Nativité d'Archæoptéryx",
		310 : "Exaltation de Ubu Roi (Ubu d'hiver)",
		305 : "Sainte Savate, avocate",
		715 : "Invention de la Pataphysique",
		708 : "La Machine à Peindre",
		723 : "Locus Solus",
		716 : "Exit Saint Domenico Theotocopouli, el Greco",
		707 : "La Main de Gloire",
		722 : "Fête des Polyèdres",
		709 : "Sainte Trique, lunatique",
		721 : "Moreau, insulaire",
		706 : "Saint Ganymède, professionnel",
		701 : "Saint Ablou, page et Saint Haldern, duc",
		729 : "hunyadi - Cymbalum Mundi",
		714 : "Sortie de Albrecht Dürer, hermétiste",
		724 : "Saint Tupetu de Tupetu, organisateur de loteries",
		704 : "Saint Pagne, confident",
		719 : "Saint Barbeau, procureur et Sainte Morue , juste",
		726 : "Saint Escargot, sybarite",
		711 : "Saint Maquereau, Intercesseur",
		718 : "Les 27 Êtres Issus des Livres Pairs",
		703 : "La Mandragore, solanée androide",
		712 : "Saint Georges Dazet, poulpe au regard de soie",
		727 : "Saint Hure de Chasteté, pénitente",
		717 : "Saint Hiéronymus Bosch, démonarque",
		702 : "Saints Hiboux, maîtres-chanteurs",
		713 : "Nativité de Maldoror, corsaire aux cheveux d'or",
		728 : "Saint Turgescent, iconoclaste",
		720 : "Nativité de Saint Patrice MONNET, algebrateur",
		725 : "Exit Saint Goya, alchimiste",
		710 : "Rémission des Poissons",
		705 : "Saints Aster et Vulpian, violateurs du Néant",
		1215 : "Mort de Dionysos, surhomme",
		1208 : "Sainte Léda, ajusteuse",
		1223 : "Lazare, gare",
		1216 : "Nativité de Vibescu, prophète",
		1207 : "Patrobas, pompier",
		1222 : "Dragonne, pyrophage",
		1209 : "Godemiché, économe",
		1221 : "Erbrand, polytechnicien",
		1206 : "Penis Angelicus",
		1201 : "Chibre, planton",
		1229 : "hunyadi - Le Termès",
		1214 : "Bataille de Morsang",
		1224 : "Sainte Orchidée, aumonière",
		1204 : "Mnester, confesseur",
		1219 : "Prélote, capucin",
		1226 : "Disparition de l'Ancien Breughel, incendiaire",
		1211 : "Sainte Lèchefrite, botteuse",
		1218 : "Lingam",
		1203 : "Zebb, passe-partout",
		1212 : "Sainte Andouille, amphibologue",
		1227 : "Priape, franc-tireur",
		1217 : "Sainte Gallinacée, cocotte",
		1202 : "Sainte Ruth, zélatrice",
		1213 : "Sainte Bitre, ouvreuse et Etalon, couvreur",
		1228 : "Transfixion de Sainte Messaline",
		1220 : "Pie VIII, navigant",
		1225 : "Nativité apparente d' Artaud le Momo",
		1210 : "Sainte Nitouche, orante",
		1205 : "Assomption de Sainte Messaline",
		215 : "Navigation du Dr Faustroll",
		208 : "Saint Rimbe, Oisif",
		223 : "Saint Quincey, critique d'art",
		216 : "Saint Cap, captain",
		207 : "Saint Cyrano de Bergerac, explorateur",
		222 : "Saint Lautréamont",
		209 : "Equarrissage pour tous",
		221 : "Saint Possible, schizophrène",
		206 : "Saint Omnibus, satyre",
		201 : "Nativité de Pantagruel",
		229 : "hunyadi - Traversée du Miroir",
		214 : "Saint Pierre Bonnard, peintre des Phynances",
		224 : "Saint Berbiguier, martyr",
		204 : "Saint Cravan, boxeur",
		219 : "Saint Courtial des Péreires, aérostier et inventeur",
		226 : "Saint Mensonger, évêque",
		211 : "Saint Ossian, barde postiche",
		218 : "Saint Chambernac, pauvriSainteur",
		203 : "Couronnement de Lord Patchogue, miroitier",
		212 : "Dispute du signe + et du signe -",
		227 : "Sainte Visité, fille du précédent",
		217 : "Saint Pangloss, humoriste passif",
		202 : "Sainte RroSainte Sélavy, héroine",
		213 : "Moustaches du Dr Faustroll",
		228 : "Nativité de Saint Swift, chanoine",
		220 : "Saint Olibrius, augure",
		225 : "Saint Lewis Caroll, profesSainteur",
		210 : "Saint Abstrait, bourreau",
		205 : "Saint Van Meegeren, faussaire",
		915 : "Saints Serpents d'Airain",
		908 : "Cocuage de Monsieur le Père Ubu",
		923 : "Interprétation de l'humour",
		916 : "Nativité de Saint Donatien A Francois",
		907 : "Nativité de Monsieur Plume, propriétaire",
		922 : "Ontogénie pataphysique",
		909 : "Vidange",
		921 : "Sainte Pyrotechnie, illuminée",
		906 : "Saint Cucufat, mécène",
		901 : "Accouchement de Sainte Jeanne, papesse",
		929 : "hunyadi - Défaite du Mufle",
		914 : "Saint Sphincter, profès",
		924 : "Sainte Purge, sage-femme",
		904 : "Nativité de Saint Henri Rousseau, douanier",
		919 : "Sainte Fétatoire, super",
		926 : "Sainte Barbaque, naïade",
		911 : "Saint Memnon, vidangeur",
		918 : "Saint Anal, cordelier et Sainte Foire, anagogue",
		903 : "Saint Siège, sous-pape",
		912 : "Saintes Miches, catéchumènes",
		927 : "Saints Courts et Longs, gendarmes",
		917 : "Saint Saint Woland, professeur",
		902 : "Le Moutardier du Pape",
		913 : "Sainte Lunette, solitaire",
		928 : "Saint Raca, cagot",
		920 : "Sainte Colombine, expurgée",
		925 : "Apparition d'Ubu Roi",
		910 : "Saint Barbapoux, amant",
		905 : "Saint Crouducul, troupier",
		615 : "Saints Adelphes, esotéristes",
		608 : "La machine à inspirer l'amour",
		623 : "Saint Masquerade, uniforme",
		616 : "Saints Templiers, adeptes",
		607 : "Saint Gavroche, forain",
		622 : "Saint Sengle, Déserteur",
		609 : "Saint Remezy, évêque in partibus",
		621 : "Saint Inscrit, Converti",
		606 : "Vers Belges",
		601 : "Erection du Surmâle",
		629 : "hunyadi - Bse Escampette, dynamiteuse",
		614 : "Sabbat",
		624 : "Nativité de Saint Stéphane, faune",
		604 : "Saint Michet, Idéaliste",
		619 : "Sainte Goutte, fête militaire",
		626 : "Saint Pâle, mineur",
		611 : "Testament de Saint P Ucello, le mal illuminé",
		618 : "Saint Nosocome, carabin",
		603 : "Saint Ellen, hile",
		612 : "Saint Hari Sainteldon, psychohistorien galactique",
		627 : "Saint Valens, frère onirique",
		617 : "Saint Dricarpe, prosélyte",
		602 : "Saint André Marcueil, ascète cycliste",
		613 : "Sainte Valburge",
		628 : "Dédicace du Tripode",
		620 : "Sainte Cuisse, dame patronesSainte",
		625 : "Saint Peligraf Poligrafovitch, chien",
		610 : "Nativité de Saint Tancrède, jeune homme",
		605 : "Saint Ouducul, trouvère",
		115 : "Nativité de l'OEstre, artificier",
		108 : "Fête du Haha",
		123 : "Chapeau de Bosse-de-Nage",
		116 : "Saint Vadrouille, emblème",
		107 : "Saint Prout, abbé",
		122 : "Résurrection de Bosse-de-Nage",
		109 : "Tautologie",
		121 : "Zimzoum de Bosse-de-Nage",
		106 : "Sainte Tourte, lyrique et Sainte Bévue, sociologique",
		101 : "L'Age du Dr Faustroll",
		129 : "hunyadi - Marée Terrestre",
		114 : "Exhibition de la Daromphe",
		124 : "Saint Claude Terasse, musicien des Phynances",
		104 : "Sainte Berthe de Courrière, égérie",
		119 : "Saint Raphael, apéritif et philistin",
		126 : "Commémoration du Cure-dent",
		111 : "Sortie de Saint Lucas Cranach, apocalypticien",
		118 : "Nativité de Saint Mce le Baron Mollet (Saint Pipe)",
		103 : "Saint Gibus, franc-macon",
		112 : "Saint Cosinus, savant",
		127 : "Occultation d' Alfred Jarry",
		117 : "Saint Homais d'Aquin, prudhomme",
		102 : "Dissolution de Edgar Poe, dinomythurge",
		113 : "Saint et Sainte Fenouillard, Sainte famille",
		128 : "Fuite d' Ablou",
		120 : "Strangulation de Bosse-de-Nage",
		125 : "Saint J-P Brisset, philologue, prince des penseurs",
		110 : "Saint Panmuphle, huissier",
		105 : "Sainte Belgique, nourrice",
		1015 : "Sainte Giborgne, vénérable",
		1008 : "Sainte Boudouille, bayadère",
		1023 : "Saint Ombilic, gymnosophiste",
		1016 : "Saint Inventaire, poète",
		1007 : "Saint Bébé Toutout, évangéliste",
		1022 : "Fête de Gidouille",
		1009 : "Sainte Outre, psychiatre",
		1021 : "Saint Spéculum, confesseur",
		1006 : "Saint Dieu, retraité",
		1001 : "Sainte Bouzine, esprit",
		1029 : "hunyadi gras - Nom d'Ubu",
		1014 : "Saint Colon, artilleur",
		1024 : "Saint Gris-gris, ventre",
		1004 : "Sainte Tripe, républicaine",
		1019 : "Saint Sein, tautologue",
		1026 : "Sainte Goulache, odalisque",
		1011 : "Sacre de Talou VII, empereur du Ponukélé",
		1018 : "Visitation de Mère Ubu",
		1003 : "Sainte Dondon, amazone",
		1012 : "Sainte Confiture, dévote et Sainte Cliche, donatrice",
		1027 : "Sainte Gandouse, hygiéniste",
		1017 : "Sainte Femelle, technicienne",
		1002 : "Saint Lucullus, amateur (Bloosday)",
		1013 : "SSaint Instintestins, conseillers intimes",
		1028 : "Poche du Père Ubu",
		1020 : "Saint Périnée, zélateur",
		1025 : "Saint Bouffre, pontife",
		1010 : "Saint Boudin, recteur",
		1005 : "Saint Ugolin, mansuet",
		515 : "Alice au Pays des Merveilles",
		508 : "Fête de la Chandelle Verte",
		523 : "Occultation de Saint J Torma, euphoriste",
		516 : "Saint Münchhausen, baron",
		507 : "Saint Gueule, abbé",
		522 : "Saint Sexe, Stylite",
		509 : "Sainte Crêpe, laique",
		521 : "Lavement",
		506 : "Sainte Touche, postulante",
		501 : "Dépucelage de Mère Ubu",
		529 : "hunyadi gras",
		514 : "Nativité de J. Verne, globetrotter en chambre",
		524 : "Conversion de Saint Matorel, bateleur",
		504 : "Sainte Goule ou Gudule, institutrice",
		519 : "Saint Sade ès Liens",
		526 : "L'Amour absolu, deliquium",
		511 : "Saint Baobab, célibataire",
		518 : "Nativité de Deibler, prestidigitateur",
		503 : "Saint Anthropoïde, policier",
		512 : "Saint Membre, compilateur",
		527 : "Saint Tabagie, cosmogène",
		517 : "Le Bétrou",
		502 : "Saint Sigisbée, eunuque",
		513 : "Copulation",
		528 : "Sainte Hylactor et Pamphagus",
		520 : "Saint Lafleur, valet",
		525 : "Sainte Marmelade, Inspirée",
		510 : "Saint Préservatif, bedeau",
		505 : "Sainte Gale, abbesSainte",
		15 : "Ethernité",
		8 : "Absinthe, ci devant Saint Alfred",
		23 : "Sainte Varia-Miriam, amphibie",
		16 : "Saint Ibicrate le Géomètre, pataphysicien",
		7 : "Saint Alambic, abstracteur",
		22 : "Emmanuel Dieu",
		9 : "Descente du Saint Esprit de Vin",
		21 : "Saint Venceslas, duc",
		6 : "Sainte Vérola, assistante sociale",
		1 : "Nativité d' Alfred Jarry",
		29 : "hunyadi - Le Jet Musical",
		14 : "Saint Sophrotatos l'Arménien, pataphysicien",
		24 : "Saints Rakirs et Rastrons, porte-côtelettes",
		4 : "Saint Lucien de Samoaste, voyageur",
		19 : "Sainte Grues, ophiophiles",
		26 : "Saint Joseb, nataire à la mode de Bretagne",
		11 : "Sainte Purée, sportswoman",
		18 : "Flûtes de Pan",
		3 : "Saint Phénix, solipsiste et Saint Hyx, factotum",
		12 : "Vide",
		27 : "Saintes Gigolette et Gaufrette, dogaresses",
		17 : "Céphalorgie",
		2 : "Saint Ptyx, silentiare (Abolition de)",
		13 : "Saint Cantarel, l'illuminateur",
		28 : "Xylostomie",
		20 : "Sainte Mélusine, souillarde de cuisine",
		25 : "Nativité de Sainta Magnificence Opach",
		10 : "Dilution",
		5 : "Saint Bardamu, voyageur",
	};
	var key = values[2] * 100 + values[1];
	return daysNames[key];
}