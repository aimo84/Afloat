/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { FlatList, Animated, Dimensions } from 'react-native';
import {
  Text, View, Left, Right, Thumbnail, Body, ListItem, List,
} from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import styles from './style.js';

const screenWidth = Dimensions.get('window').width;

class DashboardCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entryItems: [
        {
          title: 'Item 1',
          balance: 0,
          active: false,
          outstandingBalance: 0,
        },
        {
          title: 'Item 2',
        },
        {
          title: 'Item 3',
        },
      ],
      selected: 'key1',
      transactions: {},
      slider1ActiveSlide: 0,
      isModalVisible: false,
      isConfirmModalVisible: false,
      baseModalVisible: false,
      confirmTextModal: false,
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    console.log('9z component did mount');
  }

  _renderItem = ({ item, index }) => {
    return (
      <View style={{ height: verticalScale(300), display: 'flex', flex: 1 }}>
        <View style={styles.slide}>
          {450}
        </View>
      </View>
    );
  }


  // eslint-disable-next-line arrow-body-style
  render = () => {
    console.log('top of render method of flatlist');
    console.log(this.state.transactions.length, this.state.list.length);
    // const { transactions } = this.props;
    console.log(this.state.list.length);
    console.log('cotote');
    return (
      <View>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.state.entryItems}
          renderItem={this._renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          height={verticalScale(280)}
          marginTop={20}
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={this.state.entryItems.length}
          activeDotIndex={slider1ActiveSlide}
            // containerStyle={styles.paginationContainer}
          dotColor="#21D0A5"
            // dotStyle={styles.paginationDot}
          inactiveDotColor="#000000"
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
        <Text style={styles.transactionHeader}>
            Transactions
        </Text>
      </View>
    );
  }
}


export default DashboardCards;
