// mvanbesien - v1.1 - 27 Mar 2016

var republicanCalendarValues = function(date) {
	var nbOfDays = dayCounter(new Date(date.getFullYear() - 1, 8, 22), date);
	var nbDaysInYear = isLeapYear(date.getFullYear()) ? 366 : 365;
	var year = date.getFullYear() - 1792;
	year += (nbOfDays > nbDaysInYear) ? 1 : 0;
	nbOfDays -= (nbOfDays > nbDaysInYear) ? nbDaysInYear : 0;
	var month = parseInt((nbOfDays - 1) / 30) + 1;
	var day = (nbOfDays - 1) % 30 + 1;
	if (month == 13) {
		return [ day, year ];
	} else {
		return [ nbOfDays % 10, day, month, year ];
	}
}

var republicanCalendarText = function(date) {
	var values = republicanCalendarValues(date);
	var MONTHS = [ "", "Vendémiaire", "Brumaire", "Frimaire", "Nivôse", "Pluviôse", "Ventôse", "Germinal", "Floréal", "Prairial", "Messidor",
			"Thermidor", "Fructidor" ];
	var DAYS = [ "Décadi", "Primidi", "Duodi", "Tridi", "Quartidi", "Quintidi", "Sextidi", "Septidi", "Octidi", "Nonidi" ];
	var EXTRADAYS = [ "", "Fête de la Vertu", "Fête du Génie", "Fête du Travail", "Fête de l'Opinion", "Fête des Récompenses",
			"Fête de la Révolution" ];
	if (values.length == 2) {
		return EXTRADAYS[values[0]] + " de l'an " + toRomanChars(values[1]);
	} else if (values.length == 4) {
		return DAYS[values[0]] + " de la " + [ "première", "deuxième", "troisième" ][parseInt((values[1] - 1) / 10)] + " décade de "
				+ MONTHS[values[2]] + " de l'an " + toRomanChars(values[3]) + " ("+republicanCalendarDay(values)+")";
	}
	return "";
}

