<!DOCTYPE html>
<html lang="ru">
<head>
    <base href="/"/>
    <title>{$title|escape}</title>

    {* Метатеги *}
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="description" content="" />
    <meta name="keywords"    content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <link href="/assets/build/css/main.css" rel="stylesheet" type="text/css"/>
    <script src="/assets/build/js/main.js"  type="text/javascript"></script>
</head>
<body>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">Задачи</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item {if $controller == 'home'}active{/if}">
                        <a class="nav-link" href="/">Главная</a>
                    </li>
                    {if $authorised}
                        <li class="nav-item {if $controller == 'admin'}active{/if}">
                            <a class="nav-link" href="/login">Админ-ранель</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/logout">Выход</a>
                        </li>
                    {else}
                        <li class="nav-item {if $controller == 'login'}active{/if}">
                            <a class="nav-link" href="/login">Вход</a>
                        </li>
                    {/if}
                </ul>
            </div>
        </nav>
        {block content}{/block}
    </div>
</body>
</html>