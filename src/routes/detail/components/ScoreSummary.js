import React, {Component} from 'react'
import './ScoreSummary.scss'
import Star from '../../../components/Star'
import PropTypes from 'prop-types'

class ScoreSummary extends Component {
	static propTypes = {
		detail: PropTypes.object
	}

	render() {
		const {detail} = this.props
		const {average} = detail.rating || 0
		return (
			<div className="scoreSummary">
				<div className="scoreSummary__top">
					<div className="summaryItem">
						<div className="summaryItem__value">
							{average} <Star value={average} />
						</div>
						<div className="summaryItem__title">
							观众评分{detail.reviews_count}人
						</div>
					</div>
					<div className="summaryItem">
						<div className="summaryItem__value">80%</div>
						<div className="summaryItem__title">V淘推荐度</div>
					</div>
					<div className="summaryItem">
						<div className="summaryItem__value">{detail.wish_count}</div>
						<div className="summaryItem__title">想看人数</div>
					</div>
				</div>
				<div className="summaryBtn">
					<button className="summaryBtn__item summaryBtn__item--want">
						<i /> 想看
					</button>
					<button className="summaryBtn__item summaryBtn__item--seen">
						<i /> 看过
					</button>
				</div>
			</div>
		)
	}
}

export default ScoreSummary
