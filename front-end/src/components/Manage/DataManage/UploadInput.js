import React from 'react'
import store from '../../../state/store'
import { Button, Upload, Icon, message } from 'antd'
import { path } from '../../../config'

let pathname = path.replace('http://', '')

const uploadProps = {
  name: 'file',
  accept: '.xml',
  action: `//${pathname}/api/upload/docs`,
  withCredentials: true,
  onChange(info) {
    if (info.file.status !== 'uploading') {
      // console.log(info.file)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功！`)
      let state = store.getState(), {createDocs} = state
      let docsPathName = info.file.response.data.fileName
      store.dispatch({
        type: 'SET_CREATE_DOCS',
        createDocs: {
          ...createDocs,
          docsPathName
        }
      })
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败！`)
    }
  },
  onRemove(file) {
    let state = store.getState(), {createDocs} = state
    store.dispatch({
      type: 'SET_CREATE_DOCS',
      createDocs: {
        ...createDocs,
        docsPathName: ''
      }
    })
  }
}

class UploadDocs extends React.Component {
  render() {
    return (
      <Upload {...uploadProps}>
        <Button style={{ width: '100%' }}>
          <Icon type="upload" /> 点击上传
        </Button>
      </Upload>
    )
  }
}

export default UploadDocs