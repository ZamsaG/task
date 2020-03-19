window.jQuery = window.$ = require('jquery');
require('bootstrap');
require('jgrowl')();

var Message = {
    initialize: function () {
        Message.close = function () {
            $.jGrowl('close');
        };
        Message.show = function (message, options) {
            if (message != '') {
                $.jGrowl(message, options);
            }
        }
    },
    success: function (message) {
        Message.show(message, {
            theme: 'jGrowl-message-success',
            sticky: false
        });
    },
    error: function (message) {
        Message.show(message, {
            theme: 'jGrowl-message-error',
            sticky: false
        });
    },
    info: function (message) {
        Message.show(message, {
            theme: 'jGrowl-message-info',
            sticky: false
        });
    }
};

$(document).ready(function () {
    Message.initialize();
    $(".ajax_form").submit(function (e) {
        e.preventDefault();
        $form = $(this);
        var formData = $form.serializeArray();
        formData.push({
            name: 'ajax',
            value: $form.data('action')
        });

        $.ajax({
            type: 'post',
            data: formData,
            dataType: 'json',
            beforeSend: function () {
                $form.find('input,textarea,button').prop('disabled', true).removeClass('is-invalid');
            },
            success: function(response){
                var $modal = $form.closest('.modal');
                if(response.data && response.data.redirect){
                    window.location.href = response.data.redirect;
                }
                if(!response.success){
                    $form.find('input,textarea,button').prop('disabled', false).removeClass('is-invalid');
                    for (var key in response.data) {
                        if (!response.data.hasOwnProperty(key))
                            continue;

                        var $input = $form.find('[name="' + key + '"]');
                        if($input.length > 0) {
                            var $message = $input.next('.invalid-feedback');
                            $input.addClass('is-invalid');
                            $message.text(response.data[key])
                        } else {
                            Message.error(response.data[key])
                        }
                    }
                    if(response.message) {
                        Message.error(response.message)
                    } else {
                        Message.error('В форме содержатся ошибки')
                    }
                } else {
                    $form.find('input,textarea,button').prop('disabled', false).removeClass('is-invalid');
                    if($modal.length > 0) {
                        $modal.modal('hide').find('form').get(0).reset();
                    }
                    if(response.message) {
                        Message.success(response.message)
                    }
                    if(response.data && response.data.redirect){
                        window.location.href = response.data.redirect;
                    }
                    getTasks($form.attr('action'));
                }
            },
            complete: function () {
                $form.find('input,textarea,button').prop('disabled', false);
            }
        });
        return false;
    });

    $('body').on('click', '.table-sort, .page-link', function (e) {
        e.preventDefault();
        url = $(this).attr('href');
        getTasks(url);
        return false;
    }).on('click', '[data-toggle="modal-edit"]', function () {
        var $this = $(this);
        var $target = $($this.data('target'));
        var id = $this.data('id');
        var complete = $this.data('complete');
        var $taskParent = $('#task-' + id);
        var text = $taskParent.find('.task-text').text();
        $target.find('[name="id"]').val(id);
        $target.find('[name="complete"]').prop('checked', parseInt(complete) === 1);
        $target.find('[name="text"]').val(text);
        $target.modal('show');
    });

    function getTasks(url) {
        $(".form-update").attr('action', url);
        $.ajax({
            url: url||'',
            type: 'post',
            data: {ajax: 'task/all'},
            dataType: 'json',
            beforeSend: function () {
            },
            success: function(response){
                if(response.data && response.data.redirect){
                    window.location.href = response.data.redirect;
                }
                $("#tasks").html($(response.data.html).find('#tasks').html());
            },
            complete: function () {
            }
        });
    }
});
