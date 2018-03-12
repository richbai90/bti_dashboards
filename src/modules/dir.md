# Modules

The modules directory holds the core components of the application.
A module is a self contained piece of the application that can be tested
independently, and maintains all of its resources locally. Modules at the
root of the modules folder are considered global modules, meaning that they
can be used by any other module or other resource that is not a direct or 
indirect child of the module. The only exception is the **\_\_common\_\_** folder
which does not export a module, but an object of context variables available
via the `@inject` decorator to any module, regardless of heiarchy. For
more information, see the **dir.md** file of the **\_\_common\_\_** folder. 
 

A module has the following files / Folders

* View Component 
  A stateless functional component with no logic. Name corresponding to the module name.
  I.E. App.js. This component is the single visual representation of the module and
  given the same props, it will render the same way every time. For performance purposes
  it must implement observable.
* store/ 
  The store folder contains a single index.js file that exports a single store.
  This store may be created of smaller sub-stores so long as those sub-stores
  are located within the same folder. Stores may not import other stores
  that are not declared in the same directory. Store dependencies must be
  injected via the wrapper component that implements them.
* tests/ 
  1 or more tests to verify that the component functions
* index .js
  The only export of a module, it must always be a wrapper component of the view component 
  implementing any logic that is required for the view to change. It is responsible
  for delivering all props to the view component, and wrapping the view component
  with withStyles() as required.
* modules/
  Submodules following this same structure. By convention, submodules can 
  use only dependencies declared locally, or in a submodule. The only 
  exception to this rule are modules at the root of the modules folder,
  that are not a parent of the module. These are considered global modules.
* readme.md
  Documentation of the module, its exports, and its purposes.