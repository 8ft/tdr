import Vue from 'vue'

import { Toast, Indicator, MessageBox, Loadmore, InfiniteScroll, Popup, Lazyload, Navbar, TabItem, Radio, Switch, Picker, IndexList, IndexSection, DatetimePicker,Actionsheet } from 'mint-ui'

import AppLayout from './common/appLayout';
import CellSwipe from './common/cellSwipe';
import Rate from './common/rate';
import OrderLi from './orders/li';
import OrderActionBar from './orders/actionBar';

require('swiper/dist/css/swiper.css');
import { swiper, swiperSlide } from 'vue-awesome-swiper';

  //mint-ui
  Vue.use(Lazyload);
  Vue.use(InfiniteScroll);
  Vue.component(Loadmore.name, Loadmore);
  Vue.component(Popup.name, Popup);
  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component(Radio.name, Radio);
  Vue.component(Switch.name, Switch);
  Vue.component(Picker.name, Picker);
  Vue.component(IndexList.name, IndexList);
  Vue.component(IndexSection.name, IndexSection);
  Vue.component(DatetimePicker.name, DatetimePicker);
  Vue.component(Actionsheet.name, Actionsheet);
 
  //other
  Vue.component(AppLayout.name, AppLayout);
  Vue.component(CellSwipe.name, CellSwipe);
  Vue.component(Rate.name, Rate);

  Vue.component(OrderLi.name, OrderLi);
  Vue.component(OrderActionBar.name, OrderActionBar);

  Vue.component(swiper.name, swiper);
  Vue.component(swiperSlide.name, swiperSlide);

  Vue.$toast=Vue.prototype.$toast = Toast;
  Vue.$indicator=Vue.prototype.$indicator = Indicator;
  Vue.$messagebox=Vue.prototype.$messagebox = MessageBox;

