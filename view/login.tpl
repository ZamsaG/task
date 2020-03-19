{extends 'main.tpl'}
{block content}
    <h1>Авторизация</h1>
    <div class="row">
        <div class="col-md-8 col-lg-6">
            <form class="ajax_form" method="post" data-action="login">
                <div class="form-group">
                    <input type="text" class="form-control" value="" name="login" placeholder="Догин"/>
                    <div class="invalid-feedback">

                    </div>
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" value="" name="password" placeholder="Пароль"/>
                    <div class="invalid-feedback">

                    </div>
                </div>
                <div class="text-right">
                    <button class="btn btn-primary">Войти</button>
                </div>
            </form>
        </div>
    </div>
{/block}