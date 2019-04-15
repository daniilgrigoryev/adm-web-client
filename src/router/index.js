import Vue from 'vue';
import Router from 'vue-router';

import * as funcUtils from "./../assets/js/utils/funcUtils";
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
      component: () => import('../components/reestrPassport/DeloReestr'),
    },
    {
      path: '/dashBoard',
      name: 'DashBoard',
      component: () => import('../components/reestrPassport/DashBoard'),
    },
    {
      path: '/deloTreeCardView',
      name: 'DeloTreeCardView',
      component: () => import('../components/viewData/DeloTreeCardView'),
      props: true
    },
    {
      path: '/frmEdDeloEdit',
      name: 'FrmEdDeloEdit',
      component: () => import('../components/delo/edit/FrmEdDeloEdit'),
      props: true
    },
    {
      path: '/frmEdDecisEdit',
      name: 'FrmEdDecisEdit',
      component: () => import('../components/delo/edit/FrmEdDecisEdit'),
      props: true
    },
    {
      path: '/frmEdVuPredEdit',
      name: 'FrmEdVuPredEdit',
      component: () => import('../components/delo/edit/FrmEdVuPredEdit'),
      props: true
    },
    {
      path: '/frmEdVuVydEdit',
      name: 'FrmEdVuVydEdit',
      component: () => import('../components/delo/edit/FrmEdVuVydEdit'),
      props: true
    },
    {
      path: '/frmEdDocsPostEdit',
      name: 'FrmEdDocsPostEdit',
      component: () => import('../components/delo/edit/FrmEdDocsPostEdit'),
      props: true
    },
    {
      path: '/frmEdVehsAMTCEdit',
      name: 'FrmEdVehsAMTCEdit',
      component: () => import('../components/delo/edit/FrmEdVehsAMTCEdit'),
      props: true
    },
    {
      path: '/frmEdDocsProtEdit',
      name: 'FrmEdDocsProtEdit',
      component: () => import('../components/delo/edit/FrmEdDocsProtEdit'),
      props: true
    },
    {
      path: '/frmEdDocsOpredEdit',
      name: 'FrmEdDocsOpredEdit',
      component: () => import('../components/delo/edit/FrmEdDocsOpredEdit'),
      props: true
    },
    {
      path: '/frmEdProtPZTCEdit',
      name: 'FrmEdProtPZTCEdit',
      component: () => import('../components/delo/edit/FrmEdProtPZTCEdit'),
      props: true
    },
    {
      path: '/frmEdUchastFLIndividEdit',
      name: 'FrmEdUchastFLIndividEdit',
      component: () => import('../components/delo/edit/FrmEdUchastFLIndividEdit'),
      props: true
    },
    {
      path: '/frmEdUchastFLOrganizationEdit',
      name: 'FrmEdUchastFLOrganizationEdit',
      component: () => import('../components/delo/edit/FrmEdUchastFLOrganizationEdit'),
      props: true
    },
    {
      path: '/placeViewEdit',
      name: 'PlaceViewEdit',
      component: () => import('../components/delo/edit/PlaceViewEdit'),
      props: true
    },
    {
      path: '/addressViewEdit',
      name: 'AddressViewEdit',
      component: () => import('../components/delo/edit/AddressViewEdit'),
      props: true
    },
    {
      path: '/dlgAdviceEdit',
      name: 'DlgAdviceEdit',
      component: () => import('../components/delo/edit/DlgAdviceEdit'),
      props: true
    },
    {
      path: '/wizardExecuter',
      name: 'WizardExecuter',
      component: () => import('../components/wizard/WizardExecuter'),
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
