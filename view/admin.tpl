{extends 'main.tpl'}
{block content}
    {include 'partials/tasks.table.tpl'}
    <div class="modal fade" id="modalTask" tabindex="-1">
        <div class="modal-dialog">
            <form action="/{$controller}?page={$page}&sort={$sort}&dir={$dir}" class="ajax_form form-update" method="post" data-action="task/update">
                <input type="hidden" name="id" value="">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalTaskLabel">Изменить задачу</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <textarea name="text" class="form-control" placeholder="Опишите задачу"></textarea>
                            <div class="invalid-feedback">
                                Введите текст задачи
                            </div>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" name="complete" value="1" id="complete">
                            <label class="form-check-label" for="complete">Выполнено</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary" >Сохранить</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
{/block}