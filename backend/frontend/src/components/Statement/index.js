import React, {PureComponent} from 'react'
import './style.css'


class Statement extends PureComponent {
    render() {
        return (
            <div className="ui-inverse-bordered Statement">  
                <div className="statement-text">{this.props.poll.statement}</div>
                {this.props.result && (
                    <React.Fragment>
                        <div className="ui-inverse Result">
                            Percentage of people who chose the answer:
                        </div>
                        <div className="ui-inverse Labels">
                            <div className="CountYes">{"Yes " + this.props.poll.agree_rate + "%"}</div>
                            <div className="CountNo">{"No " + (100 - this.props.poll.agree_rate) + "%"}</div>
                        </div>
                        <div className="Diagramm">
                            <div id="YesRate" style={{width: this.props.poll.agree_rate + "%"}}></div>
                            <div id="NoRate" style={{width:  (100 - this.props.poll.agree_rate) + "%"}}></div>
                        </div>
                    </React.Fragment>
                )}
            </div>
        )
    }
}


export default Statement
