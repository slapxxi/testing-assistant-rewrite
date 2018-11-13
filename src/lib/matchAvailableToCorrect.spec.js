import database from "../data/stavka";
import { findOptions } from "../store/selectors";
import initStateFromDB from "./initStateFromDB";
import matchAvailableToCorrect from "./matchAvailableToCorrect";
import parseOptions from "./parseOptions";

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
        <div style="display: table-cell; text-align: left;">унаги соус</div>
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
        <div style="display: table-cell; padding: 3px;"><input name="answer_13141" type="checkbox" form="question"></div>
        <div style="display: table-cell; text-align: left;">Левая опция</div>
      </div>
    </div>
  </div>
</div>
`;

const state = initStateFromDB({ example: database });
const availableOptions = parseOptions(source);
const correctOptions = findOptions(state.databases.example, "Суши с тофу");
const matches = matchAvailableToCorrect(availableOptions, correctOptions);

it("finds correct answers in available options", () => {
  expect(mapToText(matches)).toEqual([
    "рис",
    "водоросли нори",
    "кунжут",
    "унаги соус",
    "творог тофу"
  ]);
});

it("preserves ids needed for sending form", () => {
  expect(mapToIDs(matches)).toEqual([
    "answer_13134",
    "answer_13136",
    "answer_13137",
    "answer_13139",
    "answer_13140"
  ]);
});

it("returns empty array when there are no correct options", () => {
  const matches = matchAvailableToCorrect(availableOptions, []);
  expect(mapToText(matches)).toEqual([]);
});

it("returns empty array when there are no available options", () => {
  const matches = matchAvailableToCorrect([], correctOptions);
  expect(mapToText(matches)).toEqual([]);
});

function mapToText(options) {
  return options.map((option) => option.text);
}

function mapToIDs(options) {
  return options.map((option) => option.id);
}
