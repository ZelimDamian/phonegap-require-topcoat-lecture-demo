define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        HeroListView    = require('app/views/HeroList'),
        tpl                 = require('text!tpl/Reports.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(template(this.model.toJSON()));
            this.model.reports.fetch();
            this.listView = new HeroListView({collection: this.model.reports, el: $(".scroller", this.el)});
            return this;
        }

    });

});