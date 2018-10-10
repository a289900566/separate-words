import React from 'react'
import { Menu, Layout, Pagination, Select, Icon } from 'antd';
import { connect } from "react-redux";
import store from '../../../state/store'
import {path} from '../../../config'
import axios from 'axios'
import { unformatWithProperty, formatWithProperty } from '../../../util'

const { Sider } = Layout;
const Option = Select.Option

class SiderNav_UI extends React.Component {
  async componentWillMount(){
   await this.props.created()
  }
  render () {
    let { siderNavData, selectedKeys, handleClick, totalCount, pageChange, filterChange, page } = this.props
    return (
      <Sider width={200} style={{ background: '#fff',  overflow: 'auto', height: '100%', position: 'fixed', left: 0 }}>
        <Select defaultValue="all" style={{ width: 150, margin: '15px' }} onChange={filterChange}>
          <Option value="all">全部</Option>
          <Option value="marking">标注中</Option>
          <Option value="completed">已完成</Option>
        </Select>
        <Menu
          mode="inline"
          style={{ height: '80%' }}
          selectedKeys = { selectedKeys }
        >
          {siderNavData.map(i => {
            return <Menu.Item  onClick={() => handleClick(i.id)} key={i.id} >
              { i.title }
              { i.state === 'completed' ? <Icon 
                style={{color: 'green', float: 'right', marginTop: '15px'}} 
                type="check" 
                theme="outlined" 
              /> : null }
            </Menu.Item>
          })}
        </Menu>
        <Pagination 
          current={page} 
          onChange={ pageChange } 
          defaultCurrent={1} 
          total={totalCount} 
          simple
        />
      </Sider>
    )
  }
}

let refresh = async () => {
  let state = store.getState()
  store.dispatch({
    type: "SET_EMOTION",
    emotion: {
      ...state.emotion,
      spinning: true
    }
  })
  let {taskId} = state
  let {filter, page, tempPropertys, emotionTypes} = state.emotion
  let res = await axios.get(`${path}/api/task/${taskId}/articles/emotion/${filter}?offset=${(page-1)*10}&pageSize=10`)
  console.log(res)
  let {articles, emotionTypeGroup} = res.data.data.task
  let totalCount = res.data.data.totalCount
  let siderNavData = articles.map((item, index) => {
    if (!item.emotion) {
      articles[index].emotion = {
        perspective: '',
        attitude: '',
        emotion: '',
        degree: '',
        markEntity: ''
      }
    }
    let { markEntity } = articles[index].emotion
    if (!markEntity) {
      articles[index].emotion.markEntity = item.text.split('').map(item => item + '/ ').join('')
    }
    articles[index].showPro = unformatWithProperty(articles[index].emotion.markEntity, tempPropertys)
    articles[index].emotion.markEntity = formatWithProperty(articles[index].showPro)
    return {
      id: item.id,
      title: item.title || '无标题',
      state: item.state
    }
  })
  let selectedKeys = articles.length > 0 ? [articles[0].id.toString()] : []
  emotionTypes = emotionTypeGroup.emotionTypes.concat(emotionTypes)
  store.dispatch({ type: "SET_EMOTION", emotion: {
    ...state.emotion,
    articles,
    siderNavData,
    totalCount,
    showIndex: 0,
    selectedKeys,
    emotionTypes,
    spinning: false
  }})
}

let mapStateToSiderNav = state => {
  return {
    ...state.emotion
  }
}

let mapDispatchToSiderNav = dispatch => {
  return {
    created: async () => {
      await refresh()
    },
    handleClick: id => {
      let state = store.getState()
      let {articles} = state.emotion
      let showIndex = articles.findIndex(item => {
        return item.id === id
      })
      dispatch({ type: "SET_EMOTION", emotion: {
        ...state.emotion,
        showIndex,
        selectedKeys: [id.toString()]
      }})
    },
    pageChange: async (page) => {
      let state = store.getState()
      dispatch({ type: "SET_EMOTION", emotion: {
        ...state.emotion,
        page
      }})
      refresh()
    },
    filterChange: async value => {
      let state = store.getState()
      dispatch({ type: "SET_EMOTION", emotion: {
        ...state.emotion,
        filter: value,
        page: 1
      }})
      refresh(dispatch)
    }
  }
}

export default connect(mapStateToSiderNav, mapDispatchToSiderNav)(SiderNav_UI)