
!function ($) {

    $(function(){



        $('[href^=#]').click(function (e) {
            e.preventDefault();
        });

        $("[data-toggle='tooltip']").tooltip();

        $('.fancybox').fancybox({ helpers : { title : true } });

        $('.btn-group #day').each(function(){
            $(this).prop('checked',!$(this).prop('checked'));
            $(this).parents('label').toggleClass('active');
        });

        $( '#calc-form' ).submit(function(event) {
            event.preventDefault();
            var form = $(this);
            var data = form.serialize();
            $.get( "/calc", data, function( answer ) {
                $('input[name=display]').val(answer);
            });
        });

        $('form[name="form-edit-service"]').submit(function(e) {
            e.preventDefault();

            var $form = $(this);
            var id = $form.attr('id');
            var url = $form.attr('action');
            var data = {};
            data.title = $(tinymce.get("title").getContent()).text();
            data.subtitle = $(tinymce.get("subtitle").getContent()).text();
            data.sideText = tinymce.get("sideText").getContent();
            data.mainText = tinymce.get("mainText").getContent();

            $.ajax({
                url: url + id,
                method: "POST",
                data: data,
                statusCode: {
                    200: function(message) {
                        $.bootstrapGrowl(message, { type:'success'});
                    },
                    500: function(message) {
                        $.bootstrapGrowl(message, { type:'danger'});
                    }
                }
            });
        });

        $('form[name="form-edit-article"]').submit(function(e) {
            e.preventDefault();

            var $form = $(this);
            var id = $form.attr('id');
            var url = $form.attr('action');

            var data = {};
            data.title = $(tinymce.get("title").getContent()).text();
            data.subtitle = $(tinymce.get("subtitle").getContent()).text();
            data.sideText = tinymce.get("sideText").getContent();
            data.mainText = tinymce.get("mainText").getContent();

            $.ajax({
                url: url + id,
                method: "POST",
                data: data,
                statusCode: {
                    200: function(message) {
                        $.bootstrapGrowl(message, { type:'success'});
                    },
                    500: function(message) {
                        $.bootstrapGrowl(message, { type:'danger'});
                    }
                }
            });
        });

        $("#callback-button").click(function() {
            var form = $(document.forms['callback-form']);

            $.ajax({
                url: "/callback",
                method: "POST",
                data: form.serialize(),
                statusCode: {
                    200: function() {
                        $('#callback-alert').removeClass('hidden');
                    },
                    500: function(jqXHR) {
                        location.reload();
                    }
                }
            });
        });

        tinymce.init({
            selector:'textarea',
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table contextmenu paste"
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
            content_css : "/css/style.css"
        });

        $('input[type=file]').bootstrapFileInput();


        $('p[id=date]').each(function(){
            var p = $(this);
            var format = moment(p.innerText).lang('ru').format('LL');
            $('#date').replaceWith("<p>" + format + "</p>");

        });

    });
}(window.jQuery);
