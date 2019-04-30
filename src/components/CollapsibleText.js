import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './CollapsibleText.scss'

class CollapsibleText extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isCollapse: false,
			isNeedCollapse: false
		}
	}

	static defaultProps = {
		height: 84
	}

	componentDidMount() {
		const dom = this.refs.collapsibleText
		const value = this.props.height

		if (dom.clientHeight > value) {
			this.setState({
				isCollapse: true,
				isNeedCollapse: true
			})
		}
	}

	toggleStatus = () => {
		if (this.state.isNeedCollapse) {
			this.setState(prevState => ({
				isCollapse: !prevState.isCollapse
			}))
		}
	}

	render() {
		const {isCollapse, isNeedCollapse} = this.state
		const cls = isCollapse ? 'collapsibleText--collapse' : ''
		const maxHeight = isCollapse ? this.props.height : 'none'
		return (
			<div
				className={`collapsibleText ${cls}`}
				style={{maxHeight: maxHeight}}
				onClick={this.toggleStatus}
				ref="collapsibleText"
			>
				{this.props.children}
				{isCollapse && <div className="collapsibleText__label">展开</div>}
				{!isCollapse && isNeedCollapse && (
					<div className="collapsibleText__label">收起</div>
				)}
			</div>
		)
	}
}

CollapsibleText.propTypes = {
	children: PropTypes.any,
	height: PropTypes.number
}

export default CollapsibleText
