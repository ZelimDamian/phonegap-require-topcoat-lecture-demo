define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),

        heros = [
            {"id": 1, "firstName": "Eddard", "lastName": "Stark", "superiorId": 0, "superiorName": "", "reports": 4, "title": "Lord of Winterfell", "origin": "Winterfell", "cellPhone": "617-000-0001", "officePhone": "781-000-0001", "email": "eddard@cmp.uea.ac.uk", "city": "Winterfell, Westeros", "pic": "Eddard_Stark.jpg", "twitterId": "@rjal", "blog": "http://rjal.org"},
            {"id": 2, "firstName": "Daenerys", "lastName": "Targaryen", "superiorId": 0, "superiorName": "Herself", "reports": 0, "title": "Mother of Dragons", "origin": "King's Landing", "cellPhone": "617-000-0002", "officePhone": "781-000-0002", "email": "Daenerys@fakemail.com", "city": "King's Landing, Westeros", "pic": "Daenerys_Targaryen.jpg", "twitterId": "@daenerys", "blog": "http://daenerys.org"},
            {"id": 3, "firstName": "Joffrey", "lastName": "Baratheon", "superiorId": 0, "superiorName": "Cersey Lannister", "reports": 0, "title": "Lord of the Seven Kingdoms", "origin": "King's Landing", "cellPhone": "617-000-0003", "officePhone": "781-000-0003", "email": "Jeoffrey@fakemail.com", "city": "Boston, MA", "pic": "Joffrey_Baratheon.jpg", "twitterId": "@Jeoffrey", "blog": "http://JeoffreyBaratheon.org"},
            {"id": 4, "firstName": "Arya", "lastName": "Stark", "superiorId": 1, "superiorName": "Ned Stark", "reports": 3, "title": "Princess", "origin": "Winterfell", "cellPhone": "617-000-0004", "officePhone": "781-000-0004", "email": "AryaStark@fakemail.com", "city": "Winterfell", "pic": "Arya_Stark.png", "twitterId": "@fakearya", "blog": "http://AryaStark.org"},
            {"id": 5, "firstName": "Tyrion", "lastName": "Lannister", "superiorId": 8, "superiorName": "Tywin Lannister", "reports": 2, "title": "Hand of the King", "origin": "Casterly Rock", "cellPhone": "617-000-0005", "officePhone": "781-000-0005", "email": "Tyrion@fakemail.com", "city": "Casterly Rock", "pic": "Tyrion_Lannister.png", "twitterId": "@fakertyrion", "blog": "http://Tyrion.org"},
            {"id": 6, "firstName": "Drogo", "lastName": "", "superiorId": 0, "superiorName": "Himself", "reports": 0, "title": "Khal", "origin": "Dothrak", "cellPhone": "617-000-0006", "officePhone": "781-000-0006", "email": "Drogo@fakemail.com", "city": "Dothrak, Dothraki Sea", "pic": "Drogo_.jpg", "twitterId": "@fakepdrogo", "blog": "http://Drogo.org"},
            {"id": 7, "firstName": "Jamie", "lastName": "Lannister", "superiorId": 8, "superiorName": "Tywin Lannister", "reports": 0, "title": "Kingslayer", "origin": "Casterly Rock", "cellPhone": "617-000-0007", "officePhone": "781-000-0007", "email": "pgates@fakemail.com", "city": "Boston, MA", "pic": "Jamie_Lannister.jpg", "twitterId": "@fakepgates", "blog": "http://coenraets.org"},
            {"id": 8, "firstName": "Tywin", "lastName": "Lannister", "superiorId": 0, "superiorName": "Himself", "reports": 0, "title": "Lord of Casterly Rock", "origin": "Casterly Rock", "cellPhone": "617-000-0008", "officePhone": "781-000-0008", "email": "tywin@fakemail.com", "city": "Casterly Rock, Westeros", "pic": "Tywin_Lannister.jpg", "twitterId": "@fakeltywin", "blog": "http://tywin.org"},
        ],

        findById = function (id) {
            var deferred = $.Deferred(),
                hero = null,
                l = heros.length,
                i;
            for (i = 0; i < l; i = i + 1) {
                if (heros[i].id === id) {
                    hero = heros[i];
                    break;
                }
            }
            deferred.resolve(hero);
            return deferred.promise();
        },

        findByName = function (searchKey) {
            var deferred = $.Deferred(),
                results = heros.filter(function (element) {
                    var fullName = element.firstName + " " + element.lastName;
                    return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
                });
            deferred.resolve(results);
            return deferred.promise();
        },

        findByManager = function (superiorId) {
            var deferred = $.Deferred(),
                results = heros.filter(function (element) {
                    return superiorId === element.superiorId;
                });
            deferred.resolve(results);
            return deferred.promise();
        },


        Hero = Backbone.Model.extend({

            initialize: function () {
                this.reports = new ReportsCollection();
                this.reports.parent = this;
            },

            sync: function (method, model, options) {
                if (method === "read") {
                    findById(parseInt(this.id)).done(function (data) {
                        options.success(data);
                    });
                }
            }

        }),

        HeroCollection = Backbone.Collection.extend({

            model: Hero,

            sync: function (method, model, options) {
                if (method === "read") {
                    findByName(options.data.name).done(function (data) {
                        options.success(data);
                    });
                }
            }

        }),

        ReportsCollection = Backbone.Collection.extend({

            model: Hero,

            sync: function (method, model, options) {
                if (method === "read") {
                    findByManager(this.parent.id).done(function (data) {
                        options.success(data);
                    });
                }
            }

        });

    return {
        Hero: Hero,
        HeroCollection: HeroCollection,
        ReportsCollection: ReportsCollection
    };

});