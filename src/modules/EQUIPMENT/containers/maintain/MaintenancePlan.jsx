// 设备管理 - 设备维保 - 保养记录
import React from 'react'
import {Table, Button, Spin, DatePicker, Input } from 'antd'
import '../../style/test.less'
import { apiPost } from '../../../../api'
const { RangePicker } = DatePicker
class MaintenancePlan extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            columns: [],
            dataSource: []
        }
    }
    info = (url) => {
        this.props.history.push(url)
    }
    async initialRemarks () {
        let result = await apiPost(
            '/deviceMaintain/maintenance/maintenanceList'
        )
        let info = this.info
        this.setState({
            columns: [{
                title: '序号',
                width: 200,
                dataIndex: 'id',
                key: 'id',
                render: function (text, record, index) {
                    index++
                    return (
                        <span>{index}</span>
                    )
                }
            }, {
                title: '保养日期',
                width: 150,
                dataIndex: 'maintenanceDate',
                key: 'maintenanceDate'
            }, {
                title: '保养单号',
                width: 150,
                dataIndex: 'maintenanceNumber',
                key: 'maintenanceNumber'
            }, {
                title: '设备编号',
                width: 150,
                dataIndex: 'equipmentNumber',
                key: 'equipmentNumber'
            }, {
                title: '设备名称',
                width: 100,
                dataIndex: 'equipmentName',
                key: 'equipmentName'
            }, {
                title: '保养情况',
                width: 100,
                dataIndex: 'statusStatement',
                key: 'statusStatement',
                render: function (text, record, index) {
                    text = text.substring(0, 30)
                    let url = '/home/equipment/Details/maintain/maintenancerecordDetails/' + record.id
                    return (
                        <a onClick={() => info(url)}>{text}</a>
                    )
                }
            }, {
                title: '保养人员',
                width: 150,
                dataIndex: 'maintenanceManName',
                key: 'maintenanceManName'
            }],
            dataSource: result.data
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    refresh = async () => {
        // 刷新表格
        let result = await apiPost(
            '/deviceMaintain/maintenance/maintenanceList',
            {'startTime': this.startDate,
                'endTime': this.endDate,
                'equipmentName': this.equipmentName,
                'maintenanceManName': this.maintenanceManName
            }
        )
        this.setState({
            loading: false,
            dataSource: result.data
        })
    }
    startDate = ''
    endDate = ''
    getDate = (date, dateString) => {
        this.startDate = dateString[0]
        this.endDate = dateString[1]
    }
    equipmentName = ''
    equipmentNameFn = (e) => {
        this.equipmentName = e.target.value
    }
    query = () => {
        this.refresh()
    }
    handleCancel = () => {
        this.setState({
            list: [],
            open: false,
            id: ''
        })
    }
    maintenanceManName = ''
    maintenanceManNameFn = (e) => {
        this.maintenanceManName = e.target.value
    }
    render () {
        return (
            <div>
                <span style={{paddingBottom: '10px',
                    display: 'block'}}
                >
                    <span>保养日期&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <RangePicker onChange={this.getDate} />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;设备名称&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.equipmentNameFn}
                    />
                    <span>保养人员&nbsp;：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Input style={{width: 200,
                        marginRight: '5px'}} onChange={this.maintenanceManNameFn}
                    />
                    <Button type="primary" onClick={this.query}>查询</Button>
                </span>
                <Spin spinning={this.state.loading}>
                    <Table
                        bordered
                        scroll={{ x: 1550 }}
                        dataSource={this.state.dataSource}
                        columns={this.state.columns}
                    />
                </Spin>
            </div>
        )
    }
}
export default MaintenancePlan
