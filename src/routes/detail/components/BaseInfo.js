import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './BaseInfo.scss'

class BaseInfo extends Component {
	render() {
		const {onShowImage, detail} = this.props
		const {medium} = detail.images || ''
		return (
			<div className="baseInfo">
				<div className="baseInfo__detail">
					<h3 className="baseInfo__name">{detail.title}</h3>
					<div className="baseInfo__subTitle">{detail.original_title}</div>
					<div className="baseInfo__other">{detail.genres}</div>
					<div className="baseInfo__other">{detail.countries}</div>
					<div className="baseInfo__other">{detail.year}年</div>
				</div>
				<div
					className="baseInfo__poster"
					onClick={onShowImage}
					style={{
						backgroundImage: `url(https://images.weserv.nl/?url=${medium})`
					}}
				/>
			</div>
		)
	}
}

BaseInfo.propTypes = {
	onShowImage: PropTypes.func.isRequired
}

export default BaseInfo
