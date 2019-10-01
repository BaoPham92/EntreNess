import React, { Component } from 'react';

// * STYLES IMPORT

export default class CanvasHP extends Component {

    state = {
        canvas: undefined
    }

    canvasRef = React.createRef();

    componentDidMount() {
        // * Define Canvas
        this.setState({ canvas: this.canvasRef.current })
    }

    componentDidUpdate() {
        console.log(this.state.canvas.getContext('2d'))
    }

    render() {

        // ! CONFIRM DATA
        console.log('STATE LOGGING FOR CANVAS', this.state.canvas)

        return (
            <><canvas ref={this.canvasRef}></canvas></>
        )
    }
}