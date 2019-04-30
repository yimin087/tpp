import React from 'react'
import {Link} from 'react-router-dom'
import Lazyimg from 'react-lazyimg-component'
import './movieItem.scss'

const MovieItem = ({movie}) => {
	return (
		<div className="movieItem">
			<div className="movieItem__poster">
				{/* <img src={`https://images.weserv.nl/?url=${movie.poster}`} alt="" /> */}
				<Lazyimg
					className="lazy"
					src={`https://images.weserv.nl/?url=${movie.poster}`}
				/>
			</div>
			<div className="movieItem__detail">
				<div className="movieItem__name">{movie.title}</div>
				<div className="movieItem__score">
					观众评分 <span>{movie.rate}</span>
				</div>
				{/* <div className="movieItem__director">导演: { movie.director }</div> */}
				{/* {movie.actor && <div className="movieItem__actor">主演: { movie.actor }</div>}
        <div className="movieItem__tag"> */}
				{/* {movie.tags.map((item, i) => <span className={`tTag tTag--${i/2 ? 'red' : 'blue'}`} key={item}>{item}</span>)} */}
				{/* </div> */}
			</div>
			<div className="movieItem__btn">
				<Link to={{pathname: '/detail', state: {id: movie.doubanId}}}>
					<button className="tBtn">购票</button>
				</Link>
				<span className="movieItem__price">9.9元起</span>
			</div>
		</div>
	)
}

export default MovieItem
