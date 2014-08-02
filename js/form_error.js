$(function() {
  // при изменении содержания input, в форме обратной связи, запускает валидацию
  $(".name_container input").change(validate.controls.name);
  $(".email_container input").change(validate.controls.email);
  $(".comment_container input").change(validate.controls.comment);
  // при клике на кнопку "Send" если все верно заполнено, то имитирует отправку форм.
  $("#addPersonButton").click(function(event){
    event.preventDefault();
    if(validate.all()){
      alert( "Form is valid. Thanks for submitting comment!");
    }
  });
}); 
   
// объект выполняющий валидацию
var validate = (function(){
  // объект выполняющий валидацию email
  var _regex = {
    // метод выполняющий валидацию email
    // получает email и проверяет его валидность
    // @param emailAddress [String] email для проверки
    // @return [Boolean]
    emailAddressIsValid: function(emailAddress){
      // регулярное выражение валидного email
      // http://stackoverflow.com/questions/2855865/jquery-validate-e-mail-address-regex
      var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);

      return pattern.test(emailAddress);
    }
  };

  // объект выпоняющий валидацию всех input
  // вызывается при клике на кнопку "Send"
  var all = function(){
    var invalidControls = [];
    // Запускает каждый метод валидации
    for(var controlValidationMethod in validate.controls){
      var $currentInput = $("#" + controlValidationMethod);
      var currentMethod = validate.controls[controlValidationMethod];
      // Если валидация не прошла, то записываем в массив название метода валидации
      if(!currentMethod.call($currentInput)){
        invalidControls.push(controlValidationMethod);
      }
    }

    if(invalidControls.length > 0){
      // Set focus on the first erroneous control
      $("#" + invalidControls[0]).focus();
    }
    return invalidControls.length == 0;
  };

  // Объект выполняющий валидацию инпутов
  var controls = {
    // Метод валидирующий имя
    name: function(){
      var $input = $(this);
      var isValid = true;
      var $errorNameText = $('.name_container p');

      // Если поле с именем пустое
      if($input.val() == ""){
        $errorNameText.text('Please enter a name.');
        $errorNameText.show();
        isValid = false;
      }
      else if($input.val().length > 25){
        $errorNameText.text('Name cannot be greater than 25 characters long.');
        $errorNameText.show();
        isValid = false;
      }
      else {
        // Valid, remove any existing form error message for this input
        $('.error').text('').hide();
      }

      return isValid;
    },

    // Метод валидирующий имейл
    email: function(){
      var $input = $(this);
      var isValid = true;
      var $errorEmailText = $('.email_container p');

      if($input.val() == ""){
        $errorEmailText.text('Please enter an email address.');
        $errorEmailText.show();
        isValid = false;
      }
      else if(!_regex.emailAddressIsValid($input.val())){
        $errorEmailText.text('Please enter a valid email address; name@example.com');
        $errorEmailText.show();
        isValid = false;
      }
      else{
        // Valid, remove any existing form error message for this input
        $('.error').hide();
      }
        
      return isValid;
    },
     
    // Метод валидирующий коммент
    comment: function(){
      var $input = $(this);
      var isValid = true;
      var $errorCommentText = $('.comment_container p');

      if($input.val() == ""){
        $errorCommentText.text('Please write comment.');
        $errorCommentText.show();
        isValid = false;
      }
      else{
        $('.error').hide();
      }
          
      return isValid;
    },
  };
  return {
    // Позволяет обращаться к этим объектам 
     "all": all,
     "controls": controls};
})();