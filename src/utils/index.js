'use strict'

import Vue from 'vue'
import Base from './base'
import Http from './http'
import Cache from './cache'
import Np from 'number-precision'

import Fastclick from 'fastclick'
Fastclick.attach(document.body);

Vue.prototype.$utils = Base;
Vue.prototype.$np = Np;
Vue.prototype.$cache = Cache;




