<?php

namespace Model;

use Smarty;

class View extends Api {
    /** @var Smarty $smarty */
    public $smarty;
    public function __construct()
    {
        $this->smarty = new Smarty();
        $this->smarty->template_dir = dirname(dirname(__FILE__)).'/view/';
    }

    /**
     * @param $var
     * @param $value
     */
    public function assign($var, $value = null){
        $this->smarty->assign($var, $value);
    }

    /**
     * @param string $template
     * @return string
     * @throws \SmartyException
     */
    public function fetch($template) {
        return $this->smarty->fetch($template);
    }
}