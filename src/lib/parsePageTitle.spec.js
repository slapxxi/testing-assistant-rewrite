// @flow
import parsePageTitle from './parsePageTitle';

const source = `
  <div style="padding: 20px; height: 10%; background-color: #F5FADA;">
    <div style="font-family: sans-serif; font-size: 24px;">
      <p>Суши с тофу</p>
    </div>
  </div>
`;

it('parses question title', () => {
  const title = parsePageTitle(source);
  expect(title).toEqual('Суши с тофу');
});

it('returns empty string if source does not match', () => {
  const title = parsePageTitle('');
  expect(title).toEqual('');
});
