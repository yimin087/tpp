import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import './ImageSlide.scss';

class ImageSlider extends Component {
  constructor () {
    super()
    this.state = {
      index: 1
    }
  }

  changeIndex = index => {
    this.setState({
      index: index + 1
    });
  }

  render() {
    const setting = {
      className: 'imageSlider__content',
      afterChange: this.changeIndex
    };

    return (
      <div className="imageSlider" onClick={this.props.onClose}>
        <div className="imageSlider__index">
          {this.state.index} / 6
        </div>
        <Slider {...setting}>
          <div>
            <img className="imageSlider__img" src="/img/image/asset1.jpeg" alt=""/>
          </div>
          <div>
            <img className="imageSlider__img" src="/img/image/asset2.jpeg" alt=""/>
          </div>
          <div>
            <img className="imageSlider__img" src="/img/image/asset3.jpeg" alt=""/>
          </div>
          <div>
            <img className="imageSlider__img" src="/img/image/asset4.jpeg" alt=""/>
          </div>
          <div>
            <img className="imageSlider__img" src="/img/image/asset5.jpeg" alt=""/>
          </div>
          <div>
            <img className="imageSlider__img" src="/img/image/asset6.jpeg" alt=""/>
          </div>
        </Slider>
      </div>
    );
  }
}

ImageSlider.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ImageSlider;
