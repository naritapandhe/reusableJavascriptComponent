# reusableJavascriptComponent
A reusable form component.

This component promotes following functionalities:
 - The initial state of the component should be an empty input box and an ADD button.
 - If the user enters text to the input box, clicking ADD should add that text to a list.
 - There should be a way to delete a list element.
 - On form submit, the list elements are submitted as a json.

Inorder to use this element on your page, follow the below steps:
- Add the below html on your page:
	  <section class="demo-section-1">
        <button id="reusableComponentButtons">Show me the component</button>
      </section>

      <section class="demo-section" id="reusableComponentForm">
      </section>

- For the functionality to work, add the below javascript in your page too: 
	(function() {

    var sa = new ReusableForm({
              wrapper : document.getElementById("reusableComponentForm"),
              type : "default",
              });

    window.onclick = function (e) {
        e.preventDefault();
        if (e.target.className == 'reusableComponentData-deleteElement') {
            sa.deleteElement(e);
        }
    }

    // cache vars
    var btn_reusableComponent = document.getElementById("reusableComponentButtons");
   
   // show default
    btn_reusableComponent.addEventListener( "click", function(e) {
      e.preventDefault();
      sa.show();
    });

  })();

- Once you load the page, click on the button which says, "Show me the component" to perform all the actions.
	