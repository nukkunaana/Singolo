$(function () { 	
	$(".activeCategory").slideDown(1500);

	var go_action = false;
	// при нажатии на категорию в портфолио, функция показывает соответствующее содержимое , при этом скрывая не нужное. Плюс, окно не выплывает наверх, а остается статично. Плюс, красим в зеленый название той категории в которой находимся.
	$("#select_categoryPortfolio a").click(function(event){
		event.preventDefault();
		// действует анимация по сверствованию и открыванию ссылки в это время ничего не делается
		if (go_action == false) {
			// Если анимации нет, то мы можем позволить ей начать совершаться.
			// Если go_action имеет значение true, то ничего не делаем 
			go_action = true;
			var viewCat = $(this).attr("data-linkCategoryPortfolio");
			var category_container = $(".body_img[data-categoryPortfolio=" + viewCat+ "]");
			var active = $(".activeCategory");
			var category = $("#select_categoryPortfolio");
			// включай анимацию по сворачиванию и открыванию, если ты выбрал не текущую категорию
			if (!category_container.hasClass("activeCategory")) {
				category.addClass("opacity default_cursor");
				active.removeClass("activeCategory");
				category_container.addClass("activeCategory");
				active.slideUp(1500, function(){
					category_container.slideDown(1500, function(){
						// тут снова переменной задаем значение false, мол анимация закончилась и есть готовность начать ее, а не делать все параллельно
						go_action = false;
						category.removeClass("opacity default_cursor");
					});
					
				});

			}
			$("#select_categoryPortfolio a").removeClass("light_font");	
			$(this).addClass("light_font");
		}
	}); 
});
