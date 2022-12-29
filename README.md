# PersonalBlog
### Use index.html as begining page. ###
Login feature can be find in Menu
## Use user David to login ##
Password is : 123

## Problem in couse.html
```
<form class="modal-content animate" onsubmit="return false;"> 
    <!-- form will not be submitted or renewed cuz no local file to store the data-->
    <!-- input innerhtml will be lost due to the submit of form -->
    <button button class="normalButton" type="submit" onClick="addCourse();document.getElementById('Course').style.display='none'">Add</button></a>
    <!-- motified the onclick due to the reason above, the form cannot be closed by itself -->
</form>
```
