import React from 'react';
import { View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

import all from './style.js';


class Cards extends React.Component {
  goToBank = () => {
    Actions.linkBank();
  };

  render() {
    // console.log(all);
    // eslint-disable-next-line
    const { item, index } = this.props;
    // console.log('props');
    // console.log(index);

    if (index !== 2) {
      return (
        <View style={all.cardContainer}>
          <Text>{item.title}</Text>
          <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make
          a type specimen book.
          It has survived not only five centuries, but also the leap into
          electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with
          desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>
      );
    }
    return (
      <View style={all.cardContainer}>
        <Text>{item.title}</Text>
        <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make
        a type specimen book.
        It has survived not only five centuries, but also the leap into
        electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s
        with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with
        desktop publishing software like
        Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
        <Button primary title="Link Bank Account" onPress={() => this.goToBank()} />
      </View>
    );
  }
}

export default Cards;
