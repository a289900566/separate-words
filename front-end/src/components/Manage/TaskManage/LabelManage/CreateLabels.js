import React from 'react'
import { Row, Col, Input, Select, Button } from 'antd'
import { connect } from "react-redux";
import store from '../../../../state/store'

const Option = Select.Option;

class CreateLabels extends React.Component {
  render() {
    let { labelsSelectChange, labels, nameChange, create, cancel, typeChange } = this.props
    return (
      <div style={{textAlign: 'left'}}>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={10} push={7}>
            <div style={{ marginBottom: '10px' }}>标签集合类型：</div>
            <Select style={{ width: '100%' }} onChange={typeChange}>
              <Option value="separateWordsProperty">分词及词性标注</Option>
              <Option value="contentType">文本内容分类</Option>
              <Option value="markEntity">实体标注</Option>
              <Option value="emotion">情感标注</Option>
            </Select>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={10} push={7}>
            <div style={{ marginBottom: '10px' }}>标签名称：</div>
            <Input onChange={nameChange}></Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={10} push={7}>
            <div style={{ marginBottom: '10px' }}>所含标签：</div>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              onChange={labelsSelectChange}
            >
            { labels.map(item => <Option key={item.label}>{item.label}</Option>) }
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
    labels: state.createLabels.labels
  }
}

let mapDispatchToProps = dispatch => {
  return {
    labelsSelectChange: value => {
      console.log(value)
      let {createLabels} = store.getState()
      dispatch({
        type: 'SET_CREATE_LABELS',
        createLabels: {
          ...createLabels,
          labelsValue: value
        }
      })
    },
    nameChange: e => {
      let {createLabels} = store.getState()
      dispatch({
        type: 'SET_CREATE_LABELS',
        createLabels: {
          ...createLabels,
          labelsName: e.target.value
        }
      })
    },
    typeChange: value => {
      let {createLabels} = store.getState()
      dispatch({
        type: 'SET_CREATE_LABELS',
        createLabels: {
          ...createLabels,
          type: value
        }
      })
    },
    symbolChange: e => {
      let {createLabels} = store.getState()
      dispatch({
        type: 'SET_CREATE_LABELS',
        createLabels: {
          ...createLabels,
          symbol: e.target.value
        }
      })
    },
    create: () => {},
    cancel: () => {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLabels)