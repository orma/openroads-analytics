'use strict';

var BaseView = require('./base-view.js');
var dataTable = require('datatables');
var _ = require('underscore');
var $ = require('jquery');
$.DataTable = dataTable;

module.exports = BaseView.extend({
  template: require('../templates/municipality.html'),

  initialize: function (options) {
    this.adminListModel = options.adminListModel;

    BaseView.prototype.initialize.call(this);
    this.listenTo(this.adminListModel, 'change', this.render);
    this.adminListModel.fetch();
  },

  render: function () {
    var model = this.model ? this.model.attributes : {};
    var adminListModel = this.adminListModel ? this.adminListModel.attributes : {};
    console.log('model', model);
    console.log('adminListModel', adminListModel);
    if (!model.properties || !adminListModel.crumbs ) {
      return this;
    }

    model.crumbs = adminListModel.crumbs;

    try {
      this.$el.html(this.template(model));
    } catch (e) {
      console.error(e);
    }

    this.$('.table').dataTable({ 'pageLength': 25 });
    return this;
  }

});