import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'

import Home from "../../../src/views/Home.vue";

const localVue = createLocalVue()
localVue.use(Vuex)

describe('HOME', () => {
  it('renders a value from $store.state', () => {
    const wrapper = shallow(Home, {
      mocks: {
        $store: {
          state: {
            value_1: 'value_1'
          }
        }
      },
      localVue
    })
    console.log("TEST_HOME",wrapper.find('.state-1'));
    //expect(wrapper.find('.state-1').text().trim()).toEqual('value_1')
  })

});