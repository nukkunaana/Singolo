// при нажатии на категорию в навигационном меню, подводит экран к абзацу
$(function() {
	$(".nav li").click(function(e) {
		e.preventDefault();
		$('body,html').animate({scrollTop: $($(this).attr('data-category')).offset().top - 70}, "slow");
	});
}); 
