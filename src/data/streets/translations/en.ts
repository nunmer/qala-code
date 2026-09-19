import type { StreetText } from '@/lib/types';

/**
 * English translations of the street cards.
 *
 * Russian remains the source language: this is a translation of its content,
 * with no facts added (README §14). A missing translation falls back to
 * Russian, and the interface says so.
 */
export const STREET_TEXT_EN: Readonly<Record<string, StreetText>> = {
  abay: {
    kind: 'Avenue',
    description:
      'The avenue honours Abay Qunanbaiuly — a poet, composer and enlightener-philosopher regarded as the founder of written Kazakh literature.',
    who_is_it:
      'Abay Qunanbaiuly (1845–1904) was a Kazakh poet, composer, enlightener-philosopher and translator. He was born in the Chingiz mountains, in what is now Abay Region.',
    why_named:
      'The capital’s central thoroughfare carries Abay’s name as that of a pivotal figure of national culture: through his writing the Kazakh language took its modern literary form, and Kazakh thought entered a dialogue with world philosophy.',
    historical_facts: [
      'Abay’s principal prose work is “Qara Sozi” (“Words of Edification”), a collection of philosophical reflections on knowledge, labour, upbringing and human dignity.',
      'He translated Pushkin, Lermontov, Krylov, Goethe and Byron into Kazakh, bringing new themes and forms into Kazakh literature.',
      'He created new verse metres and melodies; a number of his poems became folk songs.',
      'In 2020 Abay’s 175th anniversary was marked at state level and in the UNESCO calendar of anniversaries.',
    ],
    interesting_fact:
      'Abay’s rendering of “Tatyana’s Letter” from “Eugene Onegin” spread across the steppe as a folk song — many listeners did not know the original was written by Pushkin.',
    cultural_connection:
      'A region, universities, theatres and libraries of Kazakhstan carry Abay’s name; his legacy is the backbone of the school course in Kazakh literature.',
  },
  'kabanbay-batyr': {
    kind: 'Avenue',
    description:
      'This left-bank avenue honours Qabanbay Batyr, one of the commanders of the Kazakh levy in the eighteenth-century war against the Dzungar invasion.',
    who_is_it:
      'Qabanbay Batyr (born Erasyl Qozhaquly, c. 1692–1770) was a Kazakh commander of the Qarakerey clan of the Naiman tribe and one of the leaders of the struggle against the Dzungar invasion.',
    why_named:
      'The name fixes into the city the memory of the “Aqtaban shubyryndy” period — the years of great calamity and liberation struggle that national history treats as the time when a common Kazakh unity took shape.',
    historical_facts: [
      'He earned the name “Qabanbay” for exceptional courage in single combat; later, for his generalship, he was called “Daraboz” — the unmatched one.',
      'He fought at the Battle of Anyraqai (around 1730), where the united Kazakh levy met the Dzungar forces.',
      'Qabanbay Batyr acted alongside Bogenbay Batyr and other commanders under the overall leadership of Abylai Khan.',
      'The struggle against the Dzungar invasion became a central theme of Kazakh historical epic and shezhire genealogies.',
    ],
    cultural_connection:
      'The figure of Qabanbay Batyr belongs to the national heroic canon; the avenue named after him crosses the capital’s left bank and reaches the government quarter.',
  },
  kenesary: {
    kind: 'Street',
    description:
      'The street honours Kenesary Qasymuly — the last khan of the Kazakh Khanate and leader of the national liberation uprising of 1837–1847.',
    who_is_it:
      'Kenesary Qasymuly (1802–1847) was a grandson of Abylai Khan, elected khan in 1841, who led the longest national liberation uprising of the nineteenth century.',
    why_named:
      'The name marks the final attempt to restore independent Kazakh statehood before the Kazakh lands were definitively absorbed into the Russian Empire.',
    historical_facts: [
      'The uprising led by Kenesary lasted about ten years and reached the territories of all three zhuzes.',
      'In 1841 a kurultai proclaimed Kenesary khan — the last such election in Kazakh history.',
      'He pursued his own administrative and tax policy, seeking to restore the khanate’s system of government.',
      'Kenesary was killed in 1847 in Zhetysu during a clash with detachments of Kyrgyz manaps.',
    ],
    cultural_connection:
      'The khan is one of the symbols of the idea of national independence in Kazakh historiography; a monument to Kenesary stands in Kokshetau.',
  },
  'baurzhan-momyshuly': {
    kind: 'Avenue',
    description:
      'The avenue honours Bauyrzhan Momyshuly — a Panfilov Division commander, veteran of the battle for Moscow, and a writer.',
    who_is_it:
      'Bauyrzhan Momyshuly (1910–1982) was a Soviet officer of Kazakh origin, a veteran of the Second World War, a writer and a military theorist.',
    why_named:
      'His name links the capital to the memory of Kazakhstanis on the fronts of the Second World War and to the tradition of military ethics he described in his books.',
    historical_facts: [
      'Momyshuly commanded a battalion of General Panfilov’s 316th Rifle Division, which defended the approaches to Moscow in the autumn of 1941.',
      'He was the prototype for the protagonist of Alexander Bek’s documentary novella “Volokolamsk Highway”.',
      'His own books — “Moscow Is Behind Us” and “The Psychology of War” — combine wartime memoir with reflection on how a person behaves in combat.',
      'He was made a Hero of the Soviet Union posthumously in 1990.',
    ],
    cultural_connection:
      'Momyshuly is one of few authors who wrote about war both as a participant and as a student of soldierly behaviour; schools and streets across Kazakhstan carry his name.',
  },
  'bogenbay-batyr': {
    kind: 'Avenue',
    description:
      'This right-bank avenue honours Bogenbay Batyr, an eighteenth-century commander and companion of Abylai Khan.',
    who_is_it:
      'Bogenbay Batyr Aqshauly (1690–1775) was a Kazakh commander of the Qanzhygaly clan of the Argyn tribe and one of the leaders of the levy in the war with the Dzungar Khanate.',
    why_named:
      'The name preserves the memory of the commanders around whom the Kazakh zhuzes united in the eighteenth century, and of the struggle for territorial integrity itself.',
    historical_facts: [
      'Bogenbay Batyr fought at the Battle of Anyraqai around 1730 alongside the levy of all three zhuzes.',
      'For his services he was called “bas batyr” — chief batyr — marking him as a military leader rather than merely a warrior.',
      'He was among Abylai Khan’s closest companions and took part in the negotiations that shaped the khanate’s foreign policy.',
      'Memory of the batyr is preserved in Kazakh historical epic and in the clan genealogies of the Argyn tribe.',
    ],
    cultural_connection:
      'Bogenbay Batyr Avenue is one of the main longitudinal thoroughfares of the city’s historic right bank.',
  },
  'abylai-khan': {
    kind: 'Avenue',
    description:
      'The avenue honours Abylai Khan — khan of the Middle Zhuz, who reunified the Kazakh lands in the eighteenth century.',
    who_is_it:
      'Abylai Khan (born Abilmansur, 1711–1781) was a Kazakh khan, commander and diplomat under whom the integrity of the Kazakh lands was largely restored after the Dzungar invasion.',
    why_named:
      'Abylai’s name is bound to the idea of strong centralised power and of diplomatic manoeuvre between two empires, which makes him a load-bearing figure of national historical memory.',
    historical_facts: [
      'Abylai balanced between the Qing and Russian empires, acknowledging formal subjecthood while retaining practical independence.',
      'Under his leadership the Kazakh levy waged war on the Dzungar Khanate and later recovered the territories of Zhetysu.',
      'He was formally proclaimed khan in 1771.',
      'Under Abylai the greatest batyrs of the age — Qabanbay, Bogenbay, Nauryzbay — gathered around the khan’s headquarters.',
    ],
    cultural_connection:
      'Abylai Khan is the hero of the tolgau poems of Buqar Zhyrau, the court poet whose work is one of the main sources on the era.',
  },
  seyfullin: {
    kind: 'Street',
    description:
      'The street honours Saken Seyfullin — a poet, prose writer and statesman, one of the founders of twentieth-century Kazakh literature.',
    who_is_it:
      'Saken Seyfullin (1894–1938) was a Kazakh poet, writer and statesman, and a victim of political repression.',
    why_named:
      'The name ties the capital to the author who first described the revolution and civil war on the Kazakh steppe in literary prose, and at the same time to the memory of the repressions of the 1930s.',
    historical_facts: [
      'From 1922 to 1925 Seyfullin headed the government of the Kazakh ASSR — the Council of People’s Commissars.',
      'His documentary novel “Tar Zhol, Taighaq Keshu” (“The Thorny Path”) is an eyewitness account of the events of 1916–1920.',
      'The poem “Kokshetau” is devoted to the nature and legends of the Kokshetau region.',
      'Seyfullin was executed in 1938 and rehabilitated in 1957.',
    ],
    cultural_connection:
      'The Kazakh Agrotechnical Research University in Astana carries his name; Seyfullin museums operate in the capital and in Karaganda Region.',
  },
  auezov: {
    kind: 'Street',
    description:
      'The street honours Mukhtar Auezov — a writer, playwright and literary scholar, author of the epic “The Path of Abay”.',
    who_is_it:
      'Mukhtar Auezov (1897–1961) was a Kazakh writer, playwright and literary scholar, and an academician of the Academy of Sciences of the Kazakh SSR.',
    why_named:
      'The name marks the author of the work through which Kazakh literature gained its widest international recognition in the twentieth century.',
    historical_facts: [
      'The epic “Abay Zholy” (“The Path of Abay”) was written between 1942 and 1956 and has been translated into dozens of languages.',
      'In 1959 Auezov received the Lenin Prize for it.',
      'He wrote his first play, “Enlik — Kebek”, in 1917, at the age of twenty.',
      'Auezov was among the founders of academic Abay studies — the systematic study of Abay’s legacy.',
    ],
    cultural_connection:
      'The Kazakh National Academic Drama Theatre in Almaty carries Auezov’s name, as do schools and institutes across the country.',
  },
  zhambyl: {
    kind: 'Street',
    description:
      'The street honours Zhambyl Zhabayev — an improvising aqyn whose work links the oral poetic tradition to the twentieth century.',
    who_is_it:
      'Zhambyl Zhabayev (1846–1945) was a Kazakh improvising aqyn, a performer and competitor in aitys contests, who lived almost a hundred years.',
    why_named:
      'The name keeps alive in the city the culture of oral poetry — aitys and improvisation — which was the principal form of Kazakh literature before a written tradition appeared.',
    historical_facts: [
      'Zhambyl was renowned as a master of aitys, the poetic contest between improvisers.',
      'His poem “Leningraders, My Children” (1941) addressed the inhabitants of besieged Leningrad.',
      'He performed to the accompaniment of the dombra, composing the text as he sang.',
      'Zhambyl Region of Kazakhstan carries his name.',
    ],
    interesting_fact:
      'Zhambyl’s texts were recorded from the voice: the aqyn himself was illiterate, and his improvisations were written down by listeners and literary secretaries.',
    cultural_connection:
      'Zhambyl’s work is the key example of how the oral tradition of the aqyns entered the written literature of the twentieth century.',
  },
  altynsarin: {
    kind: 'Street',
    description:
      'The street honours Ybyrai Altynsarin — an enlightener and teacher who founded secular schooling for Kazakh children.',
    who_is_it:
      'Ybyrai Altynsarin (1841–1889) was a Kazakh educator-enlightener, writer and ethnographer, and inspector of Kazakh schools in Turgai Region.',
    why_named:
      'The name marks the man with whom mass secular schooling on the Kazakh steppe began — a theme directly connected to the educational character of this project.',
    historical_facts: [
      'In 1864 Altynsarin opened the first Kazakh public school in Turgai.',
      'He compiled the “Kyrgyz Reader” (1879), the first teaching book for Kazakh children based on Russian script.',
      'He built a network of schools, including schools for girls and craft colleges — an innovation on the steppe of that time.',
      'He wrote his own stories and parables for children and translated works by Russian authors.',
    ],
    cultural_connection:
      'Teacher-training universities and a Kazakhstani state award in education carry Altynsarin’s name.',
  },
  ualikhanov: {
    kind: 'Street',
    description:
      'The street honours Shoqan Ualikhanov — an orientalist, geographer and ethnographer, the first Kazakh scholar of the European academic school.',
    who_is_it:
      'Shoqan Shynghysuly Ualikhanov (1835–1865) was a Kazakh scholar, ethnographer, geographer, traveller and officer in the Russian army, and a great-grandson of Abylai Khan.',
    why_named:
      'The name links the city to the beginning of the scholarly study of Central Asia by its own inhabitants: Ualikhanov was at once a researcher and a member of the culture being studied.',
    historical_facts: [
      'In 1858–1859 he made an expedition to Kashgar, then closed to Europeans, travelling in the guise of a merchant.',
      'Ualikhanov was elected a full member of the Russian Geographical Society.',
      'He recorded and introduced into scholarship a fragment of the Kyrgyz epic “Manas” — the section “The Death of Kokotay Khan”.',
      'His works on the history, geography and beliefs of the steppe remain primary sources for researchers.',
    ],
    interesting_fact:
      'Ualikhanov died at 29, yet left a body of work from which the history of Kazakh academic scholarship is conventionally dated.',
    cultural_connection:
      'Ualikhanov’s scholarly legacy is a model of how the study of one’s own culture becomes part of world scholarship.',
  },
  satpayev: {
    kind: 'Street',
    description:
      'The street honours Kanysh Satpayev — a geologist and organiser of science, first president of the Academy of Sciences of the Kazakh SSR.',
    who_is_it:
      'Kanysh Imantaiuly Satpayev (1899–1964) was a Kazakh geologist and academician, founder of the Kazakhstani school of metallogeny.',
    why_named:
      'The name marks the figure associated with the emergence in Kazakhstan of its own academic science, rather than branches of all-Union institutes.',
    historical_facts: [
      'Satpayev carried out a systematic study of the Zhezkazgan deposit and proved its significance as one of the largest copper basins.',
      'In 1946 he founded the Academy of Sciences of the Kazakh SSR and became its first president.',
      'In 1958 the team he led received the Lenin Prize for the “Atlas of Metallogenic and Predictive Maps of Central Kazakhstan”.',
      'He began his career as a mining engineer after graduating from the Tomsk Technological Institute.',
    ],
    cultural_connection:
      'The Kazakh National Research Technical University and the town of Satpayev in Ulytau Region carry his name.',
  },
  konayev: {
    kind: 'Street',
    description:
      'The street honours Dinmukhamed Konayev — the Soviet-era leader of Kazakhstan who headed the republic longer than anyone else.',
    who_is_it:
      'Dinmukhamed Akhmeduly Konayev (1912–1993) was First Secretary of the Central Committee of the Communist Party of Kazakhstan in 1960–1962 and 1964–1986, and three times a Hero of Socialist Labour.',
    why_named:
      'His name is tied to the republic’s period of greatest industrial and urban growth, while his dismissal triggered the December events of 1986.',
    historical_facts: [
      'Konayev trained as a mining engineer and began work at the Kounrad mine.',
      'In 1955–1956 he headed the Academy of Sciences of the Kazakh SSR.',
      'He led the republic for some 22 years in total — longer than any other of its heads in the twentieth century.',
      'His removal in December 1986 was the immediate trigger for the “Zheltoqsan” protests.',
    ],
    cultural_connection:
      'A town in Almaty Region carries Konayev’s name; in 2022 it became the region’s administrative centre.',
  },
  imanov: {
    kind: 'Street',
    description:
      'The street honours Amangeldy Imanov — leader of the Turgai centre of the national liberation uprising of 1916.',
    who_is_it:
      'Amangeldy Imanov (1873–1919) was a participant in and one of the military leaders of the 1916 uprising in Turgai Region.',
    why_named:
      'The name fixes the memory of the 1916 uprising — the largest anti-colonial action in Kazakhstan in the early twentieth century.',
    historical_facts: [
      'The 1916 uprising was triggered by a decree conscripting the indigenous population of Central Asia and Kazakhstan for rear-area labour.',
      'The Turgai centre of the uprising was the best organised and longest lasting: the insurgents operated as regular detachments.',
      'Imanov was elected sardarbek — military leader of the insurgent forces.',
      'He was killed in 1919 during the Civil War.',
    ],
    cultural_connection:
      'The events of 1916 are one of the key topics in the school course on the history of Kazakhstan.',
  },
  koshkarbayev: {
    kind: 'Avenue',
    description:
      'The avenue honours Rakhymzhan Koshkarbayev, who took part in the storming of the Reichstag in 1945.',
    who_is_it:
      'Rakhymzhan Koshkarbayev (1924–1988) was a Red Army officer, a veteran of the Second World War and a People’s Hero of Kazakhstan.',
    why_named:
      'The name marks an episode symbolic for Kazakhstan in the closing of the Second World War — a Kazakhstani taking part in raising the banner over the Reichstag.',
    historical_facts: [
      'On 30 April 1945 Koshkarbayev, together with Grigory Bulatov, fixed an assault banner to the Reichstag building.',
      'During the war he commanded a platoon of the 674th Rifle Regiment of the 150th Rifle Division.',
      'The title “Halyq Qaharmany” — People’s Hero of Kazakhstan — was conferred on him posthumously in 2021.',
      'After the war he worked in Kazakhstan and left memoirs of the fighting for Berlin.',
    ],
    interesting_fact:
      'Koshkarbayev’s contribution was recognised at state level only in independent Kazakhstan — more than thirty years after his death.',
    cultural_connection:
      'The story of the banner over the Reichstag is an example of how historical memory is clarified and revised over time.',
  },
  pushkin: {
    kind: 'Street',
    description:
      'The street honours Alexander Pushkin — the Russian poet whose work entered the Kazakh literary tradition through Abay’s translations.',
    who_is_it:
      'Alexander Sergeyevich Pushkin (1799–1837) was a Russian poet, prose writer and playwright, and the creator of the modern Russian literary language.',
    why_named:
      'The name reflects not only the general literary canon but a specific connection between Pushkin and Kazakh culture — through Abay’s translations and the poet’s journey into the steppe provinces.',
    historical_facts: [
      'In 1833 Pushkin travelled to Orenburg and Uralsk, gathering material for “The History of Pugachev” and “The Captain’s Daughter”.',
      'His papers preserve a record of the Kazakh lyric-epic tale “Qozy Korpesh and Bayan Sulu”, made during that journey.',
      'Abay translated fragments of “Eugene Onegin” into Kazakh, including Tatyana’s letter.',
      'Abay’s translation of Tatyana’s letter, set to his own melody, spread across the steppe as a folk song.',
    ],
    cultural_connection:
      'Through Abay’s translations Pushkin became part of the Kazakh song tradition — a rare case of a foreign-language literary text entering another culture’s folklore.',
  },
  'kerey-zhanibek': {
    kind: 'Street',
    description:
      'The street honours Kerey Khan and Zhanibek Khan — the founders of the Kazakh Khanate.',
    who_is_it:
      'Kerey Khan and Zhanibek Khan were sultans of the Chinggisid line, descendants of Urus Khan, who founded the Kazakh Khanate in the mid-fifteenth century.',
    why_named:
      'The name marks the starting point of Kazakh statehood — the event from which the khanate’s official chronology is counted.',
    historical_facts: [
      'Around 1465–1466 Kerey and Zhanibek migrated with part of the tribes from the domains of Abulkhair Khan into Zhetysu, in the territory of Moghulistan.',
      'That migration is traditionally taken as the moment the Kazakh Khanate was formed.',
      'It is with these events that the name “qazaq” became attached to the group of tribes.',
      'In 2015 Kazakhstan marked the 550th anniversary of the Kazakh Khanate at state level.',
    ],
    cultural_connection:
      'Information about the founding of the khanate is preserved above all in “Tarikh-i Rashidi” by Muhammad Haidar Dughlat.',
  },
  'tole-bi': {
    kind: 'Street',
    description:
      'The street honours Tole Bi — a judge of the Senior Zhuz and one of the authors of the Kazakh code of customary law.',
    who_is_it:
      'Tole Bi Alibekuly (1663–1756) was a Kazakh bi — a judge and public figure — who, with Kazybek Bi and Aiteke Bi, helped draw up the code “Zheti Zhargy”.',
    why_named:
      'The name marks the legal tradition of the steppe: the biys settled disputes not by force but by the authority of the word and knowledge of custom.',
    historical_facts: [
      'Tole Bi represented the Senior Zhuz in the council of three biys formed under Khan Tauke.',
      'The code “Zheti Zhargy” (“Seven Charters”) codified the norms of Kazakh customary law.',
      'The biys acted at once as judges, diplomats and advisers to the khan.',
      'The eloquence of the bi — sheshendik soz — formed a distinct genre of Kazakh oral literature.',
    ],
    cultural_connection:
      'Tole Bi’s sayings survive as models of oratory and are studied in the school course of Kazakh literature.',
  },
  saryarka: {
    kind: 'Avenue',
    description:
      'The avenue is named after Saryarqa — the vast territory of Central Kazakhstan also known as the Kazakh Uplands.',
    who_is_it:
      'Saryarqa is a historical and geographical region in the centre of Kazakhstan. The name translates literally as “yellow ridge” or “yellow back” and describes the look of dry, rolling steppe.',
    why_named:
      'Astana stands on the northern edge of Saryarqa, so the avenue’s name points directly at the geographical setting of the city itself.',
    historical_facts: [
      'Saryarqa covers a significant part of Central Kazakhstan and consists of uplands — ancient eroded mountains worn down into hills.',
      'In 2008 the property “Saryarka — Steppe and Lakes of Northern Kazakhstan”, including the Korgalzhyn and Naurzum reserves, was inscribed on the UNESCO World Heritage List.',
      'The region was historically a zone of summer and winter migrations for the Kazakh clans of the Middle Zhuz.',
      'The Kazakh word “arqa” means “back, ridge” — a transfer of a body-part name to a landform typical of Turkic toponymy.',
    ],
    interesting_fact:
      'The name “Saryarqa” shows how Kazakh toponymy describes landscape through colour and shape: “sary” (yellow) points to sun-bleached steppe grass.',
    cultural_connection:
      'Saryarqa is one of the central images of Kazakh poetry and song; the name is used as a poetic synonym for the home steppe.',
  },
  turan: {
    kind: 'Avenue',
    description:
      'The avenue is named after Turan — the historical and geographical name for the Central Asian region, known from ancient written sources.',
    who_is_it:
      'Turan is the historical name of a vast region of Central Asia inhabited by nomadic peoples; in Persian tradition it was set against Iran as the land to its north-east.',
    why_named:
      'The name places Astana in the broad historical and cultural context of Central Asia and underlines the continuity of the cities of the Great Steppe.',
    historical_facts: [
      'The notion of Turan appears in the Persian epic “Shahnameh” by Ferdowsi, which describes the confrontation between Iran and Turan.',
      'In geography the term “Turan Lowland” denotes a vast plain in Central Asia.',
      'In historiography Turan is used as a collective name for the region settled by Turkic-speaking peoples.',
      'Turan Avenue is one of the main thoroughfares of the capital’s left bank.',
    ],
    cultural_connection:
      'Invoking the name “Turan” in modern toponymy is a way of tying the new capital to the long history of the region, not only to the Soviet and post-Soviet periods.',
  },
  'uly-dala': {
    kind: 'Avenue',
    description:
      'The avenue is named “Uly Dala” — the Great Steppe, the collective name for the Eurasian steppe belt of which Kazakhstan is part.',
    who_is_it:
      'Uly Dala (“the Great Steppe”) denotes the vast steppe belt stretching from the Black Sea region to Manchuria, the historical space of nomadic civilisations.',
    why_named:
      'The name expresses a notion of continuity: modern Kazakhstan is treated as the heir of the cultures of the Great Steppe.',
    historical_facts: [
      'The Eurasian steppe belt was the zone in which nomadic states formed — from the Saka and Huns to the Turkic khaganates and the Kazakh Khanate.',
      'Routes of the Great Silk Road, linking China, Central Asia and Europe, crossed the Great Steppe.',
      'Nomadic pastoralism as an economic system took shape on the steppe in the first millennium BC.',
      'Uly Dala Avenue runs through the left bank, among the new administrative and residential quarters.',
    ],
    cultural_connection:
      'The notion of “Uly Dala” is actively used in contemporary Kazakhstani cultural policy and education as a frame for studying the country’s ancient history.',
  },
  syganak: {
    kind: 'Street',
    description:
      'The street is named after Syganak — a medieval city on the Syr Darya that was the capital of the Aq Orda and later one of the capitals of the Kazakh Khanate.',
    who_is_it:
      'Syganak was a medieval city on the lower Syr Darya; its site lies in Kyzylorda Region, near Zhanakorgan.',
    why_named:
      'The name links the new capital to Kazakhstan’s urban tradition: Syganak shows that the steppe knew large cities long before the twentieth century.',
    historical_facts: [
      'Syganak was the capital of the Aq Orda in the fourteenth century and later one of the political centres of the Kazakh Khanate.',
      'The city stood on the trade route along the Syr Darya, linking settled farming oases with the steppe.',
      'The Syganak site is under archaeological study; remains of fortifications and urban building have been found there.',
      'Control of the Syr Darya cities was one of the main objectives in the struggle between the Kazakh Khanate and the Shaybanid state.',
    ],
    cultural_connection:
      'The Syr Darya cities — Syganak, Otrar, Sauran — are the key argument against seeing the steppe as a territory without urban culture.',
  },
  sarayshyk: {
    kind: 'Street',
    description:
      'The street is named after Sarayshyq — a medieval city on the Zhaiyq river, an important centre of the Golden Horde and the Nogai Horde.',
    who_is_it:
      'Sarayshyq was a medieval city on the Zhaiyq (Ural) river; its site lies in the Makhambet district of Atyrau Region.',
    why_named:
      'The name points to the western part of historical Kazakhstan and to a period when steppe states had developed urban centres and international trade.',
    historical_facts: [
      'Sarayshyq was a major trading and administrative centre on the route from the Volga region into Central Asia.',
      'The city served as one of the capitals of the Nogai Horde.',
      'Written sources record that several rulers of the Golden Horde and the Nogai Horde were buried at Sarayshyq.',
      'The city was destroyed in the sixteenth century and never rebuilt; a museum complex now stands on the site.',
    ],
    cultural_connection:
      'Sarayshyq is an example of a city that vanished entirely: its history is known mainly through archaeology and the written accounts of travellers.',
  },
  ulytau: {
    kind: 'Street',
    description:
      'The street is named after Ulytau — a low mountain range in the centre of Kazakhstan regarded as the symbolic heart of the steppe.',
    who_is_it:
      'Ulytau (“the Great Mountains”) is a mountain range in Central Kazakhstan and a historic locality; since 2022 it is also the name of a separate region.',
    why_named:
      'In national tradition Ulytau is understood as the geographical and symbolic centre of the Kazakh lands, a place where common assemblies were held.',
    historical_facts: [
      'The mausoleums of Zhoshy Khan (Jochi) and Alasha Khan — monuments of medieval steppe architecture — stand in the Ulytau area.',
      'By tradition it was at Ulytau that the kurultais were held at which representatives of the zhuzes took common decisions.',
      'Migration routes linking the north and south of Kazakhstan passed through Ulytau.',
      'In 2022 Ulytau Region was created in Kazakhstan, with its centre in the city of Zhezkazgan.',
    ],
    cultural_connection:
      'Ulytau serves as a metaphor of unity: in national rhetoric it is the place where the lands of all the zhuzes meet.',
  },
  akmeshit: {
    kind: 'Street',
    description:
      'The street is named after Aqmeshit — the historical name of the city of Kyzylorda.',
    who_is_it:
      'Aqmeshit (“white mosque”) is the historical name of the present-day city of Kyzylorda on the Syr Darya; in the nineteenth century it was a Kokand fortress.',
    why_named:
      'The name keeps alive in the city the memory of how Kazakhstani cities changed their names, and of how toponymy reflects political history.',
    historical_facts: [
      'The fortress of Aqmeshit was built on the lower Syr Darya by the Kokand Khanate.',
      'After Russian troops took the fortress in 1853, the town was renamed Perovsk.',
      'From 1925 to 1929 Kyzylorda was the capital of the Kazakh ASSR.',
      'The city received its present name, Qyzylorda, in 1925, replacing the name Perovsk.',
    ],
    interesting_fact:
      'One city bore four names in succession — Aqmeshit, Perovsk, Kyzyl-Orda, Qyzylorda: toponymy records the turnover of state eras directly.',
    cultural_connection:
      'The renaming history of Aqmeshit is a vivid teaching case that a name on the map is not permanent.',
  },
  orynbor: {
    kind: 'Street',
    description:
      'The street is named after Orynbor (Orenburg), which from 1920 to 1925 was the first capital of the Kazakh autonomous republic.',
    who_is_it:
      'Orynbor (Orenburg) is a city on the Zhaiyq river, founded in the eighteenth century as a strongpoint and a centre of trade with the steppe; it now lies in Russia.',
    why_named:
      'The name is a reminder that Kazakh statehood in the twentieth century had several capitals, and that the first of them stood at Orynbor.',
    historical_facts: [
      'In 1920 Orynbor became the capital of the Kirghiz (Kazakh) ASSR.',
      'In 1925 the capital moved to Aqmeshit, renamed Kyzylorda, and Orenburg was removed from the republic.',
      'In the nineteenth century Orenburg was the centre of the Orenburg department, which governed part of the Kazakh lands.',
      'A significant share of trade between the steppe and the Russian provinces passed through Orenburg.',
    ],
    cultural_connection:
      'Kazakhstan’s capitals changed in sequence: Orynbor — Kyzylorda — Almaty — Astana. The street fixes the first link in that chain.',
  },
  tauelsizdik: {
    kind: 'Avenue',
    description:
      'The avenue is named with the word “Tauelsizdik” — independence, a key notion of modern Kazakhstani statehood.',
    who_is_it:
      'Tauelsizdik is the Kazakh word for independence. In modern toponymy it denotes the state independence of the Republic of Kazakhstan, proclaimed in 1991.',
    why_named:
      'This is an example of a name-as-concept: the street carries not the name of a person or a place but of a value the state treats as foundational.',
    historical_facts: [
      'On 16 December 1991 the constitutional law “On the State Independence of the Republic of Kazakhstan” was adopted.',
      'Independence Day is marked in Kazakhstan on 16 December.',
      'The same date is bound to the December events of 1986 — the youth protests in Alma-Ata known as “Zheltoqsan”.',
      'Kazakhstan was the last of the Soviet union republics to proclaim independence.',
    ],
    interesting_fact:
      'The date 16 December unites two events five years apart: the “Zheltoqsan” protests of 1986 and the adoption of the independence law in 1991.',
    cultural_connection:
      'Names-as-concepts (“Tauelsizdik”, “Beybitshilik”, “Dostyq”) form a distinct layer of city toponymy reflecting the official system of values.',
  },
  'mangilik-el': {
    kind: 'Avenue',
    description:
      'The main thoroughfare of the left bank is named “Mangilik El” — “the Eternal Country”, a notion going back to ancient Turkic runic inscriptions.',
    who_is_it:
      'Mangilik El is a phrase meaning “eternal country” or “eternal people”. It appears in ancient Turkic written monuments of the eighth century.',
    why_named:
      'The name ties modern statehood to the ancient Turkic tradition and sets out an idea of continuity spanning more than a thousand years.',
    historical_facts: [
      'Researchers connect the phrase “Mangilik El” with the texts of the Orkhon runic monuments raised in honour of Kultegin and Bilge Khagan.',
      'The Orkhon inscriptions of the eighth century are the oldest surviving texts in a Turkic language.',
      'In 2015 Kazakhstan adopted “Mangilik El” as a nationwide patriotic idea.',
      'Mangilik El Avenue is the central axis of the left bank, linking the airport with the new administrative centre.',
    ],
    cultural_connection:
      'Invoking the Orkhon monuments is a way of showing that the region’s written tradition is older than the school curriculum usually allows.',
  },
  zhenis: {
    kind: 'Avenue',
    description:
      'The avenue is named with the word “Zhenis” — victory, in memory of the victory in the Second World War.',
    who_is_it:
      'Zhenis is the Kazakh word for victory. In city toponymy it refers to the victory of 1945 and to the memory of Kazakhstani participation in the Second World War.',
    why_named:
      'The name preserves one of the principal dates of twentieth-century memory and is typical of cities across the post-Soviet space.',
    historical_facts: [
      'More than a million people were called up from Kazakhstan to the fronts of the Second World War.',
      'Rifle divisions and brigades were formed in the republic, among them General Panfilov’s 316th Division.',
      'During the war Kazakhstan received industrial plants and people evacuated from the western regions of the USSR.',
      'Victory Day is marked on 9 May and remains a state holiday of Kazakhstan.',
    ],
    cultural_connection:
      'Zhenis Avenue is linked in meaning to Momyshuly and Koshkarbayev streets — together they form a “military” cluster of meaning in the city’s toponymy.',
  },
  respublika: {
    kind: 'Avenue',
    description:
      'One of the main thoroughfares of the right bank is named after the republican form of statehood.',
    who_is_it:
      'A republic is a form of state organisation in which the organs of power are elected. Under its constitution Kazakhstan is a unitary state with a presidential form of government.',
    why_named:
      'The name fixes the type of state structure itself in toponymy and belongs to the layer of names-as-concepts.',
    historical_facts: [
      'The current Constitution of the Republic of Kazakhstan was adopted by referendum on 30 August 1995.',
      'Constitution Day is marked in Kazakhstan on 30 August.',
      'Respublika Avenue is the historic central axis of the right bank, formed before the capital was moved.',
      'The capital was moved from Almaty to Akmola in 1997, and the city took the name Astana in 1998.',
    ],
    cultural_connection:
      'Respublika Avenue shows a layer of building that predates the new capital: it was already the main street in the Tselinograd period.',
  },
  beybitshilik: {
    kind: 'Street',
    description:
      'The street is named with the word “Beybitshilik” — peace, one of the key notions of Kazakhstan’s foreign-policy language.',
    who_is_it:
      'Beybitshilik is the Kazakh word for peace in the sense of the absence of war. In Kazakhstani symbolism it is bound to the themes of non-nuclear status and interethnic accord.',
    why_named:
      'The name belongs to the layer of urbanonyms-as-concepts and reflects values the state emphasises in its identity.',
    historical_facts: [
      'On 29 August 1991 a decree closed the Semipalatinsk nuclear test site.',
      'Kazakhstan gave up the nuclear arsenal it had inherited and acceded to the Treaty on the Non-Proliferation of Nuclear Weapons.',
      'At Kazakhstan’s initiative, 29 August was declared by the UN the International Day against Nuclear Tests.',
      'The theme of peace and accord is embedded in the work of the Assembly of the People of Kazakhstan, created in 1995.',
    ],
    cultural_connection:
      'The notion of “beybitshilik” is connected with the anti-nuclear movement “Nevada — Semipalatinsk”, which arose in 1989.',
  },
  dostyk: {
    kind: 'Street',
    description:
      'The street is named with the word “Dostyq” — friendship, a notion tied to the theme of interethnic accord in Kazakhstan.',
    who_is_it:
      'Dostyq is the Kazakh word for friendship. In city toponymy it refers to the idea of accord among the peoples living in Kazakhstan.',
    why_named:
      'The name belongs to the urbanonyms-as-concepts and reflects the multi-ethnic composition of the country and its capital.',
    historical_facts: [
      'The Assembly of the People of Kazakhstan was created in 1995 as an institution representing ethnic groups.',
      'Kazakhstan’s multi-ethnic population took shape largely through the deportations of the 1930s–1940s and the Virgin Lands campaign of the 1950s.',
      'Dostyq Street lies on the left bank, in the area of the capital’s administrative centre.',
      '1 May is marked in Kazakhstan as the Day of Unity of the People of Kazakhstan.',
    ],
    cultural_connection:
      'The names “Dostyq”, “Beybitshilik” and “Birlik” form a group of urbanonyms describing public values rather than historical events.',
  },
  'kyz-zhibek': {
    kind: 'Street',
    description:
      'The street is named after the heroine of “Qyz Zhibek”, one of the best-known Kazakh lyric-epic tales.',
    who_is_it:
      'Qyz Zhibek is the heroine of a Kazakh lyric-epic work, a symbol of fidelity and of female beauty in the folk tradition.',
    why_named:
      'The name shows that city toponymy holds not only real historical figures but also characters from literary works.',
    historical_facts: [
      '“Qyz Zhibek” belongs to the lyric-epic zhyrs — works that combine a love plot with epic narration.',
      'The tale was transmitted orally by zhyraus and aqyns and was written down in the nineteenth and twentieth centuries.',
      'In 1970 the Kazakhfilm studio produced the feature film “Qyz Zhibek”, directed by Sultan Khodzhikov.',
      'An opera and theatre productions have also been created from the plot.',
    ],
    interesting_fact:
      'Unlike the batyr zhyrs, whose central plot is war, “Qyz Zhibek” is built around a love story — showing the generic range of the Kazakh epic.',
    cultural_connection:
      'The epic tales are the principal source of knowledge about the values and daily life of nomadic society before written literature appeared.',
  },
  'koblandy-batyr': {
    kind: 'Street',
    description:
      'The street is named after Qoblandy Batyr — the hero of the Kazakh heroic epic of the same name.',
    who_is_it:
      'Qoblandy Batyr is the central hero of a Kazakh batyr zhyr, an epic tale about the defence of the homeland.',
    why_named:
      'The name belongs to the epic rather than the strictly historical layer: Qoblandy is known above all as a literary figure.',
    historical_facts: [
      '“Qoblandy Batyr” is among the most fully recorded Kazakh heroic epics.',
      'The epic was performed by zhyraus to the accompaniment of the qobyz or the dombra.',
      'Several versions of the tale exist, recorded from different performers — typical of an oral tradition.',
      'The plot is built around the defence of the people from an outside invasion and the hero’s trials.',
    ],
    cultural_connection:
      'The batyr zhyr is the principal epic genre of Kazakh folklore; it was through this form that ideas of duty, honour and clan memory were transmitted.',
  },
  kurmangazy: {
    kind: 'Street',
    description:
      'The street honours Kurmangazy Sagyrbaiuly — a kuishi composer and a classic of Kazakh instrumental music.',
    who_is_it:
      'Kurmangazy Sagyrbaiuly (1823–1896) was a Kazakh folk composer and dombra player, author of kuis — instrumental pieces for the dombra.',
    why_named:
      'The name brings musical culture into toponymy: the kui is a self-contained genre with no direct equivalent in the European tradition.',
    historical_facts: [
      'A kui is an instrumental piece for the dombra that tells a story without words.',
      'Kurmangazy’s best-known kui is “Saryarqa”, built as a musical image of the steppe.',
      'The composer’s work belongs to the tokpe dombra school of western Kazakhstan.',
      'The Kazakh National Orchestra of Folk Instruments and the conservatoire in Almaty carry Kurmangazy’s name.',
    ],
    interesting_fact:
      'The kui “Saryarqa” and Saryarqa Avenue in Astana carry the same name — a musical work and a city thoroughfare pointing to the same image of the steppe.',
    cultural_connection:
      'Kazakh dombra art — the kui — was inscribed in 2014 on the UNESCO Representative List of the Intangible Cultural Heritage.',
  },
  korgalzhyn: {
    kind: 'Highway',
    description:
      'The highway leads towards Korgalzhyn — a village and state nature reserve known for the region’s largest flamingo colony.',
    who_is_it:
      'Korgalzhyn is a village in Akmola Region and the Korgalzhyn State Nature Reserve, which protects a system of steppe lakes.',
    why_named:
      'The name points directly at the road’s direction and at the same time brings a natural site of world significance into city toponymy.',
    historical_facts: [
      'The Korgalzhyn reserve was created in 1968 to protect wetlands and bird nesting grounds.',
      'Lake Tengiz within the reserve is one of the world’s northernmost nesting sites of the greater flamingo.',
      'The reserve forms part of the UNESCO World Heritage property “Saryarka — Steppe and Lakes of Northern Kazakhstan” (2008).',
      'The territory holds the status of a wetland of international importance under the Ramsar Convention.',
    ],
    interesting_fact:
      'Flamingos are usually associated with the tropics, yet at Korgalzhyn they nest at roughly the latitude of Moscow — the northernmost nesting point in the world.',
    cultural_connection:
      'Korgalzhyn is the principal natural site near the capital and the main destination for ecological tourism among Astana residents.',
  },
  esil: {
    kind: 'Street',
    description:
      'The name comes from the Esil (Ishim) river, which divides Astana into its right and left banks.',
    who_is_it:
      'The Esil (Russian: Ishim) is a river in Kazakhstan and Russia, a left tributary of the Irtysh; Astana stands on it.',
    why_named:
      'The river is the city’s main natural landmark: the division into right and left bank is measured from it, and a district of the capital and other city features carry its name.',
    historical_facts: [
      'The Esil is one of the largest tributaries of the Irtysh; its length exceeds 2,000 kilometres.',
      'The river flows through Akmola and North Kazakhstan regions of Kazakhstan and onward through Russia.',
      'The first fortification of Akmolinsk, from which the modern city grew, was founded on the bank of the Esil in 1830.',
      'The name of the capital’s Esil district is formed from the hydronym.',
    ],
    interesting_fact:
      'Hydronyms — names of water features — belong to the most durable layer of toponymy: a river’s name usually outlives every renaming of the cities on its banks.',
    cultural_connection:
      'Cities of the steppe zone arose along rivers, so the hydronym Esil explains the very siting of Astana.',
  },
  koktal: {
    kind: 'Street',
    description:
      'The name is formed from the Kazakh words “kok” (green, blue) and “tal” (willow) — a characteristic element of the riverside landscape.',
    who_is_it:
      'Koktal is a toponym widespread in Kazakhstan meaning “green willow grove”; it marked places with willow thickets by the water.',
    why_named:
      'The name belongs to the descriptive layer of toponymy: it records neither a person nor an event but a characteristic feature of the locality.',
    historical_facts: [
      'The Kazakh word “tal” means willow — a shrub growing along the banks of rivers and lakes.',
      'The prefix “kok” denotes both green and blue, which is characteristic of Turkic languages.',
      'Toponyms with the element “kok” are widespread in Kazakhstan: Kokshetau, Kokterek, Koksu.',
      'Names taken from plants told nomads where water and suitable camping places could be found.',
    ],
    interesting_fact:
      'Descriptive toponyms worked as practical navigation: “koktal” meant not simply “green willows” but a signal that there was water here.',
    cultural_connection:
      'Such names reveal the oldest layer of toponymy — before the names of people and ideas of state, land was named for what grew on it.',
  },
};
