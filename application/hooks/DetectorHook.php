<?php
class DetectorHook {
    protected $CI;
    private $root;

    function __construct() {
        $this->CI =& get_instance();
        $this->CI->load->library('user_agent');
        $this->root = base_url();
    }

    public function detector() {
    	if($this->CI->agent->is_mobile()) {
    		$this->CI->detector = 'mobile';
    	} else {
    		$this->CI->detector = 'pc';
    	}
    }
}
?>
