import { Numero } from "./numero";
import { Risultato } from "./risultato";

export abstract class Tombola {
  public static risultati: any = {
    2: new Risultato("ambo", 5),
    3: new Risultato("terno", 10),
    4: new Risultato("quaterna", 15),
    5: new Risultato("cinquina", 20),
    15: new Risultato("tombola", 50)
  };
  public static numeriSmorfia: Numero[] = [
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "1", "text": "L'Italia", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "2", "text": "'A criatura", "translation": "il bimbo" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "3", "text": "'A jatta", "translation": "il gatto" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "4", "text": "'O puorco", "translation": "il maiale" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "5", "text": "'A mano", "translation": "la mano" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "6", "text": "Chella che guarda 'nterra", "translation": "organo sessuale femminile" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "7", "text": "'A scuppetta", "translation": "il fucile" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "8", "text": "'A maronna", "translation": "la madonna" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "9", "text": "'A figliata", "translation": "la prole" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "10", "text": "'E fasule", "translation": "i fagioli" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "11", "text": "'E surice", "translation": "i topi" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "12", "text": "'E surdate", "translation": "i soldati" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "13", "text": "Sant'Antonio", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "14", "text": "'O mbriaco", "translation": "l'ubriaco" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "15", "text": "'O guaglione", "translation": "il ragazzo" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "16", "text": "'O culo", "translation": "il deretano" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "17", "text": "'A disgrazia", "translation": "la disgrazia" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "18", "text": "'O sanghe", "translation": " il sangue" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "19", "text": "'A resata", "translation": "la risata" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "20", "text": "'A festa", "translation": "la festa" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "21", "text": "'A femmena annura", "translation": "la donna nuda" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "22", "text": "'O pazzo", "translation": "il pazzo" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "23", "text": "'O scemo", "translation": "lo scemo" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "24", "text": "'E gguardie", "translation": "le guardie" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "25", "text": "Natale", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "26", "text": "Nanninella", "translation": "diminuitivo del nome Anna" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "27", "text": "'O cantero", "translation": "il vaso da notte" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "28", "text": "'E zzizze", "translation": "il seno" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "29", "text": "'O pate d''e criature", "translation": "organo sessuale maschile" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "30", "text": "'E palle d''o tenente", "translation": "le palle del tenente" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "31", "text": "'O padrone ' e casa", "translation": "il proprietario di casa" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "32", "text": "'O capitone", "translation": "il capitone" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "33", "text": "Ll'anne ' e Cristo", "translation": "gli anni di Cristo" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "34", "text": "'A capa", "translation": "la testa" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "35", "text": "L'aucielluzzo", "translation": "l'uccellino" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "36", "text": "'E castagnelle", "translation": "sorta di petardi" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "37", "text": "'O monaco", "translation": "il frate" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "38", "text": "'E mmazzate", "translation": "le botte" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "39", "text": "'A funa 'nganna", "translation": "la corda la collo" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "40", "text": "'A paposcia", "translation": "ernia inguinale" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "41", "text": "'O curtiello", "translation": "il coltello" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "42", "text": "'O ccafè", "translation": "il caffè" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "43", "text": "'A femmena 'ncopp'' o balcone", "translation": "la donna al balcone" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "44", "text": "'E ccancelle", "translation": "il carcere" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "45", "text": "'O vino", "translation": "il vino" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "46", "text": "'E denare", "translation": "i denari" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "47", "text": "'O muorto", "translation": "il morto" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "48", "text": "'O muorto che parla", "translation": "il morto che parla" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "49", "text": "'O piezzo ' e carne", "translation": "il pezzo di carne" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "50", "text": "'O ppane", "translation": "il pane" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "51", "text": "'O ciardino", "translation": "il giardino" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "52", "text": "'A mamma", "translation": "la mamma" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "53", "text": "'O viecchio", "translation": "il vecchio" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "54", "text": "'O cappiello", "translation": "il cappello" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "55", "text": "'A museca", "translation": "la musica" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "56", "text": "'A caruta", "translation": "la caduta" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "57", "text": "'O scartellato", "translation": "il gobbo" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "58", "text": "'O paccotto", "translation": "l'imbroglio" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "59", "text": "'E pile", "translation": "i peli" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "60", "text": "Se lamenta", "translation": "si lamenta" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "61", "text": "'O cacciatore", "translation": "il cacciatore" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "62", "text": "'O muorto acciso", "translation": "il morto ammazzato" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "63", "text": "'A sposa", "translation": "la sposa" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "64", "text": "'A sciammeria", "translation": "la marsina" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "65", "text": "'O chianto", "translation": "il pianto" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "66", "text": "'E ddoie zetelle", "translation": "le due zitelle" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "67", "text": "'O totano int''a chitarra", "translation": "il totano nella chitarra" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "68", "text": "'A zuppa cotta", "translation": "la zuppa cotta" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "69", "text": "Sott'e'ncoppo", "translation": "sottosopra" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "70", "text": "'O palazzo", "translation": "il palazzo" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "71", "text": "L'ommo 'e merda", "translation": "l'uomo senza princìpi" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "72", "text": "'A meraviglia", "translation": "la meraviglia" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "73", "text": "'O spitale", "translation": "l'ospedale" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "74", "text": "'A rotta", "translation": "la grotta" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "75", "text": "Pullecenella", "translation": "Pulcinella" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "76", "text": "'A funtana", "translation": "la fontana" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "77", "text": "'E diavule", "translation": "i diavoli" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "78", "text": "'A bella figliola", "translation": "la bella ragazza" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "79", "text": "'O mariuolo", "translation": "il ladro" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "80", "text": "'A vocca", "translation": "la bocca" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "81", "text": "'E sciure", "translation": "i fiori" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "82", "text": "'A tavula 'mbandita", "translation": "la tavola imbandita" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "83", "text": "'O maletiempo", "translation": "il maltempo" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "84", "text": "'A cchiesa", "translation": "la chiesa" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "85", "text": "Ll'aneme 'o priatorio", "translation": "le anime del purgatorio" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "86", "text": "'A puteca", "translation": "il negozio" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "87", "text": "'E perucchie", "translation": "i pidocchi" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "88", "text": "'E casecavalle", "translation": "i caciocavalli" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "89", "text": "'A vecchia", "translation": "la vecchia" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "90", "text": "'A paura", "translation": "la paura" }
  ];
  public static numeriSprumpya: Numero[] = [
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "1", "text": "la spazzola rosa", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "2", "text": "il panettone", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "3", "text": "l'idromassaggio", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "4", "text": "il lego", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "5", "text": "un giocattolo", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "6", "text": "un numero che ha lettere", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "7", "text": "fai la seconda elementare", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "8", "text": "numero al contrario", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "9", "text": "nove giochi per nove bimbi", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "10", "text": "il mese di ottobre", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "11", "text": "gira la moda", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "12", "text": "la dozzina", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "13", "text": "il libro che parla di un lego", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "14", "text": "i pennarelli per capelli", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "15", "text": "il numero più bello", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "16", "text": "le matite", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "17", "text": "un laboratorio di penne", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "18", "text": "Elsa e Anna", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "19", "text": "la pesca", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "20", "text": "un'albicocca", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "21", "text": "inizia l'inverno", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "22", "text": "il matrimonio", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "23", "text": "delle perline rosa ", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "24", "text": "una vigilia", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "25", "text": "natale", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "26", "text": "termosifone caldo", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "27", "text": "la carta regalo", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "28", "text": "le foglie", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "29", "text": "la lana", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "30", "text": "il giradischi", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "31", "text": "buon anno", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "32", "text": "una macchina di lego", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "33", "text": "trentatré trentini", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "34", "text": "il pandoro", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "35", "text": "le barbie", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "36", "text": "una lil", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "37", "text": "le principesse Disney", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "38", "text": "fashion studio", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "39", "text": "le lego friends", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "40", "text": "le bambole", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "41", "text": "tombolino", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "42", "text": "le polly pocket", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "43", "text": "lo zaino", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "44", "text": "il gatto puccioso", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "45", "text": "un quaderno", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "46", "text": "l'arcobaleno", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "47", "text": "la televisione", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "48", "text": "un quadro ", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "49", "text": "il cuore", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "50", "text": "il porta penne", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "51", "text": "le tazze di caffè", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "52", "text": "il calendario", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "53", "text": "le stelle", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "54", "text": "L'elefante", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "55", "text": "un regalo", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "56", "text": "la valigia", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "57", "text": "il lavoretto", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "58", "text": "la cornice", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "59", "text": "lo smalto", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "60", "text": "i fogli", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "61", "text": "le foto", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "62", "text": "i fiori", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "63", "text": "la busta", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "64", "text": "le nuvole ", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "65", "text": "il fiocco di neve", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "66", "text": "l'ombrellone", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "67", "text": "i pattini", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "68", "text": "le winx", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "69", "text": "il cartone animato", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "70", "text": "la casa", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "71", "text": "il nastro", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "72", "text": "le palle da calcio", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "73", "text": "il giornale", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "74", "text": "il muro", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "75", "text": "la lavagna", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "76", "text": "il disco", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "77", "text": "un adesivo", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "78", "text": "minnie e topolino", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "79", "text": "il vaso", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "80", "text": "la festa", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "81", "text": "polistorolo", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "82", "text": "il piatto", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "83", "text": "la sedia", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "84", "text": "il carrello", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "85", "text": "i cioccolatini", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "86", "text": "la ruota", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "87", "text": "il nastro adesivo", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "88", "text": "piccolo eb", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "89", "text": "la lampada", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "90", "text": "la bottiglia di vetro", "translation": "" }
  ];
}
