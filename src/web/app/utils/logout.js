export default () => {
  localStorage.removeItem('token')
  location.replace('loginPage')  // TODO:toChange
}
