import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import TestIDs from '../testIDs';

let _overlayInstance;
export const logLifecycleEvent = (event) => {
  _overlayInstance.setState({
    events: [..._overlayInstance.state.events, event],
  });
};

export default class StaticLifecycleOverlay extends React.Component {
  static options() {
    return {
      layout: {
        componentBackgroundColor: 'transparent',
      },
    };
  }

  componentDidMount() {
    _overlayInstance = this;
  }

  componentWillUnmount() {
    _overlayInstance = null;
  }

  constructor(props) {
    super(props);
    this.state = {
      text: 'nothing yet',
      events: [],
    };
    this.listeners = [];
    this.listeners.push(
      Navigation.events().registerComponentDidAppearListener((event) => {
        event.event = 'componentDidAppear';
        this.setState({
          events: [...this.state.events, { ...event }],
        });
      })
    );
    this.listeners.push(
      Navigation.events().registerComponentDidDisappearListener((event) => {
        event.event = 'componentDidDisappear';
        this.setState({
          events: [...this.state.events, { ...event }],
        });
      })
    );
    this.listeners.push(
      Navigation.events().registerCommandListener((commandName) => {
        this.setState({
          events: [...this.state.events, { event: 'command started', commandName }],
        });
      })
    );
    this.listeners.push(
      Navigation.events().registerNavigationButtonPressedListener(({ componentId, buttonId }) => {
        this.setState({
          events: [
            ...this.state.events,
            { event: 'navigationButtonPressed', buttonId, componentId },
          ],
        });
      })
    );
    this.listeners.push(
      Navigation.events().registerModalDismissedListener(({ componentId }) => {
        this.setState({
          events: [...this.state.events, { event: 'modalDismissed', componentId }],
        });
      })
    );
  }

  componentWillUnmount() {
    this.listeners.forEach((listener) => listener.remove());
    this.listeners = [];
    alert('Overlay Unmounted');
  }

  renderEvent(event) {
    if (event.commandId) {
      return <Text style={styles.h2}>{`${event.commandId}`}</Text>;
    } else if (event.commandName) {
      return <Text style={styles.h2}>{`${event.commandName}`}</Text>;
    } else if (event.componentName) {
      return (
        <Text
          style={styles.h2}
        >{`${event.event} | ${event.componentName} | ${event.componentType}`}</Text>
      );
    } else if (event.buttonId) {
      return <Text style={styles.h2}>{`${event.event} | ${event.buttonId}`}</Text>;
    } else if (event.text) {
      return <Text style={styles.h2}>{`${event.text}`}</Text>;
    } else {
      return <Text style={styles.h2}>{`${event.event} | ${event.componentId}`}</Text>;
    }
  }

  render() {
    const events = this.state.events.map((event, idx) => (
      <View key={`${event.componentId}${idx}`}>{this.renderEvent(event)}</View>
    ));
    return (
      <View style={styles.root}>
        <Text style={styles.h1}>{`Static Lifecycle Events Overlay`}</Text>
        <View style={styles.events}>{events}</View>
        {this.renderDismissButton()}
        {this.renderClearButton()}
      </View>
    );
  }

  renderDismissButton = () => {
    return (
      <TouchableOpacity
        style={styles.dismissBtn}
        onPress={() => Navigation.dismissOverlay(this.props.componentId)}
      >
        <Text testID={TestIDs.DISMISS_BTN} style={{ color: 'red', alignSelf: 'center' }}>
          X
        </Text>
      </TouchableOpacity>
    );
  };

  renderClearButton = () => {
    return (
      <TouchableOpacity style={styles.clearBtn} onPress={() => this.setState({ events: [] })}>
        <Text
          testID={TestIDs.CLEAR_OVERLAY_EVENTS_BTN}
          style={{ color: 'red', alignSelf: 'center' }}
        >
          Clear
        </Text>
      </TouchableOpacity>
    );
  };
}

const styles = {
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: '#c1d5e0ae',
    flexDirection: 'column',
  },
  dismissBtn: {
    position: 'absolute',
    width: 35,
    height: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  clearBtn: {
    position: 'absolute',
    right: 0,
    width: 35,
    height: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  events: {
    flexDirection: 'column',
    marginHorizontal: 2,
  },
  h1: {
    fontSize: 14,
    textAlign: 'center',
    margin: 4,
  },
  h2: {
    fontSize: 10,
  },
};
