import React from 'react';
import '../../../static/style/slick-theme.min.css';
import '../../../static/style/slick.min.css';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import './slider.scss'
 
const PosterSlider = ({ sliderList }) => {
  let settings = {
    dots: true,
    autoplay: true,
    className: 'posterSlider',
    dotsClass: 'posterSlider__dots'
  }
  return (
    <Slider {...settings}>
      {
        sliderList.map((e, i) => <div key={i}><img className="posterSlider__img" src={e.image} alt="banner" /></div>)
      }
    </Slider>
  )
}
PosterSlider.propTypes = {
  sliderList: PropTypes.array.isRequired
}

export default PosterSlider