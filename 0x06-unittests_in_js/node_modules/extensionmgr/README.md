# ExtensionManager 	
	A tiny simple lightweight portable ExtensionManager for your libraries.

# Installation
		npm install extensionmgr;

# Features
	- produces simple,lightweight plugin style extensions
	- compatible with Nodejs and Browser use
	- easily manage extensions(create,remove) from host objects or from the Manager itself.
	- allows listing of dependencies that are required to be available on the object or manager.
	- provides a simple mechanisms for sharing dependencies from the manager to other objects.
	- provides proper transition of extensions onto other objects through 'give' method and ensures all
		listed dependencies are also moved to object.
	
# Methods
	- create: takes 3 arguments: 
			@name: the name the extension will be attached with and the name to be looked for if used as dependency
			@ext: the function that returns an object ,to be used as the extension.
			@dependency: an array of names,objects for dependencies that the object must have or the manager must have when
				extending,names must match the extensions respective @name of each dependency
			@overwrite: a boolean to decide if to overwrite the extension if it already exists;
			
	- remove: takes one argument
			@name: of an extension to be discard if using the manager directly or from an object being extended
	
	- give: takes major 2 arguments and 0 or more extra arguments
			@overwrite: a boolean to overwrite the object to be given the extension if it already exists
			@object: the object we wish to give the extensions to
			@args( Strings,/*remaining arguments passed*/): must be names of available extensions in the manager to 
			give to @object if you wish to be specific,if no not supplied,all extensions will be given to @object
				
				
# Basics Things to Note
	- ExtensionManager is nothing more than just a standard way of extending a specific object,so pick
	which you wish,to either do it manually or using this manager,but it does come with benefits that you can have a 
	central location for all extensions and simple give and remove extensions from different objects with a added 
	benefit of a simple dependency system(very simple system).Basicly if you need a standard way of moving and breaking
	down a big app into modular parts,the extensionmanager helps you with this(basicly add the pieces except the core
	as extensions and loaded specific or all extensions needed).
	
	- ExtensionManager is created to be very simple and lightweight and takes a jquery plugin style
	approach,it uses a very simple approach for dependencies,where it checks the object to be extended
	or the manager for the dependency,order is crucial when listing dependencies.
	
	- All extensions added/created using the extension manager have a signature attribute,a simple basic string
	that dictates if any object in a parent object is a valid extension,its the means to which ExtensionManager
	knows what to touch and what to not touch.it is added automaticlly added when you create an extension through
	the 'create' method of ExtensionManager.
	
	- ExtensionManager takes two approach in that it lets you supply it an object where extensions will be added to,
	can be removed from and can be taken from to give another object and the other is when not supplied such an object
	holds all extensions to itself.
	
	- ExtensionManager has strict meta-data rules,one which was taken under heavy consideration was the need to ensure
	license information,one @DailyJs complains about alot,so we require that the following meta-data must at least be
	available on every extensions
	
		- author: String  	  ### Provide a the authors Name;
		- version: String 	  ### must provide a suitable version number;
		- lisenses: Array 	  ### an array of licenses allowed with the extension eg [{ type:"mit", url:"http://.."}]
		- description: String ### a description of the extension
	


# Todos
	- add in an automated dependency checker and mover when given specific extension who have specific
		dependencies(i.e when you giving out an extension from the manager itself,you must give out also
		its corresponding dependency). => Implemented as of Monday 24th September, 2012: 8:12pm
		
	- bring in a dependency manager to retrieve dependency through ajax or located local file when 
		dependency are not found in the manager or on the object to extend
	
		
# Examples
	'''
		In Node:
			//option for when desiring to use extensions
			var extmgr = require("extensionmgr");
			
			//two approaches
			//add extensions to extmanager itself
			var manager = extmgr();
			managere.create("Name of extension", function(){ 
				/*must return an object containing meta data and its methods*/
			},
			[/*array list of dependencies*/],boolean /* to decide to overwrite a extension if it already exits*/);
			 
			//add it to a object
			var Library = {};
			extmgr(Library)..create("Name of extension", function(){ 
				/*must return an object containing meta data and its methods*/
			},
			[/*array list of dependencies*/],boolean /* to decide to overwrite a extension if it already exits*/);
			
			//for a live examples,look at Stub: https://github.com/influx6/Stub,it uses the ExtensionManager to 
			//break things down and be more modular and provide more choice on what you need without having to load up a 
			//massive library 		
			
			var Stubs = require('stub').Stubs;
			var Manager = require('extensionmgr')(Stubs); //instantiating the function return with an object,automatically
														  // sets all extension using manager will be added,remove to Stubs
			
			//all stubs extensions are located in a folder called extenions,feel free to organised as it suits you,to
			//use any specific extension simple require it in,pass in the Manager as argument to the function returned 
			//and see Stubs extended with a new functionality piece.
			
			require('./extensions/stub.su')(Manager);
			require('./extensions/stub.callbacks')(Manager);
			require('./extensions/stub.events')(Manager);

			
		In Browser: simple include the scripts as needed
				
				....
				<script src="paths to../extmgr.min.js"></script>
				<script>
				   //toways to do things,create a standard reference to the extension manager
				  //a nice way of caching created extensions onto a clean object
					
				   var extmgr = ExtensionManager();
					
				   //use the ExtensionManager directly,all functions will work,but you loose having the ability
				   //to cache extensions,all extensions will be taking directly from the object supplied
				   //eg ExtensionManager(Pluto); now the extension manager will directly extend,remove or give from
				  //pluto
				
				   var Pluto = {};
				  // extensions will be added directly to pluto,not to the manager
		
				   ExtensionManager(Pluto).create("Actions",function(/*dependencies*/){
					
						/* returns an object containing metadata and its functions*/
						
				   },null,false); 
				 
				  //if dependencies are needed as the @ext,then they will be access from the arguments after
				  //it checks it if it is already loaded or available in the object to extend i.e Pluto
				
				   ExtensionManager(Pluto).create("Moves",function(actions){ 
					
					var act = actions; //action dependency
					
					return {/* meta-data and functions*/}
					
				   },['Actions'],false);
				  
		           ExtensionManager(Pluto).create("Draws",function(actions,meta){ 
					//actions will be referencing the string 'Actions' dependency once it is found in pluto
					//meta will reference the second object ,allowing direct access from it
					
					return {/* meta-data and functions*/}

				   },['Actions',{ name: "john"}],false);
				
				  //Extensions can be giving to other objects from the manager or from other extended object through its
				  // 'give' method
				
				  var Venus = {};
				  //copies all valid extensions that have the signature '__extensions__' to Venus object
				  ExtensionManager(Pluto).give(true|false /* to either overwrite if extension exists*/,Venus);
				 
				  //copies specific extensions with dependencies that are loaded already in the object or manager
				  ExtensionManager(Pluto).give(false,Venus,'Moves');
				
				  //extensions can be removed from the manager or from an object that has being extended through the 'remove'
				  //method,simple pass a string(name of valid extension) to remove
				
				  ExtensionManager(Pluto).remove('Moves');
				
						
				</script>
			 
			  ....
			
			
	'''
	
# License
	This is released under the MIT License.