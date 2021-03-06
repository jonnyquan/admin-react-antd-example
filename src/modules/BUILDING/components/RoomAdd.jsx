// 楼宇添加
import {Modal, Input, Form, Row, Col, Icon, notification, Select} from 'antd'
import React from 'react'
import { apiPost } from '../../../api/index'
import '../style/test.less'
const FormItem = Form.Item
const Option = Select.Option
class WarehouseAddUp extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        view: true,
        title: '',
        propertyType1: '',
        roomStatus1: '',
        ListBuildingInfo: [],
        data: {}
    }

    async initialRemarks (nextProps) {
        let ListBuildingInfo = await apiPost(
            '/collectRent/ListBuildingInfo'
        )
        this.setState({
            view: false,
            ListBuildingInfo: ListBuildingInfo.data,
            title: nextProps.title
        })
        if (nextProps.id !== null) {
            if (this.state.isFirst && nextProps.visible) {
                let room = await apiPost(
                    '/build/getRoomById',
                    {id: nextProps.id}
                )
                if (room.data.propertyType === 0) {
                    this.setState({
                        propertyType1: '自有'
                    })
                } else if (room.data.propertyType === 1) {
                    this.setState({
                        propertyType1: '使用权'
                    })
                } else if (room.data.propertyType === 2) {
                    this.setState({
                        propertyType1: '出售'
                    })
                }
                if (room.data.roomStatus === 0) {
                    this.setState({
                        roomStatus1: '空置'
                    })
                } else if (room.data.roomStatus === 1) {
                    this.setState({
                        roomStatus1: '已租'
                    })
                } else if (room.data.roomStatus === 2) {
                    this.setState({
                        roomStatus1: '自用'
                    })
                }
                this.props.form.setFieldsValue({
                    build: room.data.buildName,
                    propertyType1: this.state.propertyType1,
                    roomStatus1: this.state.roomStatus1,
                    floorNum: room.data.floorNum,
                    roomFloor: room.data.roomFloor,
                    propertyOwner: room.data.propertyOwner,
                    roomNum: room.data.roomNum,
                    linkman: room.data.linkman,
                    roomArea: room.data.roomArea,
                    phoneNum: room.data.phoneNum,
                    roomHeight: room.data.roomHeight,
                    remark: room.data.remark
                })
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false,
                    view: true,
                    fileList: []
                })
            }
        } else {
            if (this.state.isFirst && nextProps.visible) {
                this.props.form.resetFields()
                this.setState({
                    visible: nextProps.visible,
                    isFirst: false,
                    view: true,
                    fileList: []
                })
            }
        }
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    // 单击确定按钮提交表单
    handleSubmit = async () => {
        let json = this.props.form.getFieldsValue()
        if (this.props.id > 0) {
            json['id'] = this.props.id
            json['roomStatus'] = this.roomStatus
            json['buildId'] = this.buildId
            json['buildName'] = this.buildName
            json['propertyType'] = this.propertyType
            await apiPost(
                'build/updateRoom',
                json
            )
            notification.open({
                message: '修改成功',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
            this.props.refreshTable()
            this.setState({visible: false,
                isFirst: true })
        } else {
            json['roomStatus'] = this.roomStatus
            json['propertyType'] = this.propertyType
            json['buildId'] = this.buildId
            json['buildName'] = this.buildName
            await apiPost(
                'build/saveRoom',
                json
            )
            notification.open({
                message: '添加成功',
                icon: <Icon type="smile-circle" style={{color: '#108ee9'}} />
            })
            this.props.refreshTable()
            this.setState({visible: false,
                isFirst: true })
        }
    }
    handleCancel = (e) => {
        this.isFirst = true
        this.setState({ visible: false,
            isFirst: true})
    }
    buildId = null
    buildName = null
    selectBuild = (e) => {
        this.buildId = e
        this.state.ListBuildingInfo.map(BuildingInfo => {
            if (e === BuildingInfo.id.toString()) {
                this.buildName = BuildingInfo.buildName
            }
            return ''
        })
    }
    roomStatus = null
    selectRStatus = (e) => {
        this.roomStatus = e
    }
    propertyType = null
    selectPType = (e) => {
        this.propertyType = e
    }
    render () {
        const { getFieldDecorator } = this.props.form
        let ListBuildingInfo = this.state.ListBuildingInfo
        return (
            <Modal maskClosable={false}
                title={this.state.title}
                style={{top: 20}}
                width={600}
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
            >
                <Form layout="horizontal">
                    <Row>
                        <Col span={12}>
                            <FormItem label="所属楼宇" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('build')(
                                    <Select
                                        showSearch
                                        style={{width: 180,
                                            marginRight: '5px'}}
                                        placeholder="请选择所属楼宇"
                                        optionFilterProp="children"
                                        onSelect={this.selectBuild}
                                    >
                                        {ListBuildingInfo.map(BuildingInfo => {
                                            return <Option key={BuildingInfo.id}>{BuildingInfo.buildName}</Option>
                                        })}
                                    </Select>)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="产权性质" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('propertyType1')(
                                    <Select
                                        showSearch
                                        style={{width: 180,
                                            marginRight: '5px'}}
                                        placeholder="请选择产权性质"
                                        optionFilterProp="children"
                                        onSelect={this.selectPType}
                                    >
                                        <Option key={0}>自有</Option>
                                        <Option key={1}>使用权</Option>
                                        <Option key={2}>出售</Option>
                                    </Select>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="所属楼层" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('roomFloor')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="产权单位" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('propertyOwner')(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="房间编号" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('roomNum')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="联系人" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('linkman')(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="建筑面积" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('roomArea')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="联系方式" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('phoneNum')(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="层高" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('roomHeight')(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="房屋状态" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('roomStatus1')(
                                    <Select
                                        showSearch
                                        style={{width: 180,
                                            marginRight: '5px'}}
                                        placeholder="请选择房屋状态"
                                        optionFilterProp="children"
                                        onSelect={this.selectRStatus}
                                    >
                                        <Option key={0}>空置</Option>
                                        <Option key={1}>已租</Option>
                                        <Option key={2}>自用</Option>
                                    </Select>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="备注" labelCol={{ span: 8 }}
                                wrapperCol={{ span: 15 }}
                            >
                                {getFieldDecorator('remark')(<Input type={'textarea'} width={500} />)}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}

let WarehouseAddUpComponent = Form.create()(WarehouseAddUp)

export default WarehouseAddUpComponent
