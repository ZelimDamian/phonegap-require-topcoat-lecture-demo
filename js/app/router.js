define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        PageSlider  = require('app/utils/pageslider'),
        HomeView    = require('app/views/Home'),

        slider = new PageSlider($('body')),

        homeView = new HomeView();

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "heros/:id": "heroDetails",
            "heros/:id/reports": "reports"
        },

        home: function () {
            homeView.delegateEvents();
            slider.slidePage(homeView.$el);
        },

        heroDetails: function (id) {
            require(["app/models/hero", "app/views/Hero"], function (models, HeroView) {
                var hero = new models.Hero({id: id});
                hero.fetch({
                    success: function (data) {
                        slider.slidePage(new HeroView({model: data}).$el);
                    }
                });
            });
        },

        reports: function (id) {
            require(["app/models/hero", "app/views/Reports"], function (models, ReportsView) {
                var hero = new models.Hero({id: id});
                hero.fetch({
                    success: function (data) {
                        slider.slidePage(new ReportsView({model: data}).$el);
                    }
                });
            });
        }

    });

});