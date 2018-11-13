import parseResults from './parseResults';

describe('given valid input', () => {
  const source = createSource();

  it('parses test type', () => {
    const parsed = parseResults(source);
    expect(parsed.testType).toEqual('Ставка NEW');
  });

  it('parses answers', () => {
    const parsed = parseResults(source);
    expect(parsed.answers).toHaveLength(30);
  });

  it('calculates rating', () => {
    const parsed = parseResults(source);
    expect(parsed.answers[0].rating).toEqual(50);
    expect(parsed.answers[1].rating).toEqual(12);
  });

  it('calculates overall rating', () => {
    const parsed = parseResults(source);
    expect(parsed.rating).toEqual(0);
  });

  it('normalizes answers', () => {
    const parsed = parseResults(source);
    expect(parsed.answers[1]).toEqual({
      question: 'салат со свининой по-тайски',
      correct: ['мята'],
      incorrect: [],
      missed: [
        'помидор черри, вкусный',
        'кинза',
        'лайм',
        'соус рыбный',
        'свиная вырезка',
        'лук зеленый',
        'перец чили',
        'масло растительное',
      ],
      remaining: ['помидор', 'соус тайский', 'огурец'],
      rating: 12,
    });
  });
});

describe('given input differs from expected', () => {
  it('throws error', () => {
    expect(() => parseResults('')).toThrowError(
      'Missing selector: "table rows"',
    );
  });
});

