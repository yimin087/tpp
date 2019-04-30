import React from 'react'
import PropTypes from 'prop-types'
import './Artist.scss'

const Artist = ({data}) => {
	return (
		<div className="mArtist">
			<ul className="mArtist__list">
				{data.map(item => (
					<li className="" key={item.name}>
						<div
							className="artistInfo__image"
							style={{
								backgroundImage: `url(https://images.weserv.nl/?url=${
									item.image
								})`
							}}
						/>
						<div>
							<dl className="artistInfo__name">{item.name}</dl>
							<dd className="artistInfo__job">{item.job}</dd>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

Artist.propTypes = {
	data: PropTypes.array.isRequired
}

export default Artist
