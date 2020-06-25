import React from 'react';
import { NavigationComponentProps } from 'react-native-navigation';
import Root from '../components/Root';
import Button from '../components/Button';
import Navigation from './../services/Navigation';
import Screens from './Screens';
import { component } from '../commons/Layouts';
import testIDs from '../testIDs';

const {
  SWITCH_TAB_BY_INDEX_BTN,
  SWITCH_TAB_BY_COMPONENT_ID_BTN,
  SET_BADGE_BTN,
  CLEAR_BADGE_BTN,
  HIDE_TABS_BTN,
  SHOW_TABS_BTN,
  HIDE_TABS_PUSH_BTN,
} = testIDs;

export default class FirstBottomTabScreen extends React.Component<NavigationComponentProps> {
  static options() {
    return {
      layout: {
        orientation: ['portrait', 'landscape'],
      },
      topBar: {
        title: {
          text: 'First Tab',
        },
      },
      bottomTab: {
        icon: require('../../img/whatshot.png'),
        text: 'Tab 1',
        dotIndicator: { visible: true },
      },
    };
  }

  dotVisible = true;
  badgeVisible = true;

  render() {
    return (
      <Root componentId={this.props.componentId}>
        <Button
          label="Switch Tab by Index"
          testID={SWITCH_TAB_BY_INDEX_BTN}
          onPress={this.switchTabByIndex}
        />
        <Button
          label="Switch Tab by componentId"
          testID={SWITCH_TAB_BY_COMPONENT_ID_BTN}
          onPress={this.switchTabByComponentId}
        />
        <Button label="Set Badge" testID={SET_BADGE_BTN} onPress={() => this.setBadge('NEW')} />
        <Button label="Clear Badge" testID={CLEAR_BADGE_BTN} onPress={() => this.setBadge('')} />
        <Button label="Set Notification Dot" onPress={this.setNotificationDot} />
        <Button label="Hide Tabs" testID={HIDE_TABS_BTN} onPress={() => this.toggleTabs(false)} />
        <Button label="Show Tabs" testID={SHOW_TABS_BTN} onPress={() => this.toggleTabs(true)} />
        <Button
          label="Hide Tabs on Push"
          testID={HIDE_TABS_PUSH_BTN}
          onPress={this.hideTabsOnPush}
        />
        <Button label="Push" onPress={this.push} />
      </Root>
    );
  }

  switchTabByIndex = () =>
    Navigation.mergeOptions(this, {
      bottomTabs: {
        currentTabIndex: 1,
      },
    });

  switchTabByComponentId = () =>
    Navigation.mergeOptions('SecondTab', {
      bottomTabs: {
        currentTabId: 'SecondTab',
      },
    });

  setBadge = (badge: string) => {
    this.badgeVisible = !!badge;
    if (this.badgeVisible) this.dotVisible = false;
    Navigation.mergeOptions(this, {
      bottomTab: { badge },
    });
  };

  setNotificationDot = () => {
    this.dotVisible = !this.dotVisible;
    Navigation.mergeOptions(this, {
      bottomTab: {
        dotIndicator: { visible: this.dotVisible },
      },
    });
  };

  toggleTabs = (visible: boolean) =>
    Navigation.mergeOptions(this, {
      bottomTabs: { visible },
    });

  hideTabsOnPush = () =>
    Navigation.push(
      this,
      component(Screens.Pushed, {
        bottomTabs: { visible: false },
      })
    );

  push = () => Navigation.push(this, Screens.Pushed);
}
