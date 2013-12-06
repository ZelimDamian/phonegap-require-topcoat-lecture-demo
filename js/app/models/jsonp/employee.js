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

        }),

        originalSync = Backbone.sync;

    Backbone.sync = function (method, model, options) {
        if (method === "read") {
            options.dataType = "jsonp";
            return originalSync.apply(Backbone, arguments);
        }
    };

    return {
        Hero: Hero,
        HeroCollection: HeroCollection
    };

});