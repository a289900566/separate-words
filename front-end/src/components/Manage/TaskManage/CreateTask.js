import React from 'react'
import { path } from '../../../config'
import { Row, Col, Input, Select, Button, message } from 'antd'
import { connect } from "react-redux"
import store from '../../../state/store'
import axios from 'axios'

const Option = Select.Option

class CreateTask extends React.Component {
  componentWillMount() {
    this.props.created()
  }
  render() {
    let { 
      nameChange, instructionChange, markUsers, docs, selectedDocs,
      typeChange, labels, labelChange, create, name, instruction, type,
      cancel, selectedLabelsId, selectedUsers, userChange, docsChange
    } = this.props
    return (
      <div style={{textAlign: 'left'}}>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={8} push={8}>
            <div style={{ marginBottom: '10px' }}>任务名称：</div>
            <Input onChange={nameChange} value={name}></Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={8} push={8}>
            <div style={{ marginBottom: '10px' }}>说明：</div>
            <Input onChange={instructionChange} value={instruction}></Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={8} push={8}>
            <div style={{ marginBottom: '10px' }}>任务类型：</div>
            <Select style={{ width: '100%' }} onChange={typeChange} value={type}>
              {/* <Option value="separateWords">分词</Option> */}
              <Option value="separateWordsProperty">分词及词性标注</Option>
              <Option value="contentType">文本内容分类</Option>
              <Option value="markEntity">实体标注</Option>
              <Option value="emotion">情感标注</Option>
            </Select>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={8} push={8}>
            <div style={{ marginBottom: '10px' }}>标签集合：</div>
            <Select style={{ width: '100%' }} onChange={labelChange} value={selectedLabelsId}>
              {labels.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={8} push={8}>
            <div style={{ marginBottom: '10px' }}>选择语料：</div>
            <Select style={{ width: '100%' }} value={selectedDocs} onChange={docsChange}>
              {docs.map(item => <Option value={item.pathName} key={item.pathName}>{item.name}</Option>)}
            </Select>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={8} push={8}>
            <div style={{ marginBottom: '10px' }}>任务分配至：</div>
            <Select mode="multiple" style={{ width: '100%' }} value={selectedUsers} onChange={userChange}>
              {markUsers.length > 0 ? <Option value="all">全部标注成员</Option> : null}
              {markUsers.map(item => {
                if (item.name!='admin') return <Option value={item.id} key={item.id}>{item.name}</Option>
              })}
            </Select>
          </Col>
        </Row>
        <Row style={{ marginTop: '20px', textAlign: 'center' }}>
          <Col span={10} push={7}>
            <Button onClick={ create } type="primary">创建</Button>
            <Button onClick= { cancel } type="primary" style={{ marginLeft: '20px'}}>取消</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    ...state.createTask,
    docs: state.docsManage.data
  }
}

let mapDispatchToProps = dispatch => {
  return {
    created: async () => {
      let state = store.getState()
      let res = await axios.get(`${path}/api/user/mark`)
      let createTask = state.createTask
      dispatch({
        type: 'SET_CREATE_TASK',
        createTask: {
          ...createTask,
          markUsers: res.data.data
        }
      })
    },
    nameChange: e => {
      let createTask = store.getState().createTask
      dispatch({
        type: 'SET_CREATE_TASK',
        createTask: {
          ...createTask,
          name: e.target.value
        }
      })
    },
    instructionChange: e => {
      let createTask = store.getState().createTask
      dispatch({ 
        type: 'SET_CREATE_TASK',
        createTask: {
          ...createTask,
          instruction: e.target.value
        }
      })
    },
    typeChange: async value => {
      let state = store.getState()
      let createTask = state.createTask, url = ''
      if (value === 'separateWordsProperty') url = `${path}/api/words_property_group`
      if (value === 'markEntity') url = `${path}/api/entities_group`
      if (value === 'emotion') url = `${path}/api/emotionTypeGroup`
      if (value === 'contentType') url = `${path}/api/contentLabelGroup`
      let labelsRes = await axios.get(url), data = labelsRes.data.data
      dispatch({ 
        type: 'SET_CREATE_TASK',
        createTask: {
          ...createTask,
          type: value,
          labels: data,
          selectedLabelsId: null
        }
      })
      let docsRes = await axios.get(`${path}/api/docs?type=${value}`)
      if (docsRes.data.code === 0) {
        store.dispatch({
          type: "SET_DOCS_MANAGE",
          docsManage: {
            ...state.docsManage,
            data: docsRes.data.docs
          }
        })
      } else {
        message.error('获取语料信息失败！')
      }
    },
    labelChange: value => {
      let createTask = store.getState().createTask
      dispatch({ 
        type: 'SET_CREATE_TASK',
        createTask: {
          ...createTask,
          selectedLabelsId: value
        }
      })
    },
    docsChange: value => {
      let createTask = store.getState().createTask
      dispatch({
        type: 'SET_CREATE_TASK',
        createTask: {
          ...createTask,
          selectedDocs: value
        }
      })
    },
    userChange: value => {
      let createTask = store.getState().createTask
      if (value.indexOf('all') != -1) value = ['all']
      dispatch({
        type: 'SET_CREATE_TASK',
        createTask: {
          ...createTask,
          selectedUsers: value
        }
      })
    },    
    create: async () => {
      let state = store.getState()
      let {createTask} = state
      let { name, instruction, type, selectedLabelsId, selectedUsers, selectedDocs } = createTask
      createTask.docs = [selectedDocs]
      if (!name || !instruction || !type || selectedLabelsId === null || !selectedDocs || selectedUsers.length == 0) {
        message.error('请将所有内容填写完整!', 1.5)
        return
      }
      let tips = message.loading('创建中...', 15)
      let res = await axios.post(`${path}/api/task`, createTask)
      message.destroy(tips)
      if (res.data.code === 0) {
        message.success('创建成功!', 1.5)
        dispatch({
          type: 'SET_CREATE_TASK',
          createTask: {
            ...createTask,
            name: '',
            instruction: '',
            type: '',
            selectedUsers: [],
            selectedLabelsId: null,
            selectedDocs: '',
          }
        })
      } else {
        message.error(res.data.msg, 1.5)
      }
    },
    cancel: () => {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)