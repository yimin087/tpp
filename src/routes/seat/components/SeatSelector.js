import React, {Component} from 'react'
import Api from '../../../api/request'

const dpr = window.devicePixelRatio
const SEAT_WIDTH = 56
const SEAT_HEIGHT = 53
const DRAW_SEAT_WIDTH = SEAT_WIDTH * dpr
const DRAW_SEAT_HEIGHT = SEAT_HEIGHT * dpr

class SeatSelector extends Component {
	constructor(props) {
		super(props)
		this.state = {
			seatData: [],
			canvasWidth: 1,
			canvasHeight: 1,
			dCanvasWidth: 1,
			dCanvasHeight: 1
		}
	}

	//WARNING! To be deprecated in React v17. Use componentDidMount instead.
	async componentWillMount() {
		let seatData = await Api('/seat')
		const lastSeat = seatData[seatData.length - 1]
		this.setState(() => {
			return {
				seatData,
				canvasWidth: lastSeat.colIndex * SEAT_WIDTH,
				canvasHeight: lastSeat.rowIndex * SEAT_HEIGHT,
				dCanvasWidth: lastSeat.colIndex * DRAW_SEAT_WIDTH,
				dCanvasHeight: lastSeat.rowIndex * DRAW_SEAT_HEIGHT
			}
		})
	}

	componentDidMount() {
		// 获取canvas
		this.ctx = this.refs.canvas.getContext('2d')

		// 定制座位图片
		const emptyImage = new Image()
		const selectImage = new Image()
		const soldImage = new Image()

		let count = 0
		const loadCallback = () => {
			count++
			if (count === 3) {
				this.emptyImage = emptyImage
				this.selectImage = selectImage
				this.soldImage = soldImage
				this.drawAllSeat()
			}
		}

		emptyImage.onload = loadCallback
		selectImage.onload = loadCallback
		soldImage.onload = loadCallback

		emptyImage.src = './img/image/seat-empty.png'
		selectImage.src = './img/image/seat-selected.png'
		soldImage.src = './img/image/seat-sold.png'
	}
	componentDidUpdate(prevProps, prevState) {
		if (
			(prevProps.selectSeat.length !== this.props.selectSeat.length ||
				prevState.seatData.length !== this.state.seatData) &&
			this.soldImage !== undefined
		) {
			const {dCanvasWidth, dCanvasHeight} = this.state
			this.ctx.clearRect(0, 0, dCanvasWidth, dCanvasHeight)
			this.drawAllSeat() // 画初始座位
			this.drawSelectSeat() // 画已选择的座位
		}
	}

	drawAllSeat = () => {
		const {seatData} = this.state

		seatData.forEach(el => {
			const {xPos, isSold, yPos} = el
			const offsetLeft = (xPos - 1) * DRAW_SEAT_WIDTH
			const offsetTop = (yPos - 1) * DRAW_SEAT_HEIGHT

			if (isSold) {
				// 绘制已售样式
				this.ctx.drawImage(
					this.soldImage,
					offsetLeft,
					offsetTop,
					DRAW_SEAT_WIDTH,
					DRAW_SEAT_HEIGHT
				)
			} else {
				// 绘制空座样式
				this.ctx.drawImage(
					this.emptyImage,
					offsetLeft,
					offsetTop,
					DRAW_SEAT_WIDTH,
					DRAW_SEAT_HEIGHT
				)
			}
		})
	}

	drawSelectSeat = () => {
		this.ctx.font = `${10 * dpr}px Arial`
		this.ctx.fillStyle = '#fff'
		this.ctx.textAlign = 'center'

		let {selectSeat} = this.props

		selectSeat.forEach(el => {
			const {xPos, yPos, rowIndex, colIndex} = el
			const offsetLeft = (xPos - 1) * DRAW_SEAT_WIDTH
			const offsetTop = (yPos - 1) * DRAW_SEAT_HEIGHT
			this.ctx.drawImage(
				this.selectImage,
				offsetLeft,
				offsetTop,
				DRAW_SEAT_WIDTH,
				DRAW_SEAT_HEIGHT
			)
			this.ctx.fillText(
				`${rowIndex}排`,
				offsetLeft + DRAW_SEAT_WIDTH / 2,
				offsetTop + DRAW_SEAT_HEIGHT / 2.5
			)
			this.ctx.fillText(
				`${colIndex}座`,
				offsetLeft + DRAW_SEAT_WIDTH / 2,
				offsetTop + (DRAW_SEAT_HEIGHT * 2) / 3
			)
		})
	}

	clickSeat = e => {
		const offset = this.refs.canvas.getBoundingClientRect()
		const clickX = e.pageX - offset.left
		const clickY = e.pageY - offset.top
		const xPox = Math.ceil(clickX / SEAT_WIDTH)
		const yPox = Math.ceil(clickY / SEAT_HEIGHT)

		const seat = this.state.seatData.find(
			seat => seat.xPos === xPox && seat.yPos === yPox
		)
		// 如果未找到或者当前座位已售，则不响应
		if (!seat || seat.isSold) {
			return
		}
		const seatIndex = this.props.selectSeat.findIndex(
			item => item.id === seat.id
		)

		if (seatIndex > -1) {
			// 如果已经选择了，需要取消选择，反之选择座位
			this.props.onRemove(seat.id)
		} else {
			if (this.props.selectSeat.length >= 4) {
				// 如果已经选择了四个座位，则不能再选
				alert('不能超过四个座位')
			} else {
				this.props.onAdd(seat)
			}
		}
	}

	render() {
		let {canvasWidth, canvasHeight, dCanvasWidth, dCanvasHeight} = this.state
		return (
			<canvas
				ref="canvas"
				style={{width: canvasWidth, height: canvasHeight}}
				width={dCanvasWidth}
				height={dCanvasHeight}
				onClick={this.clickSeat}
			/>
		)
	}
}

export default SeatSelector
