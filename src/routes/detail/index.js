import React, {Component} from 'react'
import './index.scss'
import BaseInfo from './components/BaseInfo'
import ScoreSummary from './components/ScoreSummary'
import CollapsibleText from '../../components/CollapsibleText'
import {Link} from 'react-router-dom'
import Artist from './components/Artist'
import Comment from './container/Comment'
import LineLink from '../../components/LineLink'
import ImgSlide from './container/ImageSlider'
import {getMovieDetail} from '../../api/api'

class Detail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			detail: {},
			artist: [],
			showImage: false
		}
	}
	async componentDidMount() {
		// console.log(this.props)
		const {id} = this.props.location.state
		const detail = await getMovieDetail(id)
		// console.log(detail)
		// const artist = await Api('/artist')
		let directorsList = []
		detail.directors.forEach(item => {
			let json = {}
			json.name = item.name
			json.image = item.avatars.medium
			json.job = '导演'
			directorsList.push(json)
		})
		let castsList = []
		detail.casts.forEach(item => {
			let json = {}
			json.name = item.name
			json.image = item.avatars.medium
			json.job = '主演'
			castsList.push(json)
		})
		let artist = directorsList.concat(castsList)
		this.setState(() => {
			return {
				detail,
				artist
			}
		})
	}
	toggleImage = () => {
		this.setState(preState => {
			return {
				showImage: !preState.showImage
			}
		})
	}

	render() {
		let {artist, showImage, detail} = this.state
		return (
			<div className="detail">
				<div className="detail__top">
					<div className="tOperator">
						<div
							className="tOperator__icon tOperator__icon--back"
							onClick={() => {
								window.history.back()
							}}
						/>
						<div className="tOperator__icon tOperator__icon--share" />
					</div>
					<BaseInfo onShowImage={this.toggleImage} detail={detail} />
				</div>

				<div className="detail__content">
					<div className="detail__module">
						<ScoreSummary detail={detail} />
					</div>
					<div className="detail__module">
						<h3 className="detail__moduleTitle">故事简介</h3>
						{detail.summary && (
							<CollapsibleText height={84}>
								<div className="detail__overview">{detail.summary}</div>
							</CollapsibleText>
						)}
					</div>
					<div className="detail__module">
						<h3 className="detail__moduleTitle">演职人员</h3>
						<Artist data={artist} />
					</div>
					<div className="detail__module">
						<h3 className="detail__moduleTitle">热门评论</h3>
						<Comment />
					</div>
					<div className="detail__module">
						<h3 className="detail__moduleTitle">影片资料</h3>
						<div>
							<LineLink href="xx" title="幕后花絮" />
							<LineLink href="xx" title="台词精选" />
							<LineLink href="xx" title="出品发行" />
						</div>
					</div>
				</div>
				<Link to="/seat" className="detail__buyBtn">
					选座购票
				</Link>
				{showImage && <ImgSlide onClose={this.toggleImage} />}
			</div>
		)
	}
}

export default Detail
