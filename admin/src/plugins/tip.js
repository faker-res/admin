/* eslint-disable no-trailing-spaces */
/* eslint-disable space-before-function-paren */
import TipTemplate from './tip.vue'

const myModal = {}

myModal.install = function (Vue, options) {
  const Modal = Vue.extend(TipTemplate)

  const instance = new Modal()

  let ele = document.querySelector('.my-tip')

  instance.$mount(ele)

  document.body.appendChild(instance.$el)

  function setter(option) {
    const {
      title,
      content,
      onOk
    } = option
    instance.addSub = { show: false }
    instance.show = true
    instance.title = title || '温馨提示'
    instance.content = content
    instance.onOk = onOk
  }

  Vue.prototype.$Tip = {
    success(option) {
      setter(option)
      instance.type = 'success'
    },
    info(option) {
      setter(option)
      instance.type = 'info'
    },
    error(option) {
      setter(option)
      instance.type = 'error'
      instance.title = '错误提示'
    },
    confirm(option) {
      setter(option)
      instance.type = 'confirm'
    },
    hide() {
      instance.onConfirm()
    },
    showAddSub ({ show = true, mount = 0, account = 0, aDetail = '', mDetail = '' } = {}) {
      instance.show = true
      instance.title = '温馨提示'
      instance.type = 'success'
      instance.addSub.show = show
      instance.addSub.mount = mount
      instance.addSub.account = account
      instance.addSub.aDetail = aDetail
      instance.addSub.mDetail = mDetail
    }
  }
}

export default myModal
