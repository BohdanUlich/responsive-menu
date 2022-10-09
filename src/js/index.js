const menuList = document.querySelector('.menu-list')
const menuBtn = document.querySelector('.header__menu-btn')
const menuMobile = document.querySelector('.menu-mobile')
let menuItems = document.getElementsByClassName('header__menu-item')
let activeId = null

for (let i = 0; i < menuItems.length; i++) {
  if (menuItems.item(i).dataset?.id) {
    menuItems
      .item(i)
      .addEventListener('click', () =>
        onClickMenuItem(menuItems.item(i).dataset.id)
      )
  }
}

document.addEventListener('click', (e) => {
  let target = e.target

  let activeMenuBlock = document.querySelector(
    `.menu-list__block[data-id="${activeId}"]`
  )
  let activeMenuItem = document.querySelector(
    `.header__menu-item[data-id="${activeId}"]`
  )

  let itsMenuList = target == menuList || menuList.contains(target)
  let itsMenuItems = target.classList.contains('header__menu-item')

  if (!itsMenuList && !itsMenuItems) {
    menuList.classList.remove('active')

    activeMenuBlock?.classList.remove('active')
    activeMenuItem?.classList.remove('active')

    activeId = null
  }
})

const onClickMenuItem = (id) => {
  let menuBlock = document.querySelector(`.menu-list__block[data-id="${id}"]`)
  let menuItem = document.querySelector(`.header__menu-item[data-id="${id}"]`)

  let activeMenuBlock = document.querySelector(
    `.menu-list__block[data-id="${activeId}"]`
  )
  let activeMenuItem = document.querySelector(
    `.header__menu-item[data-id="${activeId}"]`
  )

  activeMenuBlock?.classList.remove('active')
  activeMenuItem?.classList.remove('active')

  if (activeId !== id) {
    menuItem.classList.add('active')
    menuBlock.classList.add('active')
  }

  activeId === id && menuList.classList.contains('active')
    ? menuList.classList.remove('active')
    : menuList.classList.add('active')

  activeId !== id ? (activeId = id) : (activeId = null)
}

menuBtn.addEventListener('click', function () {
  menuBtn.classList.toggle('active')
  menuMobile.classList.toggle('active')
})

class ItcAccordion {
  constructor(target, config) {
    this._el =
      typeof target === 'string' ? document.querySelector(target) : target
    const defaultConfig = {
      alwaysOpen: true,
      duration: 350,
    }
    this._config = Object.assign(defaultConfig, config)
    this.addEventListener()
  }
  addEventListener() {
    this._el.addEventListener('click', (e) => {
      const elHeader = e.target.closest('.accordion__header')
      if (!elHeader) {
        return
      }
      if (!this._config.alwaysOpen) {
        const elOpenItem = this._el.querySelector('.accordion__item_show')
        if (elOpenItem) {
          elOpenItem !== elHeader.parentElement ? this.toggle(elOpenItem) : null
        }
      }
      this.toggle(elHeader.parentElement)
    })
  }
  show(el) {
    const elBody = el.querySelector('.accordion__body')
    if (
      elBody.classList.contains('collapsing') ||
      el.classList.contains('accordion__item_show')
    ) {
      return
    }
    elBody.style.display = 'block'
    const height = elBody.offsetHeight
    elBody.style.height = 0
    elBody.style.overflow = 'hidden'
    elBody.style.transition = `height ${this._config.duration}ms ease`
    elBody.classList.add('collapsing')
    el.classList.add('accordion__item_slidedown')
    elBody.offsetHeight
    elBody.style.height = `${height}px`
    window.setTimeout(() => {
      elBody.classList.remove('collapsing')
      el.classList.remove('accordion__item_slidedown')
      elBody.classList.add('collapse')
      el.classList.add('accordion__item_show')
      elBody.style.display = ''
      elBody.style.height = ''
      elBody.style.transition = ''
      elBody.style.overflow = ''
    }, this._config.duration)
  }
  hide(el) {
    const elBody = el.querySelector('.accordion__body')
    if (
      elBody.classList.contains('collapsing') ||
      !el.classList.contains('accordion__item_show')
    ) {
      return
    }
    elBody.style.height = `${elBody.offsetHeight}px`
    elBody.offsetHeight
    elBody.style.display = 'block'
    elBody.style.height = 0
    elBody.style.overflow = 'hidden'
    elBody.style.transition = `height ${this._config.duration}ms ease`
    elBody.classList.remove('collapse')
    el.classList.remove('accordion__item_show')
    elBody.classList.add('collapsing')
    window.setTimeout(() => {
      elBody.classList.remove('collapsing')
      elBody.classList.add('collapse')
      elBody.style.display = ''
      elBody.style.height = ''
      elBody.style.transition = ''
      elBody.style.overflow = ''
    }, this._config.duration)
  }
  toggle(el) {
    el.classList.contains('accordion__item_show')
      ? this.hide(el)
      : this.show(el)
  }
}

new ItcAccordion('#accordion', {
  alwaysOpen: false,
})
