const db = `
ром-кола, ром шарк тус сильвер, лимон, лед, кока-кола
клубничная маргарита, текила пепе лопес сильвер, ликер болс трипл сек, клубника с/м, лайм (на украшение), лед, сироп клубничный, сок лимона
фрут шампань, шампанское барон де виник п/сл, сироп грейпфрут, апельсин, огурец, лимон, лед, лайм, клубника с/м
йогуртовый физз, ром шарк тус сильвер, ликер болс йогурт натуральный, сахарный сироп, лед, апельсин, сок лимона
белая сангрия, вино белое сухое, апельсин, яблоко, лимон, спрайт, лед, клубника, лайм
красная мери алк., водка смирнов №21, сок томатный, лед, петрушка, соль| перец, соус табаско
мохито клубничный алк., ром шарк тус сильвер, сироп клубничный, святой источник газ., сахарный сироп, лед, лимон, мята, лайм, клубника
белый глинтвейн липа-облепиха (бокал), чай липовый, вино белое сухое, мед, апельсин, вода, гвоздика, корень имбиря, корица палочка, концентрат облепихи
orange beer, пиво светлое лагер, сок апельсин, лимон, сироп роз. грейпфрут, апельсин (цедра)
снежный апельсин, ликер болс йогурт натуральный, апельсин, лед, апельсин (на украшение)
айриш кофе, кофе американо, виски джеймсон, топинг карамель, сливки взбитые, сахар
виски-кола, виски беллс, кока-кола, лед, лимон
текила санрайз, текила пепе лопес сильвер, сок апельсин, лед, сироп гренадин, апельсин (на украшение)
юбари, ром шарк тус сильвер, ликер болс дыня, ликер болс йогурт натуральный, сок ананас, сок лимона, апельсин (на украшение), огурец, сахарный сироп, лед
лесное яблоко, водка смирнов №21, апельсин (на украшение), лед, чабрец, джин гордонс, сахарный сироп, сок лимона, ликер болс сауэр эйпл
фруктовый чай, чай эрл грей, яблоко, груша, сироп гренадин, клубника, апельсин, лимон
чай тропики, апельсин, сок лимона, лимон, мускатный орех, палочка корицы, яблоко, сироп маракуйя, гвоздика, сахарный сироп
мохито классический б/а, святой источник газ., мята, лайм, сахарный сироп, лед, лимон
лимонад цитрон, сок апельсин, киви, апельсин, лимон, лед, сироп маракуйя, святой источник газ.
домашний лимонад клубничный, лимон, вода святой источник газ, лед, сироп клубничный, сахарный сироп
домашний лимонад вишнёвый, лимон, вода святой источник газ, лед, сироп вишня, сахарный сироп
белый глинтвейн липа-облепиха (бокал) ба, корица палочка, сок яблоко, чай липовый, концентрат облепихи, корень имбиря, апельсин, мед, гвоздика, вода
молочный коктейль с топингом, сливки, мороженое ванильное, молоко, сливки взбитые, топинг карамель, топинг шоколад, топинг вишня, топинг клубника, вишня коктейльная
молочный коктейль со сгущенкой, молоко, мороженое ванильное, сгущёнка, сливки взбитые, топпинг шоколад
латте "макиато", кофе эспрессо, молоко
бананово-клубничный смузи, молоко, банан, сироп клубничный, апельсин, клубника с/м
молочный коктейль имбирный пряник, молоко, сливки взбитые, топинг шоколад, мороженое ванильное, сироп "имбирный пряник"
мохито облепиховый ба (300 мл), мята, лайм, лимон, святой источник газ., облепиха с/м, сахарный сироп, концентрат облепихи, лед
домашний лимонад кокосовый, вода святой источник газ, сироп кокос, лимон, сахарный сироп, лед
кофе "евразия", кофе эспрессо, молоко, сливки взбитые, сироп "имбирный пряник", топпинг шоколад, апельсин (цедра)
роми, водка смирнов №21, кампари, сок лимона, сироп роз. грейпфрут, лед, святой источник газ., апельсин (на украшение)
домашний глинтвейн алк., вино красное сухое, яблоко, апельсин, лимон, мед, гвоздика, палочка корицы
южный ветер, виски беллс, сок лимона, сок апельсин, ликер болс дыня, апельсин (на украшение), лед
иллюзия, водка смирнов №21, ликер болс трипл сек, ликер болс дыня, сок ананас, сок лимона, лед, апельсин (на украшение)
вишнёвое пиво, пиво светлое лагер, сок вишнёвый, вишня коктейльная, лед, лимон, сироп вишня
айс кофе с бейлисом, кофе эспрессо, ликер бейлис, молоко, сливки взбитые, лед, сахарный сироп, топинг карамель
травяной чай, чай черный цейлон, мята, анис, чабрец
фруктовый смузи, сок апельсин, банан, киви, клубника с/м, сироп клубничный, киви (на украшение)
персиковое настроение, мороженое ванильное, сок персик, апельсин (на украшение), лед, вишня коктейльная
мохито вишневый б/а, святой источник газ., сахарный сироп, вишня коктейльная, лайм, лимон, сироп вишня, лед, мята
байский чай, чай черный цейлон, яблоко, палочка корицы, лимон, анис, чабрец, гвоздика, мята
лимонная легкость, лимон, сок лимона, сироп маракуйя, мята, палочка корицы, мед, сахарный сироп
лонг айленд нью-йорк, водка смирнов №21, ликер болс трипл сек, текила пепе лопес сильвер, ром шарк тус сильвер, джин гордонс, лед, лайм, кока-кола, сироп вишня, лимон
гумбай смеш, ром шарк тус сильвер, сок ананас, сок лимона, ликер болс трипл сек, сироп кокос, апельсин (на украшение), лед
мохито облепиховый алк. (бокал), ром шарк тус сильвер, мята, лайм, лимон, святой источник газ., облепиха с/м, лед, концентрат облепихи, сахарный сироп
брусничный розато, вермут ганча белый, сахарный сироп, лед, брусника с/м, сироп роз. грейпфрут
молочно-банановый коктейль, молоко, мороженое, банан, сливки взбитые, банан (на украшение)
домашний глинтвейн б/а, сок вишнёвый, апельсин, яблоко, мед, лимон, гвоздика, палочка корицы
чай облепиха-липа, чай липовый, апельсин, мед, вода, шалфей (свежий), облепиха с/м, сок апельсин, концентрат облепихи
мохито вишневый алк., ром шарк тус сильвер, сироп вишня, сахарный сироп, вишня коктейльная, лед, святой источник газ., мята, лайм, лимон
итальяно кофе, ликер амаретто, кофе американо, топинг карамель, сливки взбитые, сахар
снифт-тоник, ром шарк тус сильвер, ликер болс трипл сек, лед, лимон, швепс, водка смирнов №21, сироп маракуйя, сок лимона
мохито классический алк., ром шарк тус сильвер, сахарный сироп, мята, лимон, лед, лайм, святой источник газ.
красная мери б/а, сок томатный, перец| соль, петрушка, лед, соус табаско
цитрусовый дайкири, ром шарк тус сильвер, апельсин, сок лимона, лед, сироп роз. грейпфрут, болс триппл сек, апельсин (на украшение)
мохито клубничный б/а, клубника, святой источник газ., сироп клубничный, сахарный сироп, мята, лимон, лед, лайм
айс кофе с карамелью, кофе эспрессо, молоко, сливки взбитые, топинг карамель, лед, сахарный сироп
яблочный розе, вермут белый, яблоко, лед, палочка корицы, сок яблоко, сироп роз. грейпфрут
молодильное яблоко (вашингтонское яблоко), водка смирнов №21, ликер болс сауэр эйпл, сок лимона, яблоко, лед, сироп гренадин, палочка корицы
красная сангрия, вино красное сухое, спрайт, лимон, клубника, апельсин, лед, яблоко, лайм
`;

export default db;
