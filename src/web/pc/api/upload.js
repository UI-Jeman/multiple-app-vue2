import http from '@pc/http'

/**
 * 
 * @param {FormDat} formData 
 */
export const upload = formData => http.post('/file/upload', formData)
