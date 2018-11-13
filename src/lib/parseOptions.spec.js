import parseOptions from './parseOptions';

const source = `
<div style="padding: 20px 20px; background-color: #F5FADA; text-align: left;">
  <div style="text-align: left; display: inline-block; padding: 20px 20px; display: inline-block;">
    <div style="display: table;">
      <div style="padding: 5px; display: table-row;">
        <div style="display: table-cell; padding: 3px;"><input name="answer_13134" type="checkbox" form="question"></div>
        <div style="display: table-cell; text-align: left;">рис</div>
      </div>
      <div style="padding: 5px; display: table-row;">
        <div style="display: table-cell; padding: 3px;"><input name="answer_13135" type="checkbox" form="question"></div>
        <div style="display: table-cell; text-align: left;">водоросли вакаме</div>
      </div>
      <div style="padding: 5px; display: table-row;">
        <div style="display: table-cell; padding: 3px;"><input name="answer_13136" type="checkbox" form="question"></div>
        <div style="display: table-cell; text-align: left;">водоросли нори</div>
      </div>
      <div style="padding: 5px; display: table-row;">
        <div style="display: table-cell; padding: 3px;"><input name="answer_13137" type="checkbox" form="question"></div>
        <div style="display: table-cell; text-align: left;">кунжут</div>
      </div>
      <div style="padding: 5px; display: table-row;">
        <div style="display: table-cell; padding: 3px;"><input name="answer_13138" type="checkbox" form="question"></div>
        <div style="display: table-cell; text-align: left;">яки соус</div>
      </div>
      <div style="padding: 5px; display: table-row;">
        <div style="display: table-cell; padding: 3px;"><input name="answer_13139" type="checkbox" form="question"></div>
        <div style="display: table-cell; text-align: left;">унаги-   соус</div>
      </div>
      <div style="padding: 5px; display: table-row;">
        <div style="display: table-cell; padding: 3px;"><input name="answer_13140" type="checkbox" form="question"></div>
        <div style="display: table-cell; text-align: left;">творог тофу</div>
      </div>
      <div style="padding: 5px; display: table-row;">
        <div style="display: table-cell; padding: 3px;"><input name="answer_13141" type="checkbox" form="question"></div>
        <div style="display: table-cell; text-align: left;">ТаМаго</div>
      </div>
      <div style="padding: 5px; display: table-row;">
        <div style="display: table-cell; padding: 3px;"><input name="answer_13142" type="checkbox" form="question"></div>
        <div style="display: table-cell; text-align: left;">ТаМаго</div>
      </div>
    </div>
  </div>
</div>
`;

it('normalizes results', () => {
  const options = parseOptions(source);
  expect(options[5].text).toEqual('унаги-соус');
  expect(options[7].text).toEqual('тамаго');
});

it('removes duplicates by text', () => {
  const options = parseOptions(source);
  expect(options[options.length - 1].text).not.toEqual(
    options[options.length - 2].text,
  );
});
