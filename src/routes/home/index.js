import React, {Component} from 'react'
import './index.scss'
import TopBar from './components/topBar'
import PosterSlider from './components/slider'
import MovieItem from './components/movieItem'
import TabMenu from '../../components/TabMenu'
import CityLayer from './components/CityLayer'
import Api from '../../api/request'
import {get} from '../../api/api'
import Tloader from 'react-touch-loader'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			city: '',
			poster: [],
			movie: [],
			cityLayerVisible: false, // 城市浮层是否展现
			pageSize: 10,
			totalCount: 1,
			page: 1,
			initializing: 0,
			autoLoadMore: false,
			hasMore: false
		}
	}
	async componentDidMount() {
		this.getMovieList(this.state.page)
		const homeData = await Api('/index')
		let {city, poster} = homeData
		this.setState(() => {
			return {
				city,
				poster
			}
		})
	}

	getMovieList = async page => {
		let {movie} = this.state
		const movieData = await get('/movie/getMovieList', {
			page: page,
			size: this.state.pageSize
		})
		movie.push(...movieData.message)
		// console.log(movie)
		this.setState(() => {
			return {
				page: movieData.page,
				hasMore: true,
				movie
			}
		})
	}

	showCityLayer = () => {
		this.setState(() => {
			return {
				cityLayerVisible: true
			}
		})
	}

	hideCityLayer = () => {
		this.setState(() => {
			return {
				cityLayerVisible: false
			}
		})
	}

	changeCity = city => {
		this.setState(() => {
			return {
				city,
				cityLayerVisible: false
			}
		})
	}

	handleLoadMore = page => {
		page++
		this.getMovieList(page)
	}

	render() {
		let {
			page,
			city,
			poster,
			movie,
			cityLayerVisible,
			initializing,
			autoLoadMore,
			hasMore
		} = this.state
		return (
			<div className="home">
				<TopBar city={city} showCityLayer={this.showCityLayer} />
				<div className="home__slider">
					<div className="home__slider-wrapper">
						<PosterSlider sliderList={poster} />
					</div>
				</div>
				<div className="home__content">
					<Tloader
						initializing={initializing}
						// onRefresh={handleRefresh}
						hasMore={hasMore}
						onLoadMore={e => {
							this.handleLoadMore(page)
						}}
						autoLoadMore={autoLoadMore}
						className="tloader some class"
					>
						<ul className="home__movie--list">
							{movie.map(item => (
								<li className="home__movie--item" key={item.doubanId}>
									<MovieItem movie={item} />
								</li>
							))}
						</ul>
					</Tloader>
				</div>
				<TabMenu current="movie" />
				{cityLayerVisible && (
					<CityLayer
						cityLayerVisible={cityLayerVisible}
						hideCityLayer={this.hideCityLayer}
						changeCity={this.changeCity}
					/>
				)}
			</div>
		)
	}
}

export default Home
