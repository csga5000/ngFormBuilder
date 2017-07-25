The [Form.io](https://form.io) Form Builder
--------------------------------
This library provides form building capabilities to an Angular.js application. This form builder's purpose is to 
construct a JSON object reporesentation of a form, which could then be handed off to a Form Renderer such as the one
found @ [https://github.com/formio/ngFormio](https://github.com/formio/ngFormio).  The following landing page should
provide a good example of how this form builder works.

[See Working Example](http://codepen.io/travist/full/xVyMjo/)

The form builder can be embedded within your application using the following embed code.

```
<form-builder form="myform"></form-builder>
```

Where ```myform``` would be a form object that is placed on the scope of the controller containing the form builder.

Installation
================
To install this within your application, you will first need to include the following 

Customization (Feature presented by this fork:)
===============

In some js file:
```
window.FormBuilderConfig = {
	groups: {
		ddo: {
			title: "Custom Components"
		}
	},
	fields: [
		{
			name: "Some Address Field",
			//Name of component to base off of, ex: textfield, datetime, checkbox, or number
			component: "address",
			//The properties of the "component" to override.  Component means "thing in the left panel", so it's things like what group they belong to, or what the label on the draggable object says.
			component_properties: {
				group: "ddo",
				title: "Some Address Field"
			},
			//These are the "defaults" to be put into the element once it's dragged onto the form.  This basically "prefils" fields in the settings dialog for the form element.  Ex. it can decalre anything from validation to api settings to conditions to default values to the form input's label.  It's format should match what the output would say after the element is generated.  Ex. the placeholder setting in the dialog will show up in the rootScope object's form as "placeholder" so you'd specify it as placeholder in the object below
			settings: {
				label: "Billing Address",
				defaultValue: "1234 Example St.",
				key: "billing_address"
			}
		}
	]
};
```
This would generate something like this:
[example output](https://image.ibb.co/dGKLEk/form_ex.png)

Adding Components
=================
To add a component, add it in the config phase.

```
  angular
    .module('myApp')
    .config([
      'formioComponentsProvider',
      function (formioComponentsProvider) {
        formioComponentsProvider.register('myfield', {
          title: 'My Field',
          template: 'formio/components/icons.html',
          controller: ['$scope', function($scope) {
          }],
          group: 'custom',
          icon: 'fa fa-heart-o',
          settings: {},
          views: []
        });
```
Removing Components
===================
To remove default components or groups from the form builder, set them as disabled in the run phase.

```
  angular.module('myApp')
    .run(['formioComponents', function(formioComponents) {
      formioComponents.components.textfield.disabled = true;
      formioComponents.groups.layout.disabled = true;
    }]);
```

Form.io
==============
This project is provided by [Form.io](https://form.io), which is a combined form and API platform for Developers.
