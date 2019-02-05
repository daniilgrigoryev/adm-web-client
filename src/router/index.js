import Vue from 'vue';
import Router from 'vue-router';
import Authorization from '../components/Authorization';
import DeloReestr from '../components/reestrPassport/DeloReestr';
import DeloTreeCardView from '../components/viewData/DeloTreeCardView';
import WizardExecuter from '../components/wizard/WizardExecuter';

// верстка
import Accounting from '../components/verstka/Accounting.vue';

import * as funcUtils from "./../assets/js/utils/funcUtils";
import * as ConstantUtils from "./../assets/js/utils/constantUtils";
import * as formStack from './../assets/js/api/formStack';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  hashbang: false,
  routes: [
    {
      path: ConstantUtils.contextPath,
      name: 'Authorization',
      component: Authorization,
    },
    {
      path: ConstantUtils.contextPath + '/deloReestr',
      name: 'DeloReestr',
      component: DeloReestr,
    },
    {
      path: ConstantUtils.contextPath + '/deloTreeCardView',
      name: 'DeloTreeCardView',
      component: DeloTreeCardView,
      props: true
    },
    {
      path: ConstantUtils.contextPath + '/wizardExecuter',
      name: 'WizardExecuter',
      component: WizardExecuter,
      props: true
    },
    {
      path: ConstantUtils.contextPath + '/accounting',
      name: 'Accounting',
      component: Accounting,
    },
  ]
});

router.beforeEach(async (to, from, next) => {
  try {
    let current = formStack.getCurrent();
    if (funcUtils.isNull(current)) {
      next(false);
    } else if (funcUtils.isNull(to) || funcUtils.isNull(to.name)) {
      next({name: current.routeName});
    } else if (!funcUtils.getfromLocalStorage('auth') && to.name !== 'Authorization') {
      next({name: 'Authorization'});
    } else if (current.routeName !== to.name && current.routeName !== 'Authorization') {
      next({name: current.routeName});
    } else {
      next();
    }
  } catch (e) {
    alert(e.message);
  }
});

export default router;
