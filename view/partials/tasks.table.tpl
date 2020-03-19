<div>
    <div id="tasks" class="mt-5 mb-5">
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><a href="/{$controller}?page={$page}&sort=username&dir={if $dir == "DESC"}ASC{else}DESC{/if}" class="table-sort">Имя</a></th>
                    <th><a href="/{$controller}?page={$page}&sort=email&dir={if $dir == "DESC"}ASC{else}DESC{/if}" class="table-sort">Email</a></th>
                    <th>Текст</th>
                    <th><a href="/{$controller}?page={$page}&sort=complete&dir={if $dir == "DESC"}ASC{else}DESC{/if}" class="table-sort">Статус</a></th>
                    <th><a href="/{$controller}?page={$page}&sort=id&dir={if $dir == "DESC"}ASC{else}DESC{/if}" class="table-sort">Дата создания</a></th>
                    {if $authorised && $controller == 'admin'}
                        <th>Действия</th>
                    {/if}
                </tr>
                </thead>
                <tbody>
                {if $tasks}
                    {foreach $tasks as $task}
                        <tr id="task-{$task->id}">
                            <td>{$task->username|escape}</td>
                            <td>{$task->email|escape}</td>
                            <td>{$task->text|escape}</td>
                            <td>
                                {if $task->complete}Выполнен{else}Не выполнен{/if}{if $task->edited}, отредактировано администратором{/if}
                            </td>
                            <td>{$task->createdon|strtotime|date_format:"d.m.Y H:i"}</td>
                            {if $authorised && $controller == 'admin'}
                                <td>
                                    <div class="task-text d-none">{$task->text}</div>
                                    <button class="btn btn-danger btn-sm" data-toggle="modal-edit" data-id="{$task->id}" data-complete="{$task->complete}" data-target="#modalTask">Изменить</button>
                                </td>
                            {/if}
                        </tr>
                    {/foreach}
                {else}
                    <tr>
                        <td colspan="{if $authorised && $controller == 'admin'}6{else}5{/if}">Ничего нет</td>
                    </tr>
                {/if}
                </tbody>
            </table>
        </div>
        <nav>
            <ul class="pagination">
                {$pages = ($total / 3)|ceil}
                {if $pages > 1}
                {for $i = 1; $i <= $pages; $i++}
                    <li class="page-item{if $page == $i} active{/if}"><a class="page-link" href="/{$controller}?page={$i}&sort={$sort}&dir={$dir}">{$i}</a></li>
                {/for}
                {/if}
            </ul>
        </nav>
    </div>
</div>