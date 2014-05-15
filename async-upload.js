(function($) {

    var __guid = 0;

    var styleButton = function (element) {
        element.css('position', 'relative');
    }

    var createForm = function (element, iframe, formAction) {
        var form = $('<form/>', {
            'action': formAction,
            'target': iframe.attr('name'),
            'enctype': 'multipart/form-data',
            'method': 'POST'
        });

        form.css({
            'position': 'absolute',
            'left': '0',
            'top': '0',
            'width': '100%',
            'height': '100%',
        });

        element.append(form);

        return form;
    }

    var createIframe = function (element) {
        var iframe = $('<iframe/>', {
            'style': 'display: none',
            'name': 'async_upload_' + (__guid++),
        });

        element.append(iframe);

        return iframe;
    }

    var createInput = function (form, inputName, multiple) {
        var input = $('<input />', {
            'type': 'file',
            'name': inputName
        });

        if (multiple) {
            input.name += '[]';
            input.multiple = 'multiple';
        }

        input.css({
            'position': 'absolute',
            'left': '0',
            'top': '0',
            'width': '100%',
            'height': '100%',
            'opacity': '0',
            'filter': 'alpha(opacity=0)',
            'cursor': 'pointer'
        });

        form.append(input);

        return input;
    }

    var createParams = function (form, params) {
        for (key in params) {
            var input = $('<input />', {
                'name': key,
                'value': params[key],
                'type': 'hidden'
            });

            form.append(input);
        }
    }

    var bindEvents = function (element, input, iframe, start, done, pollingInterval) {
        input.on('change', function() {
            start.call(element);
            $(this).parent().submit();
        });

        window.setInterval(function() {
            var body = iframe.contents().find('body');
            if (body.children().length > 0) {
                var body = body.children().first();
            }

            var data = body.html();

            if (!data) {
                return;
            }

            var lastData = iframe.data('lastData');

            if (data && (data != lastData)) {
                console.log(element, data);
                done.call(element, data);
                iframe.data('lastData', data);
            }

        }, pollingInterval);
    }

    $.fn.asyncUpload = function(options) {

        return this.each(function() {
            var element = $(this);

            var defaults = {
                'inputName': 'file',
                'formAction': '/upload',
                'params': {},
                'multiple': false,
                'start': function() {},
                'done': function() {},
                'pollingInterval': 500
            };

            var data = {};
            for (key in defaults) {
                if (element.data(key)) {
                    data[key] = element.data(key);
                }
            }

            $.extend(defaults, options, data);
            options = defaults;

            styleButton(element);
            var iframe = createIframe(element);
            var form = createForm(element, iframe, options.formAction);
            var input = createInput(form, options.inputName, options.multiple);
            bindEvents(element, input, iframe, options.start, options.done, options.pollingInterval);
            createParams(form, options.params);
        });
    };
    
}(jQuery));
