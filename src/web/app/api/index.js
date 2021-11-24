import http from '@app/http/index'

/** 获取用户详情 */
export const getUserDetail = () => http.get('/user/detail')

/**
 * 获取数据列表
 * @param {object} params
 * @param {number | undefined} params.pageNum - 当前页
 * @param {number | undefined} params.pageSize - 每页数据量
 * @param {string | undefined} params.searchText - 搜索关键字
 * @param {string | undefined} params.id -  数据类型id
 */
export const getDataList = (params) => http.get('/url/page', { params })

/**
 * API Descriptions 接口说明
 * @param {string} params.id - 数据id
 * @param {number} params.count - 数量
 */
export const setData = params => http.put('/url/url', {}, { params })

/** API Descriptions 接口说明 */
export const switchRole = id => http.post('/url/url', {}, { params: { id } })
