module.exports = (function (AjaxFormObjectConfig, AjaxFormObject) {
    AjaxFormObject.Task = {
        callbacks: {
            send: AjaxFormObjectConfig.callbacksObjectTemplate(),
        },
        setup: function () {
            AjaxFormObject.Task.modal = '#modalTask';
        },
        initialize: function () {
            AjaxFormObject.Task.setup();
        },
        send: function () {
            var callbacks = AjaxFormObject.Task.callbacks;
            callbacks.send.before = function () {
                $(AjaxFormObject.Task.modal).find('input,textarea,button').prop('disabled', true).removeClass('is-invalid');
            };
            callbacks.send.response.success = function (response) {
                var modal = $(AjaxFormObject.Task.modal);
                modal.find('input,textarea,button').prop('disabled', false).removeClass('is-invalid');
                modal.modal('hide').find('form').get(0).reset();
            };
            callbacks.send.response.error = function (response) {
                var modal = $(AjaxFormObject.Task.modal);
                modal.find('input,textarea,button').prop('disabled', false).removeClass('is-invalid');
                modal.find('.invalid-feedback').remove();
                for (var key in response.data) {
                    if (!response.data.hasOwnProperty(key))
                        continue;

                    var input = modal.find('[name="' + key + '"]');

                    input.addClass('is-invalid');
                }
            };
            AjaxFormObject.send(AjaxFormObject.sendData.formData, AjaxFormObject.Task.callbacks.send);
        }
    };
});
