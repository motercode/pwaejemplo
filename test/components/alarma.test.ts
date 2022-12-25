import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Alarma from '~/components/Alarma.vue'

describe('Alerma.vue', () => {
  it.skip('should render', () => {
    const wrapper = mount(Alarma, { props: { tiempo: 100 , modo: 'vibracion' , repeticiones: 10} })
    console.log(wrapper.html())
    expect(wrapper.text()).toContain('10 repeticiones')
    expect(wrapper.text()).toContain('100 segundos entre alarmas')
    expect(wrapper.text()).toContain('modo vibracion')
    expect(wrapper.find('#inibutton').exists()).toBe(true)
    expect(wrapper.find('#inibutton').text()).toContain('start')
    expect(wrapper.find('#stopbutton').exists()).toBe(true)
    expect(wrapper.find('#stopbutton').text()).toContain('stop')
    expect(wrapper.find('#backbutton').exists()).toBe(true)
    expect(wrapper.find('#backbutton').text()).toContain('back')
  })

//   it('should be interactive', async () => {
//     const wrapper = mount(Counter, { props: { initial: 0 } })
//     expect(wrapper.text()).toContain('0')

//     expect(wrapper.find('.inc').exists()).toBe(true)

//     expect(wrapper.find('.dec').exists()).toBe(true)

//     await wrapper.get('.inc').trigger('click')

//     expect(wrapper.text()).toContain('1')

//     await wrapper.get('.dec').trigger('click')

//     expect(wrapper.text()).toContain('0')
//   })
})
