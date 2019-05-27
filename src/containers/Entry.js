import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content,
} from 'native-base';
// import PlaidAuthenticator from 'react-native-plaid-link';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getRecipes, getMeals, setError } from '../actions/recipes';
import Cards from '../native/components/Cards';
import all from './styles.js';

class Entry extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    member: PropTypes.shape({
      error: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    match: null,
  }


  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: 0,
    };

    this._renderItemWithParallax = this._renderItemWithParallax.bind(this);
  }


  // componentDidMount = () => this.fetchRecipes();

  checkState = () => {
    // console.log(this.props);
  }

  onMessage = (data) => {
    // console.log(data);
  }

  _renderItemWithParallax({ item, index }) {
    return (
      <Container style={all.cardContainer}>
        <Cards member={this.props.member} item={item} index={index} />
      </Container>
    );
  }

  wp(percentage) {
    // console.log(this);
    const { width: viewportWidth } = Dimensions.get('window');
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  }


  render = () => {
    // const { uid } = this.props.member;
    // console.log(this.props);
    // const { width } = Dimensions.get('window');
    // const contentOffset = (width - CustomComponent.WIDTH) / 2;
    // const { currentIndex } = this.state;
    const { slider1ActiveSlide } = this.state;
    const ENTRIES1 = [{ title: 'Quick' }, { title: 'Affordable' }, { title: 'Get Started' }];
    const { width: viewportWidth } = Dimensions.get('window');
    // console.log(this.props);
    return (

      <Container style={{ marginTop: 22 }}>
        <Content style={{ flex: 1 }}>
          <Carousel
            layout="stack"
            // eslint-disable-next-line
              ref={c => this._slider1Ref = c}
            data={ENTRIES1}
            renderItem={this._renderItemWithParallax}
            sliderWidth={viewportWidth}
            itemWidth={this.wp(120)}
            firstItem={0}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
                      // inactiveSlideShift={20}
                      // containerCustomStyle={styles.slider}
                      // contentContainerCustomStyle={styles.sliderContentContainer}
            onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
          />
          <Pagination
            dotsLength={ENTRIES1.length}
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
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes || {},
  loading: state.loading,
  firstName: state.firstName,

});

const mapDispatchToProps = {
  fetchRecipes: getRecipes,
  fetchMeals: getMeals,
  showError: setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
