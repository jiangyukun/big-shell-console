/**
 * Created by jiangyukun on 2017/11/23.
 */
import React from 'react'

interface ImageProps extends React.HTMLProps<HTMLImageElement> {
  scale?: number
  angle?: number
}

class Image extends React.Component<ImageProps> {
  static defaultProps = {
    scale: 1,
    angle: 0
  }

  img: HTMLImageElement
  width = 0

  onLoad = () => {
    this.width = this.img.naturalWidth
  }

  componentWillReceiveProps(nextProps: ImageProps) {
    if (this.props.src != nextProps.src) {
      this.width = this.img.naturalWidth
    }
  }

  render() {
    let style = {}
    if (this.width) {
      style = {
        transform: 'rotate(' + this.props.angle + 'deg)',
        width: this.width * this.props.scale
      }
    }
    let {scale, angle, ...otherProps} = this.props

    return (
      <img ref={c => this.img = c} {...otherProps} onLoad={this.onLoad} style={style}/>
    )
  }
}

export default Image
