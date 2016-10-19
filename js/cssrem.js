/* 
* @Author: anchen
* @Date:   2016-10-13 16:23:38
* @Last Modified by:   anchen
* @Last Modified time: 2016-10-13 16:24:05
*/

//rem布局
(function(){
    function change(){
        document.documentElement.style.fontSize=document.documentElement.clientWidth/375*50+'px';   
    }
    change();
    
    window.addEventListener('resize',change,false);
})();