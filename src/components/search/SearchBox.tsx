/**
 * Created by jiangyukun on 2017/11/9.
 */
import React from 'react'

interface SearchBoxProps {
  label?: string
  placeholder: string
  searchKey: string
  onChange: (v) => void
  onSearch: () => void
}

class SearchBox extends React.Component<SearchBoxProps> {
  render() {
    return (
      <div className="search-box">
        {
          this.props.label && (
            <label>{this.props.label}：</label>
          )
        }
        <input value={this.props.searchKey} onChange={e => this.props.onChange(e.target.value)}/>
        <button className="to-search" onClick={this.props.onSearch}>搜索</button>
      </div>
    )
  }
}

export default SearchBox
