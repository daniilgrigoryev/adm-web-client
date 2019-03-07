import Vue from 'vue';
import Router from 'vue-router';
import Authorization from '../components/Authorization';
import DeloReestr from '../components/reestrPassport/DeloReestr';
import DashBoard from '../components/reestrPassport/DashBoard';

import DeloTreeCardView from '../components/viewData/DeloTreeCardView';
import FrmEdDeloEdit from '../components/delo/edit/FrmEdDeloEdit';
import FrmEdVuPredEdit from '../components/delo/edit/FrmEdVuPredEdit';
import FrmEdVuVydEdit from '../components/delo/edit/FrmEdVuVydEdit';
import FrmEdDocsPostEdit from '../components/delo/edit/FrmEdDocsPostEdit';
import FrmEdDecisEdit from '../components/delo/edit/FrmEdDecisEdit';
import FrnEdVehsAMTCEdit from '../components/delo/edit/FrnEdVehsAMTCEdit';
import FrmEdUchastFLIndividEdit from '../components/delo/edit/FrmEdUchastFLIndividEdit';
import FrmEdUchastFLOrganizationEdit from '../components/delo/edit/FrmEdUchastFLOrganizationEdit';
import PlaceViewEdit from '../components/delo/edit/PlaceViewEdit';
import AddressViewEdit from '../components/delo/edit/AddressViewEdit';

import WizardExecuter from '../components/wizard/WizardExecuter';

// верстка
import Accounting from '../components/verstka/Accounting.vue';
import Delo from '../components/verstka/Delo.vue';
import Offense from '../components/verstka/Offense.vue';
import * as funcUtils from "./../assets/js/utils/funcUtils";
import * as ConstantUtils from "./../assets/js/utils/constantUtils";
import * as formStack from './../assets/js/api/formStack';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/admWeb/',
  hashbang: false,
  routes: [
    {
      path: '/',
      name: 'Authorization',
      component: Authorization
    },
    {
      path: '/deloReestr',
      name: 'DeloReestr',
      component: DeloReestr,
    },
    {
      path: '/dashBoard',
      name: 'DashBoard',
      component: DashBoard,
    },
    {
      path: '/deloTreeCardView',
      name: 'DeloTreeCardView',
      component: DeloTreeCardView,
      props: true
    },
    {
      path: '/frmEdDeloEdit',
      name: 'FrmEdDeloEdit',
      component: FrmEdDeloEdit,
      props: true
    },
    {
      path: '/frmEdDecisEdit',
      name: 'FrmEdDecisEdit',
      component: FrmEdDecisEdit,
      props: true
    },
    {
      path: '/frmEdVuPredEdit',
      name: 'FrmEdVuPredEdit',
      component: FrmEdVuPredEdit,
      props: true
    },
    {
      path: '/frmEdVuVydEdit',
      name: 'FrmEdVuVydEdit',
      component: FrmEdVuVydEdit,
      props: true
    },
    {
      path: '/frmEdDocsPostEdit',
      name: 'FrmEdDocsPostEdit',
      component: FrmEdDocsPostEdit,
      props: true
    },
    {
      path: '/frnEdVehsAMTCEdit',
      name: 'FrnEdVehsAMTCEdit',
      component: FrnEdVehsAMTCEdit,
      props: true
    },
    {
      path: '/frmEdUchastFLIndividEdit',
      name: 'FrmEdUchastFLIndividEdit',
      component: FrmEdUchastFLIndividEdit,
      props: true
    },
    {
      path: '/frmEdUchastFLOrganizationEdit',
      name: 'FrmEdUchastFLOrganizationEdit',
      component: FrmEdUchastFLOrganizationEdit,
      props: true
    },
    {
      path: '/placeViewEdit',
      name: 'PlaceViewEdit',
      component: PlaceViewEdit,
      props: true
    },
    {
      path: '/addressViewEdit',
      name: 'AddressViewEdit',
      component: AddressViewEdit,
      props: true
    },
    {
      path: '/wizardExecuter',
      name: 'WizardExecuter',
      component: WizardExecuter,
      props: true
    },
    {
      path: '/accounting',
      name: 'Accounting',
      component: Accounting,
    },
    {
      path: '/offense',
      name: 'Offense',
      component: Offense,
    },
    {
      path: '/delo',
      name: 'Delo',
      component: Delo,
    },
  ]
});

router.beforeEach( async (to, from, next) => {
  try {
    let sid = to.query.sid;
    if (funcUtils.isNotEmpty(sid) && to.name === 'Authorization') {
      next({name: 'Authorization', params: {sid: sid}});
    } else if (funcUtils.isNotEmpty(to.params.sid) && to.name === 'Authorization') {
      next();
    } else {
      let current = formStack.getCurrent();
      let checkSession = await router.app.$options.methods.checkSession();
      if (funcUtils.isNull(current) || funcUtils.isEmpty(localStorage.getItem('admSid')) || !checkSession) {
        window.open(ConstantUtils.HTTP_URL_AUTH, '_self');
      } else if (funcUtils.isNull(to) || funcUtils.isNull(to.name)) {
        next({name: current.routeName});
      } else if (current.routeName !== to.name) {
        next({name: current.routeName});
      } else {
        next();
      }
    }
  } catch (e) {
    alert(e.message);
  }
});

export default router;
