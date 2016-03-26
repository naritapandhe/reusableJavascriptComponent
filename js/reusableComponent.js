/**
 * Reusable Component
 *
 * This component promotes following functionalities:
 * The initial state of the component should be an empty input box and an ADD button.
 * If the user enters text to the input box, clicking ADD should add that text to a list.
 * There should be a way to delete a list element.
 * On form submit, the list elements should be submitted as an array.
 *
 *
 */

;( function( window ) {

  'use strict';

  /**
   * Extend obj function
   *
   * This is an object extender function. It allows us to extend an object
   * by passing in additional variables and overwriting the defaults.
   */
  function extend( a, b ) {
    for( var key in b ) { 
      if( b.hasOwnProperty( key ) ) {
        a[key] = b[key];
      }
    }
    return a;
  }

  
  /**
   * ReusableForm
   *
   * @param {Object} options - The options object
   */
  function ReusableForm( options ) {
    this.options = extend( {}, this.options );
    extend( this.options, options );
    this._init();
  }

  /**
   * ReusableForm
   *
   * @param {Object} options - The options object
   */
  function ReusableForm( options ) {
    this.options = extend( {}, this.options );
    extend( this.options, options );
    this._init();
  }

  /**
   * ReusableForm options Object
   *
   * @param {string} wrapper - The wrapper to append alerts to.
   * @param {string} type - The type of alert.
   */
  ReusableForm.prototype.options = {
    wrapper : document.body,
    type : "default",
    tableRowCount : 2
  }

  /**
   * ReusableForm _init
   *
   * This is the initializer function. It builds the HTML and gets the component
   * ready for showing.
   */
  ReusableForm.prototype._init = function() {
    // create element
    this.sa = document.createElement('div');
    this.sa.className = 'simple-reusableComponent' + this.options.type;

    var strinner = '';
    strinner += '<br/><div id="inputElements">'
                +'<input type="text" id="inputBox"> &nbsp;'
                +'<button id="appendInputToList">Add to list</button>'
                +'</div><br />';
    strinner += '<br/>'
                +'<div id="listElements">'
                +'<form id="listElementsForm">'
                +'<table style="width:65%;" id="inputList">'
                +'  <thead>'
                +'    <tr>'
                +'      <th>#</th>'
                +'      <th>Input</th>'
                +'      <th>Operation</th>'
                +'    </tr>'
                +'    <tr class="noTableDataSpan">'
                +'      <td> No data.</td>'
                +'      <td> No data.</td>'
                +'      <td> No data.</td>'
                +'    </tr>'
                +'  </thead>'
                +'  <tbody>'
                +'  </tbody>'
                +'  </table><br/>'
                +'  <input type="button" value="Submit List" id="formSubmitButton" />'
                +'  </div></form><br/>';            
    this.sa.innerHTML = strinner;

    // run the events
    this._events();
  };

  /**
   * ReusableForm _events
   *
   * This is our events function, and its sole purpose is to listen for
   * any events inside our Simple Alert.
   */
  ReusableForm.prototype._events = function() {
    // cache vars
    var btn_add = this.sa.querySelector('#appendInputToList'),
        self = this;    

    // listen for add
    btn_add.addEventListener( "click", function(e) {
      e.preventDefault();
      var inputString=document.getElementById("inputBox").value;
      self.addInputToList(inputString);
      document.getElementById("inputBox").value="";
    });


    var btn_dismiss= this.sa.querySelector('.reusableComponentData-dismiss');
    if(btn_dismiss){
        self = this;
        
        // listen for dismiss
        btn_dismiss.addEventListener( "click", function(e) {
          e.preventDefault();
          self.dismiss();
        });
      }

      var btn_formSubmit= this.sa.querySelector('#formSubmitButton');
      if(btn_formSubmit){
        self = this;
        
        // listen for dismiss
        btn_formSubmit.addEventListener( "click", function(e) {
          e.preventDefault();
          self.formSubmit();
        });
      }
  }    

  /**
   * ReusableForm show
   *
   * This function simply shows our Simple Alert by appending it
   * to the wrapper in question.
   */
  ReusableForm.prototype.show = function() {
    this.options.wrapper.appendChild(this.sa);
  }

  /**
   * ReusableForm dismiss
   *
   * This function simply hides our Simple Alert by removing it
   * from the wrapper in question.
   */
  ReusableForm.prototype.dismiss = function(e) {
    var rowCount = document.getElementById("inputList").getElementsByTagName("tr").length;
    this.options.tableRowCount--;
    var rowIndex=e.target.parentNode.parentNode.rowIndex;
    document.getElementById("inputList").deleteRow(rowIndex);
    
    var tr='';
    if(this.options.tableRowCount==2){
      var table = document.getElementById("inputList")
      var row = table.insertRow(this.options.tableRowCount-1);
      row.className="noTableDataSpan";
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      cell1.innerHTML = "No Data";
      cell2.innerHTML = "No Data";
      cell3.innerHTML = "No Data";
    }
   
  };

  /**
   * ReusableForm add
   *
   * This function simply shows our Simple Alert by appending it
   * to the wrapper in question.
   */
  ReusableForm.prototype.addInputToList = function(inputString) {
    var element=this.options.wrapper;
    var table = document.getElementById("inputList")
    var rows = document.getElementById("inputList").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
    var noData = document.getElementsByClassName("noTableDataSpan");
    if(noData.length > 0){
        noData[0].parentNode.removeChild(noData[0]);
    }
   
    var row = table.insertRow(this.options.tableRowCount-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var rowCount = this.options.tableRowCount-1;
    this.options.tableRowCount=this.options.tableRowCount+1;
    cell1.innerHTML = rowCount;
    cell2.innerHTML = inputString;
    cell3.innerHTML = '<a href="#" class="reusableComponentData-dismiss" id="tableRow_'+rowCount+'">Delete</a>';
    
  }

   ReusableForm.prototype.formSubmit = function(e) {
      if(this.options.tableRowCount>2){
        var jsonObj = [];
        var jsonString;
        var table = document.getElementById("inputList");
        for (var r = 1, n = table.rows.length; r < n; r++) {
            var item = {};
            for (var c = 0, m = table.rows[r].cells.length; c < m; c++){        
                  if(c==1){
                    item ["data"] =table.rows[r].cells[c].innerHTML;}
            }
            jsonObj.push(item);
        }
        jsonString = JSON.stringify(jsonObj);
        console.log(jsonString);

      }else if(this.options.tableRowCount<=2){
        console.log("You cannot submit an empty list!!");
      }
      
    
  }

  /**
   * Add to global namespace
   */
  window.ReusableForm = ReusableForm;

})( window );