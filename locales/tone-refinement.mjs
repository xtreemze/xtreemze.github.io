export default {
  es: {
    meta: {
      "projects/qmk.html": {
        title: "QMK / Vial / Halcyon — Carlos Velasco",
        description:
          "Caso de estudio de QMK, Vial y Halcyon: firmware para teclado dividido, modelado físico, configuración persistente desde el host y Keyboard Atlas para Ferris.",
      },
    },
    keyed: {
      "home.heroTitle": "Diseño e implemento sistemas que hacen comprensible un comportamiento complejo.",
      "home.heroCopy":
        "Mi práctica se mueve entre el diseño de producto y la ingeniería de software. Los proyectos comienzan con observación, preguntas, bocetos y experimentos funcionales. Las ideas prometedoras se desarrollan mediante modelos explícitos, accesibilidad, medición del rendimiento y verificación repetible, de modo que exploración e implementación formen parte del mismo proceso.",
      "home.workTitle": "Proyectos seleccionados y métodos de trabajo.",
      "home.workIntro":
        "Cada caso de estudio describe el problema, el proceso de diseño, los experimentos y las decisiones de ingeniería que dieron forma al resultado. El énfasis está en cómo una observación se convierte en modelo, un prototipo en evidencia y un comportamiento probado en parte de un sistema duradero.",
      "home.flagships": "Estudios principales",
      "home.technical": "Sistemas técnicos",
      "home.operational": "Sistemas operativos",
      "home.publicKnowledge": "Sistemas públicos y de conocimiento",
      "home.qmkTitle": "QMK / Vial / Halcyon",
      "home.qmkSummary":
        "Un sistema integrado de teclado dividido que reúne firmware QMK/Vial, comportamiento TFT y encoder de Halcyon, un contrato tipado de configuración Raw HID, herramientas Vial para el host y un Keyboard Atlas visual que modela la geometría física de Ferris.",
      "home.experienceTitle": "La práctica del diseño informa mi manera de desarrollar software.",
      "home.experienceStatement":
        "Mi trayectoria conecta diseño gráfico, producción multimedia y docencia con software de servicio público, grandes interfaces de planificación e ingeniería de sistemas. Trato el código como material de diseño: un medio para aclarar relaciones, comprobar supuestos y dar forma a la interacción.",
      "home.experienceDetail":
        "Cada etapa añadió otro instrumento de investigación: composición visual, interacción, observación de usuarios, modelado de estado, análisis de rendimiento, simulación determinista y verificación automatizada. Juntos sostienen una práctica donde la intuición propone direcciones y la evidencia las desarrolla.",
      "home.aboutTitle": "Me interesan los sistemas donde estructura y descubrimiento se refuerzan mutuamente.",
      "home.aboutStatement":
        "Una pequeña interacción puede revelar un modelo físico, una simulación puede mostrar una relación inesperada y una herramienta bien estructurada puede hacer que la información compleja resulte más fácil de examinar y utilizar.",
      "home.aboutDetail1":
        "Trabajo entre pensamiento de producto, diseño visual e interacción e implementación. Las superficies mínimas, la jerarquía cuidadosa y los prototipos funcionales ayudan a presentar capacidades complejas de forma accesible.",
      "home.aboutDetail2":
        "En reproducción multimedia, juegos, telemetría de vehículos, software de servicio público, grafos de conocimiento y entrada programable, el método se mantiene: la curiosidad abre una dirección, el modelado disciplinado le da coherencia y la automatización preserva tiempo para seguir estudiando.",
      "home.principlesTitle": "La disciplina da forma duradera a la experimentación.",
      "home.principle1Title": "Empieza con observación y una pregunta útil.",
      "home.principle1Body":
        "Dibuja, prototipa, simula y prueba en hardware real cuando el medio lo requiera. Los experimentos tempranos hacen visibles las relaciones y permiten que un resultado sorprendente oriente la siguiente pregunta.",
      "home.principle2Title": "Convierte los experimentos en evidencia.",
      "home.principle2Body":
        "Instrumenta el comportamiento con semillas deterministas, laboratorios visuales, comprobaciones de accesibilidad, trazas de rendimiento y modelos de dominio explícitos. La evidencia comparable da una base común a las decisiones creativas.",
      "home.principle3Title": "Da una forma estable a las ideas probadas.",
      "home.principle3Body":
        "Los tipos, las pruebas, CI y la documentación preservan el comportamiento establecido. La automatización asume la verificación rutinaria para devolver la atención a la observación, la interpretación y nuevos experimentos.",
      "qmk.caseLabel": "Público · Sistema de entrada embebido",
      "qmk.title": "QMK / Vial / Halcyon",
      "qmk.deck":
        "Un proyecto integrado de sistema de entrada que abarca firmware QMK/Vial, ergonomía física, interacción TFT y encoder, configuración persistente Raw HID, herramientas Vial para el host y un Atlas visual para Ferris Sweep.",
      "qmk.niche": "Entrada ergonómica compacta con estado visible",
      "qmk.stack": "C · QMK · Vial · Raw HID · WebHID",
      "qmk.hardware": "Halcyon Ferris · mitades TFT + encoder",
      "qmk.focus": "Comportamiento físico, configuración desde el host y modelado visual",
      "qmk.atlasLabel": "Keyboard Atlas",
      "qmk.atlasIntro":
        "El Atlas desplegado modela la geometría, las capas, los acordes y el estado de interacción de Ferris Sweep como compañero visual del firmware. Funciona como documentación y como instrumento de diseño para estudiar cómo el comportamiento abstracto de las teclas se proyecta sobre el teclado físico.",
      "qmk.atlasAction": "Abrir Keyboard Atlas ↗",
      "qmk.atlasNode": "Keyboard Atlas",
      "qmk.studyLead":
        "Un teclado dividido de 34 teclas se convierte en una herramienta coherente cuando alcance físico, transiciones de capa, estado de pantalla y configuración desde el host se diseñan como un solo sistema de interacción.",
      "qmk.studyBody":
        "La capa alfa proporciona una base espacial estable. Capas momentáneas, acordes de fila base, encoders y repetición amplían esa base mientras el TFT y el estado RGB hacen visible el comportamiento activo. Las herramientas del host exponen el mismo modelo para inspección y ajuste.",
      "qmk.compositionLead": "Firmware, software de configuración y documentación visual comparten responsabilidades explícitas.",
      "qmk.point1": "Comportamiento del firmware",
      "qmk.point1Body": "QMK/Vial gestiona semántica de entrada en ejecución, persistencia, coordinación del split, estado TFT y comportamiento de encoder.",
      "qmk.point2": "Configuración desde el host",
      "qmk.point2Body": "Un protocolo Raw HID tipado transporta configuración persistente y telemetría entre el teclado y las interfaces Vial conscientes de capacidades.",
      "qmk.point3": "Modelo físico",
      "qmk.point3Body": "El Atlas describe stagger, arco de pulgar, posiciones, capas y acordes reales de Ferris, con comprobaciones geométricas que mantienen la representación alineada con el teclado.",
      "qmk.point4": "Evidencia de release",
      "qmk.point4Body": "Configuración canónica, dependencias fijadas, comprobaciones de fuente, builds de firmware y aceptación de hardware aportan formas distintas de verificación.",
      "qmk.productLead": "El teclado físico es la superficie principal de diseño y las herramientas de software hacen legible su estado.",
      "qmk.productBody1": "La colocación de capas parte del alcance y la frecuencia. Pulsaciones mantenidas y acordes breves mantienen las transiciones comunes cerca de la posición base, mientras la dirección del encoder sigue un modelo semántico estable entre contextos.",
      "qmk.productBody2": "El TFT, los perfiles RGB y el Atlas ofrecen vistas complementarias del mismo sistema: estado inmediato en el dispositivo, comportamiento configurable en el host y una visión espacial para estudio y documentación.",
      "qmk.methodLead": "El propio teclado es el estudio de diseño: el uso físico produce observaciones, el Atlas hace visibles las relaciones y las comprobaciones repetibles convierten el comportamiento estable en evidencia de ingeniería.",
      "qmk.methodBody1": "Un cambio puede comenzar como experimento táctil con un acorde, ritmo de pantalla, pareja de encoder o relación de color. La misma idea puede examinarse mediante telemetría y Atlas antes de quedar recogida en configuración, pruebas y artefactos de release.",
      "qmk.methodBody2": "El firmware gestiona persistencia y comportamiento en ejecución; las interfaces Vial gestionan edición y validación; el Atlas gestiona la explicación espacial. Esta separación favorece la experimentación rápida y mantiene cada contrato explícito y revisable.",
      "qmk.next": "Siguiente: Lemonade"
    }
  },
  sv: {
    meta: {
      "projects/qmk.html": {
        title: "QMK / Vial / Halcyon — Carlos Velasco",
        description:
          "Fallstudie om QMK, Vial och Halcyon: firmware för delat tangentbord, fysisk modellering, persistent värdkonfiguration och Keyboard Atlas för Ferris.",
      },
    },
    keyed: {
      "home.heroTitle": "Jag designar och utvecklar system som gör komplext beteende begripligt.",
      "home.heroCopy":
        "Min praktik rör sig mellan produktdesign och mjukvaruutveckling. Projekt börjar med observation, frågor, skisser och fungerande experiment. Lovande idéer utvecklas genom tydliga modeller, tillgänglighet, prestandamätning och repeterbar verifiering, så att utforskning och implementation förblir delar av samma process.",
      "home.workTitle": "Utvalda projekt och arbetsmetoder.",
      "home.workIntro":
        "Varje fallstudie beskriver problemet, designprocessen, experimenten och de tekniska beslut som formade resultatet. Tyngdpunkten ligger på hur observation blir modell, prototyp blir evidens och beprövat beteende blir del av ett beständigt system.",
      "home.flagships": "Huvudstudier",
      "home.technical": "Tekniska system",
      "home.operational": "Operativa system",
      "home.publicKnowledge": "Offentliga system och kunskapssystem",
      "home.qmkTitle": "QMK / Vial / Halcyon",
      "home.qmkSummary":
        "Ett integrerat system för delat tangentbord som omfattar QMK/Vial-firmware, Halcyon TFT- och encoderbeteende, ett typat Raw HID-kontrakt, Vial-verktyg på värden och ett visuellt Keyboard Atlas som modellerar Ferris fysiska geometri.",
      "home.experienceTitle": "Designpraktik formar hur jag utvecklar programvara.",
      "home.experienceStatement":
        "Min bakgrund förenar grafisk design, multimediaproduktion och undervisning med offentlig programvara, stora planeringsgränssnitt och systemutveckling. Jag behandlar kod som designmaterial: ett medium för att tydliggöra relationer, pröva antaganden och forma interaktion.",
      "home.experienceDetail":
        "Varje steg tillförde ytterligare ett undersökningsinstrument: visuell komposition, interaktion, användarobservation, tillståndsmodellering, prestandaanalys, deterministisk simulering och automatiserad verifiering. Tillsammans stödjer de en praktik där intuition föreslår riktningar och evidens utvecklar dem.",
      "home.aboutTitle": "Jag är intresserad av system där struktur och upptäckt stärker varandra.",
      "home.aboutStatement":
        "En liten interaktion kan synliggöra en fysisk modell, en simulering kan visa en oväntad relation och ett välstrukturerat verktyg kan göra komplex information lättare att undersöka och använda.",
      "home.aboutDetail1":
        "Jag arbetar mellan produkttänkande, visuell design, interaktionsdesign och implementation. Minimala ytor, tydlig hierarki och fungerande prototyper hjälper till att göra komplex kapacitet tillgänglig.",
      "home.aboutDetail2":
        "Inom medieuppspelning, spel, fordonsdata, offentlig programvara, kunskapsgrafer och programmerbar inmatning består metoden: nyfikenhet öppnar en riktning, disciplinerad modellering ger den sammanhang och automation bevarar tid för fortsatt undersökning.",
      "home.principlesTitle": "Disciplin ger experiment en beständig form.",
      "home.principle1Title": "Börja med observation och en användbar fråga.",
      "home.principle1Body":
        "Skissa, bygg prototyper, simulera och prova på verklig hårdvara när mediet kräver det. Tidiga experiment gör relationer synliga och låter ett överraskande resultat leda till nästa fråga.",
      "home.principle2Title": "Gör experiment till evidens.",
      "home.principle2Body":
        "Instrumentera beteende med deterministiska seeds, visuella laboratorier, tillgänglighetskontroller, prestandaspår och tydliga domänmodeller. Jämförbar evidens ger kreativa beslut en gemensam grund.",
      "home.principle3Title": "Ge beprövade idéer en stabil form.",
      "home.principle3Body":
        "Typer, tester, CI och dokumentation bevarar etablerat beteende. Automation tar hand om rutinmässig verifiering så att uppmärksamheten kan återgå till observation, tolkning och nya experiment.",
      "qmk.caseLabel": "Offentligt · Inbyggt inmatningssystem",
      "qmk.title": "QMK / Vial / Halcyon",
      "qmk.deck": "Ett integrerat inmatningsprojekt som omfattar QMK/Vial-firmware, fysisk ergonomi, TFT- och encoderinteraktion, persistent Raw HID-konfiguration, Vial-verktyg på värden och ett visuellt Atlas för Ferris Sweep.",
      "qmk.niche": "Kompakt ergonomisk inmatning med synligt tillstånd",
      "qmk.stack": "C · QMK · Vial · Raw HID · WebHID",
      "qmk.hardware": "Halcyon Ferris · TFT + encoderhalvor",
      "qmk.focus": "Fysiskt beteende, värdkonfiguration och visuell modellering",
      "qmk.atlasLabel": "Keyboard Atlas",
      "qmk.atlasIntro": "Det publicerade Atlaset modellerar Ferris Sweeps geometri, lager, ackord och interaktionstillstånd som en visuell följeslagare till firmwaren. Det fungerar både som dokumentation och designinstrument för att studera hur abstrakt tangentbeteende motsvarar det fysiska tangentbordet.",
      "qmk.atlasAction": "Öppna Keyboard Atlas ↗",
      "qmk.atlasNode": "Keyboard Atlas",
      "qmk.studyLead": "Ett delat tangentbord med 34 tangenter blir ett sammanhängande verktyg när fysisk räckvidd, lagerövergångar, displaytillstånd och värdkonfiguration utformas som ett enda interaktionssystem.",
      "qmk.studyBody": "Alfalagret ger en stabil rumslig grund. Momentana lager, homerow-ackord, encoders och repetition utvidgar grunden medan TFT- och RGB-tillstånd gör aktivt beteende synligt. Värdverktygen visar samma modell för inspektion och justering.",
      "qmk.compositionLead": "Firmware, konfigurationsprogram och visuell dokumentation delar tydliga ansvarsområden.",
      "qmk.point1": "Firmwarebeteende",
      "qmk.point1Body": "QMK/Vial hanterar runtime-semantik, persistens, split-samordning, TFT-tillstånd och encoderbeteende.",
      "qmk.point2": "Värdkonfiguration",
      "qmk.point2Body": "Ett typat Raw HID-protokoll för persistent konfiguration och telemetri mellan tangentbordet och kapabilitetsmedvetna Vial-gränssnitt.",
      "qmk.point3": "Fysisk modell",
      "qmk.point3Body": "Atlas beskriver Ferris verkliga stagger, tumkurva, tangentpositioner, lager och ackord, med geometrikontroller som håller representationen i linje med tangentbordet.",
      "qmk.point4": "Release-evidens",
      "qmk.point4Body": "Kanonisk konfiguration, låsta beroenden, källkontroller, firmwarebyggen och hårdvaruacceptans bidrar med skilda former av verifiering.",
      "qmk.productLead": "Det fysiska tangentbordet är den primära designytan och mjukvaruverktygen gör dess tillstånd begripligt.",
      "qmk.productBody1": "Lagerplacering utgår från räckvidd och frekvens. Korta hållningar och ackord håller vanliga övergångar nära hempositionen, medan encoderriktningen följer en stabil semantisk modell mellan sammanhang.",
      "qmk.productBody2": "TFT, RGB-profiler och Atlas ger kompletterande vyer av samma system: omedelbart tillstånd på enheten, konfigurerbart beteende på värden och en rumslig överblick för studier och dokumentation.",
      "qmk.methodLead": "Själva tangentbordet är designstudion: fysisk användning ger observationer, Atlas synliggör relationer och repeterbara kontroller omvandlar stabilt beteende till teknisk evidens.",
      "qmk.methodBody1": "En förändring kan börja som ett taktilt experiment med ett ackord, en displayrytm, ett encoderpar eller en färgrelation. Samma idé kan sedan studeras genom telemetri och Atlas innan beteendet fångas i konfiguration, tester och releaseartefakter.",
      "qmk.methodBody2": "Firmwaren hanterar persistens och runtimebeteende; Vial-gränssnitten hanterar redigering och validering; Atlas hanterar den rumsliga förklaringen. Uppdelningen stödjer snabb experimentering och håller varje kontrakt tydligt och granskningsbart.",
      "qmk.next": "Nästa: Lemonade"
    }
  }
};
