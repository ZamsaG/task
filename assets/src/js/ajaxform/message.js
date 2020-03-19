module.exports = (function (AjaxFormObjectConfig, AjaxFormObject) {
    AjaxFormObject.Message = {
        initialize: function () {
            $.jGrowl.defaults.closerTemplate = '<div>[ ' + AjaxFormObjectConfig.close_all_message + ' ]</div>';
            AjaxFormObject.Message.close = function () {
                $.jGrowl('close');
            };
            AjaxFormObject.Message.show = function (message, options) {
                if (message != '') {
                    $.jGrowl(message, options);
                }
            }
        },
        success: function (message) {
            AjaxFormObject.Message.show(message, {
                theme: 'jGrowl-message-success',
                sticky: false
            });
        },
        error: function (message) {
            AjaxFormObject.Message.show(message, {
                theme: 'jGrowl-message-error',
                sticky: false
            });
        },
        info: function (message) {
            AjaxFormObject.Message.show(message, {
                theme: 'jGrowl-message-info',
                sticky: false
            });
        }
    };
});
