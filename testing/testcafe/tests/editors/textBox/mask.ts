import { Selector } from 'testcafe';
import url from '../../../helpers/getPageUrl';
import TextBox from '../../../model/textBox';
import createWidget from '../../../helpers/createWidget';

fixture`TextBox_mask`
  .page(url(__dirname, '../../container.html'));

// note: https://github.com/DevExpress/testcafe-hammerhead/issues/2377
test('\'onInput\' and \'onValueChanged\' events should raise then the mask enabled (T814440)', async (t) => {
  const textBox = new TextBox('#container');
  const { input } = textBox;

  const eventLog = Selector('#otherContainer');
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  await textBox.option('onValueChanged', () => {
    const log = ($('#otherContainer').get(0) as any).value;
    ($('#otherContainer').get(0) as any).value = !log ? 'changed' : `${log}changed`;
  });
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  await textBox.option('onInput', () => { ($('#otherContainer').get(0) as any).value += 'input'; });

  await t
    .typeText(input, '1', { caretPos: 0 })
    .expect(input.value).eql('1')
    .expect(textBox.option('value'))
    .eql('1')
    .expect(textBox.option('text'))
    .eql('1')
    .expect(eventLog.value)
    .eql('changedinput')

    .typeText(input, '2')
    .expect(input.value)
    .eql('1')
    .expect(textBox.option('value'))
    .eql('1')
    .expect(textBox.option('text'))
    .eql('1')
    .expect(eventLog.value)
    .eql('changedinput')

    .pressKey('backspace')
    .expect(input.value)
    .eql('_')
    .expect(textBox.option('value'))
    .eql('')
    .expect(textBox.option('text'))
    .eql('_')
    .expect(eventLog.value)
    .eql('changedinputchangedinput')

    .pressKey('backspace')
    .expect(input.value)
    .eql('_')
    .expect(textBox.option('value'))
    .eql('')
    .expect(textBox.option('text'))
    .eql('_')
    .expect(eventLog.value)
    .eql('changedinputchangedinput');
}).before(async () => createWidget('dxTextBox', {
  mask: '9',
  valueChangeEvent: 'input',
}));