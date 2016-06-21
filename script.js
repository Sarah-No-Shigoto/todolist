$(document).ready(function(){

	// Avant de commencer, le chevron est caché
	$('.fa').hide();
   // Cacher le filtre
   $('.filter').hide();
   //I.1.Déclencher l'événement lorsqu'on appuie sur entrée
   $('#note').on('keydown', function(event) {
   	// I.2.Récupérer le texte dans le input et le stocker dans une variable
   	var whatToDo = $('#note').val();	
      if(event.which == 13) {
         event.preventDefault();
         // I.3.Vérifier que la ligne n'est pas vide
         if (whatToDo != '') {
            // I.4.Ecrire le texte dans la div 'list'
            $('#list').append('<p class="todo"><input type="checkbox" id="done" class="done"><span class="task">' + whatToDo + '</span><i class="fa fa-times"></i></p>');
            // I.5.Vider l'input
            $('#note').val('');  
            // I.6.Ajouter le chevron pour tout sélectionner/déselectionner en une seule fois   
            $('.fa').show();
            // I.7.Faire apparaitre le filtre
            $('.filter').show();
            // I.8.Appeler la fonction compteur pour incrémenter
            countingTask();   
         }   
      }	
   });

   // II.1.Rayer un élément lorsqu'on clique dessus et le remettre 
   $(document).on('click', 'input[type=checkbox]', function() {
   	$(this).siblings('.task').toggleClass('checked');
      // II.2.Définir l'état des checkboxes
      $(this).prop('checked'); 
      console.log($(this).prop('checked'));
      // I.7.Appeler la fonction compteur pour incrémenter ou décrémenter
      countingTask();   
   });

   // III.1.Rayer tous les éléments en cliquant sur le chevron
   $('.fa-chevron-down').on('click', function() {
      $('.task').toggleClass('checked');   
      // III.2.Appeler la fonction qui gère les checkboxes
      checkboxToggle();
      // III.3.Appeler la fonction compteur pour incrémenter ou décrémenter
      countingTask(); 
   });

   // IV.1. L'icône fa-times apparait au moment du hover
   $(document).on('mouseenter mouseleave', '.todo', function() {
      $(this).children('.fa-times').toggleClass('fa-times-visible');
   });

   // IV.2.Supprimer un élément grâce à l'icône fa-times
   $(document).on('click', '.fa-times', function() {
      $(this).parent().remove();  
      // IV.3.Appeler la fonction compteur pour décrémenter
      countingTask(); 
   });

   // V.Modifier les tâches grâce au double-click
   $(document).on('dblclick', '.task', function() {
      $(this).replaceWith('<input type="text" class="newFill" value="">');
      // V.1.Valider la modification
      $(document).on('keydown', '.newFill', function(event) {
         if (event.which == 13) {
            event.preventDefault();
            // V.2.Sauvegarder le texte dans une variable
            var newTask = $(this).val();
            // V.3.Supprimer la ligne si elle est vide
            if (newTask == '') {
               $(this).parent().remove();
               countingTask();
            }
            else {
               // V.4.Sinon afficher le texte dans la liste
               $('.newFill').replaceWith('<span class="task">' + newTask + '</span>');
            }
         };
      })
   });

   // VI.Créer une fonction pour compter les éléments
   var countingTask = function() {
      // VI.1.Récupérer le nombre d'éléments dans une variable
      var number = $('input[type=checkbox]:not(:checked)').length;
      console.log(number);
      // VI.2.Prendre en compte l'orthographe
      if (number > 1) {
         $('.n').text(number + " éléments");   
      }
      else {
         $('.n').text(number + " élément");
      }
   };

   // VII.Créer une fonction pour gérer l'état des checkboxes
   var checkboxToggle = function() {
      // VII.1.Récupérer le nombre d'éléments dans une variable
      var number = $('input[type=checkbox]:not(:checked)').length;
      $('input[type="checkbox"]').each(function () {
         if ($(this).is(':checked')) {
            // VII.2.Considérer les tâches déjà effectuées
            if (number > 0) {
               $(this).prop('checked', true)
            }
            else {
               $(this).prop('checked', false);
            }   
         }
         else {
            $(this).prop('checked', true);
         }
      });
      return false;
   };  

   // VIII.Créer une fonction pour barrer les tâches à effectuer    
});