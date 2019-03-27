import Vue from 'vue';
import Router from 'vue-router';
import DeloReestr from '../components/reestrPassport/DeloReestr';
import DashBoard from '../components/reestrPassport/DashBoard';

import DeloTreeCardView from '../components/viewData/DeloTreeCardView';
import FrmEdDeloEdit from '../components/delo/edit/FrmEdDeloEdit';
import FrmEdVuPredEdit from '../components/delo/edit/FrmEdVuPredEdit';
import FrmEdVuVydEdit from '../components/delo/edit/FrmEdVuVydEdit';
import FrmEdDocsPostEdit from '../components/delo/edit/FrmEdDocsPostEdit';
import FrmEdDocsProtEdit from '../components/delo/edit/FrmEdDocsProtEdit';
import FrmEdDecisEdit from '../components/delo/edit/FrmEdDecisEdit';
import FrmEdVehsAMTCEdit from '../components/delo/edit/FrmEdVehsAMTCEdit';
import FrmEdUchastFLIndividEdit from '../components/delo/edit/FrmEdUchastFLIndividEdit';
import FrmEdUchastFLOrganizationEdit from '../components/delo/edit/FrmEdUchastFLOrganizationEdit';
import PlaceViewEdit from '../components/delo/edit/PlaceViewEdit';
import AddressViewEdit from '../components/delo/edit/AddressViewEdit';

import WizardExecuter from '../components/wizard/WizardExecuter';

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
      path: '/frmEdVehsAMTCEdit',
      name: 'FrmEdVehsAMTCEdit',
      component: FrmEdVehsAMTCEdit,
      props: true
    },
    {
      path: '/frmEdDocsProtEdit',
      name: 'FrmEdDocsProtEdit',
      component: FrmEdDocsProtEdit,
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
  ]
});

router.beforeEach( async (to, from, next) => {
  try {
    let sid = to.query.sid;
    if (funcUtils.isNotEmpty(sid)) {
      sessionStorage.setItem('admAuthSid', sid);
      next(false);
      await router.app.$store.dispatch('authorizationSetData', {
        auth: true,
        authorization: false
      });
    } else {
      let rootMethods = router.app.$options.methods;
      let current = formStack.getCurrent();
      let isValidSession = await rootMethods.isValidSession();

      if (funcUtils.isNull(current)) {
        next(false);
      } else if (!isValidSession) {
        rootMethods.logout.call(router.app);
      }  else if (funcUtils.isNotEmpty(current) && (to.matched.length === 0 || current.routeName !== to.name)) {
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
