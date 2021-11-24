import MyBlock from './my-block.vue'
import MyTable from './my-table.vue'
import MyEmpty from './my-empty.vue'
import MyButton from './my-button.vue'
import MyDialog from './my-dialog.vue'
import MyForm from './my-form.vue'
import MyFilter from './my-filter.vue'
import MyMessages from './my-messages.vue'
import MyStatistics from './my-statistics.vue'
import MyBar from './my-charts/my-bar.vue'
import MyProgress from './my-progress.vue'
import MyUpload from './my-upload.vue'
import MyTimeRange from './my-time-range.vue'
import MySetupDropdown from './my-setup-dropdown.vue'
import MyDictDropdown from './my-dict-dropdown.vue'

const components = [
  MyBlock,
  MyTable,
  MyEmpty,
  MyButton,
  MyDialog,
  MyForm,
  MyFilter,
  MyMessages,
  MyStatistics,
  MyBar,
  MyProgress,
  MyUpload,
  MyTimeRange,
  MySetupDropdown,
  MyDictDropdown
]

export default {
  install(Vue) {
    components.forEach(component => Vue.component(component.name, component))
  }
}
