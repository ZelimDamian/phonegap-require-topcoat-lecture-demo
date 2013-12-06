define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),

        Hero = Backbone.Model.extend({

            urlRoot: "http://localhost:3000/heros",

            initialize: function () {
                this.reports = new HeroCollection();
                this.reports.url = this.urlRoot + "/" + this.id + "/reports";
            }

        }),

        HeroCollection = Backbone.Collection.extend({

            model: Hero,

            url: "http://localhost:3000/heros"

        });

    return {
        Hero: Hero,
        HeroCollection: HeroCollection
    };

});