var republicanCalendarDay = function(values) {
	var dayNames = {
			215:"Dindon",
			230:"Rouleau",
			208:"Scorsonère",
			223:"Garance",
			216:"Chervis",
			207:"Figue",
			222:"Azerole",
			209:"Alisier",
			221:"Bacchante",
			206:"Héliotrope",
			201:"Pomme",
			229:"Cormier",
			214:"Endive",
			224:"Orange",
			204:"Betterave",
			219:"Grenade",
			226:"Pistache",
			211:"Salsifis",
			218:"Dentelaire",
			203:"Poire",
			212:"Macre",
			227:"Macjonc",
			217:"Cresson",
			202:"Céleri",
			213:"Topinambour",
			228:"Coing",
			220:"Herse",
			225:"Faisan",
			210:"Charrue",
			205:"Oie",
			415:"Lapin",
			430:"Crible",
			408:"Fumier",
			423:"Fer",
			416:"Silex",
			407:"Terre végétale",
			422:"Sel",
			409:"Salpêtre",
			421:"Pierre à Plâtre",
			406:"Lave",
			401:"Tourbe",
			429:"Mercure",
			414:"Grès",
			424:"Cuivre",
			404:"Soufre",
			419:"Marbre",
			426:"Etain",
			411:"Granit",
			418:"Pierre à chaux",
			403:"Bitume",
			412:"Argile",
			427:"Plomb",
			417:"Marne",
			402:"Houille",
			413:"Ardoise",
			428:"Zinc",
			420:"Van",
			425:"Chat",
			410:"Fléau",
			405:"Chien",
			915:"Caille",
			930:"Chariot",
			908:"Martagon",
			923:"Chèvre-feuille",
			916:"illet",
			907:"Fromental",
			922:"Camomille",
			909:"Serpolet",
			921:"Barbeau",
			906:"Mélisse",
			901:"Luzerne",
			929:"Pivoine",
			914:"Acacia",
			924:"Caille-lait",
			904:"Angélique",
			919:"Tilleul",
			926:"Jasmin",
			911:"Fraise",
			918:"Pavot",
			903:"Trèfle",
			912:"Bétoine",
			927:"Verveine",
			917:"Sureau",
			902:"Hémérocalle",
			913:"Pois",
			928:"Thym",
			920:"Fouche",
			925:"Tanche",
			910:"Faux",
			905:"Canard",
			815:"Ver à soie",
			830:"Houlette",
			808:"Champignon",
			823:"Bourache",
			816:"Consoude",
			807:"Muguet",
			822:"Fritillaire",
			809:"Hyacinthe",
			821:"Statice",
			806:"Ancolie",
			801:"Rose",
			829:"Sénevé",
			814:"Chamerops",
			824:"Valériane",
			804:"Aubépine",
			819:"Arroche",
			826:"Fusain",
			811:"Rhubarbe",
			818:"Corbeille d'or",
			803:"Fougère",
			812:"Sainfoin",
			827:"Civette",
			817:"Pimprenelle",
			802:"Chêne",
			813:"Bâton d'or",
			828:"Buglosse",
			820:"Sarcloir",
			825:"Carpe",
			810:"Rateau",
			805:"Rossignol",
			1115:"Brebis",
			1130:"Moulin",
			1108:"Carthame",
			1123:"Lentille",
			1116:"Guimauve",
			1107:"Armoise",
			1122:"Câprier",
			1109:"Mûre",
			1121:"Carline",
			1106:"Prêle",
			1101:"Epeautre",
			1129:"Coton",
			1114:"Basilic",
			1124:"Aunée",
			1104:"Ivraie",
			1119:"Gentiane",
			1126:"Myrte",
			1111:"Panis",
			1118:"Amande",
			1103:"Melon",
			1112:"Salicorne",
			1127:"Colza",
			1117:"Lin",
			1102:"Bouillon blanc",
			1113:"Abricot",
			1128:"Lupin",
			1120:"Ecluse",
			1125:"Loutre",
			1110:"Arrosoir",
			1105:"Bélier",
			615:"Chèvre",
			630:"Plantoir",
			608:"Violette",
			623:"Cochiéaria",
			616:"Epinard",
			607:"Alaterne",
			622:"Persil",
			609:"Marceau",
			621:"Mandragore",
			606:"Asaret",
			601:"Tussilage",
			629:"Frêne",
			614:"Vélar",
			624:"Pâquerette",
			604:"Troëne",
			619:"Cerfeuil",
			626:"Pissenlit",
			611:"Narcisse",
			618:"Mouron",
			603:"Violier",
			612:"Orme",
			627:"Sylve",
			617:"Doronic",
			602:"Cornouiller",
			613:"Fumeterre",
			628:"Capillaire",
			620:"Cordeau",
			625:"Thon",
			610:"Bêche",
			605:"Bouc",
			115:"Ane",
			130:"Tonneau",
			108:"Amaranthe",
			123:"Navet",
			116:"Belle de nuit",
			107:"Carotte",
			122:"Pêche",
			109:"Panais",
			121:"Chanvre",
			106:"Balsamine",
			101:"Raisin",
			129:"Orge",
			114:"Réséda",
			124:"Amarillis",
			104:"Colchique",
			119:"Tournesol",
			126:"Aubergine",
			111:"Pomme de terre",
			118:"Sarrasin",
			103:"Châtaigne",
			112:"Immortelle",
			127:"Piment",
			117:"Citrouille",
			102:"Safran",
			113:"Potiron",
			128:"Tomate",
			120:"Pressoir",
			125:"Buf",
			110:"Cuve",
			105:"Cheval",
			315:"Chevreuil",
			330:"Pelle",
			308:"Miel",
			323:"Roseau",
			316:"Ajonc",
			307:"Chou-fleur",
			322:"Bruyère",
			309:"Genièvre",
			321:"Erable sucré",
			306:"Mâche",
			301:"Raiponce",
			329:"Olive",
			314:"Sapin",
			324:"Oseille",
			304:"Nèfle",
			319:"Sabine",
			326:"Pignon",
			311:"Cire",
			318:"Lierre",
			303:"Chicorée",
			312:"Raifort",
			327:"Liège",
			317:"Cyprès",
			302:"Turneps",
			313:"Cèdre",
			328:"Truffe",
			320:"Hoyau",
			325:"Grillon",
			310:"Pioche",
			305:"Cochon",
			1015:"Chamois",
			1030:"Chalémie",
			1008:"Echalotte",
			1023:"Haricot",
			1016:"Tabac",
			1007:"Concombre",
			1022:"Cumin",
			1009:"Absinthe",
			1021:"Menthe",
			1006:"Romarin",
			1001:"Seigle",
			1029:"Blé",
			1014:"Lavande",
			1024:"Orcanète",
			1004:"Véronique",
			1019:"Cerise",
			1026:"Sauge",
			1011:"Coriandre",
			1018:"Gesse",
			1003:"Oignon",
			1012:"Artichaut",
			1027:"Ail",
			1017:"Groseille",
			1002:"Avoine",
			1013:"Girofle",
			1028:"Vesce",
			1020:"Parc",
			1025:"Pintade",
			1010:"Faucille",
			1005:"Mulet",
			715:"Abeille",
			730:"Greffoir",
			708:"Jonquille",
			723:"Marronnier",
			716:"Laitue",
			707:"Bouleau",
			722:"Romaine",
			709:"Aulne",
			721:"Gainier",
			706:"Bette",
			701:"Primevère",
			729:"Myrtille",
			714:"Hêtre",
			724:"Roquette",
			704:"Tulipe",
			719:"Radis",
			726:"Lilas",
			711:"Pervenche",
			718:"Cigüe",
			703:"Asperge",
			712:"Charme",
			727:"Anémone",
			717:"Mélèze",
			702:"Platane",
			713:"Morille",
			728:"Pensée",
			720:"Ruche",
			725:"Pigeon",
			710:"Couvoir",
			705:"Poule",
			1215:"Truite",
			1230:"Panier",
			1208:"Apocyn",
			1223:"Houblon",
			1216:"Citron",
			1207:"Sucrion",
			1222:"Noisette",
			1209:"Réglisse",
			1221:"Eglantier",
			1206:"Tubéreuse",
			1201:"Prune",
			1229:"Marron",
			1214:"Noix",
			1224:"Sorgho",
			1204:"Escourgeon",
			1219:"Tagette",
			1226:"Bigarade",
			1211:"Pastèque",
			1218:"Nerprun",
			1203:"Lycoperdon",
			1212:"Fenouil",
			1227:"Verge d'or",
			1217:"Cardère",
			1202:"Millet",
			1213:"Epine vinette",
			1228:"Maïs",
			1220:"Hotte",
			1225:"Ecrevisse",
			1210:"Echelle",
			1205:"Saumon",
			515:"Vache",
			530:"Traineau",
			508:"Mézéréon",
			523:"Chiendent",
			516:"Buis",
			507:"Amadouvier",
			522:"Thimèle",
			509:"Peuplier",
			521:"Thlaspi",
			506:"Laurier thym",
			501:"Lauréole",
			529:"Chélidoine",
			514:"Avelinier",
			524:"Trainasse",
			504:"Perce Neige",
			519:"Pulmonaire",
			526:"Guède",
			511:"Ellébore",
			518:"If",
			503:"Fragon",
			512:"Brocoli",
			527:"Noisetier",
			517:"Lichen",
			502:"Mousse",
			513:"Laurier",
			528:"Cyclamen",
			520:"Serpette",
			525:"Lièvre",
			510:"Coignée",
			505:"Taureau"
	}
	
	var key = values[2] * 100 + values[1];
	return dayNames[key];
}