function createSource() {
  return `
  <table class="results" style="width: 90%; margin-left: auto; margin-right: auto;">
            <thead>
                <tr>
                    <th style="width: 5%">№</th>
                    <th style="width: 40%;">Вопрос</th>
                    <th style="width: 40%;">Выбранные ответы</th>
                    <th style="width: 15%;">% правильных ответов</th>
                </tr>
            </thead>
  <tr>
    <th colspan=4>Ставка NEW</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Мусс 3 шоколада</td>
    <td>
      <p style='margin: 0; padding: 0px 25px;  color: darkred;'>пирожное маффин шоколадный</p>
      <p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>пирожное 3 шоколада</p>
      <p style='margin: 0; padding: 0px 25px; '>сироп клубничный </p>
      <p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>мята </p>
      <p style='margin: 0; padding: 0px 25px; '>сироп шоколад</p>
    </td>
    <td style='color: darkred;'>
      <p>Всего: 5</p><p>Выбрано: 2</p><p>Правильных: 2</p><p>Выбрано правильных: 1</p><p>Результат: 50%</p></td></tr><tr><td>2</td><td>Салат  со свининой по-тайски</td><td><p style='margin: 0; padding: 0px 25px; '>помидор</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>помидор черри, вкусный</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>мята </p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>кинза</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лайм </p><p style='margin: 0; padding: 0px 25px; '>соус тайский</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>соус рыбный </p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>свиная вырезка</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лук зеленый</p><p style='margin: 0; padding: 0px 25px; '>огурец</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>перец чили</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>масло растительное</p></td><td><p>Всего: 12</p><p>Выбрано: 1</p><p>Правильных: 9</p><p>Выбрано правильных: 1</p><p>Результат: 12%</p></td></tr><tr><td>3</td><td>Сырный суп со снежным крабом</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>основа для супа сырная (картофель, сливки,чеснок)</p><p style='margin: 0; padding: 0px 25px; '>лосось</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>снежный краб</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>масло зеленое</p><p style='margin: 0; padding: 0px 25px; '>сыр Виола</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>укроп</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>перец болгарский</p><p style='margin: 0; padding: 0px 25px; '>морковь</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>масло растительное</p></td><td><p>Всего: 9</p><p>Выбрано: 1</p><p>Правильных: 6</p><p>Выбрано правильных: 1</p><p>Результат: 17%</p></td></tr><tr><td>4</td><td>Саке харусаме</td><td><p style='margin: 0; padding: 0px 25px; '>окунь</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>лосось</p><p style='margin: 0; padding: 0px 25px; '>лапша лагман</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лапша рисовая</p><p style='margin: 0; padding: 0px 25px; '>соус спайси</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>соус ски яки</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>масло растительное</p><p style='margin: 0; padding: 0px 25px; '>морковь</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>шампиньоны</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лук зеленый</p></td><td><p>Всего: 10</p><p>Выбрано: 1</p><p>Правильных: 6</p><p>Выбрано правильных: 1</p><p>Результат: 17%</p></td></tr><tr><td>5</td><td>Суп Удон со свининой</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>бонито бульон</p><p style='margin: 0; padding: 0px 25px; '>куриный бульон</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>водоросли вакаме</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>хондаши</p><p style='margin: 0; padding: 0px 25px;  color: darkred;'>укроп</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>яйцо</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лук зеленый</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лапша пшеничная</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>свинина</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>соус соевый</p></td><td><p>Всего: 10</p><p>Выбрано: 2</p><p>Правильных: 8</p><p>Выбрано правильных: 1</p><p>Результат: 13%</p></td></tr><tr><td>6</td><td>Скрэмбл (яичная каша)</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>яйцо</p><p style='margin: 0; padding: 0px 25px; '>яйцо перепелиное</p><p style='margin: 0; padding: 0px 25px; '>сливки </p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>молоко </p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>петрушка</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>соль</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>сахар </p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>масло растительное</p></td><td><p>Всего: 8</p><p>Выбрано: 2</p><p>Правильных: 6</p><p>Выбрано правильных: 2</p><p>Результат: 34%</p></td></tr><tr><td>7</td><td>Свиные медальоны с Айдахо в медово- горчичном соусе</td><td><p style='margin: 0; padding: 0px 25px; '>свиная шея</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>свиная вырезка</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>огурец соленый</p><p style='margin: 0; padding: 0px 25px;  color: darkred;'>огурец свежий</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>картофель айдахо</p><p style='margin: 0; padding: 0px 25px; '>картофель фри</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>масло растительное</p><p style='margin: 0; padding: 0px 25px; '>соус тайский</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>соус медово- горчичный</p><p style='margin: 0; padding: 0px 25px; '>укроп</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>петрушка</p></td><td><p>Всего: 11</p><p>Выбрано: 2</p><p>Правильных: 6</p><p>Выбрано правильных: 1</p><p>Результат: 17%</p></td></tr><tr><td>8</td><td>Яки эби маки</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>рис</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>водоросли нори</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>креветка салатная</p><p style='margin: 0; padding: 0px 25px; '>креветка тигровая</p><p style='margin: 0; padding: 0px 25px; '>окунь</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лосось</p><p style='margin: 0; padding: 0px 25px;  color: darkred;'>авокадо</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>тамаго</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>сыр сливочный</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>соус спайси</p><p style='margin: 0; padding: 0px 25px; '>яки соус</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>икра масаго оранжевая</p></td><td><p>Всего: 12</p><p>Выбрано: 2</p><p>Правильных: 8</p><p>Выбрано правильных: 1</p><p>Результат: 13%</p></td></tr><tr><td>9</td><td>Лосось гриль</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>филе лосося</p><p style='margin: 0; padding: 0px 25px; '>помидор черри</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>морковь</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>цукини</p><p style='margin: 0; padding: 0px 25px; '>салат айсберг</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>салат фриллис</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>масло растительное</p><p style='margin: 0; padding: 0px 25px;  color: darkred;'>чеснок</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>тимьян</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лимон </p></td><td><p>Всего: 10</p><p>Выбрано: 2</p><p>Правильных: 7</p><p>Выбрано правильных: 1</p><p>Результат: 15%</p></td></tr><tr><td>10</td><td>Суши с лососем и перепелиным яйцом</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>рис</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>водоросли нори</p><p style='margin: 0; padding: 0px 25px; '>кунжут</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лосось</p><p style='margin: 0; padding: 0px 25px;  color: darkred;'>тамаго</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>яйцо перепелиное</p></td><td><p>Всего: 6</p><p>Выбрано: 2</p><p>Правильных: 4</p><p>Выбрано правильных: 1</p><p>Результат: 25%</p></td></tr><tr><td>11</td><td>Фруктовая фантазия</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>банан </p><p style='margin: 0; padding: 0px 25px; '>грейпфрут</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>апельсин </p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>клубника </p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>киви </p><p style='margin: 0; padding: 0px 25px; '>груша </p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>сахарная пудра</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>мята </p><p style='margin: 0; padding: 0px 25px; '>сироп шоколад</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>ананас консервированный</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>сироп клубничный </p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>сливки взбитые </p></td><td><p>Всего: 12</p><p>Выбрано: 2</p><p>Правильных: 9</p><p>Выбрано правильных: 2</p><p>Результат: 23%</p></td></tr><tr><td>12</td><td>Гавайский гамбургер с курицей</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>куриная грудка</p><p style='margin: 0; padding: 0px 25px; '>огурец свежий</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>огурец соленый</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>помидор</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>булочка для бургера</p><p style='margin: 0; padding: 0px 25px; '>салат фриллис</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>кетчуп</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>майонез</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>мука пшеничная</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>масло растительное</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>ананас консервированный</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>сухари панировочные</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>сыр чеддер</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>яйцо</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>салат айсберг</p></td><td><p>Всего: 15</p><p>Выбрано: 2</p><p>Правильных: 13</p><p>Выбрано правильных: 2</p><p>Результат: 16%</p></td></tr><tr><td>13</td><td>Тост с ветчиной и сыром</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>яйцо</p><p style='margin: 0; padding: 0px 25px; '>булочка для бургера</p><p style='margin: 0; padding: 0px 25px; '>яйцо перепелиное</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>ветчина</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>хлеб тостовый</p><p style='margin: 0; padding: 0px 25px; '>сыр чеддер</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>сыр гауда</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>помидор</p><p style='margin: 0; padding: 0px 25px; '>сметана</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>зелень</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>соус розе (кетчуп+майонез)</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>масло растительное</p></td><td><p>Всего: 12</p><p>Выбрано: 3</p><p>Правильных: 8</p><p>Выбрано правильных: 3</p><p>Результат: 38%</p></td></tr><tr><td>14</td><td>Цыпленок по- тайски с кешью</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>куриная грудка</p><p style='margin: 0; padding: 0px 25px; '>куриное бедро</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лук репчатый</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>перец болгарский</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>кинза</p><p style='margin: 0; padding: 0px 25px;  color: darkred;'>укроп</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>орех кешью</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>сахар </p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лук зеленый</p><p style='margin: 0; padding: 0px 25px; '>соус барбекю</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>рис</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>соус рыбный </p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>масло растительное</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>соус устричный</p></td><td><p>Всего: 14</p><p>Выбрано: 2</p><p>Правильных: 11</p><p>Выбрано правильных: 1</p><p>Результат: 10%</p></td></tr><tr><td>15</td><td>Жульен с курицей</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>шампиньоны</p><p style='margin: 0; padding: 0px 25px; '>куриное бедро</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>куриная грудка</p><p style='margin: 0; padding: 0px 25px; '>молоко </p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>сливки </p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>тимьян</p><p style='margin: 0; padding: 0px 25px; '>чеснок</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>масло растительное</p><p style='margin: 0; padding: 0px 25px; '>сыр пармезан</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>зелень</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>сыр гауда</p></td><td><p>Всего: 11</p><p>Выбрано: 2</p><p>Правильных: 7</p><p>Выбрано правильных: 2</p><p>Результат: 29%</p></td></tr><tr><th colspan=4>Базовый для ставки</th></tr><tr><td>16</td><td>Борщ с говядиной  и сметаной</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>говядина</p><p style='margin: 0; padding: 0px 25px; '>куриное филе</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>чеснок</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>картофель</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>сметана</p><p style='margin: 0; padding: 0px 25px; '>бульон куриный</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>бульон говяжий</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>томатная паста</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>уксус столовый</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>морковь</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>свекла</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>капуста белокочанная</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лук зеленый</p><p style='margin: 0; padding: 0px 25px; '>лук порей</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лук репчатый</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>сахар</p></td><td><p>Всего: 16</p><p>Выбрано: 2</p><p>Правильных: 13</p><p>Выбрано правильных: 2</p><p>Результат: 16%</p></td></tr><tr><td>17</td><td>Филадельфия с огурцом</td><td><p style='margin: 0; padding: 0px 25px; '>угорь</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лосось</p><p style='margin: 0; padding: 0px 25px; '>окунь</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>рис</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>водоросли нори</p><p style='margin: 0; padding: 0px 25px;  color: darkred;'>авокадо</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>огурец</p><p style='margin: 0; padding: 0px 25px; '>лимон </p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>сыр сливочный</p></td><td><p>Всего: 9</p><p>Выбрано: 2</p><p>Правильных: 5</p><p>Выбрано правильных: 1</p><p>Результат: 20%</p></td></tr><tr><td>18</td><td>Яки эби маки</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>рис</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>нори</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лосось</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>салатная креветка </p><p style='margin: 0; padding: 0px 25px; '>тигровая креветка</p><p style='margin: 0; padding: 0px 25px; '>авокадо</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>тамаго</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>сливочный сыр</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>спайси соус</p><p style='margin: 0; padding: 0px 25px; '>яки соус</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>масага оранжевая</p><p style='margin: 0; padding: 0px 25px; '>масага красная</p><p style='margin: 0; padding: 0px 25px; '>огурец</p></td><td><p>Всего: 13</p><p>Выбрано: 2</p><p>Правильных: 8</p><p>Выбрано правильных: 2</p><p>Результат: 25%</p></td></tr><tr><td>19</td><td>Минари классический</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>тесто для спринг ролла (пшеничное)</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>сливочный сыр</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>сахарная пудра</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>банан</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>киви</p><p style='margin: 0; padding: 0px 25px; '>клюква</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>клубника</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>кокосовая стружка</p><p style='margin: 0; padding: 0px 25px; '>шоколадный сироп</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>клубничный сироп</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>мята</p><p style='margin: 0; padding: 0px 25px; '>яблоко</p><p style='margin: 0; padding: 0px 25px; '>курага</p></td><td><p>Всего: 13</p><p>Выбрано: 2</p><p>Правильных: 9</p><p>Выбрано правильных: 2</p><p>Результат: 23%</p></td></tr><tr><td>20</td><td>Тори маки</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>куриное бедро</p><p style='margin: 0; padding: 0px 25px; '>куриная грудка</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>рис</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>водоросли нори</p><p style='margin: 0; padding: 0px 25px; '>авокадо</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>тамаго</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>сыр сливочный</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>унаги соус</p><p style='margin: 0; padding: 0px 25px; '>лосось</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>кунжут</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>сырный соус</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>укроп</p></td><td><p>Всего: 12</p><p>Выбрано: 2</p><p>Правильных: 9</p><p>Выбрано правильных: 2</p><p>Результат: 23%</p></td></tr><tr><td>21</td><td>Рис со шпинатом</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>рис</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>шпинат</p><p style='margin: 0; padding: 0px 25px; '>лук порей</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>бульон куриный</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>сливки </p><p style='margin: 0; padding: 0px 25px;  color: darkred;'>молоко </p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>лук репчатый</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>укроп</p><p style='margin: 0; padding: 0px 25px; '>кунжут</p></td><td><p>Всего: 9</p><p>Выбрано: 2</p><p>Правильных: 6</p><p>Выбрано правильных: 1</p><p>Результат: 17%</p></td></tr><tr><td>22</td><td>Суп Том- Ям</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>паста Том-Ям</p><p style='margin: 0; padding: 0px 25px; '>креветка салатная</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>креветка тигровая</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>куриное филе</p><p style='margin: 0; padding: 0px 25px;  color: darkred;'>лук репчатый</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лук порей</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>шампиньоны</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>корень имбиря</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лайм </p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>соус рыбный </p><p style='margin: 0; padding: 0px 25px; '>огурец</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>кинза</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>помидор</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>куриный бульон</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>перец чили</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'> специя лемон грасс</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>сахар </p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>кафир- лайм</p></td><td><p>Всего: 18</p><p>Выбрано: 2</p><p>Правильных: 15</p><p>Выбрано правильных: 1</p><p>Результат: 7%</p></td></tr><tr><td>23</td><td>Цезарь с курицей</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>куриная грудка</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>сыр Пармезан</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>гренки</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>салат Ромейн</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>салат Айсберг</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>соус Цезарь</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>помидор черри</p><p style='margin: 0; padding: 0px 25px; '>соевый соус</p><p style='margin: 0; padding: 0px 25px; '>тунец</p><p style='margin: 0; padding: 0px 25px; '>майонез</p><p style='margin: 0; padding: 0px 25px; '>соус цитронет</p><p style='margin: 0; padding: 0px 25px; '>китайская капуста</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>яйцо перепелиное</p></td><td><p>Всего: 13</p><p>Выбрано: 2</p><p>Правильных: 8</p><p>Выбрано правильных: 2</p><p>Результат: 25%</p></td></tr><tr><td>24</td><td>Суп кимчи</td><td><p style='margin: 0; padding: 0px 25px; '>куриный бульон</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>бонито бульон</p><p style='margin: 0; padding: 0px 25px; '>водоросли нори</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>водоросли вакаме</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>яйцо</p><p style='margin: 0; padding: 0px 25px; '>куриная грудка</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>соус ширачи</p><p style='margin: 0; padding: 0px 25px; '>масло оливковое</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>масло кунжутное</p><p style='margin: 0; padding: 0px 25px;  color: darkred;'>грибы намеко</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>творог тофу</p></td><td><p>Всего: 11</p><p>Выбрано: 2</p><p>Правильных: 6</p><p>Выбрано правильных: 1</p><p>Результат: 17%</p></td></tr><tr><td>25</td><td>Филадельфия классик</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>рис</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>водоросли нори</p><p style='margin: 0; padding: 0px 25px; '>окунь</p><p style='margin: 0; padding: 0px 25px; '>угорь</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лосось</p><p style='margin: 0; padding: 0px 25px; '>тамаго</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>сыр сливочный</p><p style='margin: 0; padding: 0px 25px;  color: darkred;'>огурец</p></td><td><p>Всего: 8</p><p>Выбрано: 2</p><p>Правильных: 4</p><p>Выбрано правильных: 1</p><p>Результат: 25%</p></td></tr><tr><td>26</td><td>Эби идзуми тай маки</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>рис</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>нори</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>морской окунь</p><p style='margin: 0; padding: 0px 25px; '>тунец</p><p style='margin: 0; padding: 0px 25px; '>кальмар</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>салатная креветка </p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>тамаго</p><p style='margin: 0; padding: 0px 25px;  color: darkred;'>авокадо</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>сливочный сыр</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>сырный соус</p><p style='margin: 0; padding: 0px 25px; '>спайси соус</p></td><td><p>Всего: 11</p><p>Выбрано: 2</p><p>Правильных: 7</p><p>Выбрано правильных: 1</p><p>Результат: 15%</p></td></tr><tr><td>27</td><td>Куриный суп с лапшой                                                               </td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>куриное бедро</p><p style='margin: 0; padding: 0px 25px; '>куриная грудка</p><p style='margin: 0; padding: 0px 25px; '>лапша пшеничная</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>перец болгарский</p><p style='margin: 0; padding: 0px 25px; '>яйцо перепелиное</p><p style='margin: 0; padding: 0px 25px; '>петрушка</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>укроп</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>чеснок</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>куриный бульон</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>вермишель </p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>морковь</p></td><td><p>Всего: 11</p><p>Выбрано: 2</p><p>Правильных: 7</p><p>Выбрано правильных: 2</p><p>Результат: 29%</p></td></tr><tr><td>28</td><td>Вок курица/удон</td><td><p style='margin: 0; padding: 0px 25px; '>куриная грудка</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>куриное бедро</p><p style='margin: 0; padding: 0px 25px; '>вермишель домашняя</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лапша пшеничная</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>морковь</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>паприка</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>капуста китайская</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>чеснок</p><p style='margin: 0; padding: 0px 25px; '>лук репчатый</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>лук красный</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>масло растительное</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лук зеленый</p><p style='margin: 0; padding: 0px 25px; '>соус спайси</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>соус ланч- кинг</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>соус тайский</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>соус терияки</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>соус устричный</p><p style='margin: 0; padding: 0px 25px; '>майонез</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>соус соевый</p></td><td><p>Всего: 19</p><p>Выбрано: 2</p><p>Правильных: 14</p><p>Выбрано правильных: 2</p><p>Результат: 15%</p></td></tr><tr><td>29</td><td>Мясной гриль </td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>гриль ролл с ветчиной и кунжутом</p><p style='margin: 0; padding: 0px 25px; '>гриль ролл с крабом и тобико</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>гриль ролл с овощами и беконом</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>сырный гриль ролл с беконом</p><p style='margin: 0; padding: 0px 25px;  color: darkred;'>игай яки 3 шт.</p><p style='margin: 0; padding: 0px 25px;  color: darkred;'>кавасаки маки</p></td><td><p>Всего: 6</p><p>Выбрано: 2</p><p>Правильных: 3</p><p>Выбрано правильных: 0</p><p>Результат: 0%</p></td></tr><tr><td>30</td><td>Мисо суп</td><td><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>мисо бульон</p><p style='margin: 0; padding: 0px 25px; '>бонито бульон</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>лук зеленый</p><p style='margin: 0; padding: 0px 25px; '>яйцо</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>грибы намеко</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;'>водоросли вакаме</p><p style='margin: 0; padding: 0px 25px;  color: darkred;'>кунжут</p><p style='margin: 0; padding: 0px 25px; background-color: lightgreen;'>творог тофу</p></td><td><p>Всего: 8</p><p>Выбрано: 2</p><p>Правильных: 5</p><p>Выбрано правильных: 1</p><p>Результат: 20%</p></td></tr>            <tr><th colspan="4" style="padding: 100px 100px;"><p style='color: darkred;'>Тест не пройден. Ваши знания по меню составляют 0%, необходимо доучить.</p></th></tr>
        </table>
  `;
}
