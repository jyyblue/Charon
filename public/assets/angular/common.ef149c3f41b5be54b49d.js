(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{ZNY0:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=function(){function t(t){this.zone=t}return Object.defineProperty(t.prototype,"layoutHelpers",{get:function(){return window.layoutHelpers},enumerable:!0,configurable:!0}),t.prototype.exec=function(t){return this.layoutHelpers&&this.zone.runOutsideAngular(t)},t.prototype.getLayoutSidenav=function(){var t=this;return this.exec((function(){return t.layoutHelpers.getLayoutSidenav()}))||null},t.prototype.getSidenav=function(){var t=this;return this.exec((function(){return t.layoutHelpers.getSidenav()}))||null},t.prototype.getLayoutNavbar=function(){var t=this;return this.exec((function(){return t.layoutHelpers.getLayoutNavbar()}))||null},t.prototype.getLayoutFooter=function(){var t=this;return this.exec((function(){return t.layoutHelpers.getLayoutFooter()}))||null},t.prototype.getLayoutContainer=function(){var t=this;return this.exec((function(){return t.layoutHelpers.getLayoutContainer()}))||null},t.prototype.isSmallScreen=function(){var t=this;return this.exec((function(){return t.layoutHelpers.isSmallScreen()}))},t.prototype.isLayout1=function(){var t=this;return this.exec((function(){return t.layoutHelpers.isLayout1()}))},t.prototype.isCollapsed=function(){var t=this;return this.exec((function(){return t.layoutHelpers.isCollapsed()}))},t.prototype.isFixed=function(){var t=this;return this.exec((function(){return t.layoutHelpers.isFixed()}))},t.prototype.isOffcanvas=function(){var t=this;return this.exec((function(){return t.layoutHelpers.isOffcanvas()}))},t.prototype.isNavbarFixed=function(){var t=this;return this.exec((function(){return t.layoutHelpers.isNavbarFixed()}))},t.prototype.isFooterFixed=function(){var t=this;return this.exec((function(){return t.layoutHelpers.isFooterFixed()}))},t.prototype.isReversed=function(){var t=this;return this.exec((function(){return t.layoutHelpers.isReversed()}))},t.prototype.setCollapsed=function(t,e){var n=this;void 0===e&&(e=!0),this.exec((function(){return n.layoutHelpers.setCollapsed(t,e)}))},t.prototype.toggleCollapsed=function(t){var e=this;void 0===t&&(t=!0),this.exec((function(){return e.layoutHelpers.toggleCollapsed(t)}))},t.prototype.setPosition=function(t,e){var n=this;this.exec((function(){return n.layoutHelpers.setPosition(t,e)}))},t.prototype.setNavbarFixed=function(t){var e=this;this.exec((function(){return e.layoutHelpers.setNavbarFixed(t)}))},t.prototype.setFooterFixed=function(t){var e=this;this.exec((function(){return e.layoutHelpers.setFooterFixed(t)}))},t.prototype.setReversed=function(t){var e=this;this.exec((function(){return e.layoutHelpers.setReversed(t)}))},t.prototype.update=function(){var t=this;this.exec((function(){return t.layoutHelpers.update()}))},t.prototype.setAutoUpdate=function(t){var e=this;this.exec((function(){return e.layoutHelpers.setAutoUpdate(t)}))},t.prototype.on=function(t,e){var n=this;this.exec((function(){return n.layoutHelpers.on(t,e)}))},t.prototype.off=function(t){var e=this;this.exec((function(){return e.layoutHelpers.off(t)}))},t.prototype.init=function(){var t=this;this.exec((function(){return t.layoutHelpers.init()}))},t.prototype.destroy=function(){var t=this;this.exec((function(){return t.layoutHelpers.destroy()}))},t.prototype._redrawLayoutSidenav=function(){var t=this;this.exec((function(){return t.layoutHelpers._redrawLayoutSidenav()}))},t.prototype._removeClass=function(t){var e=this;this.exec((function(){return e.layoutHelpers._removeClass(t)}))},t}()},nm5K:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var r=n("mrSG"),o=n("gSGy"),a=n("AytR"),i=n("CcnG"),u=n("SZbH"),s=n("t/Na"),p=n("F5nt"),l=function(t){function e(e,n,r){var o=t.call(this,e,n,r)||this;return o.toastrService=e,o.http=n,o.appService=r,o}return Object(r.c)(e,t),e.prototype.getUserProfile=function(t){return this.postData(a.a.apiUrl+"/"+t.username,t,null,!1)},e.prototype.getUserList=function(t){return this.postData(a.a.apiUrl+"/admin/v1/customer/list",t,null,!1)},e.prototype.getCustomerDetail=function(t){return this.postData(a.a.apiUrl+"/admin/v1/customer/detail",t,null,!1)},e.prototype.updateCustomerAccount=function(t){return this.postData(a.a.apiUrl+"/admin/v1/customer/update",t,null,!1)},e.prototype.storeCustomerAccount=function(t){return this.postData(a.a.apiUrl+"/admin/v1/customer/store",t,null,!1)},e.prototype.getTableData=function(t){return this.postData(a.a.apiUrl+"/customer/auth/getTableData",t,null,!1)},e.prototype.saveTask=function(t){return this.postData(a.a.apiUrl+"/admin/v1/task/create",t,null,!1)},e.prototype.getTaskList=function(t){return this.postData(a.a.apiUrl+"/admin/v1/task/list",t,null,!1)},e.prototype.getDriverList=function(t){return this.postData(a.a.apiUrl+"/admin/v1/driver/list",t,null,!1)},e.prototype.getDriverDetail=function(t){return this.postData(a.a.apiUrl+"/admin/v1/driver/detail",t,null,!1)},e.prototype.getDriverOptions=function(t){return this.postData(a.a.apiUrl+"/admin/v1/driver/options",t,null,!1)},e.prototype.updateDriver=function(t){return this.postData(a.a.apiUrl+"/admin/v1/driver/update",t,null,!1)},e.prototype.storeDriver=function(t){return this.postData(a.a.apiUrl+"/admin/v1/driver/store",t,null,!1)},e.prototype.getTaskDetail=function(t){return this.postData(a.a.apiUrl+"/admin/v1/task/detail",t,null,!1)},e.prototype.updateTask=function(t){return this.postData(a.a.apiUrl+"/admin/v1/task/update",t,null,!1)},e.prototype.updateTaskAuto=function(t){return this.postData(a.a.apiUrl+"/admin/v1/task/updateAuto",t,null,!1)},e.prototype.downloadPodFile=function(t){return this.getData(a.a.apiUrl+"/admin/v1/task/downloadpod",t,null)},e.prototype.updatePendingTask=function(t){return this.postData(a.a.apiUrl+"/admin/v1/task/updatePendingTask",t,null,!1)},e.prototype.updatePendingPaymentTasks=function(t){return this.postData(a.a.apiUrl+"/admin/v1/task/updatePendingPaymentTasks",t,null,!1)},e.prototype.disputeTask=function(t){return this.postData(a.a.apiUrl+"/admin/v1/task/disputeTask",t,null,!1)},e.prototype.resolveDisputeTask=function(t){return this.postData(a.a.apiUrl+"/admin/v1/task/resolveDisputeTask",t,null,!1)},e.prototype.getJobOptions=function(t){return this.postData(a.a.apiUrl+"/admin/v1/job/options",t,null,!1)},e.prototype.getTaskStatus=function(t){return this.postData(a.a.apiUrl+"/admin/v1/task/status",t,null,!1)},e.prototype.getDashboardData=function(t){return this.postData(a.a.apiUrl+"/admin/v1/getDashboardData",t,null,!1)},e.prototype.getPodEmailTemplate=function(t){return this.postData(a.a.apiUrl+"/admin/v1/getPodEmailTemplate",t,null,!1)},e.prototype.sendPodMail=function(t){return this.postData(a.a.apiUrl+"/admin/v1/sendPodMail",t,null,!1)},e.prototype.getCustomerList=function(t){return void 0===t&&(t=null),this.postDataRxjs(a.a.apiUrl+"/admin/v1/user/list",{search:t},null,!1)},e.\u0275prov=i["\u0275\u0275defineInjectable"]({factory:function(){return new e(i["\u0275\u0275inject"](u.j),i["\u0275\u0275inject"](s.c),i["\u0275\u0275inject"](p.a))},token:e,providedIn:"root"}),e}(o.a)}}]);