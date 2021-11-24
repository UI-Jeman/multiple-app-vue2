export default () => {
  sessionStorage.removeItem('token')
  location.replace('loginPage') // TODO:toChange
}
