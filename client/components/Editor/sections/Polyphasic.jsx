import React from 'react'
import sampleSchedules from './polyphasic/sampleSchedules.json'
import ColorPicker from '../small/ColorPicker.jsx'
import LaneChoose from './polyphasic/LaneChoose.jsx'


export default class Polyphasic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sleepLane: 0,
      color: 'red'
    }
  }

  render() {
    return (
      <div>
        <div className="instruction">Clicking on any of these schedules will overwrite all elements in selected lane</div>
        <div>
          <LaneChoose
            napchart={this.props.napchart}
            clickLane={this.setLane}
            active={this.state.sleepLane}
            disabledLane={(lane) => lane > this.props.napchart.data.lanes}
          />
          <ColorPicker
            onClick={this.changeColor}
            activeColor={this.state.color}
          />
        </div>
        <div className="schedules">
          {sampleSchedules.map(schedule => (
            <button key={schedule.name} onClick={this.changeSchedule.bind(null, schedule)} className="button">{schedule.name}</button>
          ))}
        </div>
      </div>
    )
  }

  changeSchedule = (schedule) => {
    var elements = schedule.elements.map(element => {
      return {
        start: element.start,
        end: element.end,
        lane: this.state.sleepLane,
        color: this.state.color
      }
    })
    var napchart = this.props.napchart
    napchart.emptyLane(this.state.sleepLane)
    napchart.initAndAddElements(elements)

    // find a element on the lane and select it
    var eol = napchart.data.elements.find(e => e.lane == this.state.sleepLane)
    napchart.setSelected(eol.id)
  }

  setLane = (lane) => {
    this.setState({
      sleepLane: lane
    })
  }

  changeColor = (color) => {
    this.setState({
      color: color
    })
  }

}