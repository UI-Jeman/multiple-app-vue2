import { formatDate } from '@pc/utils'

const filters = [
  { name: 'formatDate', filter: formatDate }
]

export default Vue => filters.forEach(({ name, filter }) => Vue.filter(name, filter))
