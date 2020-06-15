import * as React from 'react'

interface IProps {
  compiler: string,
  framework: string,
  bundler: string
}
interface State {
  test: number
}
export class Hello extends React.Component<IProps, State> {
  readonly state = {
    test: 123
  }

  handleIncrement () {
    this.setState({
      test: ++this.state.test
    })
  }

  render () {
    return <h1 onClick={this.handleIncrement.bind(this)}>
      This is a {this.props.framework} application using {this.props.compiler} with {this.props.bundler} {this.state.test}
    </h1>
  }
}
