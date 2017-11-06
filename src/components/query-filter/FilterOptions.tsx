/**
 * Created by jiangyukun on 2017/8/17.
 */
import React from 'react'
import classnames from 'classnames'
import Select1 from 'app-core/common/Select1'

interface FilterOptionsProps {
  options: { value: string, text: string }[]
  value: string
  onChange: (value) => void
  useSelect?: boolean
}

class FilterOptions extends React.Component<FilterOptionsProps> {
  static defaultProps = {
    useSelect: false
  }

  render() {
    const {options} = this.props
    return (
      <ul className="filter-items">
        <li className={classnames('filter-item', {'selected': this.props.value === ''})}
            onClick={() => this.props.onChange('')}
        >
          不限
        </li>

        {
          !this.props.useSelect && options.length <= 5 && options.map(item => {
            return (
              <li key={item.value}
                  className={classnames('filter-item', {'selected': item.value == this.props.value})}
                  onClick={() => this.props.onChange(item.value)}
              >
                {item.text}
              </li>
            )
          })
        }

        {
          (this.props.useSelect || options.length > 5) && (
            <li className="filter-select-item filter-item">
              <Select1 value={this.props.value}
                       className={classnames('small', {'selected': this.props.value != ''})}
                       options={options}
                       onChange={value => this.props.onChange(value)}/>
            </li>
          )
        }
      </ul>
    )
  }
}

export default FilterOptions
