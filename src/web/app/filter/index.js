import { formatDate } from '@app/utils'

const filters = [
  { name: 'time', filter: formatDate }
]

export default Vue => filters.forEach(({ name, filter }) => Vue.filter(name, filter))
