const Utils = require('./Utils');
const TestIDs = require('../playground/src/testIDs');
const { elementById } = Utils;

describe('SetRoot', () => {
  beforeEach(async () => {
    await device.relaunchApp();
    await elementById(TestIDs.NAVIGATION_TAB).tap();
    await elementById(TestIDs.SET_ROOT_BTN).tap();
  });

  it('set root multiple times with the same componentId', async () => {
    await elementById(TestIDs.SET_MULTIPLE_ROOTS_BTN).tap();
    await expect(elementById(TestIDs.PUSHED_SCREEN_HEADER)).toBeVisible();
  });

  it('set root hides bottomTabs', async () => {
    await elementById(TestIDs.SET_ROOT_HIDES_BOTTOM_TABS_BTN).tap();
    await expect(elementById(TestIDs.LAYOUTS_TAB)).toBeNotVisible();
    await elementById(TestIDs.PUSH_BTN).tap();
    await expect(elementById(TestIDs.LAYOUTS_TAB)).toBeVisible();
  });

  it('set root with deep stack hides bottomTabs', async () => {
    await elementById(TestIDs.SET_ROOT_WITH_STACK_HIDES_BOTTOM_TABS_BTN).tap();
    await expect(elementById(TestIDs.LAYOUTS_TAB)).toBeNotVisible();
    await elementById(TestIDs.POP_BTN).tap();
    await expect(elementById(TestIDs.LAYOUTS_TAB)).toBeVisible();
  });

  it('set root without stack hides bottomTabs', async () => {
    await elementById(TestIDs.SET_ROOT_WITHOUT_STACK_HIDES_BOTTOM_TABS_BTN).tap();
    await expect(elementById(TestIDs.LAYOUTS_TAB)).toBeNotVisible();
  });
});
