import http from '@pc/http/index'

/** 获取用户详情 */
export const getUserDetail = () => http.get('/user/detail')

/**
 * 获取当前登录用户的菜单
 */
export const getCurrentUserMenu = () => http.get('/menu/user')
