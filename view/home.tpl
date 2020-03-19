{extends 'main.tpl'}
{block content}
    {include 'partials/tasks.table.tpl'}
    <div class="text-right">
        <button class="btn btn-primary" data-toggle="modal" data-target="#modalTask">Добавить задачу</button>
    </div>
    <div class="modal fade" id="modalTask" tabindex="-1">
        <div class="modal-dialog">
            <form class="ajax_form" method="post" data-action="task/add">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalTaskLabel">Добавить задачу</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <input type="text" class="form-control" value="" name="name" placeholder="Имя"/>
                            <div class="invalid-feedback">
                                Укажите Ваше имя
                            </div>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" value="" name="email" placeholder="Email"/>
                            <div class="invalid-feedback">
                                Укажите правильный email
                            </div>
                        </div>
                        <div class="form-group">
                            <textarea name="text" class="form-control" placeholder="Опишите задачу"></textarea>
                            <div class="invalid-feedback">
                                Введите текст задачи
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary" >Добавить</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
{/block}