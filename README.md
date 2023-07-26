# MenuItemApp
MenuItemApp
cd into Server folder and npm run dev.
   This will run on localhost:3001
next cd into menuitem-app and npm start.
   This will run on localhost:3000

Once the app starts firstly you'll want to select one of the three Menu Selections: Sandwiches, Sides or Drinks.
From there you'll see one menu item at a time for each category, you can scroll through the menu items both forward and backward.
Once you see an item that's appeasing to you, just click on the item and it will be added to the Order Summary list. If you keep
selecting the same menu item, you'll notice that the quantity will increase and so will the Total. You can click the edit button to 
make changes to your order before, finally, placing the order. Once the order is placed, you'll see a Toast message on the screen as
the server is making the API POST request and then, the order summary and price total will go back to it's original state. Have fun,
play around, find some bugs...


Requirements:

Call the get MenuItem api and display a menu to the user
Allow the user to select menu items and add them to their order
Allow user to modify their order before submission (remove menu items, increase the number of specific items, etc)
Display the total cost of the order with each edit
Submit the order to POST Order api and display the order number and item count

 

NOTE: There are only 2 APIs. Get MenuItem and POST Order, so editing of a submitted order is not supported and is outside the scope of this exercise.
