import React from "react"

class ListSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchType: "productId", // productId productName
            searchKeyword: ""
        }
    }
    // 数据变化
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim()
        this.setState({
            [name]: value
        })
        
    }
    // 搜索
    onSearch(){
        this.props.onSearch(this.state.searchType, this.state.searchKeyword)
    }
    // 搜索框输入点击回车
    onSearchKeyword(e) {
        if(e.keyCode === 13) {
            this.onSearch()
        }
    }
    render() {
        return (
                <div className="row search-wrap">
                  <div className="col-md-12">
                      <div className="form-inline">
                          <div className="form-group">
                              <select className="form-control" name="searchType" onChange={(e)=> {this.onValueChange(e)}}>
                                  <option value="productId">按商品ID查询</option>
                                  <option value="productName">按商品名称查询</option>                                    
                              </select>
                          </div>
                          <div className="form-group">
                              <input type="text" name="searchKeyword" className="form-control" placeholder="关键词"
                                onChange={(e)=> {this.onValueChange(e)}}
                                onKeyUp ={(e) => this.onSearchKeyword(e)}/>
                          </div>
                          <button onClick={ (e) => this.onSearch() } className="btn btn-primary">搜索</button>
                      </div>
                  </div>
              </div>
        )
    }
}

export default ListSearch
