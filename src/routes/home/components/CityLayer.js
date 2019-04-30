import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import './CityLayer.scss';
import Api from '../../../api/request';

class CityLayer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hot: [],
      all: {}
    }
  }


  async componentDidMount () {
    const data = await Api('/city')
    let { hot, all } = data
    this.setState(() => {
      return {
        hot,
        all
      }
    })
  }

  onClose = () => {
    this.props.hideCityLayer()
  }

  changeCity = (city) => {
    this.props.changeCity(city)
  }

  render() {
    let { hot, all } = this.state
    let allKey = Object.keys(all)
    return (
      <div className="cityLayer">
        <div className="cityLayer__title">
          <div className="cityLayer__close" onClick={this.onClose}>关闭</div>
          选择城市
        </div>
        <div className="cityLayer__content">
          <div className="cityBlock" id="定位">
            <div className="cityBlock__label">定位城市</div>
            <div className="cityBlock__wrap">
              <div className="cityBlock__item" onClick={()=> this.changeCity('杭州')}>杭州</div>
            </div>
          </div>
          <div className="cityBlock" id="热门">
            <div className="cityBlock__label">热门城市</div>
            <div className="cityBlock__wrap">
              {
                hot.map(item => <div className="cityBlock__item" key={item.id}  onClick={()=> this.changeCity(item.regionName)}>{item.regionName}</div>)
              }
            </div>
          </div>
            {
              allKey.map(item => {
                const list = all[item]
                return (
                  <div className="cityList" id={item} key={item}>
                    <div className="cityList__label">{item}</div>
                    <ul className="cityList__wrap">
                      {
                        list.map(item => <li className="cityList__item" key={item.id}  onClick={()=> this.changeCity(item.regionName)}>{item.regionName}</li>)
                      }
                    </ul>
                  </div>
                )
              })
            }
        </div>
        <div className="cityLayer__index cityIndex">
          <ul className="cityIndex__list">
            <li className="cityIndex__item"><a href="#定位">定位</a></li>
            <li className="cityIndex__item"><a href="#热门">热门</a></li>
            {
              allKey.map(item => <li className="cityIndex__item" key={item}><a href={`#${item}`}>{item}</a></li>)
            }
          </ul>
        </div>
      </div>
    );
  }
}

// CityLayer.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   onSelect: PropTypes.func.isRequired
// };

export default CityLayer;
