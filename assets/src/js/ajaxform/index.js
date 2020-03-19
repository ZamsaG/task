console.log(1);
(function (window, document, $, AjaxFormObjectConfig) {
    var AjaxFormObject = AjaxFormObject || {};
    AjaxFormObjectConfig.callbacksObjectTemplate = function () {
        return {
            // return false to prevent send data
            before: [],
            response: {
                success: [],
                error: []
            },
            ajax: {
                done: [],
                fail: [],
                always: []
            }
        }
    };

    AjaxFormObject.ajaxProgress = false;
    AjaxFormObject.setup = function () {
        // selectors & $objects
        this.actionName = 'ajax_action';
        this.action = ':submit[name=' + this.actionName + ']';
        this.form = '.ajax_form';
        this.input = '.ajax_input';
        this.$doc = $(document);

        this.sendData = {
            $form: null,
            action: null,
            formData: null
        };

        this.timeout = 300;
    };
    AjaxFormObject.initialize = function () {
        AjaxFormObject.setup();
        // Indicator of active ajax request

        //noinspection JSUnresolvedFunction
        AjaxFormObject.$doc
            .ajaxStart(function () {
                AjaxFormObject.ajaxProgress = true;
            })
            .ajaxStop(function () {
                AjaxFormObject.ajaxProgress = false;
            })
            .on('submit', AjaxFormObject.form, function (e) {
                e.preventDefault();
                var $form = $(this);
                var action = $form.find(AjaxFormObject.action).val();

                if (action) {
                    var formData = $form.serializeArray();
                    formData.push({
                        name: AjaxFormObject.actionName,
                        value: action
                    });
                    AjaxFormObject.sendData = {
                        $form: $form,
                        action: action,
                        formData: formData
                    };
                    AjaxFormObject.controller();
                }
            })
            .on('click', AjaxFormObject.input, function (e) {
                e.preventDefault();
                var $input = $(this);
                var action = $input.data('action');

                if (action) {
                    var formData = [];
                    try {
                        var data = $input.data('info');
                        for (var name in data){
                            if(data.hasOwnProperty(name)){
                                formData.push({
                                    name: name,
                                    value: data[name]
                                });
                            }
                        }
                    } catch (e) {
                    }

                    formData.push({
                        name: AjaxFormObject.actionName,
                        value: action
                    });

                    AjaxFormObject.sendData = {
                        $form: $input,
                        action: action,
                        formData: formData
                    };

                    AjaxFormObject.controller();
                }
            });

        for (var obj in AjaxFormObject){
            if(AjaxFormObject.hasOwnProperty(obj) && typeof AjaxFormObject[obj] === 'object'){
                if(typeof AjaxFormObject[obj].initialize === 'function'){
                    AjaxFormObject[obj].initialize();
                }
            }
        }
    };

    AjaxFormObject.controller = function () {
        var self = this;
        var action = self.sendData.action.split('/');
        var objectName = action[0].charAt(0).toUpperCase() + action[0].slice(1);
        var method = action[1];

        var object = AjaxFormObject[objectName];
        if(typeof object === 'object' && typeof object[method] === 'function'){
            object[method]();
        }
    };

    AjaxFormObject.send = function (data, callbacks) {
        var runCallback = function (callback, bind) {
            if (typeof callback == 'function') {
                return callback.apply(bind, Array.prototype.slice.call(arguments, 2));
            }
            else if (typeof callback == 'object') {
                for (var i in callback) {
                    if (callback.hasOwnProperty(i)) {
                        var response = callback[i].apply(bind, Array.prototype.slice.call(arguments, 2));
                        if (response === false) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };

        // set action url
        var formActionUrl = (AjaxFormObject.sendData.$form)
            ? AjaxFormObject.sendData.$form.attr('action')
            : false;
        var url = (formActionUrl)
            ? formActionUrl
            : (AjaxFormObjectConfig.actionUrl)
                      ? AjaxFormObjectConfig.actionUrl
                      : document.location.href;
        // set request method
        var formMethod = (AjaxFormObject.sendData.$form)
            ? AjaxFormObject.sendData.$form.attr('method')
            : false;
        var method = (formMethod)
            ? formMethod
            : 'post';

        // callback before
        if (runCallback(callbacks.before) === false) {
            return;
        }
        // send
        var xhr = function (callbacks) {
            return $[method](url, data, function (response) {
                if (response.success) {
                    if (response.message) {
                        AjaxFormObject.Message.success(response.message);
                    }
                    runCallback(callbacks.response.success, AjaxFormObject, response);
                }
                else {
                    AjaxFormObject.Message.error(response.message);
                    runCallback(callbacks.response.error, AjaxFormObject, response);
                }
            }, 'json').done(function () {
                runCallback(callbacks.ajax.done, AjaxFormObject, xhr);
            }).fail(function () {
                runCallback(callbacks.ajax.fail, AjaxFormObject, xhr);
            }).always(function () {
                runCallback(callbacks.ajax.always, AjaxFormObject, xhr);
            });
        }(callbacks);
    };

    require('./task')(AjaxFormObjectConfig, AjaxFormObject);
    require('./message')(AjaxFormObjectConfig, AjaxFormObject);
    require('./utils')(AjaxFormObjectConfig, AjaxFormObject);

    $(document).ready(function ($) {
        AjaxFormObject.initialize();
        var html = $('html');
        html.removeClass('no-js');
        if (!html.hasClass('js')) {
            html.addClass('js');
        }
    });

    window.AjaxFormObject = AjaxFormObject;
})(window, document, jQuery, {});
