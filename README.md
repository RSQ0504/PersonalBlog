# PersonalBlog
### Use index.html as begining page. ###
Login feature can be found in Menu
> Login
> User is : David
Password is : 123
### Use User/David.html to skip the login part. ###
The begining page of personal blog
include:
+ Course table
+ MazeGame
+ Info Page
+ Resume

## Problem in couse.html
+ Cannot modify (create, write) local files using HTML and browser-side JavaScript currently by browserify-fs.
+ Will be solved in further update.
```
<form class="modal-content animate" onsubmit="return false;"> 
    <!-- form will not be submitted or renewed cuz no local file to store the data-->
    <!-- input innerhtml will be lost due to the submit of form -->
    ...
    ...
    ...
    <button button class="normalButton" id="Add" type="submit" onClick="document.getElementById('Course').style.display='none'">Add</button></a>
    <!-- motified the onclick due to the reason above, the form cannot be closed by itself -->
    ...
    ...
    ...
</form>
```
